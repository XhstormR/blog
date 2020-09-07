---
author: XhstormR
categories:
-
date: 2020-09-04T08:38:24+08:00
title: DLL Proxy
---

<!--more-->

Updated on 2020-09-07

>

## File

### proxy.c
```c
#include <windows.h>

BOOL WINAPI DllMain(HINSTANCE hinst, DWORD reason, LPVOID reserved) {
  switch (reason) {
  case DLL_PROCESS_ATTACH:
    WinExec("calc.exe", SW_HIDE);
    break;
  case DLL_THREAD_ATTACH:
  case DLL_THREAD_DETACH:
  case DLL_PROCESS_DETACH:
    break;
  }
  return TRUE;
}
```

### proxy.def
```
EXPORTS
NSLICENSE_DateToMagicCode = nslicense_old.NSLICENSE_DateToMagicCode
```

## Command

```bash
i686-w64-mingw32-gcc proxy.c -c -o proxy.o
dlltool proxy.o -e proxy.exp -z proxy.def -l proxy.lib --export-all-symbols
i686-w64-mingw32-gcc proxy.o proxy.def -shared -o proxy.dll
```

```bash
i686-w64-mingw32-gcc proxy.c -c -o proxy.o
gnatdll proxy.o -e proxy.def -d proxy.dll
```

```bash
i686-w64-mingw32-gcc proxy.c proxy.def -shared -o proxy.dll
```

```bash
gendef - nslicense.dll

strip -sv proxy.dll

busybox mv -f nslicense.dll nslicense_old.dll
busybox mv -f proxy.dll nslicense.dll
```

## Reference
* https://gcc.gnu.org/onlinedocs/gnat_ugn/Using-gnatdll.html
* https://sourceware.org/binutils/docs/ld/WIN32.html
* https://sourceware.org/binutils/docs/binutils/dlltool.html
* https://sourceware.org/binutils/docs/binutils/def-file-format.html
* https://docs.microsoft.com/zh-cn/cpp/build/reference/exports
