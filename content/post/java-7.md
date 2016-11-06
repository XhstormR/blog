+++
Categories = ["JAVA"]
date = "2016-11-01T10:07:22+08:00"
title = "Java 7"

+++

<!--more-->

Updated on 2016-11-01

>

## 二进制数字
```java
int i = 0b1111;     15
```

## 数字可读性
```java
int i = 100_000_000;     100000000
```

## 集合类型推断（Diamond）
```java
之前：List<String> list = new ArrayList<String>();
之后：List<String> list = new ArrayList<>();
```

## switch 支持字符串
```java
String s = "A";
switch (s) {
    case "A":
        System.out.println("A");
        break;
    case "B":
        System.out.println("B");
        break;
}
```

## catch 支持多重匹配
```java
try {
    throw new ArithmeticException();
} catch (IllegalArgumentException | ArithmeticException | NullPointerException e) {     多重匹配
    System.out.println(1);
} catch (Exception e) {
    System.out.println(2);
}
```

## 自动资源管理（ARM）
```java
之前：
BufferedWriter bufferedWriter = null;     资源
try {
    bufferedWriter = new BufferedWriter(new FileWriter("D:/123.txt", false));
    bufferedWriter.write("ABC");     操作
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try {
        if (bufferedWriter != null) {
            bufferedWriter.close();     关闭
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

之后：
try (BufferedWriter bufferedWriter1 = new BufferedWriter(new FileWriter("D:/A.txt", false));     资源被隐式声明为 final（资源需实现 AutoCloseable 接口）
     BufferedWriter bufferedWriter2 = new BufferedWriter(new FileWriter("D:/B.txt", false))) {
    bufferedWriter1.write("ABC");     操作
    bufferedWriter2.write("ABC");     操作
} catch (IOException e) {     try 代码块结束后，资源自动调用 close() 方法（关闭顺序：最先声明的，最后关闭）
    e.printStackTrace();
}
```