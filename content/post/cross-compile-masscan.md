---
author: XhstormR
categories:
- Notes
date: 2020-02-17T16:45:32+08:00
title: 交叉编译 masscan
---

<!--more-->

Updated on 2020-02-17

> [masscan](https://github.com/robertdavidgraham/masscan)

## Step
```bash
docker pull ubuntu:rolling
docker run -it --rm -v `pwd`:`pwd` -w `pwd` ubuntu:rolling

sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g;s/security.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
apt update && apt -y install gcc-mingw-w64 make curl unzip

curl -LO https://github.com/robertdavidgraham/masscan/archive/master.zip
unzip master.zip && cd masscan-master

find -type f -exec sed -i 's/WinSock.h/winsock.h/g;s/WinSock2.h/winsock2.h/g;s/Windows.h/windows.h/g' {} +
sed -i 's/-march=i686//g;s/CC = cc/CC = x86_64-w64-mingw32-gcc/g;s/lIPHLPAPI/liphlpapi/g;s/lWs2_32/lws2_32/g' Makefile
make
```
