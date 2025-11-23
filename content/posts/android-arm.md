---
author: XhstormR
tags:
- Android
date: 2020-11-26T17:11:51+08:00
title: Android 模拟器启用 ARM 支持
---

<!--more-->

Updated on 2020-11-26

>

## AnBox
* https://docs.anbox.io/userguide/install.html
* https://github.com/geeks-r-us/anbox-playstore-installer

## Android-x86
* https://mirrors.bfsu.edu.cn/osdn/android-x86/67834/android-x86_64-7.1-r4-k419.iso
* https://github.com/Rprop/libhoudini
* https://www.cnblogs.com/gao241/archive/2013/03/11/2953669.html

```
在 BIOS 界面选择 Debug 模式，之后：
vi /mnt/grub/menu.lst
----
在第一个 quiet 之后追加 nomodeset

curl http://dl.android-x86.org/houdini/7_y/houdini.sfs -o /system/etc/houdini7_y.sfs
curl http://dl.android-x86.org/houdini/7_z/houdini.sfs -o /system/etc/houdini7_z.sfs
enable_nativebridge

之后到设置->应用兼容性->兼容模式->启用
```

```
Alt+F1 = Console 模式
Alt+F7 = GUI 模式

adb connect 192.168.157.169
adb root
```

## Reference
* https://www.zhihu.com/question/48522805
