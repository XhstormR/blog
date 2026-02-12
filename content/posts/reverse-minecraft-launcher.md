---
author: XhstormR
tags:
  - Reverse
date: 2017-08-08T11:40:35+08:00
title: 逆向 Minecraft Launcher
---

<!--more-->

Updated on 2017-08-08

> {{< image "uploads/reverse-minecraft-launcher.png" "Minecraft" "1" "1" >}}
>
> [https://s3.amazonaws.com/Minecraft.Download/launcher/launcher.pack](https://s3.amazonaws.com/Minecraft.Download/launcher/launcher.pack.lzma)

## Step

1. 提取　 launcher.jar。
2. 反编译 launcher.jar。
3. 搜索 **`--demo`**，定位至 `net.minecraft.launcher.game.MinecraftGameRunner.class`。
4. 移除 `launchGame()` 方法中的 **`--demo`** 参数。
5. 删除 `META-INF` 目录中的 **`MOJANGCS.SF`** 文件。
6. 清空 `META-INF` 目录中的 **`MANIFEST.MF`** 文件中的多余内容。

## Code

```
7zr.exe x launcher.pack.lzma -y

unpack200.exe launcher.pack launcher.jar
```

```
ldc "--demo"
↓
ldc ""
```

```
jar -cfM launcher.jar -C launcher/ .
```

```
java -noverify -jar launcher.jar
```

## Reference

- https://docs.oracle.com/javase/8/docs/technotes/tools/windows/pack200.html
- https://docs.oracle.com/javase/8/docs/technotes/tools/windows/unpack200.html

[{{< image "uploads/file-into-picture2.png" "1.12.1" "0" "0" >}}](http://ww4.sinaimg.cn/large/a15b4afely1fich3epj1bj203k03knpf)
