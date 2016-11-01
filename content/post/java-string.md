+++
Categories = ["JAVA"]
date = "2016-07-20T10:26:13+08:00"
title = "关于 Java 中的 String"

+++

<!--more-->

Updated on 2016-10-09

> {{< image "/uploads/java-string.svg" "String" "1" "1" >}}

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

str.trim()     去除开头和结尾的空格
str.toLowerCase()     abcdefgh     大小写转换
str.concat("123")     ABCDEFGH123     追加
str.replace("B", " ")     A CDEFGH     替换
str.substring(2, 6)     CDEF     截取字符串     返回 String
str.subSequence(2, 6)     CDEF     截取字符串     返回 CharSequence

str.split(" ")     以空格为分隔符，返回字符串数组     返回 String[]
str.toCharArray()     返回字符数组     返回 Char[]
str.matches(".*0 /.*+.*")     使用正则表达式匹配内容

Tips：
字符串索引范围从 0 开始，到 str.length()-1 结束。
indexOf 没有匹配结果会返回 -1。
substring 包括开始位置的字符，不包括结束位置的字符。   [2,6)
```

## StringBuilder and StringBuffer
```java
StringBuilder str = new StringBuilder("ABCDEFGH");

str.toString();     ABCDEFGH     转换为String
str.reverse();     HGFEDCBA     反转
str.setCharAt(1,' ');     A CDEFGH     替换
str.append(123);     ABCDEFGH123     追加
str.insert(1, "123");     A123BCDEFGH     插入
```

---

```java
String str1 = "123";     使用 1 个对象
String str2 = new String("123");     使用 2 个对象

str1 == str2     false     显式 new 了一个对象，内存地址不相同
str1.equals(str2)     true     内容相同

-------------------------------------------------------

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

-------------------------------------------------------

public class A {
    public static void main(String[] args) {
        String str = "abcdef";
        for (char i : str.toCharArray()) {
            System.out.println(i - 'a' + 1);     eg. b ➜ 98 - 97 + 1 = 2
        }
    }
}
----
输出：
1
2
3
4
5
6

-------------------------------------------------------

public class A {     URL 编码
    public static void main(String[] args) {
        String format = String.format("A=%s&B=%4d&C=%.2f", "字", 123, 123.123);
        String encode = URLEncoder.encode("中国ABC", "utf-8");
        String decode = URLDecoder.decode(encode, "utf-8");

        System.out.println(format);
        System.out.println(encode);
        System.out.println(decode);
    }
}
----
输出：
A=字&B= 123&C=123.12
%E4%B8%AD%E5%9B%BDABC
中国ABC

-------------------------------------------------------

public class A {     Base64 编码
    public static void main(String[] args) {
        String str = "123ABC中国";
        String encode = new BASE64Encoder().encode(str.getBytes("utf-8"));
        byte[] decode = new BASE64Decoder().decodeBuffer(encode);

        System.out.println(encode);
        System.out.println(new String(decode, "utf-8"));
    }
}
----
输出：
MTIzQUJD5Lit5Zu9
123ABC中国

-------------------------------------------------------

public class A {     判断是否为回文
    public static void main(String[] args) {
        a();     第一种方式
        b();     第二种方式
    }

    private static void a() {
        String str = "12321";
        String s = new StringBuilder(str).reverse().toString();
        System.out.println(str.equals(s));
    }

    private static void b() {
        String str = "12321";
        int length = str.length();
        int count = length % 2 == 0 ? length / 2 : (length - 1) / 2;
        for (int x = 0, y = 1; count != 0; count--, x++, y++) {
            if (str.charAt(x) != str.charAt(length - y)) {
                System.out.println("false");
                return;
            }
        }
        System.out.println("true");
    }
}
----
输出：
true
true
```