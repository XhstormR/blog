---
author: XhstormR
categories:
- Notes
date: 2017-09-01T20:21:40+08:00
title: 构建 jq
---

<!--more-->

Updated on 2017-09-01

> [gcc](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/7.2.0/threads-win32/seh/)
>
> [git](https://github.com/git-for-windows/git/releases/latest)
>
> [jq](https://github.com/stedolan/jq.git)

## Step
```
D:\Work\Download>

git clone --depth 1 --recurse-submodules --shallow-submodules -j2 https://github.com/stedolan/jq.git
cd jq ; mkdir build ; cd build

autoreconf -fi ..
../configure --with-oniguruma=builtin --enable-shared=no --enable-static=yes CFLAGS='-s -Os' LDFLAGS='-static' && make -j4
```

## Reference
* 依赖：
  * flex：[src](https://github.com/westes/flex/releases/latest) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/flex-2.6.4-1-x86_64.pkg.tar.xz)
  * bison：[src](https://ftp.gnu.org/gnu/bison/?C=M;O=D) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/bison-3.2.2-1-x86_64.pkg.tar.xz)
* 构建：
  * libtool：[src](https://ftp.gnu.org/gnu/libtool/?C=M;O=D) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/libtool-2.4.6-6-x86_64.pkg.tar.xz)
  * make：[src](https://ftp.gnu.org/gnu/make/?C=M;O=D) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/make-4.2.1-1-x86_64.pkg.tar.xz)
  * automake：[src](https://ftp.gnu.org/gnu/automake/?C=M;O=D) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/automake1.16-1.16.1-1-any.pkg.tar.xz)
      * autoconf：[src](https://ftp.gnu.org/gnu/autoconf/?C=M;O=D) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/autoconf-2.69-5-any.pkg.tar.xz)
          * m4：[src](https://ftp.gnu.org/gnu/m4/?C=M;O=D) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/m4-1.4.18-2-x86_64.pkg.tar.xz)
* 使用：https://www.ibm.com/developerworks/cn/linux/1612_chengg_jq/
