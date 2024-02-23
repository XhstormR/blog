---
title: sing-box
date: 2024-02-04T19:16:34+08:00
author: XhstormR
tags:
-
---

<!--more-->

> https://github.com/SagerNet/sing-box
>
> https://sing-box.sagernet.org/zh/configuration/

Note: `rules` 中的规则越靠前，优先级就越高。

```json
{
  "log": {
    "level": "info"
  },
  "inbounds": [
    {
      "type": "tun", // 透明代理
      "inet4_address": "172.16.0.1/30",
      "auto_route": true,
      "strict_route": true,
      "sniff": true
    },
    {
      "type": "mixed", // SOCKS5 HTTP 代理
      "listen": "127.0.0.1",
      "listen_port": 1080,
      "set_system_proxy": true
    }
  ],
  "outbounds": [
    {
      "tag": "自选",
      "type": "selector",
      "default": "台湾2024-1",
      "outbounds": [
        "香港2024-1",
        "香港2024-2",
        "台湾2024-1",
        "首尔",
        "东京",
        "洛杉矶",
        "悉尼",
        "墨尔本",
        "法兰克福",
        "巴林",
        "德里",
        "孟买1",
        "孟买2",
        "雅加达",
        "自动"
      ]
    },
    {
      "tag": "自动",
      "type": "urltest",
      "outbounds": [
        "香港2024-1",
        "香港2024-2",
        "台湾2024-1",
        "首尔",
        "东京",
        "洛杉矶",
        "悉尼",
        "墨尔本",
        "法兰克福",
        "巴林",
        "德里",
        "孟买1",
        "孟买2",
        "雅加达"
      ]
    },
    {
      "tag": "香港2024-1",
      "type": "trojan",
      "password": "123456",
      "server": "liads.wsone.icu",
      "server_port": 443,
      "tls": {
        "enabled": true,
        "server_name": "liads.wsone.icu"
      }
    },
    {
      "tag": "直连",
      "type": "direct"
    },
    {
      "tag": "拦截",
      "type": "block"
    },
    {
      "tag": "域名",
      "type": "dns"
    }
  ],
  "dns": {
    "strategy": "ipv4_only",
    "servers": [
      {
        "tag": "remote",
        "address": "https://9.9.9.9/dns-query",
        "detour": "自选"
      },
      {
        "tag": "local",
        "address": "1.2.4.8",
        "detour": "直连"
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "local"
      },
      {
        "clash_mode": "Direct",
        "server": "local"
      },
      {
        "clash_mode": "Global",
        "server": "remote"
      },
      {
        "rule_set": "geosite-cn",
        "server": "local"
      }
    ]
  },
  "route": {
    "auto_detect_interface": true,
    "rules": [
      {
        "protocol": "dns",
        "outbound": "域名"
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
      },
      {
        "rule_set": [
          "geosite-category-ads-all"
        ],
        "outbound": "拦截"
      },
      {
        "rule_set": [
          "geoip-cn",
          "geosite-cn",
          "geosite-private"
        ],
        "outbound": "直连"
      }
    ],
    "rule_set": [
      {
        "tag": "geoip-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geoip/rule-set/geoip-cn.srs",
        "download_detour": "自选"
      },
      {
        "tag": "geosite-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-geolocation-cn.srs",
        "download_detour": "自选"
      },
      {
        "tag": "geosite-private",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-private.srs",
        "download_detour": "自选"
      },
      {
        "tag": "geosite-category-ads-all",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-category-ads-all.srs",
        "download_detour": "自选"
      }
    ]
  },
  "experimental": {
    "cache_file": {
      "enabled": true
    }
  }
}
```
