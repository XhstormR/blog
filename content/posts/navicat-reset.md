---
title: Navicat Reset
date: 2023-06-27T12:58:54+03:00
author: XhstormR
tags:
-
---

<!--more-->

> Mac: https://download.navicat.com/download/navicat17_premium_cs.dmg
>
> Windows: https://download.navicat.com/download/navicat17_premium_cs_x64.exe

```shell
#!/bin/bash

#/usr/libexec/PlistBuddy -c 'Print' ~/Library/Preferences/com.navicat.NavicatPremium.plist
 /usr/libexec/PlistBuddy -c 'Delete :91F6C435D172C8163E0689D3DAD3F3E9' ~/Library/Preferences/com.navicat.NavicatPremium.plist
 /usr/libexec/PlistBuddy -c 'Delete :B966DBD409B87EF577C9BBF3363E9614' ~/Library/Preferences/com.navicat.NavicatPremium.plist

rm -rf ~/'Library/Application Support/PremiumSoft CyberTech/Navicat CC/Navicat Premium/'.*
```
