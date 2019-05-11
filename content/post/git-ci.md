---
author: XhstormR
categories:
- Notes
date: 2019-04-04T15:32:27+08:00
title: Git + CI
---

<!--more-->

Updated on 2019-04-04

>

## Linux
```bash
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
yum makecache
yum update -y

timedatectl set-timezone Asia/Shanghai
```

## Docker
* https://docs.docker.com/reference/
* https://docs.docker.com/engine/reference/commandline/docker/
* https://docs.docker.com/engine/reference/commandline/dockerd/
* https://cr.console.aliyun.com/cn-shanghai/instances/mirrors

```bash
curl -fsSL https://get.docker.com | bash -s -- docker --mirror Aliyun
mkdir -p /etc/docker
echo -e '{\n"registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]\n}' > /etc/docker/daemon.json
systemctl start docker
systemctl enable docker
systemctl status docker
usermod -aG docker leo
```

```bash
docker info #查看系统信息
docker ps -a #查看容器
docker images #查看镜像
docker network ls #查看网络
docker rm -fv gitlab #停止并删除容器、卷
docker rm `docker ps -a -q` #删除已停止的容器
docker rmi gitlab/gitlab-ce #删除镜像
docker logs -f gitlab #查看容器日志
docker exec -it gitlab sh #获得容器 Shell
```

### Docker Compose
* https://docs.docker.com/compose/reference/
* https://docs.docker.com/compose/compose-file/

```bash
sudo curl -Lf https://github.com/docker/compose/releases/download/1.24.0/run.sh -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

```bash
docker-compose version #查看版本
docker-compose down -v #停止并删除容器、网络、卷
docker-compose logs -f #查看容器日志
docker-compose exec gitlab sh #获得容器 Shell
```

## GitLab + Traefik + Portainer
* https://docs.gitlab.com/omnibus/docker/
* https://docs.gitlab.com/omnibus/settings/configuration.html
* https://docs.traefik.io/configuration/backends/docker/
* https://portainer.readthedocs.io/en/stable/configuration.html

```bash
docker-compose pull
docker-compose up -d
docker-compose ps
docker-compose exec runner gitlab-runner register
```

### docker-compose.yml

```yaml
version: '3'

services:
  gitlab:
    image: gitlab/gitlab-ce:latest
    restart: always
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        gitlab_rails['gitlab_shell_ssh_port'] = 5022
        external_url '${GITLAB_SERVER_URL}'
        registry_external_url '${GITLAB_REGISTRY_URL}'
        registry_nginx['ssl_certificate'] = "/certs/domain.crt"
        registry_nginx['ssl_certificate_key'] = "/certs/domain.key"
    ports:
      - '5022:22'
      - '5100:5100'
    volumes:
      - ./certs:/certs
      - gitlab_config:/etc/gitlab
      - gitlab_logs:/var/log/gitlab
      - gitlab_data:/var/opt/gitlab
    labels:
      - traefik.port=80
      - traefik.frontend.rule=PathPrefix:/git/

  runner:
    image: gitlab/gitlab-runner:latest
    restart: always
    environment:
      CI_SERVER_URL: ${GITLAB_SERVER_URL}
      REGISTRATION_TOKEN: ${RUNNER_REGISTRATION_TOKEN}
      REGISTER_NON_INTERACTIVE: 'true'
      RUNNER_EXECUTOR: docker
      DOCKER_IMAGE: alpine:latest
    volumes:
      - runner_data:/etc/gitlab-runner
      - /var/run/docker.sock:/var/run/docker.sock

  portainer:
    image: portainer/portainer:latest
    restart: always
    command: -H unix:///var/run/docker.sock --admin-password ${PORTAINER_ADMIN_PASSWORD}
    volumes:
      - portainer_data:/data
      - /var/run/docker.sock:/var/run/docker.sock
    labels:
      - traefik.port=9000
      - traefik.frontend.rule=PathPrefixStrip:/portainer/

  traefik:
    image: traefik:latest
    restart: always
    ports:
      - '80:80'
    command: --api --docker
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    labels:
      - traefik.port=8080
      - traefik.frontend.rule=PathPrefixStrip:/traefik/
      - traefik.frontend.auth.basic.removeHeader=true
      - traefik.frontend.auth.basic.users=${TRAEFIK_BASIC_AUTH}

volumes:
  gitlab_config:
  gitlab_logs:
  gitlab_data:
  runner_data:
  portainer_data:
```

### .env

```
GITLAB_SERVER_URL=http://192.168.8.128/git/
GITLAB_REGISTRY_URL=https://192.168.8.128:5100
RUNNER_REGISTRATION_TOKEN=123
TRAEFIK_BASIC_AUTH=123:$2y$05$80HqrqBOoNaabteix3gYJ.S0kT.HP6sw5GjOplRfGhGezth0yL78y
PORTAINER_ADMIN_PASSWORD=$2y$05$80HqrqBOoNaabteix3gYJ.S0kT.HP6sw5GjOplRfGhGezth0yL78y
```

---

```bash
配置 sudoers

visudo -f /etc/sudoers.d/123
----
leo    ALL=(ALL)       ALL
```

```bash
配置 Docker Registry 证书

mkdir -p certs
openssl req \
  -config /etc/pki/tls/openssl.cnf \
  -addext 'subjectAltName=IP:192.168.8.128' \
  -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key \
  -x509 -days 365 -out certs/domain.crt

mkdir -p /etc/docker/certs.d/192.168.8.128:5100
cp certs/domain.crt /etc/docker/certs.d/192.168.8.128:5100/ca.crt

https://www.openssl.org/docs/manmaster/man1/req.html
```

```bash
基本身份认证

htpasswd -nbB 123 123456

https://httpd.apache.org/docs/current/programs/htpasswd.html
```

```bash
本地容器之间若通过 HostIP:Port 访问对方，需要防火墙放行对应端口

systemctl status firewalld
firewall-cmd --state
firewall-cmd --add-service=http --permanent
firewall-cmd --reload
firewall-cmd --list-all

firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --remove-port=80/tcp --permanent
```

```bash
https://docker.mirrors.ustc.edu.cn/v2/gitlab/gitlab-ce/tags/list
https://docker.mirrors.ustc.edu.cn/v2/gitlab/gitlab-ce/manifests/latest
https://docker.mirrors.ustc.edu.cn/v2/gitlab/gitlab-ce/blobs/sha256:e04a2435a78d15beae8c317bb18cfc3bc556b8dcdb7d29b256971ad42ee06767

curl -sk https://docker.mirrors.ustc.edu.cn/v2/gitlab/gitlab-ce/manifests/latest | ^
jq -r .fsLayers[].blobSum | ^
busybox xargs -i echo curl -skI https://docker.mirrors.ustc.edu.cn/v2/gitlab/gitlab-ce/blobs/{} | ^
busybox sh | ^
busybox grep -i content-length

https://docs.docker.com/registry/spec/api/
```

## Reference
* https://docs.docker.com/samples/
