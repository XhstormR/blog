---
author: XhstormR
categories:
- Notes
date: 2017-09-21T20:01:46+08:00
title: 构建 botan
---

<!--more-->

Updated on 2017-09-21

> [gcc](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/7.1.0/threads-posix/seh/)
>
> [git](https://github.com/git-for-windows/git/releases/latest)
>
> [python](https://www.python.org/ftp/python/3.6.3/python-3.6.3-embed-amd64.zip)
>
> [botan](https://github.com/randombit/botan/archive/master.zip)

## Step
```bash
D:\Work\Download\botan-master>

python configure.py --cc=gcc --os=mingw --link-method=copy
mingw32-make -j8

botan.exe rng 25
```

## Reference
* [cli](https://botan.randombit.net/manual/cli.html)

[{{< image "/uploads/file-into-picture2.png" "" "0" "0" >}}](http://ww4.sinaimg.cn/large/a15b4afegy1fjsksn4s1kj203k03k7wh)
