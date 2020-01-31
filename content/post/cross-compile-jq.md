---
author: XhstormR
categories:
- Notes
date: 2020-01-31T20:14:56+08:00
title: 交叉编译 jq
---

<!--more-->

Updated on 2020-01-31

> [jq](https://github.com/stedolan/jq)

## Step
```bash
docker pull parrotsec/security:latest
docker run -it --rm -v `pwd`:`pwd` -w `pwd` parrotsec/security

echo deb https://mirrors.tuna.tsinghua.edu.cn/parrot/ rolling main contrib non-free > /etc/apt/sources.list.d/parrot.list
apt update && apt -y install mingw-w64 make libtool flex bison

git clone --depth 1 --recurse-submodules -j2 https://github.com/stedolan/jq.git
cd jq ; mkdir build ; cd build

autoreconf -fi ..
../configure --with-oniguruma=builtin --disable-shared --enable-static --enable-all-static CFLAGS='-s -Os' LDFLAGS='-static' --host='x86_64-w64-mingw32' && make
```

```bash
yum -y install mingw64-gcc
or
apt -y install mingw-w64

x86_64-w64-mingw32-gcc-win32 -s -Os -static 123.c
```
