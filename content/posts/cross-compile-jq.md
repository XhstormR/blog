---
author: XhstormR
tags:
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

curl -o /etc/yum.repos.d/fedora.repo https://mirrors.cloud.tencent.com/repo/fedora.repo
curl -o /etc/yum.repos.d/fedora-updates.repo https://mirrors.cloud.tencent.com/repo/fedora-updates.repo
yum clean all
yum makecache

yum -y install https://mirrors.cloud.tencent.com/rpmfusion/free/fedora/rpmfusion-free-release-stable.noarch.rpm \
    https://mirrors.cloud.tencent.com/rpmfusion/nonfree/fedora/rpmfusion-nonfree-release-stable.noarch.rpm
cd /etc/yum.repos.d/
find -type f -exec sed -i 's/#baseurl/baseurl/g' {} +
find -type f -exec sed -i 's/metalink/#metalink/g' {} +
find -type f -exec sed -i 's@http://download1.rpmfusion.org/@https://mirrors.cloud.tencent.com/rpmfusion/@g' {} +

yum -y install https://mirrors.tuna.tsinghua.edu.cn/fzug/free/30/x86_64/fzug-release-30-0.1.noarch.rpm

yum -y install https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm

yum -y install java-latest-openjdk-devel.x86_64
```

## Reference

- https://pkgs.org/download/mingw64-gcc
- https://pkgs.org/download/gcc-mingw-w64
