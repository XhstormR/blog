---
author: XhstormR
categories:
- Notes
date: 2018-02-14T19:51:46+08:00
title: Bandicam Portable
---

<!--more-->

Updated on 2018-02-14

>

## Export
```bash
export.bat
⇳
@ reg export HKEY_LOCAL_MACHINE\SOFTWARE\BandiMPEG1 1.reg /y
@ reg export HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\BandiMPEG1 2.reg /y
@ reg export HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\BANDISOFT 3.reg /y

@ busybox cat 1.reg 2.reg 3.reg > 4.reg
@ iconv -f UTF-16 -t UTF-8 4.reg > 5.reg

@ busybox sed -i ^
-e "1 a Windows Registry Editor Version 5.00" ^
-e "/^Windows Registry Editor Version 5.00$/d" ^
-e "s/C:\\\\Program Files (x86)/D:\\\\Download\\\\Bandicam/g" ^
5.reg
@ echo [HKEY_CURRENT_USER\SOFTWARE\BANDISOFT\BANDICAM\OPTION] >> 5.reg
@ echo "sOutputFolder"="D:\\Download\\Data" >> 5.reg

@ busybox uniq 5.reg > 6.reg
@ busybox rm -rf 1.reg 2.reg 3.reg 4.reg 5.reg
```

## Import
```bash
import.bat
⇳
@ reg import D:\Download\6.reg
@ D:\Download\Bandicam\bdcam_nonadmin.exe
```

## Hosts
```bash
C:\Windows\System32\drivers\etc\hosts
⇳
0.0.0.0 bandicam.com
0.0.0.0 www.bandicam.com
0.0.0.0 ssl.bandicam.com
0.0.0.0 ssl.bandisoft.com
0.0.0.0 cert.bandicam.com
```

## Registry
```bash
6.reg
⇳
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\BandiMPEG1]
"ProgramFolder"="D:\\Download\\Bandicam\\BandiMPEG1"
"ProgramPath"="D:\\Download\\Bandicam\\BandiMPEG1\\bdfilters64.dll"

[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\BandiMPEG1]
"ProgramFolder"="D:\\Download\\Bandicam\\BandiMPEG1"
"ProgramPath"="D:\\Download\\Bandicam\\BandiMPEG1\\bdfilters.dll"

[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\BANDISOFT]

[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\BANDISOFT\BANDICAM]
"ProgramFolder"="D:\\Download\\Bandicam"
"ProgramPath"="D:\\Download\\Bandicam\\bdcam.exe"

[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\BANDISOFT\BANDICAM\OPTION]
"sCode"="636ac2272e644cf444313533886c1c90"
"sCode2"="cd0074885897d55c7e611c27ee16fe0ff13545103671943a89af23846b720c18629f979facf655f31c049ddbe7854c16809a03ff748d095c"
"sCode3"="dd86f7ec3e4f90e0f2477c5507aee735"
"sUserData"=hex(7):61,00,30,00,61,00,33,00,38,00,62,00,65,00,31,00,37,00,64,00,\
  32,00,38,00,61,00,64,00,33,00,62,00,36,00,61,00,64,00,64,00,64,00,61,00,62,\
  00,61,00,37,00,32,00,35,00,36,00,61,00,62,00,31,00,31,00,31,00,35,00,35,00,\
  30,00,32,00,34,00,37,00,31,00,62,00,63,00,31,00,65,00,64,00,65,00,34,00,61,\
  00,33,00,64,00,65,00,64,00,35,00,32,00,36,00,62,00,39,00,66,00,39,00,34,00,\
  30,00,31,00,35,00,37,00,00,00,00,00
"sUserInfo"=hex(7):37,00,39,00,33,00,34,00,31,00,37,00,33,00,61,00,32,00,33,00,\
  37,00,64,00,39,00,33,00,38,00,32,00,39,00,34,00,32,00,30,00,37,00,37,00,37,\
  00,62,00,64,00,66,00,64,00,38,00,35,00,38,00,37,00,37,00,30,00,65,00,36,00,\
  36,00,30,00,61,00,37,00,33,00,38,00,66,00,34,00,34,00,38,00,38,00,36,00,64,\
  00,66,00,62,00,35,00,31,00,66,00,62,00,61,00,32,00,38,00,37,00,39,00,38,00,\
  39,00,38,00,38,00,39,00,38,00,64,00,33,00,33,00,30,00,61,00,33,00,32,00,31,\
  00,63,00,66,00,32,00,32,00,61,00,32,00,33,00,36,00,65,00,39,00,61,00,32,00,\
  36,00,36,00,65,00,34,00,35,00,35,00,38,00,38,00,31,00,36,00,31,00,64,00,31,\
  00,31,00,62,00,31,00,34,00,62,00,36,00,31,00,61,00,33,00,62,00,36,00,64,00,\
  32,00,30,00,00,00,00,00
"tChecked"=dword:5a841d4f

[HKEY_CURRENT_USER\SOFTWARE\BANDISOFT\BANDICAM\OPTION]
"sOutputFolder"="D:\\Download\\Data"
```
