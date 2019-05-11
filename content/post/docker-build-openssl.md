---
author: XhstormR
categories:
- Notes
date: 2019-05-10T09:19:26+08:00
title: 构建 OpenSSL
---

<!--more-->

Updated on 2019-05-10

> [OpenSSL](https://www.openssl.org/source/)

## Step
```bash
docker pull gcc:latest

curl https://www.openssl.org/source/openssl-1.1.1b.tar.gz | tar -xz && cd openssl-1.1.1b

docker run --rm -v `pwd`:`pwd` -w `pwd` gcc:latest sh -c 'mkdir build && cd build && ../config no-deprecated no-shared no-tests -static --prefix=`pwd`/123 && make install_sw'
```
