---
tags:
- Notes
date: 2016-04-21T21:58:45+08:00
title: Aria2 Configuration
---

<!--more-->

Updated on 2016-08-23

> [![](uploads/file-into-picture2.png)](https://i.loli.net/2018/02/08/5a7bcbdc94dec.png)
>
> https://github.com/aria2/aria2
>
> aria2 is a lightweight multi-protocol & multi-source command-line download utility. It supports HTTP/HTTPS, FTP, SFTP, BitTorrent and Metalink. aria2 can be manipulated via built-in JSON-RPC and XML-RPC interfaces.The next generation download utility.
>
> 我把我自定义的 Aria2 整理在这里，以便查阅。

```ini
dir=D:\Download
disk-cache=32M
enable-mmap=true
max-mmap-limit=2048M
file-allocation=falloc
continue=true
max-concurrent-downloads=3
max-connection-per-server=10
min-split-size=5M
split=10
disable-ipv6=true
input-file=aria2.session
save-session=aria2.session
save-session-interval=60
listen-port=51413
enable-dht=true
bt-enable-lpd=true
follow-torrent=true
http-no-cache=true
check-certificate=false
seed-time=0
max-overall-upload-limit=10K
remote-time=true
content-disposition-default-utf8=true
user-agent=Windows
referer=https://www.bilibili.com/
bt-tracker=udp://93.158.213.92:1337/announce,udp://45.154.253.7:6969/announce
enable-rpc=true
rpc-listen-all=true
rpc-allow-origin-all=true
rpc-secret=123456 # ws://token:123456@127.0.0.1:6800/jsonrpc
```

```
YAAW Header
⇳
Cookie: abcd
```

```
https://github.com/ngosang/trackerslist
----
curl https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best_ip.txt | busybox awk NF | busybox paste -d , -s > 123.txt
----
bt-tracker=udp://62.138.0.158:6969/announce,udp://188.241.58.209:6969/announce,udp://93.158.213.92:1337/announce,udp://80.209.252.132:1337/announce,udp://62.210.97.59:1337/announce,udp://151.80.120.112:2710/announce,udp://151.80.120.114:2710/announce,udp://165.231.0.116:80/announce,udp://208.83.20.20:6969/announce,udp://5.206.3.65:6969/announce,udp://89.234.156.205:451/announce,udp://35.156.19.129:6969/announce,udp://159.100.245.181:6969/announce,udp://37.235.174.46:2710/announce,udp://185.181.60.67:80/announce,udp://78.142.18.55:1337/announce,udp://78.142.18.61:6969/announce,udp://51.15.40.114:80/announce,udp://184.105.151.164:6969/announce,udp://176.113.71.19:6961/announce
```
