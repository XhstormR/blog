---
author: XhstormR
tags:
  - Reverse
date: 2020-01-05T21:30:48+08:00
title: JVM Class Dump
---

<!--more-->

Updated on 2020-01-05

>

## jhsdb

```bash
jps -lvm
jhsdb clhsdb --pid 1234
buildreplayjars app
```

## javassist

- https://maven.aliyun.com/repository/jcenter/org/javassist/javassist/3.26.0-GA/javassist-3.26.0-GA.jar

```bash
javac -cp javassist.jar -d 123 --release 8 ClassDump.java
jar -uf javassist.jar -C 123 .

-javaagent:javassist.jar
```

### ClassDump.java

```java
package instrument;

import javassist.ClassPool;

import java.io.ByteArrayInputStream;
import java.lang.instrument.ClassFileTransformer;
import java.lang.instrument.IllegalClassFormatException;
import java.lang.instrument.Instrumentation;
import java.security.ProtectionDomain;

public class ClassDump implements ClassFileTransformer {

    public static void premain(String agentOps, Instrumentation inst) {
        inst.addTransformer(new ClassDump());
    }

    @Override
    public byte[] transform(ClassLoader loader, String className, Class<?> classBeingRedefined, ProtectionDomain protectionDomain, byte[] classfileBuffer) throws IllegalClassFormatException {
        System.out.println(className);
        try {
            if (className != null && (className.contains("burp") || className.contains("portswigger"))) {
                ClassPool
                        .getDefault()
                        .makeClass(new ByteArrayInputStream(classfileBuffer))
                        .writeFile("D:/Download/burpsuite/");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

### MANIFEST.MF

```
Manifest-Version: 1.0
Can-Redefine-Classes: true
Premain-Class: instrument.ClassDump
```

## Reference

- [jdk.hotspot.agent](https://github.com/openjdk/jdk/blob/master/src/jdk.hotspot.agent/share/classes/sun/jvm/hotspot/CommandProcessor.java#L555)
- https://docs.oracle.com/en/java/javase/13/docs/specs/man/jhsdb.html
