---
author: XhstormR
tags:
  - Notes
date: 2020-10-08T11:45:51+08:00
title: 构建 Redis
---

<!--more-->

Updated on 2020-10-08

> https://github.com/redis/redis
>
> [MSYS2](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.tar.xz)
>
> [Redis](https://github.com/redis/redis/archive/unstable.zip)

## Step

```bash
D:\Work\Download\redis-unstable>

pacman -Syu
pacman -S --noconfirm --needed gcc make

make CFLAGS='-s -Os -D_GNU_SOURCE' LDFLAGS='-static'
```

## Tool

- https://github.com/laixintao/iredis
- https://redislabs.com/redisinsight/
  - https://downloads.redisinsight.redislabs.com/latest/redisinsight-win.msi
