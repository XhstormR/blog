+++
Categories = ["JAVA"]
date = "2016-11-01T10:08:22+08:00"
title = "Java 8"

+++

<!--more-->

Updated on 2016-11-01

>

## Lambda 表达式
* Lambda 表达式（匿名方法 or 闭包）：由 `参数列表`、`->`、`函数体` 组成。
  * 参数列表：可以省略参数类型，编译器会根据上下文推导。
  * 函数体：引用的局部变量会被隐式声明为 final。
      * 代码块：用 `{ }` 包裹的多条执行代码。
      * 表达式：只有一条执行代码，省略了 `{ }` 和 `return`。
          * 若 **没有传入额外参数**，而 **仅调用对象方法**，则可以进一步简化整个 Lambda 表达式，转换为 **方法引用**。`类名::方法名` `类名::new` `类名[]::new`
* Lambda 表达式只能出现在目标类型为函数式接口的上下文中。
* Lambda 表达式不会引入新作用域，函数体中的变量和外部环境中的变量具有相同的语义。

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
* 抽象方法：自己不实现，子类必须实现。`void a();`
* 默认方法：自己已实现，子类可以重写。`default void b() { }`
* 静态方法：自己已实现，直接通过接口名访问。`static void c() { }`

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

## Stream
支持串行处理和并行处理的 **数据流**。

* 外部迭代：通过 for-each 循环来处理数据；同时承担 `做什么` 和 `怎么做`。
* 内部迭代：通过获得 Stream 来处理数据；只承担 `做什么`，由类库承担 `怎么做`。
    * 中间操作（惰性求值）：不会立即执行，而是加入任务队列中，在终点操作时一并执行。
        * 有限数据 ➜ 优化作用，无限数据 ➜ 决定作用（没有惰性求值，操作无法停止）。
    * 终点操作（急性求值）：通过短路求值的优化一并执行所有操作，以提供更高效的性能。
* 串行流（串行处理）：`list.stream()` `stream.sequential()`
* 并行流（并行处理）：`list.parallelStream()` `stream.parallel()`

```java
for (Shape shape : shapes){     外部迭代
    shape.setColor(RED);
}

----

shapes.forEach(s -> s.setColor(RED));     内部迭代（优）
```

## Optional
一种用于封装对象的容器，封装的对象可以是 `null`，并且对 `null` 加以判断并处理。

```java
public class A {
    public static void main(String[] args) {
        a();
        System.out.println("--------");
        b();
    }

    private static void a() {
        String s = "ABC";
        Optional<String> optional = Optional.ofNullable(s);     对象不为空

        System.out.println(optional.isPresent());     true
        System.out.println(optional.orElse("123"));     接受一个默认值
        System.out.println(optional.orElseGet(() -> "123"));     接受一个 Supplier 函数式接口
    }

    private static void b() {
        String s = null;
        Optional<String> optional = Optional.ofNullable(s);     对象为空

        System.out.println(optional.isPresent());     false
        System.out.println(optional.orElse("123"));     接受一个默认值
        System.out.println(optional.orElseGet(() -> "123"));     接受一个 Supplier 函数式接口
    }
}
----
输出：
true
ABC
ABC
--------
false
123
123
```