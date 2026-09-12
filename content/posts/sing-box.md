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
YWdlLWVuY3J5cHRpb24ub3JnL3YxCi0+IHNjcnlwdCBLODU2TDlWT3RxQUpMZWQx
cGt6RFJnIDE4ClJmeDRlTXI1OFR6SUVVai9iM0lYN0hXa3ErSDN2Y3RLTnlCUUQw
WVJKbzgKLS0tIDJOWjFjUHJ1YjBadFlKdTZVRXZKOWtibDdiSE94eWFnWFpBMExy
WUZIQ3cKmQLWOMzldnADfYhLPFz35Xb7vUz1OpZFaAySqAJFiTfYXc/8ys4Whnxw
0SwvjQWYz7Qgl/4hGI6smnnapkRzGNL5vvQyY2rjZpm2Tns1CY3TP8Vg3mr0W1kT
eaDlA3nx5QelrOTpKOqTcGxyvMYZ4RJ7ACu4UBagw97wX3vCpSLlzIFKAdHYzgpS
wR3u+Rs9HR1l4mEviTUEDWTMD4r4SZtTTKTKgNHIwYjqBTAxML5/f0GYTnQQXiu4
dCXeDQA2G6iP7CtxeOuGta9o5GXX0RDRwZvRD4ZYvfzr3iX4syZ7uT2f8E9LDXaJ
vzfKOltXOKEWVNIqCrMvHYSs1ezrsTC9eQVT+dSlndOM3aq+Hqx1t/SCkmQHiQJq
dQlReWT06bM9sWbnCMV6gMWjTAgUmn1fYslAxdMDuDmfISEeo5k5d5XXZOIZQrJo
LHfjSDYywCJppohrZ7eEP6y7HMYsV2m17ns/EWMwTSNx5dQ74noTqTNkaArBEqvJ
EctcN2s92MVekuWO4Yfb/zXYFo72gEUP9Zu0ztCjEjkbm8W4UCCc9MiujbsepxnX
sah410siWTOtmzW1ELmmD7k+SK/PcN2wIVjyuHWVDsAdqhTatkpTCCzayxcwbtMe
NNGF/0WyrHJWotXVzbwDMvX1wOKdgfQdx4DY4HFr7wFi+i23XaCkRQ2tUdreMroe
6iFj/6a8lNdeYKMcLDfgXhFvtqP7+boYbFSzLr7IENdSIewY6m/YPJBNciUtY+Mw
vAFsLgvyVWTqz2X1S40PNwSu/sL1UTuRCtx5TXY6tgehJodWUS0DfaNYxqIMQwoa
j1rY89Rp1NwVQoDnsAKLztFv/6V+WN1T+ArvFQ3CDu33OYRgzg6zDtazOSDd555k
wQaPikajlhFRO+pIjbSNRDClJnNd/i2E4kH6k543cM8NMOQsmABURhX9SDRvaagz
hvJ+uUzzjvrlzb97uFfOZGKE5lNwUFQi4flxEsy5gSO2t4CkJGd/UUnuwoEnL/06
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
XID2QyBzUoFM1Q434MfZD44V416CTcUcZw==
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
