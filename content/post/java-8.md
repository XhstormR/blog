+++
Categories = ["JAVA"]
date = "2016-11-01T10:08:22+08:00"
title = "Java 8"

+++

<!--more-->

Updated on 2016-11-01

>

## Lambda 表达式
* Lambda 表达式：由 `参数列表`、`->`、`函数体` 组成。
  * 参数列表：参数类型可以省略，编译器会根据上下文推导出参数类型。
  * 函数体：引用的局部变量会被隐式声明为 final。
      * 代码块：用 `{ }` 包裹的多条执行代码。
      * 表达式：只有一条执行代码，省略了 `{ }` 和 `return`。
* 方法引用：如果函数体中 **没有传入额外参数**，而仅仅是调用了对象的方法，则可以进一步简化 Lambda 表达式，转为方法引用。`类名::方法名`

```java
Predicate<String> filter = (String s) -> {     代码块
    return s.endsWith(".txt");
};

Predicate<String> filter = (String s) -> s.endsWith(".txt");     表达式

Predicate<String> filter = s -> s.endsWith(".txt");     省略参数类型

-------------------------------------------------------

Runnable runnable = () -> {     代码块
    System.out.println("123");
};

Runnable runnable = () -> System.out.println("123");     表达式

Runnable runnable = System.out::println;     若去掉 "123"，则可以转为方法引用（没有传入额外参数）

-------------------------------------------------------

Arrays.asList("A", "B", "C").sort((String s1, String s2) -> {     代码块
    return s1.compareTo(s2);
});

Arrays.asList("A", "B", "C").sort((String s1, String s2) -> s1.compareTo(s2));     表达式

Arrays.asList("A", "B", "C").sort((s1, s2) -> s1.compareTo(s2));     省略参数类型

Arrays.asList("A", "B", "C").sort(String::compareTo);     方法引用（没有传入额外参数）

-------------------------------------------------------

Comparator<Integer> comparator = (x, y) -> Integer.compare(x, y);     表达式

Comparator<Integer> comparator = Integer::compare;     方法引用（没有传入额外参数）
```

## 函数式接口
* 函数式接口：只含有一个抽象方法，且可以被转换成 Lambda 表达式。
* 抽象方法：`void a();`，自己不实现，子类必须实现。
* 默认方法：`default void b() { }`，自己已实现，子类可重写。
* 静态方法：`static void c() { }`，自己已实现，直接通过接口名访问，不需要创建对象。

```java
@FunctionalInterface     注解：声明为函数式接口
public interface A {
    void a();     抽象方法

    default void b() {     默认方法
        System.out.println("默认方法");
    }

    static void c() {     静态方法
        System.out.println("静态方法");
    }
}

public class Test {
    public static void main(String[] args) {
        Runnable r = () -> System.out.println("抽象方法");     根据上下文推导出目标类型 ➜ Runnable
        A a = () -> System.out.println("抽象方法");     根据上下文推导出目标类型 ➜ A
        a.a();
        a.b();
        A.c();
    }
}
----
输出：
抽象方法
默认方法
静态方法
```
