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
docker ps #查看容器
docker images #查看镜像
docker network ls #查看网络
docker rm $(docker ps -a -q) #删除已停止的容器
docker rmi drone/drone #删除镜像
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
docker-compose logs -f #查看容器日志
docker-compose exec gitlab sh #获得容器 Shell
```

## GitLab + Drone + Traefik + Portainer
* https://docs.gitlab.com/omnibus/docker/
* https://docs.gitlab.com/omnibus/settings/configuration.html
* https://docs.drone.io/installation/gitlab/single-machine/
* https://docs.traefik.io/configuration/backends/docker/
* https://portainer.readthedocs.io/en/stable/configuration.html

```bash
docker-compose pull
docker-compose up -d
docker-compose ps
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
        external_url '${GITLAB_SERVER_URL}'
        gitlab_rails['gitlab_shell_ssh_port'] = 1022
    ports:
      - '1022:22'
    volumes:
      - /srv/gitlab/config:/etc/gitlab
      - /srv/gitlab/logs:/var/log/gitlab
      - /srv/gitlab/data:/var/opt/gitlab
    labels:
      - traefik.port=80
      - traefik.frontend.rule=PathPrefix:/git/

  drone:
    image: drone/drone:latest
    restart: always
    environment:
      DRONE_SERVER_HOST: ${DRONE_SERVER_HOST}
      DRONE_GITLAB_SERVER: ${GITLAB_SERVER_URL}
      DRONE_GITLAB_CLIENT_ID: ${GITLAB_CLIENT_ID}
      DRONE_GITLAB_CLIENT_SECRET: ${GITLAB_CLIENT_SECRET}
      DRONE_USER_CREATE: 'username:root,admin:true'
    volumes:
      - /var/lib/drone:/data
      - /var/run/docker.sock:/var/run/docker.sock
    labels:
      - traefik.port=80
      - traefik.frontend.rule=PathPrefix:/

  portainer:
    image: portainer/portainer:latest
    restart: always
    command: -H unix:///var/run/docker.sock --admin-password ${PORTAINER_ADMIN_PASSWORD}
    volumes:
      - /var/lib/portainer:/data
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
```

### .env

```
DRONE_SERVER_HOST=192.168.8.128
GITLAB_SERVER_URL=http://192.168.8.128/git/
GITLAB_CLIENT_ID=123
GITLAB_CLIENT_SECRET=456
TRAEFIK_BASIC_AUTH=123:$2y$05$mV7zdO2bQ3dHM0S4fOoL2uNBN1DklcS7jGE1nj3ZL0jqhFJKaBlOK
PORTAINER_ADMIN_PASSWORD=$2y$05$mV7zdO2bQ3dHM0S4fOoL2uNBN1DklcS7jGE1nj3ZL0jqhFJKaBlOK
```

---

```bash
配置 sudoers

visudo -f /etc/sudoers.d/123
----
leo    ALL=(ALL)       ALL
```

```
htpasswd -nbB 123 456

https://httpd.apache.org/docs/current/programs/htpasswd.html
```

```bash
容器之间通过 HostIP:Port 访问对方，需要防火墙放行对应端口

systemctl status firewalld
firewall-cmd --state
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-all

firewall-cmd --add-service=http --permanent
firewall-cmd --remove-port=80/tcp --permanent
```
