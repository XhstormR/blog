+++
Categories = ["JAVA"]
date = "2016-09-07T16:15:33+08:00"
title = "进制转换"

+++

<!--more-->

Updated on 2016-09-09

> {{< image "/uploads/binary.svg" "" "0" "1" >}}

## 单位
### 二进制
* 0,1
* 开头用 `0b` 表示

### 八进制
* 0,1,2,3,4,5,6,7
* 开头用 `0` 表示

### 十进制
* 0,1,2,3,4,5,6,7,8,9

### 十六进制
* 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F
* 开头用 `0x` 表示

## 表示 - 235
### 二进制 - 11101011
{{< image "/uploads/binary-2.png" "" "0" "1" >}}

### 八进制 - 353
{{< image "/uploads/binary-8.svg" "" "0" "1" >}}
{{< image "/uploads/binary-8.png" "" "0" "1" >}}

### 十进制 - 235
{{< image "/uploads/binary-10.svg" "" "0" "1" >}}
{{< image "/uploads/binary-10.png" "" "0" "1" >}}

### 十六进制 - eb
{{< image "/uploads/binary-16.svg" "" "0" "1" >}}
{{< image "/uploads/binary-16.png" "" "0" "1" >}}

## 二进制
### 位运算
{{< image "/uploads/binary-bitwise.svg" "" "0" "1" >}}

### 原码
按绝对值大小转换成的二进制数称为原码（正数）。

14：00000000 00000000 00000000 00001110（正数 `+14`）

### 反码
原码 `取反` 称为反码。

14：11111111 11111111 11111111 11110001

### 补码
反码 `加1` 称为补码（负数）。

14：11111111 11111111 11111111 11110010（负数 `-14`）

## Code
```java
Integer.toBinaryString(57);     10 ➜ 2
Integer.toOctalString(57);     10 ➜ 8
Integer.toHexString(57);     10 ➜ 16

Integer.toString(57, 2);     10 ➜ 2
Integer.toString(57, 8);     10 ➜ 8
Integer.toString(57, 16);     10 ➜ 16

Integer.parseInt("1101", 2);     2 ➜ 10
Integer.parseInt("376", 8);     8 ➜ 10
Integer.parseInt("ff", 16);     16 ➜ 10

Integer.toString(9999, 26);     10 ➜ 26
Integer.parseInt("ekf", 26);     26 ➜ 10

-------------------------------------------------------

int i1 = 14;               14
int i2 = ~14 + 1;     -14

-------------------------------------------------------

public class Test {
    private static void radix(int num, int radix) {     显示任意进制转换过程
        for (; ; ) {
            int i = num;
            int i2 = num % radix;
            num /= radix;
            System.out.println(i + "\t/" + radix + "=" + num + "\t" + i2);
            if (num == 0) {
                break;
            }
        }
    }

    private static void int2BinaryFormat(int num) {     转为 2 进制并格式化
        String string = Integer.toString(num, 2);
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < 32 - string.length(); i++) {
            stringBuilder.append("0");
        }
        stringBuilder.append(string);
        for (int i = 0; i < 3; i++) {
            stringBuilder.insert(9 * i + 8, " ");
        }
        System.out.println(stringBuilder);
    }

    private static byte[] int2Bytes(int num) {     int 转为 字节数组
        byte[] bytes = new byte[4];

        bytes[0] = ((byte) ((num >> 0 * 8) & 0xff));
        bytes[1] = ((byte) ((num >> 1 * 8) & 0xff));
        bytes[2] = ((byte) ((num >> 2 * 8) & 0xff));
        bytes[3] = ((byte) ((num >> 3 * 8) & 0xff));

        for (int i = 0; i < bytes.length; i++) {     简化后
            bytes[i] = ((byte) ((num >> i * 8) & 0xff));
        }

        System.out.println(Arrays.toString(bytes));
        return bytes;
    }

    private static void bytes2Int(byte[] bytes) {     字节数组 还原为 int
        int result = 0;

        result += (bytes[0] & 0xff) << 0 * 8;     逆操作
        result += (bytes[1] & 0xff) << 1 * 8;
        result += (bytes[2] & 0xff) << 2 * 8;
        result += (bytes[3] & 0xff) << 3 * 8;

        for (int i = 0; i < bytes.length; i++) {     简化后
            result += (bytes[i] & 0xff) << i * 8;
        }

        System.out.println(result);
    }

    public static void main(String[] args) {
        Test.radix(235, 8);
        System.out.println("----");

        Test.int2BinaryFormat(8143);
        System.out.println("----");

        byte[] c = Test.int2Bytes(8143);
        System.out.println("----");

        Test.bytes2Int(c);
    }
}
----
输出：
235	/8=29	3
29	/8=3	5
3	/8=0	3
----
00000000 00000000 00011111 11001111
----
[-49, 31, 0, 0]
----
8143

-------------------------------------------------------

int i1 = 0b1111;     15（2 进制）
int i2 = 01111;     585（8 进制）
int i3 = 1111;     1111（10 进制）
int i4 = 0x1111;     4369（16 进制）
```