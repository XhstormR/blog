---
title: Lima
date: 2026-04-21T14:13:05+08:00
author: XhstormR
tags:
    -
---

<!--more-->

> https://github.com/lima-vm/lima
>
> https://github.com/containers/podman
>
> https://github.com/docker/cli

## Lima VM + Podman Runtime + Docker CLI

```bash
limactl create --name=default template:podman
limactl edit --mount-writable # Make all mounts writable
limactl edit --mount '/Users/leo/Documents/IdeaProjects:w'
limactl start default
limactl ls

export DOCKER_HOST=unix:///Users/leo/.lima/default/sock/podman.sock
docker info
docker ps -a
```

## 透明代理容器网络

### 虚拟机 (Guest)

lima.yaml

```yaml
provision:
    - mode: system
      file: "{{.Dir}}/sing-box/tun-provisioning.sh"

mounts:
    - location: "{{.Dir}}/sing-box"
      mountPoint: /var/lib/sing-box
```

tun-provisioning.sh

```bash
#!/bin/bash
set -eux -o pipefail

export PATH="~/.pixi/bin:$PATH"

if ! dnf list --installed terra-release >/dev/null 2>&1; then
    dnf install -y --nogpgcheck --repofrompath 'terra,https://repos.fyralabs.com/terra$releasever' terra-release

    echo "terra-release added"
fi

if ! command -v sing-box >/dev/null 2>&1; then
    dnf install -y pixi
    pixi global install sing-box

    echo "sing-box installed"
fi

if ! systemctl is-active --quiet sing-box; then
    chcon -t bin_t `type -P sing-box`
    systemd-run --unit=sing-box `type -P sing-box` run -c config.json -D /var/lib/sing-box
    systemctl status sing-box

    echo "sing-box started"
fi
```

config.json

```json
{
    "log": {
        "level": "info"
    },
    "inbounds": [
        {
            "type": "tun", // 透明代理
            "address": ["172.19.0.1/30"],
            "auto_route": true,
            "strict_route": true
        }
    ],
    "outbounds": [
        {
            "tag": "自选",
            "type": "socks",
            "server": "host.lima.internal",
            "server_port": 1080,
            "domain_resolver": "local" // 用于解析服务器地址的域名 host.lima.internal，防止循环解析
        },
        {
            "tag": "直连",
            "type": "direct"
        }
    ],
    "dns": {
        "strategy": "ipv4_only",
        "servers": [
            {
                "tag": "remote",
                "type": "https",
                "server": "9.9.9.9",
                "detour": "自选"
            },
            {
                "tag": "local",
                "type": "local"
            }
        ]
    },
    "route": {
        "find_process": true,
        "auto_detect_interface": true,
        "default_domain_resolver": "remote",
        "rules": [
            {
                "action": "sniff"
            },
            {
                "protocol": "dns",
                "action": "hijack-dns"
            },
            {
                "ip_is_private": true,
                "outbound": "直连"
            }
        ]
    }
}
```

### 宿主机 (Host)

config.json

```json
{
    "inbounds": [
        {
            "type": "mixed", // SOCKS5 HTTP 代理
            "listen": "127.0.0.1",
            "listen_port": 1080,
            "set_system_proxy": false
        }
    ]
}
```

## Reference

- https://github.com/lima-vm/lima/blob/master/templates/default.yaml
- Fedora Extra Packages
    - https://rpmfusion.org
    - https://github.com/terrapkg/packages
        - https://repos.fyralabs.com/terrarawhide
