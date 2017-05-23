---
author: XhstormR
categories:
- JAVA
date: 2016-10-15T10:23:45+08:00
title: Algorithm
---

<!--more-->

Updated on 2017-03-19

> {{< image "/uploads/algorithm1.svg" "12" "1" "1" >}}
>
> 算法是解决问题的清晰指令，是用系统的方法描述解决问题的策略机制。

## 冒泡排序算法
通过交换相邻数据来达到排序目的。
```java
public class A {
    public static void main(String[] args) {
        int[] ints = new int[10];
        for (int i = 0; i < ints.length; i++) {
            ints[i] = ((int) (Math.random() * 100));
        }

        System.out.println(Arrays.toString(ints));     排序之前
        b(ints);
        System.out.println(Arrays.toString(ints));     排序之后
    }

    private static void a(int[] ints) {     原始算法
        int temp;

        for (int i = 0; i < ints.length - 1; i++) {     循环 9 次
            for (int j = 0; j < ints.length - 1; j++) {     比较 9 次
                if (ints[j] > ints[j + 1]) {     交换
                    temp = ints[j];
                    ints[j] = ints[j + 1];
                    ints[j + 1] = temp;
                }
            }
            System.out.println(i + 1 + "➜" + Arrays.toString(ints));
        }
    }

    private static void b(int[] ints) {     优化后
        int temp;
        boolean changed;

        for (int i = 0; i < ints.length - 1; i++) {
            changed = false;
            for (int j = 0; j < ints.length - 1 - i; j++) {     不再比较经过排序后的高位
                if (ints[j] > ints[j + 1]) {
                    temp = ints[j];
                    ints[j] = ints[j + 1];
                    ints[j + 1] = temp;
                    changed = true;
                }
            }
            if (!changed) {
                break;     未变动，排序完成，跳出循环
            }
            System.out.println(i + 1 + "➜" + Arrays.toString(ints));
        }
    }
}
----
输出：
[35, 19, 97, 56, 24, 45, 41, 47, 37, 53]
1➜[19, 35, 56, 24, 45, 41, 47, 37, 53, 97]
2➜[19, 35, 24, 45, 41, 47, 37, 53, 56, 97]
3➜[19, 24, 35, 41, 45, 37, 47, 53, 56, 97]
4➜[19, 24, 35, 41, 37, 45, 47, 53, 56, 97]
5➜[19, 24, 35, 37, 41, 45, 47, 53, 56, 97]
[19, 24, 35, 37, 41, 45, 47, 53, 56, 97]

排序方向：从右至左
```

## 选择排序算法
每次从数组中选取最小值来排列。
```java
public class A {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);     数组 ➜ 集合
        Collections.shuffle(list);     打乱
        Integer[] ints = list.toArray(new Integer[0]);     集合 ➜ 数组

        System.out.println(Arrays.toString(ints));     排序之前
        a(ints);
        System.out.println(Arrays.toString(ints));     排序之后
    }

    private static void a(Integer[] ints) {
        int temp;
        int index;

        for (int i = 0; i < ints.length - 1; i++) {     循环 9 次
            index = i;
            for (int j = i + 1; j < ints.length; j++) {     寻找最小列
                if (ints[j] < ints[index]) {
                    index = j;
                }
            }
            if (index != i) {     交换
                temp = ints[i];
                ints[i] = ints[index];
                ints[index] = temp;
            }
            System.out.println(i + 1 + "➜" + Arrays.toString(ints));
        }
    }
}
----
输出：
[5, 9, 1, 4, 8, 7, 2, 6, 0, 3]
1➜[0, 9, 1, 4, 8, 7, 2, 6, 5, 3]
2➜[0, 1, 9, 4, 8, 7, 2, 6, 5, 3]
3➜[0, 1, 2, 4, 8, 7, 9, 6, 5, 3]
4➜[0, 1, 2, 3, 8, 7, 9, 6, 5, 4]
5➜[0, 1, 2, 3, 4, 7, 9, 6, 5, 8]
6➜[0, 1, 2, 3, 4, 5, 9, 6, 7, 8]
7➜[0, 1, 2, 3, 4, 5, 6, 9, 7, 8]
8➜[0, 1, 2, 3, 4, 5, 6, 7, 9, 8]
9➜[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

排序方向：从左至右
```

## 数字矩形

![](/uploads/algorithm1.png "A")

```java
public class A {
    public static void main(String[] args) {
        a(9);
    }

    private static void a(int n) {
        int[][] ints = new int[n][n];
        int x = 0, y = 0;
        int number = 1;
        while (true) {
            while (x < n && ints[y][x] == 0) {
                ints[y][x] = number++;
                x++;
            }
            b(ints);
            y++;
            x--;
            while (y < n && ints[y][x] == 0) {
                ints[y][x] = number++;
                y++;
            }
            b(ints);
            y--;
            x--;
            while (x >= 0 && ints[y][x] == 0) {
                ints[y][x] = number++;
                x--;
            }
            b(ints);
            y--;
            x++;
            while (y >= 0 && ints[y][x] == 0) {
                ints[y][x] = number++;
                y--;
            }
            b(ints);
            y++;
            x++;
            if (number > n * n) {
                break;
            }
        }
        b(ints);
    }

    private static void b(int[][] ints) {
        for (int[] ints2 : ints) {
            for (int i : ints2) {
                System.out.print(i + "\t");
            }
            System.out.println();
        }
        System.out.println("----------------------");
    }
}
```

---

![](/uploads/algorithm2.png "B")

```java
public class B {
    public static void main(String[] args) {
        a(9);
    }

    private static void a(int n) {
        int[][] ints = new int[n][n];
        int x = 0, y = 0;
        int number = 1;
        ints[y][x] = number++;
        while (true) {
            if (x < n - 1 && y < n - 1) {
                y++;
                ints[y][x] = number++;
                b(ints);
                y--;
                x++;
                while (y >= 0) {
                    ints[y][x] = number++;
                    y--;
                    x++;
                }
                b(ints);
                y++;
                while (x >= 0) {
                    ints[y][x] = number++;
                    y++;
                    x--;
                }
                b(ints);
                y--;
                x++;
            } else {
                x++;
                while (x < n) {
                    ints[y][x] = number++;
                    x++;
                    y--;
                }
                x--;
                y++;
                y++;
                while (y < n) {
                    ints[y][x] = number++;
                    x--;
                    y++;
                }
                x++;
                y--;
                b(ints);
            }
            if (number > n * n) {
                break;
            }
        }
        b(ints);
    }

    private static void b(int[][] ints) {
        for (int[] ints2 : ints) {
            for (int i : ints2) {
                System.out.print(i + "\t");
            }
            System.out.println();
        }
        System.out.println("----------------------");
    }
}
```

## 使用位运算实现加减乘
```java
public class A {
    public static void main(String[] args) {
        int x = 456;
        int y = 789;

        System.out.println(x + y);
        System.out.println(x - y);
        System.out.println(x * 3);
        System.out.println("—————————");
        System.out.println(a(x, y));
        System.out.println(b(x, y));
        System.out.println(c(x, 3));
    }

    private static int a(int x, int y) {     加（关键）
        int i;
        while (((x & y) != 0)) {     有进位
            i = x ^ y;
            y = (x & y) << 1;
            x = i;
        }
        i = x | y;     无进位
        return i;
    }

    private static int b(int x, int y) {     减（加负数）
        y = a(~y, 1);     转为负数（补码）
        return a(x, y);
    }

    private static int c(int x, int i) {     乘（加多次）
        int sum = 0;
        for (int j = 0; j < i; j++) {
            sum = a(sum, x);
        }
        return sum;
    }
}
----
输出：
1245
-333
1368
—————————
1245
-333
1368

-------------------------------------------------------

public class Test {
    public static void main(String[] args) {
        a();
        b();
        c();
    }

    private static void a() {     有进位（一次）
        int x = 1;     0001
        int y = 1;     0001
        int i = (x & y) << 1;     0010
        System.out.println(i);
    }

    private static void b() {     无进位
        int x = 2;     0010
        int y = 1;     0001
        int i = x | y;     0011
        System.out.println(i);
    }

    private static void c() {     有进位（二次）
        int x = 3;     0011
        int y = 1;     0001
        int i;
        while (((x & y) != 0)) {     有进位
            i = x ^ y;
            y = (x & y) << 1;
            x = i;
        }
        i = x | y;     无进位
        System.out.println(i);     0100
    }
}
----
输出：
2
3
4

PS：除法最后没实现，因为解决不了小数点的问题。
```

## 斐波那契数列
```java
public class A {
    public static void main(String[] args) {
        int x = 0;
        int y = 1;

        boolean b = true;
        System.out.print(x + " ");
        System.out.print(y + " ");
        for (int i = 0; i < 10; i++) {
            if (b) {
                b = false;
                x += y;
                System.out.print(x + " ");
            } else {
                b = true;
                y += x;
                System.out.print(y + " ");
            }
        }
    }
}
----
输出：（斐波那契数列前 12 项）
0 1 1 2 3 5 8 13 21 34 55 89
```

## Beautiful [String](https://hihocoder.com/contest/mstest2015oct/problem/1)
```java
public class A {
    private static boolean isFirst = true;
    private static boolean isBeautiful = true;
    private static int count;
    private static int i;

    public static void main(String[] args) {
        a("abc");
        a("aaab");
        a("abccde");
        a("abb");
    }

    private static void a(String s) {
        s.chars().forEach(value -> {
            if (isBeautiful) {
                if (isFirst) {
                    isFirst = false;
                    i = value;
                    count = 1;
                } else {
                    if (i != value) {
                        count++;
                        i++;
                        if (i != value) {
                            isBeautiful = false;
                        }
                    }
                }
            }
        });

        if (isBeautiful && count >= 3) {
            System.out.println("YES");
        } else {
            System.out.println("NO");
        }

        isFirst = true;
        isBeautiful = true;
    }
}
----
输出：
YES
NO
YES
NO
```

## 一个数的平方数的末三位等于其本身
```java
public class A {
    private static int i;
    private static int count;

    public static void main(String[] args) {
        for (; ; ) {
            i++;
            if (i == getInt(i)) {
                count++;
                System.out.println(i);
            }
            if (count > 1) {
                break;
            }
        }
    }

    private static int getInt(int aInt) {
        int tempInt = aInt * aInt;
        String s = String.valueOf(tempInt);
        try {
            String tempStr = s.substring(s.length() - 3);
            return Integer.valueOf(tempStr);
        } catch (StringIndexOutOfBoundsException e) {
            return 0;
        }
    }
}
----
输出：
376
625
```

```kotlin
fun main(args: Array<String>) {
    var i = 0
    var count = 0
    while (true) {
        i++
        if (i == getInt(i)) {
            count++
            println(i)
        }
        if (count > 1) {
            break
        }
    }
}

fun getInt(i: Int): Int {
    val s = (i * i).toString()
    try {
        return s.substring(s.length - 3).toInt()
    } catch (e: StringIndexOutOfBoundsException) {
        return 0
    }
}
----
输出：
376
625
```

## N 皇后（八皇后）
```java
import java.util.Scanner;

public class Main {
    private static int[] ints;//下标为行，值为对应列
    private static int count;//解法数

    public static void main(String[] args) {
        ints = new int[new Scanner(System.in).nextInt()];
        queen(0);
        System.out.println("共 " + count + " 种");
    }

    /**
     * 递归放置皇后。
     *
     * @param k 当前放置行。
     */
    private static void queen(int k) {
        if (k > ints.length - 1) {//所有行都已经放置完毕，解法数加一
            count++;
            show();
        } else {
            for (int i = 0; i < ints.length; i++) {//遍历测试行的每一列
                ints[k] = i;
                if (place(k)) {
                    queen(k + 1);//当前行的行列位置可以放置皇后，递归前往下一行
                }
            }
        }
    }

    /**
     * 判断当前行的行列位置是否可以放置皇后（与之前的皇后是否冲突）。
     *
     * @param k 当前放置行。
     * @return true 为可以放置，false 反之。
     */
    private static boolean place(int k) {
        for (int j = 0; j < k; j++) {//遍历之前的行与其进行比较
            if (ints[j] == ints[k] || Math.abs(ints[j] - ints[k]) == Math.abs(j - k)) {//皇后不能为同列，同对角线
                return false;
            }
        }
        return true;
    }

    /**
     * 显示摆法。
     */
    private static void show() {
        for (int i : ints) {
            for (int j = 0; j < ints.length; j++) {
                if (j == i) {
                    System.out.print("✖");//皇后
                } else {
                    System.out.print("◯");
                }
            }
            System.out.println();
        }
        System.out.println("——————————————————");
    }
}
```

## 2N 皇后
```java
import java.util.Scanner;

public class Main {
    private static int[][] ints;//棋盘
    private static int[] b;//下标为行，值为对应列
    private static int[] w;//下标为行，值为对应列
    private static int count;//解法数

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int i = scanner.nextInt();
        ints = new int[i][i];
        b = new int[i];
        w = new int[i];

        for (int m = 0; m < i; m++) {
            for (int n = 0; n < i; n++) {
                if (scanner.nextInt() == 0) {
                    ints[m][n] = -1;
                }
            }
        }

        queen(0, true);//开始放置白皇后
        System.out.println(count);
    }

    /**
     * 递归放置皇后。
     *
     * @param k 当前放置行。
     */
    private static void queen(int k, boolean who) {
        if (k > ints.length - 1) {//所有行都已经放置完毕，解法数加一
            count++;
        } else {
            for (int i = 0; i < ints.length; i++) {//遍历测试行的每一列
                if (who) {
                    w[k] = i;
                } else {
                    b[k] = i;
                }
                if (place(k, who)) {
                    if (who && k + 1 > ints.length - 1) {//白皇后的所有行都已经放置完毕，开始放置黑皇后
                        queen(0, false);
                    } else {
                        queen(k + 1, who);//当前行的行列位置可以放置皇后，递归前往下一行
                    }
                }
            }
        }
    }

    /**
     * 判断当前行的行列位置是否可以放置皇后（与之前的皇后是否冲突）。
     *
     * @param k 当前放置行。
     * @return true 为可以放置，false 反之。
     */
    private static boolean place(int k, boolean who) {
        if (who) {
            if (ints[k][w[k]] == -1) {
                return false;
            }
        } else {
            if (ints[k][b[k]] == -1 || w[k] == b[k]) {
                return false;
            }
        }
        for (int j = 0; j < k; j++) {//遍历之前的行与其进行比较
            if (who) {
                if (w[j] == w[k] || Math.abs(w[j] - w[k]) == Math.abs(j - k)) {//皇后不能为同列，同对角线
                    return false;
                }
            } else {
                if (b[j] == b[k] || Math.abs(b[j] - b[k]) == Math.abs(j - k)) {//皇后不能为同列，同对角线
                    return false;
                }
            }
        }
        return true;
    }
}
```

## 全排列
```java
import java.util.Arrays;
import java.util.Scanner;

public class Main {
//    private static char[] chars;
    private static int[] ints;//放法
    private static int count;//放法数

    public static void main(String[] args) {
//        chars = new Scanner(System.in).next().toCharArray();
//        ints = new int[chars.length];
        ints = new int[new Scanner(System.in).nextInt()];
        permutation(0);
        System.out.println("共 " + count + " 种");
    }

    /**
     * 递归放置元素。
     *
     * @param k 当前索引位置。
     */
    private static void permutation(int k) {
        if (k > ints.length - 1) {//所有索引位置（元素）都已经放置完毕，放法数加一
            count++;
            show();
        } else {
            for (int i = 0; i < ints.length; i++) {//测试当前索引位置，遍历放置每一个元素
                ints[k] = i;
                if (place(k)) {
                    permutation(k + 1);//当前索引位置的元素可以放置，递归前往下一个索引位置
                }
            }
        }
    }

    /**
     * 判断当前索引位置的元素与之前索引位置的元素是否冲突（重复）。
     *
     * @param k 当前索引位置。
     * @return true 为可以放置，false 反之。
     */
    private static boolean place(int k) {
        for (int j = 0; j < k; j++) {//遍历之前的索引位置与其进行比较
            if (ints[j] == ints[k]) {//元素不能重复
                return false;
            }
        }
        return true;
    }

    /**
     * 显示放法。
     */
    private static void show() {
//        for (int i : ints) {
//            System.out.print(chars[i]);
//        }
//        System.out.println();
        System.out.println(Arrays.toString(ints));
    }
}
----
输入：
3
输出：
[0, 1, 2]
[0, 2, 1]
[1, 0, 2]
[1, 2, 0]
[2, 0, 1]
[2, 1, 0]
共 6 种
```

## 凑算式
```java
暴力解法
----
public class Main {
    public static void main(String[] args) {
        int count = 0;

        for (double a = 1; a <= 9; a++) {
            for (double b = 1; b <= 9; b++) {
                if (b != a) {
                    for (double c = 1; c <= 9; c++) {
                        if (c != b && c != a) {
                            for (double d = 1; d <= 9; d++) {
                                if (d != c && d != b && d != a) {
                                    for (double e = 1; e <= 9; e++) {
                                        if (e != d && e != c && e != b && e != a) {
                                            for (double f = 1; f <= 9; f++) {
                                                if (f != e && f != d && f != c && f != b && f != a) {
                                                    for (double g = 1; g <= 9; g++) {
                                                        if (g != f && g != e && g != d && g != c && g != b && g != a) {
                                                            for (double h = 1; h <= 9; h++) {
                                                                if (h != g && h != f && h != e && h != d && h != c && h != b && h != a) {
                                                                    for (double i = 1; i <= 9; i++) {
                                                                        if (i != h && i != g && i != f && i != e && i != d && i != c && i != b && i != a) {

//                                                                            double d1 = new BigDecimal(b / (double) c).setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
//                                                                            double d2 = new BigDecimal((d * 100 + e * 10 + f) / (double) (g * 100 + h * 10 + i)).setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
//                                                                            double m = a + d1 + d2;
                                                                            double m = a + b / c + (d * 100 + e * 10 + f) / (g * 100 + h * 10 + i);
                                                                            if (m == 10) {
                                                                                count++;
                                                                            }

                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        System.out.println(count);
    }
}
----
输出：
29

-------------------------------------------------------
使用全排列后：

public class Main {
    private static int[] ints = new int[9];
    private static int count;

    public static void main(String[] args) {
        permutation(0);
        System.out.println(count);
    }

    private static void permutation(int k) {
        if (k > ints.length - 1) {
            suitable();
        } else {
            for (int i = 0; i < ints.length; i++) {
                ints[k] = i;
                if (place(k)) {
                    permutation(k + 1);
                }
            }
        }
    }

    private static boolean place(int k) {
        for (int j = 0; j < k; j++) {
            if (ints[j] == ints[k]) {
                return false;
            }
        }
        return true;
    }

    private static void suitable() {
        double a = ints[0] + 1;
        double b = ints[1] + 1;
        double c = ints[2] + 1;
        double d = ints[3] + 1;
        double e = ints[4] + 1;
        double f = ints[5] + 1;
        double g = ints[6] + 1;
        double h = ints[7] + 1;
        double i = ints[8] + 1;
        double m = a + b / c + (d * 100 + e * 10 + f) / (g * 100 + h * 10 + i);
        if (m == 10) {
//            System.out.println(Arrays.toString(ints));
            count++;
        }
    }
}
```

## 猜算式
```java
public class Main {
    private static int[] ints;

    public static void main(String[] args) {
        for (int x = 100; x <= 999; x++) {
            for (int y = 100; y <= 999; y++) {
                ints = new int[10];
                int a = x * (y / 1 % 10);
                int b = x * (y / 10 % 10);
                int c = x * (y / 100 % 10);
                if (a >= 100 && a < 1000 && b >= 100 && b < 1000 && c >= 100 && c < 1000 && x * y >= 10000 && x * y < 100000 && check(x) && check(y) && check(a) && check(b) && check(c) && check(x * y)) {
                    System.out.println(x + " " + y + " " + a + " " + b + " " + c + " " + x * y);
                }
            }
        }
    }

    private static boolean check(int i) {
        for (; i != 0; i /= 10) {
            int j = i % 10;
            ints[j]++;
            if (ints[j] == 3) {
                return false;
            }
        }
        return true;
    }
}
----
输出：
179 224 716 358 358 40096

-------------------------------------------------------

public class Main {
    private static int[] ints;

    public static void main(String[] args) {
        a(100);
    }

    private static void a(int x) {
        if (x > 999) {
            return;
        } else {
            for (int y = 100; y <= 999; y++) {
                ints = new int[10];
                int a = x * (y / 1 % 10);
                int b = x * (y / 10 % 10);
                int c = x * (y / 100 % 10);
                if (a >= 100 && a < 1000 && b >= 100 && b < 1000 && c >= 100 && c < 1000 && x * y >= 10000 && x * y < 100000 && b(x) && b(y) && b(a) && b(b) && b(c) && b(x * y)) {
                    System.out.println(x + " " + y + " " + a + " " + b + " " + c + " " + x * y);
                }
            }
            a(x + 1);
        }
    }

    private static boolean b(int i) {
        for (; i != 0; i /= 10) {
            int j = i % 10;
            ints[j]++;
            if (ints[j] == 3) {
                return false;
            }
        }
        return true;
    }
}
----
输出：
179 224 716 358 358 40096
```

## 地产大亨
```java
public class Main {
    private static int[] ints = new int[10];//下标为指数，值为个数

    public static void main(String[] args) {
        a(0);
    }

    private static void a(int k) {
        if (k > ints.length - 1) {
            return;
        } else {
            for (int i = 0; i < 6; i++) {
                ints[k] = i;
                if (b(k)) {
                    a(k + 1);
                }
            }
        }
    }

    private static boolean b(int k) {
        double sum = 0;
        for (int i = 0; i <= k; i++) {
            sum += Math.pow(7, i) * ints[i];
        }
        if (sum == 1000000) {
            StringBuilder s = new StringBuilder();
            int n = 0;
            for (int i = 0; i <= k; i++) {
                s.append(ints[i]);
                n += ints[i];
            }
            System.out.println(s);
            System.out.println(n);
            System.exit(0);//结束运行
        }
        return sum < 1000000;
    }
}
----
输出：
11333311
16

-------------------------------------------------------

public class Main {
    public static void main(String[] args) {
        String s = Integer.toString(1000000, 7);
        int n = 0;
        for (int i = Integer.parseInt(s); i != 0; i /= 10) {//遍历数的每一位
            n += i % 10;
        }
        System.out.println(s);
        System.out.println(n);
    }
}
----
输出：
11333311
16
```

## 质数判断
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int i = new Scanner(System.in).nextInt();
        if (a(i)) {
            System.out.println("yes");
        } else {
            System.out.println("no");
        }
    }

    private static boolean a(int i) {
        if (i <= 3) {
            return i > 1;     2 和 3 是质数
        }
        for (int j = 2; j < Math.sqrt(i); j++) {
            if (i % j == 0) {
                return false;     能够被 1 和其本身之外的数整除的数不是质数
            }
        }
        return true;
    }
}

质数：除了 1 和其本身之外再无其他因数。（例如 2、3、5、7 是，4、6、8、9 不是）
```

## 煤球数目
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int i = new Scanner(System.in).nextInt();
        int j = 0;
        int x = 0;
        long sum = 0;
        for (int k = 0; k < i; k++) {
            j++;
            x += j;
            sum += x;
        }
        System.out.println(sum);
    }
}
```

## 平方怪圈
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int i = new Scanner(System.in).nextInt();
        for (int j = 0; j < 100; j++) {
            char[] chars = String.valueOf(i).toCharArray();
            i = 0;
            for (char c : chars) {
                int temp = Integer.valueOf(String.valueOf(c));     此方法创建了多个对象，内存使用率较高
                i += (temp * temp);
            }
            System.out.println(i);
        }
    }
}

-------------------------------------------------------
遍历数的每一位

public class Main {
    public static void main(String[] args) {
        int i = 1234567;

        while (i != 0) {     第 1 种
            System.out.println(i % 10);
            i /= 10;
        }

        for (; i != 0; i /= 10) {     第 2 种
            System.out.println(i % 10);
        }

//      System.out.println(i / 1 % 10);
//      System.out.println(i / 10 % 10);
//      System.out.println(i / 100 % 10);
//      System.out.println(i / 1000 % 10);
//      System.out.println(i / 10000 % 10);
//      System.out.println(i / 100000 % 10);
//      System.out.println(i / 1000000 % 10);
    }
}
----
输出：
7
6
5
4
3
2
1

-------------------------------------------------------
改进版本

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int i = new Scanner(System.in).nextInt();
        for (int j = 0; j < 100; j++) {
            int sum = 0;
            while (i > 0) {
                int x = i % 10;
                sum += (x * x);
                i /= 10;
            }
            i = sum;
            System.out.println(i);
        }
    }
}
```

## 报数游戏
```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
//        Scanner scanner = new Scanner(System.in);
//        int n = scanner.nextInt();
//        int m = scanner.nextInt();
        int n = 15;
        int m = 3;

        int[] ints = new int[n];//0 未出局，1 已出局
        int out = 0;//出局人数
        int count = 0;//计数器
        while (out != n - 1) {
            for (int i = 0; i < ints.length; i++) {
                if (ints[i] != 1) {
                    count++;
                    if (count == m) {
                        ints[i] = 1;
                        count = 0;
                        out++;
                    }
                }
            }
        }

        System.out.println(Arrays.toString(ints));
        for (int i = 0; i < ints.length; i++) {
            if (ints[i] == 0) {
                System.out.println(i + 1);
                break;
            }
        }
    }
}
----
输出：
[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
5
```

## 立方尾不变
```java
public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 1; i <= 10000; i++) {
            long j = (long) Math.pow(i, 3);
            if (i == j % (long) Math.pow(10, a(i))) {
                count++;
            }
        }
        System.out.println(count);
    }

    private static int a(int i) {//返回数字的位数
        int n = 0;
        while (i != 0) {
            n++;
            i /= 10;
        }
        return n;
    }
}
----
输出：
36
```
