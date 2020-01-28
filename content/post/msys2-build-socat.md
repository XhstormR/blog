---
author: XhstormR
categories:
- Notes
date: 2020-01-28T21:49:39+08:00
title: 构建 socat
---

<!--more-->

Updated on 2020-01-28

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
