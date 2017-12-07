---
author: XhstormR
categories:
- Reverse
date: 2017-12-07T14:54:55+08:00
title: 逆向 DBeaver
---

<!--more-->

Updated on 2017-12-07

> {{< image "/uploads/dbeaver.png" "DBeaver" "1" "1" "325" >}}
>
> https://dbeaver.com/files/dbeaver-ee-latest-win32.win32.x86_64.zip

## Step
1. 反编译 org.jkiss.lm_1.0.17.jar。
2. 搜索 **`hasProductLicense`**，定位至 `LMLicenseManager.class`。
3. 修改方法 `hasProductLicense` 的返回值为 **`true`**。

## Code
```
iconst_1
ireturn
```

```
jar -cfM org.jkiss.lm_1.0.17.jar -C org.jkiss.lm_1.0.17/ .
```

[{{< image "/uploads/file-into-picture2.png" "4.2.0" "0" "0" >}}](http://ww4.sinaimg.cn/large/a15b4afegy1fm8fc49ep6j203k03kq3d)
