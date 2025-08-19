---
author: XhstormR
tags:
- Notes
date: 2020-02-28T14:06:07+08:00
title: Android Proxy
---

<!--more-->

Updated on 2020-02-28

> CA 证书（根证书）需要安装（导入）为系统证书（不是用户证书），才能解密应用SSL流量。

## Tun2socks
* https://github.com/eycorsican/go-tun2socks

### Reference
* https://github.com/ambrop72/badvpn/wiki/Tun2socks

## Postern
* https://github.com/postern-overwal/postern-stuff

```bash
[Proxy]
Proxy = https,192.168.1.4,8080

[Rule]
FINAL,Proxy
```

## Shadowsocks
* https://github.com/shadowsocks/shadowsocks-android

```bash
ss://YWVzLTI1Ni1nY206MTIzNDU2@192.168.1.4:1234
```

### V2ray Config
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbound": {
    "port": 1234,
    "listen": "192.168.1.4",
    "protocol": "shadowsocks",
    "settings": {
      "method": "aes-256-gcm",
      "password": "123456"
    }
  },
  "outbound": {
    "protocol": "http",
    "settings": {
      "servers": [
        {
          "address": "127.0.0.1",
          "port": 8080
        }
      ]
    }
  },
  "outboundDetour": [
    {
      "tag": "dns",
      "protocol": "freedom"
    }
  ],
  "routing": {
    "settings": {
      "rules": [
        {
          "outboundTag": "dns",
          "type": "field",
          "port": "53"
        }
      ]
    }
  }
}
```

## Clash
* https://github.com/Kr328/ClashForAndroid
* https://github.com/Dreamacro/clash/wiki/configuration

```yaml
proxies:
  - { name: burp, type: http, server: 192.168.1.100, port: 8080 }

proxy-groups:
  - name: 手动
    type: select
    proxies:
      - burp
      - DIRECT

rules:
  - DOMAIN-SUFFIX,local,DIRECT
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - MATCH,手动
```

## sing-box

```json
{
  "log": {
    "level": "info"
  },
  "inbounds": [
    {
      "type": "tun",
      "address": [
        "172.19.0.1/30"
      ],
      "auto_route": true,
      "strict_route": true
    }
  ],
  "outbounds": [
    {
      "tag": "自选",
      "type": "selector",
      "outbounds": [
        "burp",
        "直连"
      ]
    },
    {
      "tag": "burp",
      "type": "http",
      "server": "192.168.100.2",
      "server_port": 8080
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
        "tag": "local",
        "type": "https",
        "server": "9.9.9.9",
        "detour": "直连"
      }
    ]
  },
  "route": {
    "auto_detect_interface": true,
    "default_domain_resolver": "local",
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
      },
      {
        "clash_mode": "Direct",
        "outbound": "直连"
      },
      {
        "clash_mode": "Global",
        "outbound": "自选"
      }
    ]
  }
}
```

## Reqable
* https://github.com/reqable/reqable-app
