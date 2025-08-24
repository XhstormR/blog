---
author: XhstormR
tags:
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

curl -k https://dl.google.com/android/repository/platform-tools_r36.0.0-win.zip | busybox unzip -
```

## Bootloader Driver

- https://www.catalog.update.microsoft.com/Search.aspx?q=Google%20Android%20Bootloader%20Interface

```bash
https://dl.google.com/android/repository/addon2-1.xml

curl -k https://dl.google.com/android/repository/usb_driver_r13-windows.zip | busybox unzip -
```

## TWRP (Deprecated)

- Redmi 6: https://dl.twrp.me/cereus/
- OnePlus 5: https://dl.twrp.me/cheeseburger_dumpling/

```bash
adb devices -l
adb reboot bootloader

fastboot devices -l
fastboot oem unlock
fastboot flash recovery twrp.img
fastboot reboot bootloader
```

## Magisk

- https://topjohnwu.github.io/Magisk/install.html
- https://github.com/topjohnwu/Magisk/releases/latest

获取 Root 权限，不需要刷全量包，只需要解锁并刷入修改后的 Bootloader。优先级： init_boot.img > boot.img > recovery.img

```bash
fastboot flash init_boot magisk_patched-25200_OIUkx.img # patched init_boot.img
or
fastboot flash boot magisk_patched-25200_OIUkx.img # patched boot.img
or
fastboot flash recovery magisk_patched-25200_OIUkx.img # patched recovery.img

fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img
fastboot reboot
```

## EdXposed (Deprecated)

- https://github.com/RikkaApps/Riru/releases/latest
- https://github.com/ElderDrivers/EdXposed/releases/latest
- https://github.com/ElderDrivers/EdXposedManager/releases/latest

```bash
adb push Magisk-v20.3.zip magisk-riru-core-v19.7.zip EdXposed-YAHFA-v0.4.6.1.4510.zip /sdcard/Download/

adb install -r EdXposedManager-4.5.4-45401-org.meowcat.edxposed.manager-release.apk
```

## LSPosed

- https://github.com/LSPosed/LSPosed/releases/latest
- https://github.com/LSPosed/LSPosed.github.io/releases

## KernelSU

- https://github.com/tiann/KernelSU
- https://kernelsu.org/zh_CN/guide/installation.html#%E4%BD%BF%E7%94%A8%E7%AE%A1%E7%90%86%E5%99%A8

## Non-root

- https://github.com/twoyi/twoyi
- https://github.com/taichi-framework/TaiChi

## Stock ROM

### Motorola Edge S pro

PSTAR XT2153-1

- https://mirrors.lolinet.com/firmware/lenomola/2021/pstar/official/RETAIL/PSTAR_RETAIL_13_T1RAS33.55-15-10-6_subsidy-DEFAULT_regulatory-DEFAULT_cid50_CFC.xml.zip
    - flashfile.xml
        - https://github.com/dlenski/motoflash2sh
        - https://kfhost.net/flashfile

#### 更改 OTA 软件通道

```bash
adb devices -l
adb reboot bootloader

fastboot oem config carrier reteu
```

### OnePlus 13

PJZ110

- https://github.com/snowwolf725/OnePlus12-fw-repos/releases
- https://yun.daxiaamu.com/OnePlus_Roms/%E4%B8%80%E5%8A%A0OnePlus%2013/

#### payload.bin dumper

```bash
pip install git+https://github.com/5ec1cff/payload-dumper
payload_dumper --partitions init_boot,boot payload.bin
```

## Reference

- AOSP Enable Call Recording:
    - https://github.com/jacopotediosi/GAppsMod
    - https://github.com/chenxiaolong/BCR
- https://github.com/0x192/universal-android-debloater
- https://github.com/chiteroman/PlayIntegrityFix
- https://github.com/Dr-TSNG/Hide-My-Applist
