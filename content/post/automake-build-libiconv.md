---
author: XhstormR
categories:
- Notes
date: 2018-02-14T13:46:24+08:00
title: 构建 libiconv
---

<!--more-->

Updated on 2018-02-14

> [gcc](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/7.2.0/threads-win32/seh/)
>
> [libiconv](https://ftp.gnu.org/pub/gnu/libiconv/?C=M;O=D)

## Step
```
D:\Work\Download\libiconv>

mkdir build ; cd build
../configure --enable-shared=no --enable-static=yes CFLAGS='-s -static -Os' && mingw32-make -j4
```
