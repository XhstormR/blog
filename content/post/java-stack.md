+++
Categories = ["Stack"]
date = "2016-07-21T13:17:17+08:00"
title = "栈"

+++

<!--more-->

Updated on 2016-07-22

> ![](/uploads/java-stack.svg "Stack")

* 数据结构：相互之间存在一种或多种特定 **关系** 的数据元素的 **集合**。
  * 队列：先进先出（FIFO, First In First Out），队头 ⟺ 队尾。
      * 普通队列（劣），环形队列（优）。
  * 堆栈：后进先出（LIFO, Last In First Out），栈顶 ⟺ 栈底。
      * push：数据入栈。
      * pop：数据出栈，并作为此函数的值返回该对象。
      * peek：查看栈顶部的对象，但不从栈中移除它。
      * empty：测试栈是否为空。
      * search：返回对象在栈中的位置。

### 以固定顺序进栈，求出栈顺序总数
1 个元素进栈有 1 种出栈顺序，2 个元素进栈有 2 种出栈顺序，3 个元素进栈有 5 种出栈顺序

把 `n` 个元素的出栈顺序数记为 `f(n)`，则对于 `1`、 `2`、 `3` 元素可得出：

* f(1) = 1 // 1
* f(2) = 2 // 12、21
* f(3) = 5 // 123、132、213、321、231

那么对于 `f(4)`，给其 4 个元素编号为 a，b，c，d；假设进栈顺序为 abcd，考虑出栈顺序元素 a 出现在1号位置、2号位置、3号位置、4号位置的情况：

* a 在1号位置：只可能 a 进栈，再马上出栈；还剩 b，c，d，即子问题 `f(3)`。
* a 在2号位置：有1个元素比 a 先出栈，即子问题 `f(1)`（只能是 b）；还剩 c，d，即子问题 `f(2)`；那么一共的顺序个数为 `f(1)` * `f(2)`。
* a 在3号位置：有2个元素比 a 先出栈，即子问题 `f(2)`（只能是 b，c）；还剩 d，即子问题 `f(1)`；那么一共的顺序个数为 `f(2)` * `f(1)`。
* a 在4号位置：a 最后出栈，即求前面 b，c，d 的出栈顺序，即子问题 `f(3)`。

结合所有情况，即：f(4) = f(3) + f(1)*f(2) + f(2)*f(1) + f(3)

再规整化，定义 `f(0) = 1`，即：f(4) = f(0)*f(3) + f(1)*f(2) + f(2)*f(1) + f(3)*f(0)

再推广至 n，即：f(n) = f(0)*f(n-1) + f(1)*f(n-2) + ... + f(n-2)*f(1) + f(n-1)*f(0)

化简为递推公式：

![](/uploads/java-stack-catalan1.png "Catalan")

推出通项公式：

![](/uploads/java-stack-catalan2.png "Catalan")

Reference：https://en.wikipedia.org/wiki/Catalan_number

![](/uploads/java-stack.png "Stack")

```java
10进制转化
----
public class A {
    public static void main(String[] args) {
        System.out.println(conversion(6, 2));     6 转为 2进制
    }

    private static StringBuilder conversion(int num, int n) {
        Stack<Integer> stack = new Stack<Integer>();     新建一个栈
        for (; ; ) {
            stack.push(num % n);     余数入栈
            num /= n;
            if (num == 0) {
                break;
            }
        }
        return new StringBuilder(stack.toString()).reverse();     ①
    }
}
注 ①：
1
1
0   ➜   [0, 1, 1]   ➜   ]1 ,1 ,0[
----
输出：
]1 ,1 ,0[

-------------------------------------------------------

括号配对问题（消消乐）
----
public class A {
    public static void main(String[] args) {
        System.out.println(isMatch("(])"));
        System.out.println(isMatch("([[]()])"));
    }

    private static boolean isMatch(String str) {
        Stack<Character> stack = new Stack<Character>();     新建一个栈
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == '(') {
                stack.push('(');     数据入栈
            }
            if (str.charAt(i) == ')') {
                if (!stack.empty() && stack.pop() == '(') {     匹配成功，数据出栈
                    continue;
                } else {
                    return false;
                }
            }
            if (str.charAt(i) == '[') {
                stack.push('[');     数据入栈
            }
            if (str.charAt(i) == ']') {
                if (!stack.empty() && stack.pop() == '[') {     匹配成功，数据出栈
                    continue;
                } else {
                    return false;
                }
            }
        }
        return stack.empty();     判断栈是否为空（其实到这步可以直接返回 true）
    }
}
----
输出：
false
true

-------------------------------------------------------

中缀表达式转为后缀表达式
----

```