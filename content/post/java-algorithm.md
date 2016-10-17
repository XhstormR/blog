+++
Categories = ["JAVA"]
date = "2016-10-15T10:23:45+08:00"
title = "Algorithm"

+++

<!--more-->

Updated on 2016-10-15

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
        List<Integer> list = Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        Collections.shuffle(list);
        Integer[] ints = list.toArray(new Integer[0]);

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