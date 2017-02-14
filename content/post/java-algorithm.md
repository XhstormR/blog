+++
Categories = ["JAVA"]
date = "2016-10-15T10:23:45+08:00"
title = "Algorithm"

+++

<!--more-->

Updated on 2016-11-20

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
