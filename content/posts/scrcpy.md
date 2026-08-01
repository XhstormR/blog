---
title: scrcpy
date: 2026-08-01T14:37:50+08:00
author: XhstormR
tags:
    -
---

<!--more-->

> https://github.com/Genymobile/scrcpy/releases/latest
>
> https://developer.android.google.cn/tools/adb
>
> https://dl.google.com/android/repository/repository2-1.xml

```bash
# 手机端: 开发者选项 → 启用无线调试（Wireless debugging） → 使用配对码配对
adb pair 192.168.1.110:37279 665580
adb devices -l
adb mdns services

scrcpy \
    --turn-screen-off \
    --power-off-on-close \
    --always-on-top \
    --show-touches \
    --stay-awake

# 手机作为网络摄像头麦克风
scrcpy \
    --audio-source=mic-voice-communication \
    --audio-codec=opus \
    --video-source=camera \
    --video-codec=h265 \
    --camera-facing=back
```
