---
author: XhstormR
categories:
- Notes
date: 2018-02-18T17:27:36+08:00
title: 构建 libxml2
---

<!--more-->

Updated on 2018-02-18

> [gcc](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/7.2.0/threads-win32/seh/)
>
> [libxml2](https://github.com/GNOME/libxml2/archive/master.zip)

## Step
```bash
D:\Work\Download\libxml2-master\win32>

https://github.com/GNOME/libxml2/blob/master/win32/Makefile.mingw#L334
XML_BASENAME -> XML_NAME

cscript configure.js compiler=mingw static=yes xml_debug=no legacy=no iconv=no ftp=no http=no html=no modules=no reader=no writer=no walker=no c14n=no catalog=no docb=no
mingw32-make -f Makefile.mingw utils
```
