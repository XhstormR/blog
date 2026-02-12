---
author: XhstormR
tags:
  - Notes
date: 2020-03-15T00:14:57+08:00
title: 构建 Lua
---

<!--more-->

Updated on 2020-03-15

> https://www.lua.org/download.html

## Step

```bash
pacman -Syu
pacman -S --noconfirm --needed gcc make

curl -O https://www.lua.org/ftp/lua-5.4.0.tar.gz
tar zxf lua-5.4.0.tar.gz
cd lua-5.4.0
make posix install CC='x86_64-pc-msys-gcc'
```
