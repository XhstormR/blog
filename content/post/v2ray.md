---
author: XhstormR
categories:
- V2Ray
date: 2017-11-29T17:47:16+08:00
title: V2Ray
---

<!--more-->

Updated on 2017-11-29

> https://www.v2fly.org/
>
> https://github.com/v2fly/v2ray-core/releases/latest
>
> https://github.com/v2fly/v2fly-github-io/blob/master/docs/config/overview.md

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

### socks, http -> vmess
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 1080,
      "listen": "127.0.0.1",
      "protocol": "socks",
      "settings": {}
    },
    {
      "port": 1081,
      "listen": "127.0.0.1",
      "protocol": "http",
      "settings": {}
    }
  ],
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "1.1.1.1",
            "port": 8080,
            "users": [
              {
                "id": "97b4069c-f116-4612-9e4f-75c2202ec45d"
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "wsSettings": {
          "path": "/8lwwjtbxjl/"
        },
        "tlsSettings": {
          "allowInsecure": true
        }
      },
      "mux": {
        "enabled": true
      }
    },
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {}
    },
    {
      "tag": "blocked",
      "protocol": "blackhole",
      "settings": {}
    }
  ],
  "routing": {
    "settings": {
      "rules": [
        {
          "outboundTag": "direct",
          "type": "field",
          "ip": [
            "geoip:cn",
            "geoip:private"
          ]
        },
        {
          "outboundTag": "direct",
          "type": "field",
          "domain": [
            "geosite:cn",
            "geosite:private"
          ]
        },
        {
          "outboundTag": "blocked",
          "type": "field",
          "domain": [
            "geosite:category-ads-all"
          ]
        }
      ]
    }
  }
}
```

## 服务端

### docker-compose.yml
```yaml
version: '3'

services:
  v2ray:
    image: v2fly/v2fly-core:latest
    restart: always
    ports:
      - '8080:8080'
    volumes:
      - ./config.json:/etc/v2ray/config.json:ro
      - ./tls_key.pem:/root/tls_key.pem:ro
      - ./tls_cert.pem:/root/tls_cert.pem:ro
```

### vmess
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 8080,
      "listen": "0.0.0.0",
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "97b4069c-f116-4612-9e4f-75c2202ec45d"
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "wsSettings": {
          "path": "/8lwwjtbxjl/"
        },
        "tlsSettings": {
          "certificates": [
            {
              "keyFile": "tls_key.pem",
              "certificateFile": "tls_cert.pem"
            }
          ]
        }
      }
    }
  ],
  "outbounds": [
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {}
    },
    {
      "tag": "blocked",
      "protocol": "blackhole",
      "settings": {}
    }
  ],
  "routing": {
    "rules": [
      {
        "type": "field",
        "ip": [
          "geoip:private"
        ],
        "outboundTag": "blocked"
      },
      {
        "type": "field",
        "domain": [
          "geosite:private"
        ],
        "outboundTag": "blocked"
      }
    ]
  }
}
```

### socks
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbound": {
    "port": 8080,
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

```bash
生成证书：
v2ctl cert -ca -file tls -name 123 -org 123 -expire 8760h
```
