---
author: XhstormR
categories:
- Reverse
date: 2018-12-17T22:45:44+08:00
title: 逆向 JxBrowser
---

<!--more-->

Updated on 2018-12-17

> {{< image "/uploads/jxbrowser.jpg" "JxBrowser" "1" "1" "" >}}
>
> https://www.teamdev.com/jxbrowser

## Step
1. 反编译 lib/jxbrowser-6.22.1.jar。
2. 搜索 **`BigInteger`**，定位至 `bb.class`。
{{< image "/uploads/reverse-jxbrowser1.png" "" "1" "1" >}}
3. 修改方法 `b` 的返回值为 **`true`**。
{{< image "/uploads/reverse-jxbrowser2.png" "" "1" "1" >}}

## Code
```java
javap -c bb.class
----
输出：
public class com.teamdev.jxbrowser.chromium.bb {
...
  public final boolean b();
    Code:
       0: new           #25                 // class java/math/BigInteger
       3: dup
       4: aload_0
...
     147: getstatic     #39                 // Field d:Ljava/math/BigInteger;
     150: invokevirtual #86                 // Method java/math/BigInteger.modPow:(Ljava/math/BigInteger;Ljava/math/BigInteger;)Ljava/math/BigInteger;
     153: invokevirtual #84                 // Method java/math/BigInteger.equals:(Ljava/lang/Object;)Z
     156: istore_1
     157: iload_1
     158: ireturn
...
}
```

```
通过修改字节码：
iload_1
ireturn
    ⬇️
iconst_1
ireturn

通过修改 16 进制代码：
1B AC
    ⬇️
04 AC
```
