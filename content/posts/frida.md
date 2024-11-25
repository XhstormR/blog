---
author: XhstormR
categories:
- Frida
date: 2019-05-29T11:22:56+08:00
title: Frida
---

<!--more-->

Updated on 2019-05-29

> https://frida.re/docs/javascript-api/#java

## Python
```bash
https://npm.taobao.org/mirrors/python

md 123 && ^
curl -kL https://npm.taobao.org/mirrors/python/3.7.5/python-3.7.5-embed-amd64.zip | busybox unzip - -d 123 && ^
cd 123 && ^
curl -k https://raw.githubusercontent.com/pypa/get-pip/master/get-pip.py | python - "--index-url=https://mirrors.aliyun.com/pypi/simple/" && ^
busybox sed -i "s/#import/import/" python37._pth
```

## Frida
```bash
https://github.com/frida/frida/releases/latest

# Install from Wheel
python -m pip install --index-url=https://mirrors.aliyun.com/pypi/simple/ --upgrade frida-tools
# Install from Egg
wget https://mirrors.aliyun.com/pypi/packages/ab/44/eda688668b780277cc7f9306f02c3dea41d95f91f2404493ddf00b96187f/frida-14.2.2-py3.8-win-amd64.egg -P C:/Users/leo/
python -m easy_install --index-url=https://mirrors.aliyun.com/pypi/simple/ --upgrade frida-tools
```

## ADB
```bash
https://dl.google.com/android/repository/repository2-1.xml

curl -k https://dl.google.com/android/repository/platform-tools_r29.0.1-windows.zip | busybox unzip -
```

## Setup
```bash
adb devices -l
adb push D:/Download/frida-server /data/local/tmp/
adb shell "getprop ro.product.cpu.abi"
adb shell "chmod 755 /data/local/tmp/frida-server"
adb shell "su -c /data/local/tmp/frida-server -D -l 0.0.0.0"

frida-ps -U
```

---

```bash
frida -U com.example.leo.myapplication -l 123.js --runtime=v8
```

```javascript
Java.perform(function () {
    Java.enumerateClassLoaders({
        onMatch: function (loader) {
            console.log(loader)
        },
        onComplete: function () {
            console.log('------')
        }
    })

    Java.enumerateLoadedClasses({
        onMatch: function (className) {
            if (className.includes('com/example')) {
                console.log(className)
            }
        },
        onComplete: function () {
            console.log('------')
        }
    })

    var TargetClass = Java.use('com.example.leo.myapplication.MainActivity')
    TargetClass.isModuleActive.implementation = function () {
        console.log('isModuleActive')
        return this.isModuleActive()
    }
})
```

```javascript
const loging = (input, kwargs) => {
    kwargs = kwargs || {}
    let level = kwargs['l'] || 'log'
    let indent = kwargs['i'] ? 2 : null
    if (typeof input === 'object') {
        input = JSON.stringify(input, null, indent)
    }
    console[level](input)
}

const printStackTrace = () => {
    let log = Java.use('android.util.Log')
    let exception = Java.use('java.lang.Exception')
    loging(log.getStackTraceString(exception.$new()), { l : 'warn' })
}

const unique = arr => Array.from(new Set(arr))

const traceClass = className => {
    let clazz = Java.use(className)

    let methods = clazz.class.getDeclaredMethods().map(method => method.getName())

    unique(methods).forEach(methodName => traceMethod(className, methodName))
}

const traceMethod = (className, methodName) => {
    let clazz = Java.use(className)

    let targetClassMethod = className + '.' + methodName
    loging(targetClassMethod)

    for (const method of clazz[methodName].overloads) {
        method.implementation = function() {
            let log = { 'method' : targetClassMethod, args : [] }

            for (const argument of arguments) {
                log.args.push(argument)
            }

            let ret = method.apply(this, arguments)
            log.ret = ret
            loging(log, { i : false })
            printStackTrace()
            return ret
        }
    }
}

const hooks = [
    { class : 'javax.crypto.Cipher', method : 'doFinal' },
    { class : 'com.wonders.common.utils.e', method : null },
    { class : 'com.wonders.common.utils.o', method : null },
    { class : 'com.wonders.account.utils.e', method : null },
    { class : 'com.wonders.account.utils.a', method : null },
]

Java.perform(() => {
    Java.enumerateLoadedClasses({
        onMatch : className => {
            for (const hook of hooks) {
                if (hook.class.includes(className)) {
                    hook.method ? traceMethod(hook.class, hook.method) : traceClass(hook.class)
                }
            }
        },
        onComplete : () => console.log('------')
    })
})

console.log('------')
```

## Reference
* https://github.com/hluwa/frida-dexdump
* https://github.com/FrenchYeti/dexcalibur
* https://github.com/dweinstein/awesome-frida
* https://github.com/iddoeldor/frida-snippets
* https://github.com/deathmemory/FridaContainer
* https://github.com/deathmemory/fridaRegstNtv
* https://www.npmjs.com/package/@types/frida-gum
  * https://cdn.npm.taobao.org/@types/frida-gum/-/@types/frida-gum-16.2.1.tgz
