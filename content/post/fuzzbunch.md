---
author: XhstormR
categories:
- Notes
date: 2017-12-17T19:36:42+08:00
title: FuZZbuNch
---

<!--more-->

Updated on 2017-12-17

> [https://sourceforge.net/projects/pywin32/files/pywin32](https://sourceforge.net/projects/pywin32/files/pywin32/Build%20221/pywin32-221.win32-py2.6.exe/download)
>
> https://www.python.org/ftp/python/2.6.6/python-2.6.6.msi
>
> https://github.com/fuzzbunch/fuzzbunch/archive/master.zip

## Concept
* 目标地址：RHOST（Remote Host）
* 监听地址：LHOST（Listener Host）

## Step
```bash
123.reg
pywin32-221.win32-py2.6.exe

set PYTHONHOME=D:\Download\python
set PATH=%PATH%;%PYTHONHOME%
set PYTHONPATH=%PYTHONHOME%\Lib

cd fuzzbunch-master
md listeningposts
python fb.py

python start_lp.py
```

```
123.reg
⇳
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\SOFTWARE\Python]

[HKEY_CURRENT_USER\SOFTWARE\Python\Pythoncore]

[HKEY_CURRENT_USER\SOFTWARE\Python\Pythoncore\2.6]

[HKEY_CURRENT_USER\SOFTWARE\Python\Pythoncore\2.6\InstallPath]
@="D:\\Download\\python"

[HKEY_CURRENT_USER\SOFTWARE\Python\Pythoncore\2.6\PythonPath]
@="D:\\Download\\python;D:\\Download\\python\\Lib\\;D:\\Download\\python\\DLLs\\"
```

## Reference
* http://bobao.360.cn/learning/detail/3743.html
* https://danderspritz.com/
* https://github.com/nixawk/Equation_Group_Hacking_Tools/issues/2
* [https://github.com/rapid7/metasploit-framework/wiki/How-to-use-a-reverse-shell](https://github.com/rapid7/metasploit-framework/wiki/How-to-use-a-reverse-shell-in-Metasploit)
* [https://github.com/rapid7/metasploit-payloads/blob/master/java/javapayload](https://github.com/rapid7/metasploit-payloads/blob/master/java/javapayload/src/main/java/metasploit/Payload.java)
