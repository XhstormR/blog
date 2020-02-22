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
docker pull ubuntu:rolling
docker run -it --rm -v `pwd`:`pwd` -w `pwd` ubuntu:rolling

sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g;s/security.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
apt update && apt -y install gcc-mingw-w64 make libtool flex bison git

git clone --depth 1 --recurse-submodules -j2 https://github.com/stedolan/jq.git
cd jq ; mkdir build ; cd build

autoreconf -fi ..
../configure --with-oniguruma=builtin --disable-shared --enable-static --enable-all-static CFLAGS='-s -Os' LDFLAGS='-static' --host='x86_64-w64-mingw32' && make
```

```bash
yum -y install mingw64-gcc
or
apt -y install gcc-mingw-w64

x86_64-w64-mingw32-gcc -s -Os -static 123.c
```

```
docker pull fedora
docker run -it --rm -v `pwd`:`pwd` -w `pwd` fedora

curl -o /etc/yum.repos.d/fedora.repo https://mirrors.aliyun.com/repo/fedora.repo
curl -o /etc/yum.repos.d/fedora-updates.repo https://mirrors.aliyun.com/repo/fedora-updates.repo
yum makecache
```

## Reference
* https://pkgs.org/download/mingw64-gcc
* https://pkgs.org/download/gcc-mingw-w64
