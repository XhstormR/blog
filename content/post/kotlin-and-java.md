+++
Categories = ["Kotlin"]
date = "2017-02-13T13:33:59+08:00"
title = "函数式编程：Kotlin 与 Java"

+++

<!--more-->

Updated on 2017-02-13

> {{< image "/uploads/kotlin-and-java.png" "Function" "1" "1" >}}

## Kotlin
```kotlin
fun main(args: Array<String>) {
    a({ s -> println(s) })     Lambda 表达式
    等同于
    a { s -> println(s) }     移至括号外并省略括号
    等同于
    a { println(it) }     使用 `it` 替代
    等同于
    a(::println)     使用函数引用
}
等同于
fun main(args: Array<String>) = a(::println)     函数体只含有 1 句表达式，省略函数体和返回值

----

fun a(block: (String) -> Unit): Unit {     高阶函数（函数参数使用函数类型表达）（函数为一等公民）
    block("ABC")
}
等同于
fun a(block: (String) -> Unit) {     省略 Unit (void) 返回值
    block("ABC")
}
等同于
fun a(block: (String) -> Unit) = block("ABC")     函数体只含有 1 句表达式，省略函数体和返回值

-------------------------------------------------------
Finally：
fun main(args: Array<String>) = a(::println)

fun a(block: (String) -> Unit) = block("ABC")

----
输出：
ABC
```

## Java
```java
public class Main {
    public static void main(String[] args) {
        a((String s) -> {     Lambda 表达式
            System.out.println(s);
        });
        等同于
        a((String s) -> System.out.println(s));     方法体只含有 1 条执行代码，转为表达式（省略方法体和返回值）
        等同于
        a(s -> System.out.println(s));     省略参数类型
        等同于
        a(System.out::println);     使用方法引用
    }

    private static void a(A a) {     假：高阶函数（函数参数使用接口表达）（只支持传递对象，不支持传递方法）
        a.a("ABC");
    }
}

@FunctionalInterface
interface A {
    void a(String str);
}

-------------------------------------------------------
Finally：
public class Main {
    public static void main(String[] args) {
        a(System.out::println);
    }

    private static void a(A a) {
        a.a("ABC");
    }
}

@FunctionalInterface
interface A {
    void a(String str);
}

----
输出：
ABC
```

## 对比
```kotlin
Kotlin：
fun main(args: Array<String>) = a(::println)

fun a(block: (String) -> Unit) = block("ABC")     函数类型表达（函数为一等公民）
```

```java
Java：
public class Main {
    public static void main(String[] args) {
        a(System.out::println);
    }

    private static void a(A a) {     接口表达（只支持传递对象，不支持传递方法）
        a.a("ABC");
    }
}

@FunctionalInterface
interface A {
    void a(String str);
}
```
