---
author: XhstormR
categories:
- Frida
date: 2019-11-07T14:04:44+08:00
title: Frida Gadget
---

<!--more-->

Updated on 2019-11-07

> https://www.frida.re/docs/gadget/

## Put
```
Src Path:
code\app\src\main\jniLibs\armeabi-v7a\libfrida-gadget.so

Bin Path:
apk\lib\armeabi-v7a\libfrida-gadget.so
```

## Load
```
Java:
System.loadLibrary("frida-gadget");

Smali:
const-string v0, "frida-gadget"
invoke-static {v0}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V
```

## Connect
```bash
frida -U Gadget -l 123.js
```

## Reference
* https://koz.io/using-frida-on-android-without-root/
