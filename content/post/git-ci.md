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

```bash
curl -fsSL https://get.docker.com | bash -s -- docker --mirror Aliyun
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

```bash
visudo -f /etc/sudoers.d/123
----
leo    ALL=(ALL)       ALL
```

## GitLab + Drone + Traefik
* https://docs.gitlab.com/omnibus/docker/
* https://docs.gitlab.com/omnibus/settings/configuration.html
* https://docs.drone.io/installation/gitlab/single-machine/
* https://docs.traefik.io/configuration/backends/docker/

```bash
docker-compose pull
docker-compose up -d
```

```bash
容器之间通过 HostIP:Port 访问对方，需要防火墙开启对应端口
systemctl status firewalld
firewall-cmd --state
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --add-port=1080/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-all

firewall-cmd --add-service=http --permanent
firewall-cmd --remove-port=80/tcp --permanent
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
        external_url 'http://192.168.1.147'
        gitlab_rails['gitlab_shell_ssh_port'] = 1022
    ports:
      - '80:80'
      - '443:443'
      - '1022:22'
    volumes:
      - /srv/gitlab/config:/etc/gitlab
      - /srv/gitlab/logs:/var/log/gitlab
      - /srv/gitlab/data:/var/opt/gitlab
    labels:
      - traefik.port=80

  drone:
    image: drone/drone:latest
    restart: always
    environment:
      DRONE_SERVER_HOST: '192.168.1.147:1080'
      DRONE_GITLAB_SERVER: 'http://192.168.1.147'
      DRONE_GITLAB_CLIENT_ID: '2127852ddf50bf3fe3add3a17c28d50d21f5946bc469f54eff2f54f3ca363c14'
      DRONE_GITLAB_CLIENT_SECRET: '187e057c6ce065041ff21500eb2c7fb48931feb0772928cbeb97e850c680a0c0'
      DRONE_USER_CREATE: 'username:root,admin:true'
    ports:
      - '1080:80'
      - '10443:443'
    volumes:
      - /var/lib/drone:/data
      - /var/run/docker.sock:/var/run/docker.sock

  traefik:
    image: traefik:latest
    restart: always
    ports:
      - '2080:80'
      - '20443:443'
      - '8080:8080'
    command: --api --docker
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```
