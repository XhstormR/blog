+++
Categories = ["JAVA"]
date = "2016-09-06T11:52:11+08:00"
title = "JAVA IO Stream"

+++

<!--more-->

Updated on 2016-09-11

> [{{< image "/uploads/java-io.svg" "IO 流" "1" "0" >}}](/uploads/java-io.svg)

## File
用于代表文件(夹)，是文件(夹)的抽象化形式，不能用于对文件内容的访问。
```java
File file = new File("D:\\123");     \ 是转义字符
File file = new File("D:/123");
File file = new File("D:/", "123");
File file = new File("D:" + File.separator + "123");

file.createNewFile();     创建为文件
file.mkdir();     创建为文件夹
file.mkdirs();     递归创建文件夹

file.delete();     删除文件(夹)
file.deleteOnExit();     退出虚拟机时删除文件(夹)

file.exists();     判断文件(夹)是否存在
file.isFile();     判断是否为文件（不存在返回 false）
file.isDirectory();     判断是否为文件夹（不存在返回 false）

file.length();     获得文件大小，以字节为单位
file.list();     获得文件夹下的文件(夹)名称，返回 String 数组（不是文件夹返回 null）
file.listFiles();     获得文件夹下的文件(夹)抽象，返回 File 数组（不是文件夹返回 null）
file.getName();     获得文件(夹)名称，123
file.getParent();     获得父路径，D:\
file.getAbsolutePath();     获得文件(夹)的绝对路径，D:\123
file.getCanonicalPath();     获得文件(夹)的绝对路径（规范后）
```

## RandomAccessFile
用于对文件内容的访问，可读可写，可以访问文件的任意位置（任意字节）。
```java
public class Test {
    public static void main(String[] args) throws IOException {
        File file = new File("D:/", "123.dat");
        RandomAccessFile randomAccessFile = new RandomAccessFile(file, "rw");     （文件,模式）rw：读写；r：只读
        打开文件时指针在开头 Pointer = 0

        开始写入
        byte[] bytes = "好A1".getBytes("utf8");     使用指定字符集 编码 为字节数组
        randomAccessFile.write(bytes);     将字节数组写入
        randomAccessFile.seek(8);     移动指针
        randomAccessFile.write(bytes);     将字节数组写入

        开始读取
        randomAccessFile.seek(0);     移动指针
        byte[] bytes2 = new byte[(int) randomAccessFile.length()];
        randomAccessFile.read(bytes2);     将文件内容一次性读取至字节数组中
        System.out.println(new String(bytes2, "utf8"));     使用指定字符集 解码 为字符串

        for (byte b : bytes2) {
            System.out.print(Integer.toHexString(b & 0xff) + "\t");
        }
        System.out.println("\n" + randomAccessFile.getFilePointer() + "," + randomAccessFile.length() + "," + bytes2.length);     指针位置，文件大小，数组长度

        randomAccessFile.write('A');     写一个字节，指针移至下一位置（Char 为 2 字节，所以只会写入 Char 的低 8 位）
        int read = randomAccessFile.read();     读一个字节，指针移至下一位置（填充至 Int 的低 8 位）

        randomAccessFile.close();     关闭流
    }
}
----
输出：
好A1   好A1
e5	a5	bd	41	31	0	0	0	e5	a5	bd	41	31
13,13,13
```

## Code
```java
public class Test {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String str = "好A1";
        encode(str, "gbk");     汉字 2 字节，字母和数字 1 字节
        encode(str, "utf-8");     汉字 3 字节，字母和数字 1 字节
        encode(str, "utf-16be");     汉字 2 字节，字母和数字 2 字节

        byte[] bytes = "你好".getBytes("gbk");     使用指定字符集 编码 为字节数组
        String string = new String(bytes, "gbk");     使用指定字符集 解码 为字符串
    }

    private static void encode(String str, String encode) throws UnsupportedEncodingException {
        byte[] bytes = str.getBytes(encode);     使用指定字符集 编码 为字节数组
        System.out.println(bytes.length);     数组长度
        for (byte b : bytes) {
            System.out.print(Integer.toHexString(b & 0xff) + "\t");     byte ➜ int ➜ 将前 24 个 1 清零 ➜ 以 16 进制显示
        }
        System.out.println();
    }
}

Tips：文件的实质就是字节序列。
----
输出：
4
ba	c3	41	31
5
e5	a5	bd	41	31
6
59	7d	0	41	0	31

-------------------------------------------------------

public class Test {
    public static void main(String[] args) {
        listDirectory(new File("D:\\Download\\Java"));
    }

    public static void listDirectory(File dir) {
        if (!dir.exists()) {
            throw new IllegalArgumentException("文件夹不存在");
        }
        if (!dir.isDirectory()) {
            throw new IllegalArgumentException("不是文件夹");
        }

        String[] name = dir.list();     只能显示一级子目录
        if (name != null) {
            for (String s : name) {
                System.out.println(dir + "\\" + s);     打印文件路径
            }
        }

        File[] files = dir.listFiles();     显示文件夹下的所有文件
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory()) {
                    listDirectory(f);     递归
                } else {
                    System.out.println(f);     打印文件路径
                }
            }
        }
    }
}
```