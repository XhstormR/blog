---
author: XhstormR
categories:
- Notes
date: 2020-09-20T11:07:42+08:00
title: 构建 kcat
---

<!--more-->

Updated on 2020-09-20

> [cmake](https://github.com/Kitware/CMake/releases/latest)
>
> [kafkacat](https://github.com/edenhill/kafkacat/archive/master.zip)
>
> [librdkafka](https://github.com/edenhill/librdkafka/archive/master.zip)

## Step
```bash
D:\Work\Download\librdkafka-master>

type nul > PreLoad.cmake
echo set(CMAKE_C_STANDARD 11 CACHE INTERNAL "" FORCE) > PreLoad.cmake
echo set(CMAKE_C_STANDARD_REQUIRED ON CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_C_FLAGS "-s -Os" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_CXX_FLAGS "-s -Os" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_EXE_LINKER_FLAGS "-static" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo. >> PreLoad.cmake
echo set(CMAKE_GENERATOR "MinGW Makefiles" CACHE INTERNAL "" FORCE) >> PreLoad.cmake
echo set(CMAKE_INSTALL_PREFIX "456" CACHE PATH "" FORCE) >> PreLoad.cmake

md 123 && cd 123 && cmake .. -DWITH_SSL=OFF -DWITH_ZLIB=OFF -DRDKAFKA_BUILD_STATIC=ON && mingw32-make && mingw32-make install
```

```bash
D:\Work\Download\kafkacat-master>

pacman -S mingw-w64-x86_64-yajl

fd -t f -X busybox sed -i "s/_MSC_VER/_MY123/g"

gcc -s -Os -static kafkacat.c format.c tools.c json.c win32\getdelim.c -ID:\Download\librdkafka-master\123\456\include -LD:\Download\librdkafka-master\123\456\lib -lrdkafka -lws2_32 -lsecur32 -lzstd -lyajl_s -DLIBRDKAFKA_STATICLIB -D_MY123 -DENABLE_JSON
```
