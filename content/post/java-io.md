+++
Categories = ["JAVA"]
date = "2016-09-06T11:52:11+08:00"
title = "JAVA IO Stream"

+++

<!--more-->

Updated on 2016-09-24

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

## 对象的序列化和反序列化
* 序列化：Object ➜ Byte 序列-----ObjectOutputStream.writeObject
* 反序列化：Byte 序列 ➜ Object-----ObjectInputStream.readObject
* 对象所属的类必须实现序列化接口（Serializable），才能够被序列化。
  * 如果所属的类的父类已实现序列化接口，则子类便不需要再实现序列化接口。
  * 如果所属的类的父类没有没有实现序列化接口，其父类的构造函数会被调用。

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

-------------------------------------------------------

public class Test {
    public static void main(String[] args) throws IOException {
    }

    private static void read(String readName) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(readName);
        for (int read, m = 1; (read = fileInputStream.read()) != -1; m++) {     读取一个字节填充至 int 的低 8 位，返回读到的内容
            if (read <= 0xf) {
                System.out.print("0");     前面补0
            }
            System.out.print(Integer.toHexString(read) + "\t");
            if (m % 10 == 0) {
                System.out.println();     换行
            }
        }
        fileInputStream.close();

        ----

        FileInputStream fileInputStream = new FileInputStream(readName);
        byte[] bytes = new byte[32 * 1024];     32KB (1KB=1024B) (1B=8b)
        for (int read, m = 1; (read = fileInputStream.read(bytes)) != -1; ) {     读取字节填充至数组中，返回读到的个数
            for (int i = 0; i < read; i++, m++) {
                if ((bytes[i] & 0xff) <= 0xf) {
                    System.out.print("0");     前面补0
                }
                System.out.print(Integer.toHexString(bytes[i] & 0xff) + "\t");
                if (m % 10 == 0) {
                    System.out.println();     换行
                }
            }
        }
        fileInputStream.close();
    }

    private static void write(String writeName) throws IOException {
        byte[] bytes = "ABC123一二三".getBytes("utf8");
        FileOutputStream fileOutputStream = new FileOutputStream(writeName, false);
        fileOutputStream.write(bytes);     将字节数组写入
        fileOutputStream.write(1);     将一个字节写入 (1B=8b)
        fileOutputStream.close();

        ----

        DataOutputStream dataOutputStream = new DataOutputStream(new FileOutputStream(writeName, false));
        DataInputStream dataInputStream = new DataInputStream(new FileInputStream(writeName));

        dataOutputStream.writeUTF("ABC123一二三");     使用 utf-8 编码写入
        System.out.println(dataInputStream.readUTF());     读取

        dataOutputStream.writeChars("ABC123一二三");     使用 utf-16be 编码写入
        byte[] bytes = new byte[((int) new File(writeName).length())];
        dataInputStream.readFully(bytes);     读取
        System.out.println(new String(bytes, "utf-16be"));

        dataInputStream.close();
        dataOutputStream.close();
    }

    private static void copy(String srcName, String destName) throws IOException {     复制文件
        BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream(srcName), 32 * 1024);
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(destName, false), 32 * 1024);
        byte[] bytes = new byte[32 * 1024];     32KB

        for (int read; (read = bufferedInputStream.read(bytes)) != -1; ) {
            bufferedOutputStream.write(bytes, 0, read);
        }

        bufferedOutputStream.close();
        bufferedInputStream.close();
    }

    private static String string2Unicode(String str) {     字符串转为 Unicode
        StringBuilder unicode = new StringBuilder();
        char[] chars = str.toCharArray();
        for (char c : chars) {
            String hex = Integer.toHexString(c);
            unicode.append("\\u").append(hex);
        }
        return unicode.toString();
    }

    private static String unicode2String(String unicode) {     Unicode 转为字符串
        StringBuilder str = new StringBuilder();     第一种：纯 Unicode
        String[] split = unicode.split("\\\\u");
        for (String s : split) {
            if (s.equals("")) {
                continue;
            }
            int data = Integer.parseInt(s, 16);
            str.append(((char) data));
        }
        return str.toString();

        ----

        StringBuilder str = new StringBuilder();     第二种：只转换了中文的 Unicode
        for (int j = 0, i = 0; i != unicode.length(); ) {     j=指针缓存，i=指针
            i = unicode.indexOf("\\u", i);
            if (i == -1) {
                return str.append(unicode.substring(j)).toString();
            }
            str.append(unicode.substring(j, i));
            String hex = unicode.substring(i + 2, i + 6);
            int data = Integer.parseInt(hex, 16);
            str.append(((char) data));
            j = i += 6;
        }
        return str.toString();
    }
}

-------------------------------------------------------

public class Student implements Serializable {     实现序列化接口
    private int id;
    private transient int age;     用 transient 修饰的属性不会自动进行序列化，但可以手动进行序列化
    private String name;

    public Student(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private void writeObject(java.io.ObjectOutputStream s) throws java.io.IOException {     序列化方法
        s.defaultWriteObject();     自动序列化属性
        s.writeInt(age);     手动序列化 transient 修饰的属性
    }

    private void readObject(java.io.ObjectInputStream s) throws java.io.IOException, ClassNotFoundException {     反序列化方法
        s.defaultReadObject();     自动反序列化属性
        this.age = s.readInt();     手动反序列化 transient 修饰的属性
    }
}

----

public class Test {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        save();     保存（序列化）
        load();     读取（反序列化）
    }

    private static void save() throws IOException {
        Student student = new Student(1, 21, "张三");

        ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("D:/student.dat"));
        objectOutputStream.writeObject(student);     保存（序列化）
        objectOutputStream.close();
    }

    private static void load() throws IOException, ClassNotFoundException {
        ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("D:/student.dat"));
        Student student = (Student) objectInputStream.readObject();     读取（反序列化）
        objectInputStream.close();

        System.out.println(student);
    }
}
----
输出：
Student{id=1, age=21, name='张三'}
```