---
author: XhstormR
tags:
  - Reverse
date: 2017-12-07T14:54:55+08:00
title: 逆向 DBeaver
---

<!--more-->

Updated on 2018-03-15

> {{< image "uploads/dbeaver.png" "DBeaver" "1" "1" "325" >}}
>
> https://dbeaver.com/files/dbeaver-ee-latest-win32.win32.x86_64.zip

## Step

1. 反编译 org.jkiss.lm_1.0.17.jar。
2. 搜索 **`hasProductLicense`**，定位至 `LMLicenseManager.class`。
3. 修改方法 `hasProductLicense` 的返回值为 **`true`**。

## Code

```
通过修改字节码：
iconst_1
ireturn

通过修改 16 进制代码：
04 AC 03 AC
    ⬇️
04 AC 04 AC
```

```
jar -cfM org.jkiss.lm_1.0.17.jar -C org.jkiss.lm_1.0.17/ .
```

```
echo hasProductLicense | busybox xxd
```

[{{< image "uploads/file-into-picture2.png" "5.0.1" "0" "0" >}}](https://i.loli.net/2018/03/15/5aaa83d430291.png)
