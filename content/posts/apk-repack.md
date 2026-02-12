---
author: XhstormR
tags:
  - Reverse
date: 2020-04-22T11:20:33+08:00
title: APK 重打包
---

<!--more-->

Updated on 2020-04-22

> https://github.com/iBotPeaches/Apktool/releases/latest

```bash
java -jar apktool_2.4.1.jar d QuanYingTong.apk
java -jar apktool_2.4.1.jar b QuanYingTong
```

```bash
cd QuanYingTong\dist
keytool -genkeypair -keystore release.jks -storepass 123456 -alias release -keyalg RSA -dname "cn=123" -validity 365

jarsigner -keystore release.jks -storepass 123456 -signedjar QuanYingTong_signed.apk QuanYingTong.apk release
```
