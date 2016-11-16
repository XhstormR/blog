+++
Categories = ["JAVA"]
date = "2016-11-04T10:08:22+08:00"
title = "Java 8"

+++

<!--more-->

Updated on 2016-11-09

> [StringJoiner](https://docs.oracle.com/javase/8/docs/api/java/util/StringJoiner.html)
> |
> [Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)
>
> https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html
>
> https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html

## Lambda 表达式
* Lambda 表达式（匿名方法 or 闭包）：由 `参数列表`、`->`、`函数体` 组成。
  * 参数列表：可以省略参数类型，编译器会根据上下文推导。
  * 函数体：引用的局部变量会被隐式声明为 final。
      * 代码块：用 `{ }` 包裹的多条执行代码。
      * 表达式：只有一条执行代码，省略了 `{ }` 和 `return`。
          * 若 **没有传入额外参数**，而 **仅调用对象方法**，则可以进一步简化整个 Lambda 表达式，转换为 **方法引用**。`对象名::方法名` `类名::方法名` `类名::new` `类名[]::new`
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
* 函数式接口：只含有一个抽象方法，因此可以被转换成 Lambda 表达式。
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
        * 有限数据 ➜ 优化作用，无限数据 ➜ 决定作用（没有短路求值，操作无法停止）。
    * 终点操作（急性求值）：通过短路求值的优化一并执行所有操作，以提供更高效的性能。
* 串行流（串行处理）：单线程，`list.stream()` `stream.sequential()`
* 并行流（并行处理）：多线程，`list.parallelStream()` `stream.parallel()`
* 中间操作：
  * 过滤：filter。
  * 排序：sorted。
  * 去重：distinct。
  * 最大：max。
  * 最小：min。
  * 消耗：peek。
  * 转换：map（一对一）、flatMap（一对多）。`映射`
  * 返回前 n 个元素：limit。`最多执行次数`
  * 跳过前 n 个元素：skip。
* 终点操作：
  * 收集：collect。
  * 归约：reduce。
  * 消耗：forEach。
  * 且（全部元素符合返回 true）：allMatch。
  * 或（任一元素符合返回 true）：anyMatch。
  * 非（没有元素符合返回 true）：noneMatch。

```java
for (Shape shape : shapes){     外部迭代
    shape.setColor(RED);
}

----

shapes.forEach(s -> s.setColor(RED));     内部迭代（优）

-------------------------------------------------------

IntStream.range(0, 3).forEach(System.out::println);     替代 for 循环
----
输出：
0
1
2

-------------------------------------------------------

Stream
        .of("A", "B", "C")
        .filter(s -> {
            System.out.println("filter: " + s);
            return true;
        })
        .map(s -> {
            System.out.println("map: " + s);
            return s;
        });     没有调用终点操作
----
输出：无

----

Stream
        .of("A", "B", "C")
        .filter(s -> {
            System.out.println("filter: " + s);
            return true;
        })
        .map(s -> {
            System.out.println("map: " + s);
            return s;
        })
        .anyMatch(s -> {     调用终点操作
            System.out.println("anyMatch: " + s);
            return s.startsWith("B");
        });
----
输出：     （可以看出对元素的处理操作是垂直执行的，像在流水线依次经过每个操作，并通过短路求值尽可能减少操作次数）
filter: A
map: A
anyMatch: A
filter: B
map: B
anyMatch: B

Note：filter 操作尽可能排在最前（短路求值），sorted 操作尽可能排在最后（sorted 操作遍历整个数据流）
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

## Code
```java
public class A {
    private static final List<Author> LIST = Arrays.asList(
            new Author("Adam", 23, Arrays.asList("Java1", "Java2")),
            new Author("Bell", 19, Arrays.asList("Python1", "Python2")),
            new Author("Conan", 23, Arrays.asList("PHP1", "PHP2")),
            new Author("David", 26, Arrays.asList("Ruby1", "Ruby2")));     作家列表

    public static void main(String[] args) {
        Supplier<Stream<Author>> supplier = () -> LIST.stream().onClose(() -> System.out.println("——————————————"));     供应器
        a(supplier);                                                                                   ↳ Stream 关闭时回调 Runnable 对象
        b(supplier);
        c(supplier);
        d();
    }

    private static void a(Supplier<Stream<Author>> supplier) {     collect
        try (Stream<Author> stream = supplier.get()) {
            Set<Author> set = stream.filter(o -> o.mName.startsWith("B")).collect(Collectors.toSet());     获得以 B 开头的姓名，toSet
            System.out.println(set);
        }
        try (Stream<Author> stream = supplier.get()) {
            List<Integer> list = stream.map(o -> o.mAge).distinct().sorted().collect(Collectors.toList());     有哪些年龄，toList
            System.out.println(list);
        }
        try (Stream<Author> stream = supplier.get()) {
            Double aDouble = stream.collect(Collectors.averagingInt(o -> o.mAge));     获得平均年龄
            System.out.println(aDouble);
        }
        try (Stream<Author> stream = supplier.get()) {
            Map<Boolean, List<Author>> map = stream.collect(Collectors.partitioningBy(o -> o.mAge > 20));     按年龄一分为二
            map.forEach((key, value) -> System.out.printf("%s: %s\n", key, value));
        }
        try (Stream<Author> stream = supplier.get()) {
            Map<Integer, List<Author>> map = stream.collect(Collectors.groupingBy(o -> o.mAge));     按年龄分组，toMap，未提供收集器（默认调用 toList()）
            map.forEach((key, value) -> System.out.printf("%s: %s\n", key, value));
        }
        try (Stream<Author> stream = supplier.get()) {
            Map<Integer, Integer> map = stream.collect(Collectors.groupingBy(o -> o.mAge, Collectors.summingInt(o -> 1)));     按年龄分组，toMap，提供收集器（指定收集行为）
            map.forEach((key, value) -> System.out.printf("%s: %s\n", key, value));
        }
        try (Stream<Author> stream = supplier.get()) {
            String s = stream.filter(o -> o.mAge > 20).map(o -> o.mName).collect(Collectors.joining(", ", "<", ">"));     连接作家名字
            System.out.println(s);
        }
        try (Stream<Author> stream = supplier.get()) {
            Collector<Object, StringJoiner, String> myCollector = Collector.of(     自定义收集操作
                    () -> new StringJoiner(", ", "<", ">"),     supplier 供应器(开始)
                    ((stringJoiner, o) -> stringJoiner.add(o.toString())),     accumulator 累加器
                    (stringJoiner, stringJoiner2) -> stringJoiner.merge(stringJoiner2),     combiner 组合器 (并行流使用)
                    stringJoiner -> stringJoiner.toString());     finisher 终止器(结束)

            String s = stream.filter(o -> o.mAge > 20).map(o -> o.mName).collect(myCollector);     连接作家名字
            System.out.println(s);
        }
        ----
        输出：
        [Bell]
        ——————————————————————————
        [19, 23, 26]
        ——————————————————————————
        22.75
        ——————————————————————————
        false: [Bell]
        true: [Adam, Conan, David]
        ——————————————————————————
        19: [Bell]
        23: [Adam, Conan]
        26: [David]
        ——————————————————————————
        19: 1
        23: 2
        26: 1
        ——————————————————————————
        <Adam, Conan, David>
        ——————————————————————————
        <Adam, Conan, David>
        ——————————————————————————
    }

    private static void b(Supplier<Stream<Author>> supplier) {     reduce
        try (Stream<Author> stream = supplier.get()) {
            Optional<Author> optional = stream.reduce((o1, o2) -> o1.mAge > o2.mAge ? o1 : o2);     accumulator 累加器，获得最大年龄作家，不提供起始值（返回 Optional）
            optional.ifPresent(o -> System.out.println(o.mName + "_" + o.mAge));
        }
        try (Stream<Author> stream = supplier.get()) {
            Author author = stream.reduce(
                    new Author("", 0, new ArrayList<>()),     提供起始值
                    (o1, o2) -> o1.mAge > o2.mAge ? o1 : o2);     accumulator 累加器，获得最大年龄作家
            System.out.println(author.mName + "_" + author.mAge);
        }
        try (Stream<Author> stream = supplier.get()) {
            Integer integer = stream.reduce(     自定义归约操作
                    0,     起始值
                    (sum, o) -> sum += o.mAge,     accumulator 累加器，获得年龄总和
                    (sum, sum2) -> sum + sum2);     combiner 组合器 (并行流使用)
            System.out.println(integer);
        }
        ----
        输出：
        David_26
        ——————————————————————————
        David_26
        ——————————————————————————
        91
        ——————————————————————————
    }

    private static void c(Supplier<Stream<Author>> supplier) {     flatMap
        try (Stream<Author> stream = supplier.get()) {
            String s = stream.flatMap(o -> o.mArticle.stream()).collect(Collectors.joining(", ", "<", ">"));     连接所有作家中的所有文章
            System.out.println(s);
        }
        ----
        输出：
        <Java1, Java2, Python1, Python2, PHP1, PHP2, Ruby1, Ruby2>
        ——————————————————————————
    }

    private static void d() {
        Stream.generate(UUID::randomUUID).limit(5).forEach(System.out::println);
        ----             ↳ 无限生成 UUID，限制最多执行 5 次
        输出：
        e9100622-3458-4c94-bc7a-dabcf99ebee9
        bc18a526-945f-4fc6-a9fc-496c075aa99a
        57a3882b-2eb6-4392-bb2f-31cb10acbece
        82900c8e-e8d6-46de-a02f-9d37c5454f30
        25ec7ee2-a963-43df-8c11-7008b4a68ccd

        Stream.iterate(0, n -> n + 2).limit(10).forEach(n -> System.out.print(n + " "));
        ----           ↳ 无限迭代起始值，限制最多执行 10 次
        输出：
        0 2 4 6 8 10 12 14 16 18

        List<String> list1 = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        List<String> list2 = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        Stream.of(list1, list2).peek(list -> list.addAll(Arrays.asList("E", "F", "J"))).forEach(System.out::println);     peek
        ----
        输出：
        [A, B, C, D, E, F, J]
        [A, B, C, D, E, F, J]
    }

    private static class Author {     作家
        private String mName;     姓名
        private int mAge;     年龄
        private List<String> mArticle;     文章列表

        private Author(String name, int age, List<String> article) {
            mName = name;
            mAge = age;
            mArticle = article;
        }

        @Override
        public String toString() {
            return mName;
        }
    }
}
```