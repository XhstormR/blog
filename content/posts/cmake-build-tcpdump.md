---
author: XhstormR
tags:
  - Notes
date: 2018-10-13T13:47:42+08:00
title: 构建 tcpdump
---

<!--more-->

Updated on 2018-10-13

> [gcc](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-win32/seh/)
>
> [cmake](https://github.com/Kitware/CMake/releases/latest)
>
> [npcap SDK](https://nmap.org/npcap/dist/npcap-sdk-1.04.zip)
>
> [npcap DLL](https://nmap.org/npcap/dist/npcap-0.9987.exe)
>
> [tcpdump](https://github.com/the-tcpdump-group/tcpdump/archive/master.zip)

## Step

```bash
D:\Work\Download\tcpdump-master>

type nul > PreLoad.cmake
echo set(CMAKE_C_STANDARD 11 CACHE INTERNAL "" FORCE) > PreLoad.cmake
echo set(CMAKE_C_STANDARD_REQUIRED ON CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_C_FLAGS "-s -Os" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_EXE_LINKER_FLAGS "-static" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo. >> PreLoad.cmake
echo set(CMAKE_GENERATOR "MinGW Makefiles" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_INSTALL_PREFIX "456" CACHE PATH "" FORCE) >> PreLoad.cmake
echo set(PCAP_INCLUDE_DIR "D:/Download/npcap-sdk/Include" CACHE PATH "" FORCE) >> PreLoad.cmake
echo set(PCAP_LIBRARY "D:/Download/npcap-sdk/Lib/x64/wpcap.lib" CACHE PATH "" FORCE) >> PreLoad.cmake

md 123 && cd 123 && cmake .. && mingw32-make && mingw32-make install
```

## Reference

- https://www.tcpdump.org/manpages/tcpdump.1.html
- [npcap](https://github.com/nmap/npcap)
- [GCC Variadic Macros](https://gcc.gnu.org/onlinedocs/gcc/Variadic-Macros.html)
