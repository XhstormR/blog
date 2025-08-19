---
author: XhstormR
tags:
- Notes
date: 2017-08-31T14:01:08+08:00
title: 构建 cmark
---

<!--more-->

Updated on 2017-08-31

> [gcc](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/7.2.0/threads-win32/seh/)
>
> [cmake](https://github.com/Kitware/CMake/releases/latest)
>
> [cmark](https://github.com/commonmark/cmark/archive/master.zip)

## Step
```
D:\Work\Download\cmark-master>

type nul > PreLoad.cmake
echo set(CMAKE_C_STANDARD 11 CACHE INTERNAL "" FORCE) > PreLoad.cmake
echo set(CMAKE_C_STANDARD_REQUIRED ON CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_C_FLAGS "-s -Os" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_CXX_FLAGS "-s -Os" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_EXE_LINKER_FLAGS "-static" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo. >> PreLoad.cmake
echo set(CMAKE_GENERATOR "MinGW Makefiles" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_INSTALL_PREFIX "456" CACHE PATH "" FORCE) >> PreLoad.cmake

md 123 && cd 123 && cmake .. && mingw32-make && mingw32-make install

strip -sv -o 123.exe cmark.exe   #清除所有标记
objdump -p cmark.exe | more      #查看程序信息
ldd cmark.exe                    #查看动态链接库
```

## Reference
* [MinGW-W64](https://wiki.qt.io/MinGW-64-bit)
* [MinGW Generator](https://cmake.org/cmake/help/latest/generator/MinGW%20Makefiles.html)
* [CMake Documentation](https://cmake.org/cmake/help/latest/)
