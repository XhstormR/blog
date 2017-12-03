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

## 服务端
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
