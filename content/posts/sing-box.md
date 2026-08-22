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
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHNjcnlwdCA5WXNPUUhhZWhFaXFzdzNT
bUJjaXZnIDE4CmNxay9ENXE4WTFMWmZmZllqODZWTVN6UnNPUXM5dHNUd2VkbTdB
eGE0RWMKLS0tICtCblJlV1h3cjdnOUZrbFZkRGRTaFV2Zm5oOE5FYXFUaEFxaXov
N0NQN1EKwnlNw0KW+Oue3BHcQkzX1p7IXGvCeiVKGyOa5lpgCpLdvW/eiXnt+ylE
+jMZxOfHN8AtoRAvTQ5NxBHyiSc3jsDMQlR5uF8PrRBbnBahXs+fLMY3IYqrIohG
MIoX05Wleuvl42QD3pnkGB06+02Of4Pw3L2o5DnjjXiRy9rmqB13/i49yr3Xsy14
qtFdHtyYzzgzsmiNwB/0Esv1GtVzREaq7zqt2E990yPaDlfoLDVS1aTcV8y8kLQM
ILwF4MwQshTA1ztFa4RM2OZBXypUtXxwFB8oFOKzpFyman8YZAjTDq5/jdS6L8sC
R75O9HTLmKx0NSwnqKo4SZ/ksZ06r8cWHsvj//V8mcfbhMUVr3cTex6ZwEDghioG
h1ONthRBdWYYnDfzqE0lDkJ+pz+lhbLjfX3IKjvzFWoePk1hU9+DLxxUuEvrtiX0
cFu+wDKawtAk5glUcRienFPVQDWFMsx2i+3WtXj3kHqiEw2pExAGJXXGX4H1WRBj
NYtJ74NqHUIzcifUlmXM2OYkSv3p2NGCIxs18L1tOXc9ul4GOq5ro6kZDvto11sG
lc2QN4LqadDoLv+Ycf6oYQyrQrDf4lHoL1Mfw4uVfjXYeMurEZl6mlVU/4VD3dR0
viZ7DRIQJxKvb4pPkYzvtgwUPN57Ekh+TEBal+/pdHn7aXCHZeozYScoDTEK/eBn
IOQpEhnE7qrdgKYW1kuvMB5wmRL7HaWNeSllZsZSXJrip1LFY05SL5K4ENr6qRS0
8ANqDYYXcnLjfxeArJXzeN6v5EbdOd+mF1ZRUSruN2xONCAw209+vr1P3dg2aQtR
vqOnPUI8be1ayUy1RTSNkx+jM2wZhMQ5WZIso6EQOHLZYkWmUZGtZehcG6LOY2Wj
wZ1c+qoQiBiDxHrvSQ3FQ5R1WyQOWSDW+9x9MyrbY6ies2BiWu9zdCr/1VHJLpRF
wWs/hYqsc2U1WBRxBkiMKok90i/Pb/lG/a4E6Brv4VzwlWUJLBHwoLNU3HxIYZrn
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
OJ8oD53yxcKaMxc7GIb2OEO+yCIka3DBXyjh
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
