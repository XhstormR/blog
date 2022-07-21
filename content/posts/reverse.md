---
author: XhstormR
categories:
- V2Ray
date: 2019-10-20T22:14:43+08:00
title: 内网穿透
---

<!--more-->

Updated on 2019-10-20

> https://github.com/v2ray/manual/blob/master/zh_cn/chapter_02/reverse.md

## 内网
```json
{
  "log": {
    "loglevel": "info"
  },
  "reverse": {
    "bridges": [
      {
        "tag": "bridge",
        "domain": "example.com"
      }
    ]
  },
  "outbounds": [
    {
      "tag": "tunnel",
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "47.98.135.65",
            "port": 443,
            "users": [
              {
                "id": "b831381d-6324-4d53-ad4f-8cda48b30811",
                "alterId": 64
              }
            ]
          }
        ]
      }
    },
    {
      "tag": "out",
      "protocol": "freedom",
      "settings": {}
    }
  ],
  "routing": {
    "rules": [
      {
        "type": "field",
        "inboundTag": [
          "bridge"
        ],
        "domain": [
          "full:example.com"
        ],
        "outboundTag": "tunnel"
      },
      {
        "type": "field",
        "inboundTag": [
          "bridge"
        ],
        "outboundTag": "out"
      }
    ]
  }
}
```

## 公网
```json
{
  "log": {
    "loglevel": "info"
  },
  "reverse": {
    "portals": [
      {
        "tag": "portal",
        "domain": "example.com"
      }
    ]
  },
  "inbounds": [
    {
      "tag": "tunnel",
      "port": 443,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "b831381d-6324-4d53-ad4f-8cda48b30811",
            "alterId": 64
          }
        ]
      }
    },
    {
      "tag": "in",
      "port": 9527,
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
    }
  ],
  "routing": {
    "rules": [
      {
        "type": "field",
        "inboundTag": [
          "tunnel"
        ],
        "domain": [
          "full:example.com"
        ],
        "outboundTag": "portal"
      },
      {
        "type": "field",
        "inboundTag": [
          "in"
        ],
        "outboundTag": "portal"
      }
    ]
  }
}
```

```json
服务暴露型内网穿透
----
{
  "tag": "in",
  "port": 9527,
  "protocol": "dokodemo-door",
  "settings": {
    "address": "127.0.0.1",
    "port": 3389,
    "network": "tcp"
  }
}
```

## 客户端
```json
{
  "log": {
    "loglevel": "info"
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
          "address": "47.98.135.65",
          "port": 9527,
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
