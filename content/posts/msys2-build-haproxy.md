---
author: XhstormR
tags:
- Notes
date: 2020-02-21T23:20:13+08:00
title: 构建 HAProxy
---

<!--more-->

Updated on 2020-02-21

> https://github.com/haproxy/haproxy
>
> [MSYS2](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.tar.xz)
>
> [HAProxy](https://mirror.azure.cn/haproxy/2.1/src/haproxy-2.1.3.tar.gz)

## Step
```bash
D:\Work\Download\haproxy-2.1.3>

pacman -Syu
pacman -S --noconfirm --needed gcc make

make TARGET=cygwin USE_THREAD=1 CFLAGS='-s -Os' LDFLAGS='-static'
strip -sv haproxy.exe
```

## 端口复用
```bash
global
    daemon

defaults
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms

frontend main
    bind *:1025

    use_backend ssh if { req.payload(0,3) -m bin 535348 }
    use_backend socks if { req.payload(0,3) -m bin 050100 050200 050300 }

    default_backend http

backend http
    server default 127.0.0.1:80

backend ssh
    server default 127.0.0.1:22

backend socks
    server default 127.0.0.1:1080
```

## 端口转发
```bash
Linux Iptables:
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 1025

Windows Netsh:
netsh interface portproxy show all
netsh interface portproxy add v4tov4 listenport=80 connectport=1025 connectaddress=127.0.0.1
netsh interface portproxy delete v4tov4 listenport=80
```

## Reference
* https://mirror.azure.cn/haproxy/2.1/doc/configuration.txt
* [SOCKS5 RFC](https://www.ietf.org/rfc/rfc1928.html)
