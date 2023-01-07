---
author: XhstormR
categories:
- Android
date: 2019-12-17T10:34:56+08:00
title: TWRP Magisk EdXposed
---

<!--more-->

Updated on 2019-12-17

>

## ADB
```bash
https://dl.google.com/android/repository/repository2-1.xml

curl -k https://dl.google.com/android/repository/platform-tools_r29.0.1-windows.zip | busybox unzip -
```

## Bootloader Driver
```bash
https://dl.google.com/android/repository/addon2-1.xml

curl -k https://dl.google.com/android/repository/usb_driver_r12-windows.zip | busybox unzip -
```

## TWRP
* Redmi 6: https://dl.twrp.me/cereus/
* OnePlus 5: https://dl.twrp.me/cheeseburger_dumpling/

```bash
adb devices -l
adb reboot bootloader

fastboot devices -l
fastboot oem unlock
fastboot flash recovery twrp.img
fastboot reboot bootloader
```

## Magisk
* https://github.com/topjohnwu/Magisk/releases/latest

```bash
fastboot flash boot magisk_patched-25200_OIUkx.img # patched boot.img
fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img
fastboot reboot
```

## EdXposed (Deprecated)
* https://github.com/RikkaApps/Riru/releases/latest
* https://github.com/ElderDrivers/EdXposed/releases/latest
* https://github.com/ElderDrivers/EdXposedManager/releases/latest

```bash
adb push Magisk-v20.3.zip magisk-riru-core-v19.7.zip EdXposed-YAHFA-v0.4.6.1.4510.zip /sdcard/Download/

adb install -r EdXposedManager-4.5.4-45401-org.meowcat.edxposed.manager-release.apk
```

## LSPosed
* https://github.com/LSPosed/LSPosed/releases/latest
* https://github.com/LSPosed/LSPosed.github.io/releases

## Non-root
* https://github.com/twoyi/twoyi
* https://github.com/taichi-framework/TaiChi


## Stock ROM

### Motorola Edge S pro
PSTAR XT2153-1

* https://mirrors.lolinet.com/firmware/motorola/pstar/official/RETAIL/PSTAR_RETAIL_12_S1RAS32.41-20-16-9_subsidy-DEFAULT_regulatory-DEFAULT_CFC.xml.zip

## Reference
* https://topjohnwu.github.io/Magisk/install.html
* https://kfhost.net/flashfile
