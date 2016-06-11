+++
Categories = ["JAVA"]
date = "2016-06-10T11:04:52+08:00"
title = "自学 Java"

+++

<!--more-->

Updated on 2016-06-11

> ![](/uploads/java.png "Java")
>
> http://www.eclipse.org/
>
> http://www.tiobe.com/tiobe_index
>
> http://www.oracle.com/technetwork/java/index.html
>
> http://docs.oracle.com/javase/8/docs/api/overview-frame.html

## JDK
* JDK：Java Development Kit（Java 开发工具包）
  * JRE：Java Runtime Environment（Java 运行环境）
  * JVM：Java Virtual Machine（Java 虚拟机）

## Edition
||微型版(Micro Edition)|标准版(Standard Edition)|企业版(Enterprise Edition)|
|:--|:--|:--|:--|
|旧名|J2ME|J2SE|J2EE|
|新名|Java ME|Java SE|Java EE|
|类库|只包含SE中的一部分|核心类库|包含SE中的和企业扩展类|
|---------|--------------------------------|-----------------------------------|-----------------------------------|

## 环境变量
|变量值|变量名||
|:--|:--|:--|
|JAVA_HOME|C:\Program Files\Java\jdk1.8.0_92|配置JDK安装路径|
|PATH|%JAVA_HOME%\bin|配置命令文件位置|
|CLASSPATH|.;%JAVA_HOME%\lib|配置类库文件位置|
|---------------------|------------------------------------------------|-----------------------|

## 跨平台原理
|a.java|javac|a.class|java|JVM|HelloWorld!|
|:--|:--|:--|:--|:--|:--|
|源代码|编译器|字节码|解释器|虚拟机|
|-----------|-----------|-----------|-----------|-----------|---------------》|

## CMD
```java
---------
public class a{
    public static void main(String[]args){
        System.out.println("HelloWorld!");
    }
}
---------
D:\>javac a.java
D:\>java a     java命令不跟文件后缀名
HelloWorld!
```

## Eclipse
汉化包：http://www.eclipse.org/babel/downloads.php

## Java 规范
* 源文件名：源文件名应该和类名相同。
* 主方法入口：所有的 Java 程序由 `public static void main(String[]args)` 方法处开始执行。
* 标识符：用于给 Java 程序中类、方法、变量等命名的符号，严格区分大小写。
  * 只能由字母，数字， `_` ， `$` 组成，且不能以数字开头。
  * 类名：首字母大写，大驼峰式命名法，MyFirstJavaClass。
  * 方法名，变量名：首字母小写，小驼峰式命名法，stuName。
![](/uploads/java-variable.svg)
* 变量：包含变量类型、变量名、变量值 3 个元素。 `String name="Dave";`

```java
String a = "你好"; //声明变量的同时进行初始化
----
String a; //先声明后赋值
a = "你好";

Man b = new Man(); //声明对象的同时进行实例化
----
Man b; //先声明后实例化
b = new Man();
```