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
                "tag": "remote",
                "type": "https",
                "server": "9.9.9.9",
                "detour": "自选"
            },
            {
                "tag": "local",
                "type": "https",
                "server": "223.5.5.5"
            }
        ],
        "rules": [
            {
                "clash_mode": "Direct",
                "server": "local"
            },
            {
                "clash_mode": "Global",
                "server": "remote"
            },
            {
                "domain": ["services.googleapis.cn"], // Google Play 应用更新
                "server": "remote"
            },
            {
                "rule_set": "geosite-category-ads-all",
                "action": "reject"
            },
            {
                "rule_set": "geosite-cn",
                "server": "local"
            }
        ]
    },
    "route": {
        "find_process": true,
        "find_neighbor": true,
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
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHNjcnlwdCBTMWl2UzcrU1pSb2xTZ0FC
bkE4WW53IDE4CmdVUHhJcXpNaUl2b3lDa3JYb0thK0pDanVDWXhQQm9Kb0d4L0Zq
RCs0V3MKLS0tIEZEeHJIR1BXNmxBWWxaVllZTFFDUzdaazV5ZzlHaW1Ua0Y0eU9X
VlZwMUEKYoDgT/+NaPXOLptABmubPOhOBc2ofFG0sWHt06xoOaGm0sVGUZjL+Btw
GC8OYkQpf+MxJME4wmoQD4DL43DlrbrL3iCPTf2UB8eo8oPz3/52DoxPS4aOrttj
h3diEjsRCzJ7zkd2FgYKfxVnBTkKUhlwEjk4HaD0n2dxIGhCmnZyHXC6latBjn6O
tcmKh8bOSETzCvrT0TcR+s1+OVhz1vXEJ5Ba5uBVECQq2WSzh0DvpSz5jbqVPMsk
nOD+Jtn3+ZULUly0j/nkvGpTWVKtVP+ayB5D03gL7T3bXIYcHE/gt8evvBfOKEW9
ZetHSxO26KfhiF1YtJKNjCYwU/Y9KcsWDxNYOz1fAHrVTf7VA/ktQdznuf/C+LPa
NsurdUTzIMHE8GgVM59Hp2oIvivDNP2ToVdv2yZBEYZBdo1iM4Tq377QmTlmvH1S
70nFq/M8v+td3excrhvMMoVCiIMj4xqXf3YD6whcCGae8uWJ71X111byP8gkLbsN
6rJdo3lYrUO1BL7cbnVS1F+jw2UDvn1kGxljCza/gaJ9LhqOqA8yTwk7nwz13s+3
AdWarHiRyvxghdloblqtGnqtGHOvaTqYWU3fD/3qEccmBwvN1+2Zrf6drZJMzSFJ
DaHmu6r1UGvp/+Etcd7hlJiwHKSBxzbvIHf5YbPOL5iED3CEDbgughjKOHbG/dyH
UyAbGfpTdR2uYjb9Ivy3ntLfw58b5YvPvPBOUX0bV5F513CLsYeHPZGp5KEbPpNZ
/ABuPrGaFXwBeT8+Qa7YgX4GoyeFf1EE2m5edvP4Wk+18wquAdl+/3zys6qLoR7U
LK29F1g+rcbClVDfegKPX/J6Qyul1fgYGbr7rgjPthiAq1fRmko4tU8AKprSfyXy
sXSR+/eFmtSIz8rFGjDs1xsx1IOaJvwBS0dThn3rZaI6Yc5fd8x2TNNMYCOLAg3a
yPzpckvSkoHjz6Z3rQpPdtplZ0h7/CdHUlDdeYM6pxiohElgXQSN/jOd/I9/rZhB
aYJn50P7csZN8dEYs8wU6UfE90P6CexauaRTljFUUEEjdo5ii0hmH6N6+HhX0i2q
+/Flh4elCcP5xtxsaShJvZQDYif+Ccs55ytcFAVVDBOhO5Bc2D6YWw2hQ+6C209e
f7DDSrMsLb7RbptNmS5KFx+25QifbEjXG1HB0SiLcMxTrlypwT71PTSlLYknp7d0
+fqICOw+kEKty4BdhBWCNBxIUGlDc7pa9/Hc0PFG3xyWz0Y03sgXpNH1jyMfpXOl
QPZFd52oqj1sqZh6exwss4kotbYe/zU/U6oedYshxGg8GdTn3d4MDXFICusmF9DG
x2+evwIG6z5Xi97Jymj2cwgRTDPl+PcmQT8Z6aD6TObBvfwvP+858a2nbYwWobec
6bKNGWDi4jUiohsEoMbGnhQCfVwHx/FHwFVa8mNBundNGzFFmHetEzuWLACHpyQz
fpuSFzqqTFbaoj8rboYfb8HMaa1dR0KvzQh178bPaf+vpq9Tx+xO2BnPKo6Yuws8
ropnj4uVtQ6g+pWjmlZX2r5Jum+G+f2PYv3KGcFOhDPcPQsRNRjVckMt1zsG7C/i
d5/1qjukffic0gkbONl5q6hGg6zN7fpA1pL3nYdV7X6KwP9m/QMHrMFrqw/HhYOh
uOaToTflqSdnN8xR3+ukZuWrqn17xdSBUwcBAbQshY6w/GYrmJpmZteIybfuC16X
ag/mEjdSjWrdeVJQjixzUIfS1vf6Hd+qbYB2k/3OyiRsbDD26wtNzcZYD/q/zAB6
Gv+rLVh9wWMazmFUDpgnyZRI1nYFi9UytAKvla64/fjXdY88TYwe9YqzfuCWFa1M
xDKiCs7UdeQ97CCI3QMJz5U7QC6ZH9ov+rBQh0OZBtFY7f3/NaN8aI8isuvVEsCL
sSmgleSQ91LOvYSiRNWz1K1Kt6Lid7qwxh7MQsccHUGV6q3jgiy/iaBO3oBFO63Q
37q4B07BEK5W4URm7iaL6ifbhsASF2p0SIhcUbubbrNUDQxIstoISmtDQZknSsbk
gkkTEXjZFEKEC0sfHVrY1FlYMj4OQkxQZC4cMgcmRr7VnAx0hSd+q+76qna5CI2F
YNNPLkaBksuCbm5dUZL/PW0JheiaeVg4rNWLKrMaz1x1ziMiGdHL4XshUbaR02CL
mw==
-----END AGE ENCRYPTED FILE-----
```

{{< /details >}}

{{< details summary="hipreport.sh" >}}

```enc {title="hipreport.sh" format=bash}
-----BEGIN AGE ENCRYPTED FILE-----
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHNjcnlwdCBGZ3NlMnFyZzdBallxQTBy
K3JBZ05RIDE4CmZBRmNmWnJSck5JN2t4MmdkN1dDSzlOODlDSURMeHZ2aWVOTnFw
TU1Wcm8KLS0tIFhxUGFNY0xkejhXVnZvd2ZJYis2eVVOdS9TaDRWU0lFYjJYZ1p4
QjJ0QUEKZlS5qIvLf3pdigc0ydhqNDiw0Vhx8E8flIczbfYDx8AUlp6w3SzUL89z
2fo9+wsXxIFmMCJ+hbfnuBK4bmlBA8Or4zXYW26fGBEtvWMC4Y9VyFdG/vnZyxr7
rM34Oc+JmgJPu2ZHwi3TAlS+RGfW6yHG6m/1Ae2OzLNyvZxRTYhpkrhdzVNmwlyt
Z/LB9/IjpeqrUprgbxONTdFSrk28q8vpTbfu614JezuUI5ALjAugCXfsEE5gnWba
GLrb6U/bvFgJgG5/318q2Dp92+YHwQkjGjGzu1bGFa6a7mrxuknC0UBsuW0K4etP
Zp4hP42PkM0uMdAuQf5iJO13tbRPmQjFtv0uqRYAztA5M8iBu0phdvr7FyZwaaAE
iruin2uexXh6dECzG5bmVZikokY2c6/lCO2OLlSFGphVcBJP4oo2QwEEdekoY384
Sn4InUS8EcxtR/MvFGn41w7xWjgSinQHD5u1ggp7GbMJsrpDI8RyxhjucZ43/FsD
2oiIvMdaESpLrZmCNJ2pToXGmPHq3gfXwSUbvSxyIhPfwfvFO3uiCEsxn237ydpA
QPIziMWW7vXeCb9llS5xfKd7ufEMk4t8i3k18v7Owphmk4iy3I950m48HHwLgbJ7
MQJvGsn9DkaPOVNpgIwpnBODiinHd2wk6rX+6SrS+knlsBKEKE6tamvx4NbLb0KX
QG8d1NkEd8KCUqfxRcUAAH4FM5Sk609rktDBn7eUKU5NZGfmT/J3MZsQAb6GnqGY
SIfg/r0iaGBjRD99iuGyDFbifXj8JwgXOXProDHfPoL5AOaSG2Nl7wS58bpJY+lc
ecW4LgZfo0EU3w37xPU8iaEFOLbYS1bikn8vrTlk/PwHjBhkm5Rrzr9ZxunU/Fv2
VGiJitgCDN5l1fz7ygZkpO4ASsXIG/uxbxettgmpJ2KJs8x5fIJMqGMZ8t04R45g
qXkypXx1fdweRhR/WcAI8UafRcG7AY0IxU/8bWEcp0FOR5QarBrF0lt8L9YnTooG
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
ux1nzjpk6S2yebqk4I9k9+9HLjXDb7jqCBh3ew==
-----END AGE ENCRYPTED FILE-----
```

{{< /details >}}

## Mac App Sandbox 白名单路径 (application.sb)

```
/Applications/sing-box.app/  -  io.nekohasekai.sfavt  -  com.apple.security.app-sandbox
/Library/Application Support/<任意子目录>/  <- 首选
~/Library/Application Scripts/group.io.nekohasekai.sfavt/
~/Library/Application Scripts/io.nekohasekai.sfavt/
~/Library/Application Scripts/io.nekohasekai.sfavt.extension/
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
