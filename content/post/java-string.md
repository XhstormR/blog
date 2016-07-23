+++
Categories = ["JAVA"]
date = "2016-07-20T10:26:13+08:00"
title = "关于Java中的 String"

+++

<!--more-->

Updated on 2016-07-22

> ![](/uploads/java-string.svg "String")

* String：字符串常量
  * 一旦被创建就不能修改它的值，而是通过重新创建一个新的对象并重新引用。
* StringBuffer：字符串变量（线程安全）
  * 对 StringBuffer 本身进行操作，更适用于对字符串的修改。
* StringBuilder：字符串变量（非线程安全）
  * 等价于 StringBuffer，应用于单线程，不执行同步操作。

性能：StringBuilder > StringBuffer > String

## String
```java
String str = "ABCDEFGH";

String.valueOf(1.687f)     1.687     转换为字符串
String.format("%s-%d-%b", "abc", 3, true)     abc-3-true     格式化字符串
str.length()     8     字符串长度
str.charAt(2)     C     索引字符串
str.indexOf("EFG")     4     索引字符串
str.isEmpty()     false     是否为空
str.contains("ABC")     true     是否包含
str.equals("ABC")     false     比较内容
str.regionMatches(0, "DABC", 1, 3)     true     比较部分内容     原从0开始，新从1开始，比较长度为3
str.startsWith("ABC")     true     比较开头
str.endsWith("ABC")     false     比较结尾

str.trim()     删除开头和结尾的空格
str.toLowerCase()     abcdefgh     大小写转换
str.concat("123")     ABCDEFGH123     追加
str.replace("B", " ")     A CDEFGH     替换
str.substring(2, 6)     CDEF     截取字符串     返回 CharSequence
str.subSequence(2, 6)     CDEF     截取字符串     返回 String
```

## StringBuilder
```java
StringBuilder str = new StringBuilder("ABCDEFGH");

str.reverse();     HGFEDCBA     反转
str.append(123);     ABCDEFGH123     追加
str.insert(1, "123");     A123BCDEFGH     插入
str.setCharAt(1,' ');     A CDEFGH     替换
```

---

```java
public class A {
    public static void main(String[] args) {
        String str = "123456";
        for (char i : new StringBuilder(str).reverse().toString().toCharArray()) {     ①
            System.out.println(i);
        }
    }
}
注 ①：
String   ➜   StringBuilder   ➜   反转   ➜   String   ➜   char[]
----
输出：
6
5
4
3
2
1
```