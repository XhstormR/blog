---
author: XhstormR
categories:
- Reverse
date: 2018-07-14T16:12:09+08:00
title: 逆向 MyBatis plugin
---

<!--more-->

Updated on 2018-07-15

> https://plugins.jetbrains.com/plugin/7293-mybatis-plugin

* 两个模块：
  * 本地端：使用 C 和 Rust 语言混合编写，主要用于与服务器验证激活。
  * 插件端：使用 Java 和 Kotlin 语言混合编写，用于与 IDEA 进行交互。
* 使用 ZKM 进行代码混淆。
* 使用 [jni-rs](https://github.com/prevoty/jni-rs) 从本地端通过 JNI 反射直接调用 Java 方法。

## 反混淆器
* https://github.com/java-deobfuscator/deobfuscator

```ini
java -jar deobfuscator-1.0.0.jar --config config.yml

config.yml
----
input: iMybatis-3.67.jar
output: output.jar
path:
 - C:\Program Files\Java\jdk1.8.0_152\jre\lib\rt.jar
 - C:\Program Files\Java\jdk1.8.0_152\jre\lib\jce.jar
 - C:\Program Files\Java\jdk1.8.0_152\jre\lib\ext\jfxrt.jar
 - C:\Program Files\Java\jdk1.8.0_152\lib\tools.jar
transformers:
 - com.javadeobfuscator.deobfuscator.transformers.zelix.string.SimpleStringEncryptionTransformer
 - com.javadeobfuscator.deobfuscator.transformers.zelix.string.EnhancedStringEncryptionTransformer
```

## JDB 动态调试
* https://docs.oracle.com/javase/8/docs/technotes/tools/windows/jdb.html
* https://docs.oracle.com/javase/8/docs/technotes/guides/jpda/conninv.html

```
Server:
javac -g Main.java
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=8000 Main

Client:
jdb -connect com.sun.jdi.SocketAttach:hostname=localhost,port=8000
stop in java.lang.String.length
run
clear java.lang.String.length
where
list
locals
print new com.a.a.h.d.r().a(365)
exit
```

---

```kotlin
// 以代码方式监控特定类
fun main() {
    val classToWatch = "org.example.Main"

    // com.sun.tools.jdi.SocketAttachingConnector
    val connector = Bootstrap.virtualMachineManager()
        .attachingConnectors()
        .single { it.name() == "com.sun.jdi.SocketAttach" }

    val virtualMachine = with(connector.defaultArguments()) {
        this["port"]?.setValue("8000")
        this["hostname"]?.setValue("localhost")
        connector.attach(this)
    }

    val requestManager = virtualMachine.eventRequestManager()

    fun Field.watch() {
        println("Watching field: $this")
        with(requestManager.createModificationWatchpointRequest(this)) {
            setSuspendPolicy(EventRequest.SUSPEND_EVENT_THREAD)
            enable()
        }
    }

    val isEmpty = virtualMachine.classesByName(classToWatch).isEmpty()
    if (isEmpty) {
        with(requestManager.createClassPrepareRequest()) {
            addClassFilter(classToWatch)
            enable()
        }
    } else {
        val referenceType = virtualMachine.classesByName(classToWatch).single()
        referenceType.allFields().forEach(Field::watch)
    }
    virtualMachine.resume()

    val queue = virtualMachine.eventQueue()
    while (true) {
        val set = queue.remove()
        set.forEach {
            when (it) {
                is ClassPrepareEvent -> {
                    val referenceType = it.referenceType()
                    if (referenceType.name() == classToWatch) {
                        referenceType.allFields().forEach(Field::watch)
                    }
                }
                is ModificationWatchpointEvent -> {
                    with(it) { println("${field()}: ${valueCurrent()} -> ${valueToBe()}") }

                    val thread = it.thread()
                    println(thread)
                    thread.frames().forEach {
                        with(it.location()) { println("\t${method()} -> $this") }
                    }
                }
            }
        }
        set.resume()
    }
}
```

## AspectJ 拦截方法
* https://search.maven.org/search?q=g:org.aspectj
  * https://mirrors.tuna.tsinghua.edu.cn/eclipse/tools/aspectj/
  * [aspectjrt](https://maven.aliyun.com/repository/jcenter/org/aspectj/aspectjrt/1.9.5/aspectjrt-1.9.5.jar),
    [aspectjtools](https://maven.aliyun.com/repository/jcenter/org/aspectj/aspectjtools/1.9.5/aspectjtools-1.9.5.jar),
    [aspectjweaver](https://maven.aliyun.com/repository/jcenter/org/aspectj/aspectjweaver/1.9.5/aspectjweaver-1.9.5.jar)
* https://www.eclipse.org/aspectj/doc/released/progguide/semantics.html
* https://www.eclipse.org/aspectj/doc/released/devguide/ltw-configuration.html
* https://www.eclipse.org/aspectj/doc/released/runtime-api/allclasses-frame.html
* 使用加载时编织（Load-time Weaving），兼容性比较好。

### Tracing.aj
```java
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Modifier;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public aspect Tracing {
    private static final String STR = "    ";
    private static final Path LOG_FILE;
    /*call 最好只用于 static、native 方法，以免编织时发生异常*/
    private static final pointcut p1():
            execution(* com.a.a.h.d.r.*(..)) ||
            call(native * com.a..*(..)) ||
            (call(static String com.a..*(..)) && !call(static String com.a.a.h.a.c.a(int, int)));

    static {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH.mm.ss");
        LOG_FILE = Paths.get("D:/Download", String.format("Tracing_%s.log", now.format(formatter)));
    }

    private static boolean isNative(JoinPoint.StaticPart jpsp) {
        int modifiers = jpsp.getSignature().getModifiers();
        return Modifier.isNative(modifiers);
    }

    private static boolean isReturnVoid(JoinPoint.StaticPart jpsp) {
        Class returnType = ((MethodSignature) jpsp.getSignature()).getReturnType();
        return returnType == Void.TYPE;
    }

    private static PrintWriter getLogWriter() throws IOException {
        return new PrintWriter(Files.newBufferedWriter(LOG_FILE,
                StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND));
    }

    Object around(): p1() {
        try (PrintWriter writer = getLogWriter()) {
            writer.println(thisJoinPoint.toLongString());

            writer.println(STR + "args: " + Arrays.toString(thisJoinPoint.getArgs())); //输出参数

            Object result = proceed(); //执行原有方法体
            writer.println(STR + "return: " + result); //输出原有返回值

            return result; //指定返回值
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

//    before(): p2() {
//        try (PrintWriter writer = getLogWriter()) {
//            writer.println(thisJoinPoint.toLongString());
//
//            writer.println(STR + "args: " + Arrays.toString(thisJoinPoint.getArgs()));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    after() returning(Object result): p2() {
//        try (PrintWriter writer = getLogWriter()) {
//            writer.println(thisJoinPoint.toLongString());
//
//            writer.println(STR + "return: " + result);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
}
```

### aop-ajc.xml
```xml
<aspectj>
    <aspects>
        <aspect name="Tracing"/>
    </aspects>

    <weaver options="-Xlint:ignore -showWeaveInfo">
        <include within="com.a..*"/>
    </weaver>
</aspectj>
```

### 编译
```bash
java -cp aspectjtools-1.9.1.jar;aspectjrt-1.9.1.jar; org.aspectj.tools.ajc.Main -outjar 123.jar -outxml -1.8 -Xlint:ignore Tracing.aj
```

### 运行
```bash
ideaIU-2018.1\bin\idea64.exe.vmoptions
----
-javaagent:D:\Download\aspectjweaver-1.9.1.jar

.IntelliJIdea2018.1\config\plugins\MyBatis\lib
----
123.jar
```
