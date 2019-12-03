---
author: XhstormR
categories:
- Reverse
date: 2019-12-03T13:39:27+08:00
title: 逆向 Minecraft
---

<!--more-->

Updated on 2019-12-03

> {{< image "/uploads/reverse-minecraft-launcher.png" "Minecraft" "1" "1" >}}

## Tracing.aj
```java
package aop;

import java.lang.reflect.Field;

aspect Tracing {
    after() : initialization(dgh.b.new(..)) {
        try {
            Object target = thisJoinPoint.getTarget();
            Field field = target.getClass().getDeclaredField("a");
            field.setAccessible(true);
            field.setBoolean(target, false);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 编译
```bash
java -cp aspectjtools-1.9.1.jar;aspectjrt-1.9.1.jar; org.aspectj.tools.ajc.Main -d 123 -outxml -1.8 -Xlint:ignore Tracing.aj
jar -uf aspectjweaver-1.9.1.jar -C 123 .
```

## 运行
```bash
-javaagent:D:\Download\aspectjweaver-1.9.1.jar
```
