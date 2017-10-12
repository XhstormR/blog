---
author: XhstormR
categories:
- Reverse
date: 2017-07-18T20:36:06+08:00
title: 逆向 Charles
---

<!--more-->

Updated on 2017-07-18

> {{< image "/uploads/reverse-charles0.png" "Charles" "1" "1" >}}
>
> https://www.charlesproxy.com/

## Step
1. 反编译 charles.jar。
2. 搜索 **`Unregistered`**，定位至 `gIbD.class`。
{{< image "/uploads/reverse-charles1.png" "" "1" "1" >}}
3. 修改属性 `PcqR` 的值为 **`true`**。
{{< image "/uploads/reverse-charles2.png" "" "1" "1" >}}
4. 修改方法 `PcqR` 的返回值为 **`XhstormR`**。
{{< image "/uploads/reverse-charles3.png" "" "1" "1" >}}

## Code
```
iconst_1
putfield com/xk72/charles/gIbD/PcqR Z
```

```
ldc "XhstormR"
areturn
```

```
jar -cfM charles.jar -C charles/ .
```

```
java -noverify -jar charles.jar
```

## Reference
* https://github.com/skylot/jadx
* https://github.com/java-decompiler/jd-gui
* https://github.com/Konloch/bytecode-viewer
* [https://github.com/JetBrains/intellij-community/tree/master/plugins](https://github.com/JetBrains/intellij-community/tree/master/plugins/java-decompiler/engine)
* https://set.ee/jbe/
  * https://github.com/ingokegel/jclasslib
  * https://github.com/apache/commons-bcel
* http://www.benf.org/other/cfr/index.html

[{{< image "/uploads/file-into-picture2.png" "4.1.4" "0" "0" >}}](http://ww4.sinaimg.cn/large/a15b4afely1fhpf98jnuxj203k03k4r4)