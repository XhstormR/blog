---
title: Patch SecureCRT + SecureFX Bundle
date: 2023-01-29T22:12:53+08:00
author: XhstormR
tags:
- Reverse
---

<!--more-->

> Mac 版本和 Windows 的注册机通用，Python 跨平台编译，搜索特征字符串进行替换。

* Bundle : [scrt-sfx-9.3.1-2929.macos_x64.dmg](https://www.vandyke.com/cgi-bin/releases.php?product=securecrt)
* Patcher: [xf-vdkkg.exe](https://www.m2v.ru/?id=2506445&func=sub&name=VANDYKE_SECURECRT_SECUREFX_BUNDLE_V8.5.3-XFORCE)
* License:
    ```txt
    Version: SecureCRT and SecureFX 9.3.1 (x64 build 2929)
    Name: X-FORCE
    Serial Number: 13-85-324670
    License Key: AC9TQJ 6TR1SE ZQ1AQ8 MBBGEM ADED1M E28774 QPQ8TJ NP3MQW
    Issue Date: 01-29-2023
    ```
* Config: `/Users/user/Library/Application Support/VanDyke/SecureCRT/`

## Patch

```bash
/Applications/SecureFX.app/Contents/MacOS/SecureFX
/Applications/SecureCRT.app/Contents/MacOS/SecureCRT
```

## Sign

```bash
codesign --force --deep --sign - /Applications/SecureCRT.app
codesign --force --deep --sign - /Applications/SecureFX.app
```

## Reference
* https://www.unix.com/man-page/osx/1/codesign/
