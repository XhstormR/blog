+++
Categories = ["Notes"]
date = "2016-04-21T21:58:45+08:00"
title = "Aria2 Configuration"

+++

<!--more-->

Updated on 2016-04-23

> https://aria2.github.io/
>
> aria2 is a lightweight multi-protocol & multi-source command-line download utility. It supports HTTP/HTTPS, FTP, SFTP, BitTorrent and Metalink. aria2 can be manipulated via built-in JSON-RPC and XML-RPC interfaces.The next generation download utility.
>
> 我把我自定义的 Aria2 整理在这里，以便查阅。

```
dir=D:\Download
disk-cache=32M
enable-mmap=true
max-mmap-limit=2048M
file-allocation=falloc
continue=true
max-concurrent-downloads=3
max-connection-per-server=5
min-split-size=10M
split=10
disable-ipv6=true
input-file=aria2.session
save-session=aria2.session
save-session-interval=60
force-save=true
enable-rpc=true
rpc-listen-all=true
rpc-allow-origin-all=true
rpc-secret=123456
bt-enable-lpd=true
follow-torrent=true
http-no-cache=true
check-certificate=false
referer=http://pan.baidu.com/disk/home
user-agent=netdisk;5.3.4.5;PC;PC-Windows;5.1.2600;WindowsBaiduYunGuanJia
seed-time=0
max-overall-upload-limit=10K
```