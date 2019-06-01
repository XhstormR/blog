---
author: XhstormR
categories:
- Notes
date: 2019-05-29T11:22:56+08:00
title: Frida
---

<!--more-->

Updated on 2019-05-29

> https://www.frida.re/docs/javascript-api/

## Python
```bash
https://npm.taobao.org/mirrors/python

md 123 && ^
curl -kL https://npm.taobao.org/mirrors/python/3.7.3/python-3.7.3-embed-amd64.zip | busybox unzip - -d 123 && ^
cd 123 && ^
curl -k https://raw.githubusercontent.com/pypa/get-pip/master/get-pip.py | python - "--index-url=https://mirrors.aliyun.com/pypi/simple/" && ^
busybox sed -i "s/#import/import/" python37._pth
```

## Frida
```bash
https://github.com/frida/frida/releases/latest

python -m pip install --index-url=https://mirrors.aliyun.com/pypi/simple/ --upgrade frida-tools
```

## ADB
```bash
https://dl.google.com/android/repository/repository2-1.xml

curl -k https://dl.google.com/android/repository/platform-tools_r28.0.3-windows.zip | busybox unzip -
```

## Setup
```bash
adb devices -l
adb push D:/Download/frida-server /data/local/tmp/
adb shell "chmod 755 /data/local/tmp/frida-server"
adb shell "/data/local/tmp/frida-server &"

frida-ps -U
```

---

```bash
frida -U com.example.leo.myapplication -l 123.js
```

```javascript
Java.perform(function () {
    Java.enumerateLoadedClasses({
        onMatch: function (className) {
            if (className.match('com/example')) {
                console.log(className)
            }
        },
        onComplete: function () {
        }
    })

    var TargetClass = Java.use('com.example.leo.myapplication.MainActivity')
    TargetClass.isModuleActive.implementation = function () {
        console.log('isModuleActive')
        return this.isModuleActive()
    }
})
```

## Reference
* https://github.com/dweinstein/awesome-frida
