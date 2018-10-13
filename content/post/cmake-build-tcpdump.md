---
author: XhstormR
categories:
- Notes
date: 2018-10-13T13:47:42+08:00
title: 构建 tcpdump
---

<!--more-->

Updated on 2018-10-13

> [gcc](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-win32/seh/)
>
> [cmake](https://cmake.org/files/LatestRelease/cmake-3.12.3-win64-x64.zip)
>
> [npcap SDK](https://nmap.org/npcap/dist/npcap-sdk-1.01.zip)
>
> [npcap DLL](https://nmap.org/npcap/dist/npcap-0.99-r7.exe)
>
> [tcpdump](https://github.com/the-tcpdump-group/tcpdump/archive/master.zip)

## Step
```bash
D:\Work\Download\tcpdump-master>

https://github.com/the-tcpdump-group/tcpdump/blob/master/netdissect-stdinc.h#L332
__VA_ARGS__ -> ## __VA_ARGS__

type nul > PreLoad.cmake
echo set(CMAKE_C_STANDARD 11 CACHE INTERNAL "" FORCE) > PreLoad.cmake
echo set(CMAKE_C_STANDARD_REQUIRED ON CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_C_FLAGS "-s -static -Os -Wall" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo. >> PreLoad.cmake
echo set(CMAKE_GENERATOR "MinGW Makefiles" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_INSTALL_PREFIX "456" CACHE PATH "" FORCE) >> PreLoad.cmake
echo set(PCAP_INCLUDE_DIR "D:/Download/npcap-sdk/Include" CACHE PATH "" FORCE) >> PreLoad.cmake
echo set(PCAP_LIBRARY "D:/Download/npcap-sdk/Lib/x64/wpcap.lib" CACHE PATH "" FORCE) >> PreLoad.cmake

md 123 && cd 123 && cmake .. && mingw32-make && mingw32-make install
```

## Reference
* [npcap](https://github.com/nmap/npcap)
* [GCC Variadic Macros](https://gcc.gnu.org/onlinedocs/gcc/Variadic-Macros.html)
