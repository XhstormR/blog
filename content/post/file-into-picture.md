---
categories:
- Notes
date: 2016-07-06T18:06:57+08:00
title: 将文件伪装成图片
---

<!--more-->

Updated on 2016-07-06

> {{< image "/uploads/file-into-picture.png" "File" "1" "1" >}}

CMD:
```
copy /b a.png + b.7z c.png
```

REG:
```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\Directory\Background\shell\在此处打开命令窗口]
"Icon"="C:\\Windows\\System32\\cmd.exe"
[HKEY_CLASSES_ROOT\Directory\Background\shell\在此处打开命令窗口\command]
@="cmd.exe /s /k pushd \"%V\""

Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\用 7z 打开]
"Icon"="D:\\Program Files\\7-Zip\\7zFM.exe"
[HKEY_CLASSES_ROOT\*\shell\用 7z 打开\command]
@="\"D:\\Program Files\\7-Zip\\7zFM.exe\" \"%1\""
```

RES:

![](/uploads/file-into-picture2.png)
