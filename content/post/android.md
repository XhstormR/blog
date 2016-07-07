+++
Categories = ["Android"]
date = "2016-07-04T19:30:21+08:00"
title = "自学 Android"

+++

<!--more-->

Updated on 2016-07-05

> ![](/uploads/android.svg "Android")
>
> https://developer.android.com/index.html

## 开发环境
* IntelliJ IDEA：https://www.jetbrains.com/idea/download/
  * ~~[Eclipse](https://eclipse.org/downloads/eclipse-packages/) + [ADT](https://developer.android.com/studio/tools/sdk/eclipse-adt.html) 已被 Google 弃用~~
* Android SDK：https://developer.android.com/studio/index.html#win-tools2
  * Mirror：http://mirrors.neusoft.edu.cn/android/
  * Gradle：https://services.gradle.org/distributions/
      * GRADLE_HOME ➜ D:\Download\Java\gradle-2.14
      * PATH ➜ %GRADLE_HOME%\bin
* JDK：http://www.oracle.com/technetwork/java/javase/downloads/index.html

### 新建 Android 项目卡住
IDEA 的 Android 构建工具是 Gradle，新建项目时会联网下载对应版本的 Gradle 和 Cache。

Gradle：![](/uploads/android-gradle.png)

Cache：![](/uploads/android-cache.png)

## USB 调试
* 手机开启 USB 调试模式
* 电脑安装 Android USB 驱动

```
D:\Download\Java\android-sdk-windows\platform-tools\adb.exe devices -l
List of devices attached
0123456789ABCDEF       device product:2013023 model:2013023 device:HM2013023
```

---

Cache：
[![](/uploads/file-into-picture2.png)](http://ww1.sinaimg.cn/large/a038ef72gw1f5lcbds6wvj203k03k1lf "Part1")
[![](/uploads/file-into-picture2.png)](http://ww3.sinaimg.cn/large/a038ef72gw1f5lcbrppq1j203k03ku19 "Part2")
Android USB Driver：
[![](/uploads/file-into-picture2.png)](http://ww4.sinaimg.cn/large/a15b4afegw1f5l3t68pezj203k03k4qw)
