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
>
> https://sing-box-dashboard.sagernet.org
>
> https://metacubex.github.io/metacubexd/

Note: `rules` 中的规则越靠前（上），优先级就越高。

```json
{
    "$schema": "https://sing-box.sagernet.org/schema.json",
    "log": {
        "level": "info"
    },
    "inbounds": [
        {
            "type": "tun", // 透明代理
            "address": ["172.19.0.1/30"],
            "auto_route": true,
            "strict_route": true
        },
        {
            "type": "mixed", // SOCKS5 HTTP 代理
            "listen": "127.0.0.1",
            "listen_port": 1080,
            "set_system_proxy": true
        },
        {
            "type": "direct",
            "listen": "127.0.0.1",
            "listen_port": 53 // 对外提供 DNS（域名解析服务）
        }
    ],
    "outbounds": [
        {
            "tag": "自选",
            "type": "selector",
            "default": "东京",
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
            "interval": "2m",
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
                "server_name": "liads.wsone.icu",
                "insecure": true,
                "utls": {
                    "enabled": true,
                    "fingerprint": "firefox"
                }
            }
        },
        {
            "tag": "直连",
            "type": "direct"
        }
    ],
    "http_clients": [
        {
            "tag": "default",
            "detour": "自选"
        }
    ],
    "dns": {
        "strategy": "ipv4_only",
        "servers": [
            {
                "tag": "dns-remote",
                "type": "https",
                "server": "9.9.9.9",
                "detour": "自选"
            },
            {
                "tag": "dns-local",
                "type": "https",
                "server": "223.5.5.5"
            }
        ],
        "rules": [
            {
                "clash_mode": "Direct",
                "server": "dns-local"
            },
            {
                "clash_mode": "Global",
                "server": "dns-remote"
            },
            {
                "domain": ["services.googleapis.cn"], // Google Play 应用更新
                "server": "dns-remote"
            },
            {
                "rule_set": "geosite-category-ads-all",
                "action": "reject"
            },
            {
                "rule_set": "geosite-cn",
                "server": "dns-local"
            }
        ]
    },
    "route": {
        "find_process": true,
        "find_neighbor": true,
        "auto_detect_interface": true,
        "default_domain_resolver": "dns-local",
        "rules": [
            {
                "action": "sniff"
            },
            {
                "protocol": "dns",
                "action": "hijack-dns"
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
                "ip_is_private": true,
                "outbound": "直连"
            },
            {
                "domain": ["services.googleapis.cn"], // Google Play 应用更新
                "outbound": "自选"
            },
            {
                "rule_set": ["geosite-category-ads-all"],
                "action": "reject"
            },
            {
                "rule_set": [
                    "geoip-cn",
                    "geosite-cn",
                    "geosite-tld-cn",
                    "geosite-category-netdisk-cn",
                    "geosite-category-entertainment-cn",
                    "geosite-category-game-platforms-download",
                    "geosite-category-companies@cn",
                    "geosite-connectivity-check",
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
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geoip/rule-set/geoip-cn.srs"
            },
            {
                "tag": "geosite-cn",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-cn.srs"
            },
            {
                "tag": "geosite-tld-cn",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-tld-cn.srs"
            },
            {
                "tag": "geosite-category-netdisk-cn",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-category-netdisk-cn.srs"
            },
            {
                "tag": "geosite-category-entertainment-cn",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-category-entertainment-cn.srs"
            },
            {
                "tag": "geosite-category-game-platforms-download",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-category-game-platforms-download.srs"
            },
            {
                "tag": "geosite-category-ads-all",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-category-ads-all.srs"
            },
            {
                "tag": "geosite-category-companies@cn",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-category-companies@cn.srs"
            },
            {
                "tag": "geosite-connectivity-check",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-connectivity-check.srs"
            },
            {
                "tag": "geosite-private",
                "type": "remote",
                "format": "binary",
                "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-private.srs"
            }
        ]
    },
    "services": [
        {
            "type": "api",
            "listen": "127.0.0.1",
            "listen_port": 9091,
            "secret": "123456"
        }
    ],
    "experimental": {
        "cache_file": {
            "enabled": true,
            "store_dns": true
        },
        "clash_api": {
            "external_controller": "127.0.0.1:9090",
            "secret": "123456",
            "access_control_allow_origin": [
                "https://yacd.haishan.me",
                "https://yacd.metacubex.one",
                "https://metacubex.github.io",
                "https://metacubexd.pages.dev"
            ]
        }
    }
}
```

```bash
sing-box api --url 127.0.0.1:9091 --secret 123456 mode list
sing-box api --url 127.0.0.1:9091 --secret 123456 connection list
```

```bash
curl -fs -H "Authorization: Bearer 123456" http://127.0.0.1:9090/configs | jq '{"mode", "mode-list"}'
```

## OpenConnect Client (GlobalProtect)

- https://sing-box.sagernet.org/zh/configuration/endpoint/openconnect/
- https://gitlab.com/openconnect/openconnect/-/blob/master/trojans/hipreport.sh
- Host Information Profile (HIP): `/Library/Logs/PaloAltoNetworks/GlobalProtect/pan_gp_hrpt.xml`

{{< details summary="config.json" >}}

```enc {title="config.json" format=json}
-----BEGIN AGE ENCRYPTED FILE-----
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHNjcnlwdCBTUHkxcjFuamwvRGE5WTdK
UVQvanh3IDE4ClFzczVuenkxZG1YcWV3Z3U5MGw4MCt6MTJkQ2taL3hSZTVFMHk0
ZDlSUTAKLS0tIGpycTFmZDY4bnI4VDlyUFh6cHJLbVRsNzBoTG00NTRDMXcwS2Js
SDZVMkkKj15mpJe2QKEUn782rSNm9+4P4bru8ZdgsMU/YfJH1R24eCMVmaTunlIo
Z3iJGzNFDSm8XfmB2XWPsgPjCR+W7KoxuVkgfUKGE1TbJnqzWNRJ4QAN6/tUJw+i
DF955IygYZ4GdTP0CtoaIzunzU7yuy8JhhRuDs5rlZS4CyfbFOAbgbm28N98vE36
Lhc8L5gd+iWeLwdtZZOgfMM9SXM1x5eSbdRNxi+3JWTsFDSAiSQ5dSH2xG6qYHFu
k7ReD1bbVaXSIQQtdqqmd5f2wldPp/UIroLy5o5no5hQv8hYAke4s2TMey5D+uWc
0+G/eM8J83w/wlVB3H8j9VhuZzHqKxmzuBFdn5T/vwRAsw8d1DYhpYp1qsuKv0Cu
iRvyfokevTdJVEIIMw2PoBjYWISjLRZC+GO3HMZkvPVMz8CYpMu0NF/kVubc8vnZ
wAd6K5E+I988cEtWwvSZHaDilTn0VtayY64kurVIwcdlMO1/vZWcOUR3iHZPvKlw
NZRmQkBtk8spNLzc5jVpseJAW467X5ElWAxNGCcV8vJzcUAmqhHdApoiovTcODQR
0ciUevaeCc+FPqe19FtOZyLmYjQxSvKUDhO1o1aEuXAhyDyMz9t4nzXLLBFdj7ao
ceBRg0SAIlF0s75DB7mkCEgcT2PU9AUx5RfG5rj6a/bh8+jBP3GH56HXZLs4TcSt
OSYld1N+//JZD0OMjyqiKzz4QEeOE4SbBd3e4IkeMwgax9F7CqjfMIvrGFuW6evJ
av5/ckV6f7y+PIXUZ5neDn1TkE+NSlmYwiRpBu335B0yVWPnYcZ6Q2AaOPYAjmHS
6yQPZ5/5On3DYNBLIX08wV+uQaFiiEp5pcV/YUHuayjUDR/9i1415pamKhesYeQg
FZC+90jJ5UYGWBkayCiBZnFPlndSiE/XIZjEkQUEVfCrTvajc5ykRpWs40naJwmc
3ANaNfF6mrfmioJfVOruatmgqpiuHpNxcPT1ilBo/OFu6O+mkEKQXKo9k2iFCUpf
4YoHMv4F9raOhU72ntesrW4vDCIpkajtG0HWW2FrSBgSbVdylRMwrB7RT8wB/KF3
Q5RKdpnyRlw7YaPKkqx/CLdP5ZuVGvYlx0JSjR9YUrMg6c/7sJMWR8lipxxK6eOn
ccEaSpyWekZNjZIoduKgTGwd9MQLzr3WqbojCf5FMVwCzPPS/arFsXJQaQqcsbC+
YM+JdvHhT7ZlSFH0f/ueCVV+2+nQm6FWaYaUv8useiGNKOTk2L31LhC0i8QNWO9S
OEYXvvTfbqQvSiE4h1mt93xsfSqRkfsIm2A2D0fYKsz7z3P7JWKCBGZlimvt013c
+ULwyv99XLsJn7rvgUBmhfVUGi4DaXfXMvstfrnmRoqgXH59h1sDXDkXVnf9RN+R
AIZcJCrC9v1FBZIKdm5Wc94vlgZ45Zn4un+u2B6zkz6uTi6Up52Vhcai7AH0BK7c
xvF1hDUizqchcwxq2FYNtT/v1LtLT7PxmvaiauYUdqJbz7Da9WUE2R38tQeA7cjx
p9jNB7076hPvgIMlbPmn6U50KZXgIKPmOZAazUpNvwYTcaE/3wTR2P+igDgGExxI
9c6nDdG4EEn59mfMuElUFJdct30DRpq2isE+mbr4w8PXufSrtu3NL2DoZVxPZ6c4
Y8dc7jKY+sDMRx/vlH5h/UUSZvrNWHWH42kp7aW7gvt4R9TMkeOBPltmW5Ez81Ob
1EEoJpavX9yhY+gMNeFwi5Cjn4N/PWyPRjW5H+/oMG+Ye79162tevFjx/oZYL8T1
RYI4hGctygEKCjr/GjAaumILSSzxP07yy13g/QRpVyLjh8wbjx1COvFtgWBsz2nv
q6WnPuWQvN6V6+7wOYMBShH4At+dBu6iJRQmelqf38Jp/57X5ZZz6+YI62BYmBPH
fTtu7VZlJYyPhOCG0Y4i0eMcNt0DU9jnMCF1t61wSY5Aj/ZJpBVtM8dhfWlBnXAc
nP4xJ1YBUI3OqrrrqcZxa3BFw8HUaBUBWBIgU1FuDkfxIMslV4DjufPFW2CE+wKq
5I38qLKPAslh+KOIdGkcMROi3As4XiLAthgNpcav8YSQpNav5nztVJUE9+kzShD6
at3FtRlbtWI2GVRAS6ZH4pqrS/Qkq5M1bVBt0Y3PaH3WPGLlA9YN42imvDvEE20W
qBPTKTJLR8a3ihEB7T680e3otXEUKiJMPWM9JGuv5Dt/XuzdL4Z7GLmgoxMcy5uz
RpT3W2rqqsO1FbW4Ygqz8bDuME8O6DxpNSr8HEbByexigJg=
-----END AGE ENCRYPTED FILE-----
```

{{< /details >}}

{{< details summary="hipreport.sh" >}}

```enc {title="hipreport.sh" format=bash}
-----BEGIN AGE ENCRYPTED FILE-----
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHNjcnlwdCBqTnlma1RKcGNrZFdiUjBz
bGNTSXNRIDE4ClFRLzQ1UDdKdmg0S29LOWdYVW9McTZYS3RBZ1BRVlQ5bkJQY3pN
VWZzNEUKLS0tIDMwek9VaFZBbUkydFZ1dy92ZDh6blRHWGtCSzFRODRzK0RMQmRT
ZmlHZkUKIW7Kp+7f11Wsr4N8XvHy6SHmhEPAseasEWi6JACyzk5ETJOSa7Cpy7d/
iLPUSVqWeSrdtr4dsLXOvgDpPf94EXlans/DEAtgnGoXwBEgKw/jiO1goflm5wup
7LxDYrvG/V3cRLbr4OnktMpyRe3bs9UU2BYlct7eURnpr/XXx7Vjz1hYAzmE63qE
u4zTlbYbsWq50+EBYxPejeuT/Q4cD5FwzRfo9eluu/Va5A+bfa04JXciHp7u31dT
VuFyKbx95qBDcrTd/K0ipEFVe3XqWz5VbNCaJcInqFp8OAK6Xt8VAdeKN16CvYFV
CS9Cl/k6AEiusYYnPRkTVfSfAb2GnVK2Kqrxe7UA2JD0gsH2TL4Q7HMt22Qpanxu
aH5jsKwOfBjz0smMQGuC9IUzPuF5InxomBNqVF3rl+pJLt65WNoqeU2WnKaHzUpg
eAi4gh8EeIzdaj31MkzopifWHOfSZ2eeAp5gdsvWXu8MDACpGjwRIKahKvwmOC/f
0DPG7ubcKxTqrX3uz/ixwEUklz1sJLieU8DWLVhJQ7tsGsT/jTVaSoY6JTIch8Ko
fJ/7195WEU45nv34giBgHjezw4VdumOF4Aku+323kpFKv13WdqubDqLtr4Trfo9r
amu2pJ8dNscya9r2GBPxBtRyB/+o+TSnY8ZOmUSYCIo9q/ugnzoCXgtjqSMrFlr+
QxDYuod6wdASiS3UQnwcgp0bA6tkJrBRxGzAVz/6nuTqLFY82w/9Y7NqhLdGyjy0
4af0gcBavB0PW+ybWpS+VDYRkzum3oySBvc1kxgZrw5Lme0nqKeGm0M9d/27CSr8
/a5E7RPRUmiG0fWjGpGF4GQoegk8wF/xFCOEwFYRKUP1XQt76oyG/3GcP5FoKiQC
cWz25hn8HyRCrbK6bcEWAqPuPBFjPahY3htVmscFLfAyydl8csaHe5RxPr0t7wSM
Btj7f2jSMr+UHTotVH2504I+AJ8PQ1VvFKlJD17FyuMwKE63z9Wvp1YCk58x+O0C
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
FWq5wQnAE5tREsgu7gtXELzXJ1f+L0vDpn1+Kw==
-----END AGE ENCRYPTED FILE-----
```

{{< /details >}}

## Mac App Sandbox 白名单路径 (application.sb)

```
/Applications/sing-box.app/  -  io.nekohasekai.sfamt  -  com.apple.security.app-sandbox
/Library/Application Support/<任意子目录>/  <- 首选
~/Library/Application Scripts/group.io.nekohasekai.sfamt/
~/Library/Application Scripts/io.nekohasekai.sfamt/
~/Library/Application Scripts/io.nekohasekai.sfamt.extension/
```

## Age

- https://github.com/FiloSottile/age

```bash
age --encrypt --passphrase --armor -o 123.txt.age 123.txt
age --decrypt -o 123.txt 123.txt.age
```

## Reference

- 规则集
    - https://github.com/v2fly/domain-list-community
    - https://github.com/MetaCubeX/meta-rules-dat
- https://github.com/MetaCubeX/metacubexd
