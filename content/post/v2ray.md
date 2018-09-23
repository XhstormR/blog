---
author: XhstormR
categories:
- Notes
date: 2017-11-29T17:47:16+08:00
title: V2Ray
---

<!--more-->

Updated on 2017-11-29

> https://github.com/v2ray/v2ray-core

## 客户端

### socks -> socks
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbound": {
    "port": 1080,
    "listen": "127.0.0.1",
    "protocol": "socks",
    "settings": {
      "auth": "noauth"
    }
  },
  "outbound": {
    "protocol": "socks",
    "settings": {
      "servers": [
        {
          "address": "219.221.10.50",
          "port": 80,
          "users": [
            {
              "user": "123",
              "pass": "456"
            }
          ]
        }
      ]
    }
  }
}
```

### socks -> socks, shadowsocks
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbound": {
    "port": 1080,
    "listen": "127.0.0.1",
    "protocol": "socks",
    "settings": {
      "auth": "noauth"
    }
  },
  "outbound": {
    "protocol": "shadowsocks",
    "settings": {
      "servers": [
        {
          "address": "1.1.1.1",
          "port": 8080,
          "method": "aes-256-cfb",
          "password": "123456"
        }
      ]
    }
  },
  "outboundDetour": [
    {
      "tag": "school",
      "protocol": "socks",
      "settings": {
        "servers": [
          {
            "address": "219.221.10.50",
            "port": 80,
            "users": [
              {
                "user": "123",
                "pass": "456"
              }
            ]
          }
        ]
      }
    }
  ],
  "routing": {
    "strategy": "rules",
    "settings": {
      "rules": [
        {
          "outboundTag": "school",
          "type": "field",
          "ip": [
            "219.221.10.0/24",
            "172.31.0.0/24"
          ]
        }
      ]
    }
  }
}
```

### socks, http -> vmess
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbound": {
    "port": 1080,
    "listen": "127.0.0.1",
    "protocol": "socks",
    "settings": {
      "auth": "noauth"
    }
  },
  "inboundDetour": [
    {
      "port": 1081,
      "listen": "127.0.0.1",
      "protocol": "http",
      "settings": {
        "allowTransparent": false,
        "userLevel": 0
      }
    }
  ],
  "outbound": {
    "protocol": "vmess",
    "settings": {
      "vnext": [
        {
          "address": "1.1.1.1",
          "port": 8080,
          "users": [
            {
              "id": "e735afb1-b608-4eb6-b1b1-b0042cb897e8",
              "alterId": 64
            }
          ]
        }
      ]
    }
  }
}
```

## 服务端

### socks
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbound": {
    "port": 80,
    "listen": "0.0.0.0",
    "protocol": "socks",
    "settings": {
      "auth": "password",
      "accounts": [
        {
          "user": "123",
          "pass": "456"
        }
      ]
    }
  },
  "outbound": {
    "protocol": "freedom",
    "settings": {}
  }
}
```
