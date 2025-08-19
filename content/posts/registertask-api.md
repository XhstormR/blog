---
author: XhstormR
tags:
- security
date: 2019-10-04T17:46:10+08:00
title: Win32 RegisterTask API
---

<!--more-->

Updated on 2019-10-04

> https://docs.microsoft.com/zh-cn/windows/win32/api/taskschd/nf-taskschd-itaskfolder-registertask

```c++
#include <stdio.h>
#include <comdef.h>
#include <windows.h>
#include <taskschd.h>

BSTR _com_util::ConvertStringToBSTR(const char *ascii) {
  int len = strlen(ascii);
  BSTR bstr = SysAllocStringLen(NULL, len);
  mbstowcs(bstr, ascii, len);
  return bstr;
}

char *read() {
  FILE *file = fopen("123.xml", "rb");

  fseek(file, 0, SEEK_END);
  long fileSize = ftell(file);
  rewind(file);

  char *text = (char *)malloc(fileSize + 1);
  fread(text, sizeof(char), fileSize, file);
  text[fileSize] = 0;
  fclose(file);

  return text;
}

int main(int agrc, char *agrv[]) {
  CoInitializeEx(NULL, COINIT_MULTITHREADED);

  ITaskService *pService = NULL;
  CoCreateInstance(CLSID_TaskScheduler, NULL, CLSCTX_INPROC_SERVER,
                   IID_ITaskService, (void **)&pService);

  ITaskFolder *pRootFolder = NULL;
  pService->Connect(_variant_t(), _variant_t(), _variant_t(), _variant_t());
  pService->GetFolder(_bstr_t("\\Microsoft\\Windows\\MemoryDiagnostic"), &pRootFolder);
  pService->Release();

  IRegisteredTask *pRegisteredTask = NULL;
  char *text = read();
  HRESULT hr = pRootFolder->RegisterTask(
      _bstr_t("ProcessMemoryDiagnosticEvents"),
      _bstr_t(text),
      TASK_CREATE_OR_UPDATE,
      _variant_t(),
      _variant_t(),
      TASK_LOGON_SERVICE_ACCOUNT,
      _variant_t(),
      &pRegisteredTask
  );

  if (FAILED(hr)) {
    printf("Error saving the Task: %x", hr);
  } else {
    BSTR path;
    pRegisteredTask->get_Path(&path);
    printf("Path: %ls\n", path);

    double vtime;
    SYSTEMTIME stime;
    pRegisteredTask->get_NextRunTime(&vtime);
    VariantTimeToSystemTime(vtime, &stime);
    printf("NextRunTime: %d/%02d/%02d %02d:%02d:%02d\n", stime.wYear,
           stime.wMonth, stime.wDay, stime.wHour, stime.wMinute, stime.wSecond);

    pRegisteredTask->Release();
  }

  free(text);
  pRootFolder->Release();
  CoUninitialize();

  return 0;
}
```

```bash
g++ 123.c -ltaskschd -lole32 -loleaut32 -s -static

objdump -x a.exe | findstr DLL
```

## Reference
* https://github.com/qemu/qemu/blob/v4.1.0/qga/vss-win32/install.cpp#L485
