---
author: XhstormR
tags:
  - IDEA
date: 2018-07-14T16:12:08+08:00
title: IntelliJ IDEA JVM 设置
---

<!--more-->

Updated on 2018-07-14

>

- `-Xms`: JVM 初始堆内存大小。
- `-Xmx`: JVM 最大堆内存大小。

```ini
-server
-Xms3g
-Xmx3g
-Xverify:none
-XX:+UseG1GC
```

## Reference

- https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html
