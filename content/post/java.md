+++
Categories = ["JAVA"]
date = "2016-06-10T11:04:52+08:00"
title = "自学 Java"

+++

<!--more-->

Updated on 2016-06-15

> ![](/uploads/java.png "Java")
>
> http://www.eclipse.org/
>
> http://www.tiobe.com/tiobe_index
>
> http://www.oracle.com/technetwork/java/index.html
>
> http://docs.oracle.com/javase/8/docs/api/overview-frame.html

## JDK
* JDK：Java Development Kit（Java 开发工具包）
  * JRE：Java Runtime Environment（Java 运行环境）
  * JVM：Java Virtual Machine（Java 虚拟机）

## Edition
||微型版(Micro Edition)|标准版(Standard Edition)|企业版(Enterprise Edition)|
|:--|:--|:--|:--|
|旧名|J2ME|J2SE|J2EE|
|新名|Java ME|Java SE|Java EE|
|类库|只包含SE中的一部分|核心类库|包含SE中的和企业扩展类|
|---------|--------------------------------|-----------------------------------|-----------------------------------|

## 环境变量
|变量值|变量名||
|:--|:--|:--|
|JAVA_HOME|C:\Program Files\Java\jdk1.8.0_92|配置JDK安装路径|
|PATH|%JAVA_HOME%\bin|配置命令文件位置|
|CLASSPATH|.;%JAVA_HOME%\lib|配置类库文件位置|
|---------------------|------------------------------------------------|-----------------------|

## 跨平台原理
|a.java|javac|a.class|java|JVM|HelloWorld!|
|:--|:--|:--|:--|:--|:--|
|源代码|编译器|字节码|解释器|虚拟机|
|-----------|-----------|-----------|-----------|-----------|---------------》|

## CMD
```java
---------
public class a{
    public static void main(String[]args){
        System.out.println("HelloWorld!");
    }
}
---------
D:\>javac a.java
D:\>java a     java命令不跟文件后缀名
HelloWorld!
```

## Eclipse
汉化包：http://www.eclipse.org/babel/downloads.php

#### 快捷键
```
F2     显示错误提示
F11     调试运行
Shift+Enter     在当前行的下一行插入空行
Ctrl+1     快速修正
Ctrl+D     删除行
ALT+↑↓     移动行
ALT+/     内容辅助
Ctrl+ALT+/     文字补全
Ctrl+Shift+F     格式化代码
ALT+Shift+J     生成文档注释
```

## Java 规范
* 源文件名：源文件名应该和类名相同。
* 主方法入口：所有的 Java 程序由 `public static void main(String[]args)` 方法处开始执行。
* 变量：包含变量类型、变量名、变量值 3 个元素。`String name="Dave";`
* 常量：一种特殊的变量，由 final 修饰，值不能被改变。`final char SEX = '男';`
  * final 在修饰成员变量时，必须同时设定初值。
* 自动类型转换：表数范围小的可以向表数范围大的进行自动类型转换；将一个小容器的水倒入一个大容器没有问题，但是将一个大容器的水倒入一个小容器则会装不下，会溢出。byte→short(char)→int→long→float→double
* 强制类型转换：直接截断，不会进行四舍五入。`int a = (int)3.1415926;`
* 注释：单行注释（`//`），多行注释（`/**/`）。
* 标识符：用于给 Java 程序中类、方法、变量等命名的符号，严格区分大小写。
  * 只能由字母，数字， `_` ， `$` 组成，且不能以数字开头。
  * 类名：首字母大写，大驼峰式命名法，MyFirstJavaClass。
  * 方法名，变量名：首字母小写，小驼峰式命名法，stuName。
* 运算符：算术运算符、赋值运算符、比较运算符、逻辑运算符、条件运算符。
  * 条件运算符：也称为三元运算符（?:）。`String str1 = (8 > 5) ? "8大于5" : "8不大于5";`
      * 语法形式：**布尔表达式 ？ 表达式1 ：表达式2**
      * 运算过程：如果布尔表达式的值为 **true** ，则返回 **表达式1** 的值，否则返回 **表达式2** 的值。
* 条件语句 switch：当 switch 后表达式的值和 case 语句后的值相同时，从该位置开始向下执行，直到遇到 break 语句或者 switch 语句块结束；如果没有匹配的 case 语句则执行 **default** 块的代码。
  * switch 后面小括号中表达式的值必须是 **整型或字符型** 。
  * case 匹配后，如果没有遇见 **break** 会继续执行下一个的 case 块的内容，直到遇到 break 语句或者 switch 语句块结束。
  * default 块可以出现在 **任意位置**，也 **可以省略**
* 循环语句 for：for 关键字后面括号中的三个表达式都可以省略，但两个 `;` 不能省略。
  * for 循环变量初始化和循环变量变化部分，可以使用 `,` 同时初始化或改变多个循环变量的值。
* 数组：

---

![](/uploads/java-identifiers.svg "标识符")

![](/uploads/java-arithmetic.svg "算术运算符")

![](/uploads/java-assignment.svg "赋值运算符")

![](/uploads/java-comparison.svg "比较运算符")

![](/uploads/java-logical.svg "逻辑运算符")

![](/uploads/java-dataType.svg "数据类型")

![](/uploads/java-processControl.svg "流程控制")

---

```java
String a = "你好";     //声明变量的同时进行初始化
----
String a;     //先声明后赋值
a = "你好";

Man b = new Man();     //声明对象的同时进行实例化
----
Man b;     //先声明后实例化
b = new Man();

int i = 5;
int b = i++;     //先进行赋值，再执行自增，b=5
----
int i = 5;
int b = ++i;     //先执行自增，再进行赋值，b=6

-------------------------------------------------------

流程控制语句
条件语句 if
int score = 85;
if (score > 80) {
    System.out.println("奖励手机");
}

条件语句 if...else
int score = 85;
if (score > 80) {
    System.out.println("奖励手机");
} else {
    System.out.println("罚做俯卧撑");
}

条件语句 多重if
int score = 85;
if (score > 80) {
    System.out.println("奖励手机");
} else if (score > 60) {
    System.out.println("奖励鼠标");
} else {     //前面的条件均不成立时，才会执行 else 块内的代码
    System.out.println("罚做俯卧撑");
}

条件语句 嵌套if
String today = "周末";
String weather = "晴朗";
if (today.equals("周末")) {     //equals()用于判断字符串内容是否相同，也可用 today == "周末"
    //内层if 开始
    if (weather.equals("晴朗")) {
        System.out.println("去散步");
    } else {
        System.out.println("待在家");
    }
    //内层if 结束
} else {
    System.out.println("去上班");
}

条件语句 switch
int num = 1;
switch (num) {
case 1:
	System.out.println("第一名");
	break;
case 2:
	System.out.println("第二名");
	break;
case 3:
	System.out.println("第三名");
	break;
case 4:     //可以把功能相同的 case 语句合并起来
case 5:
	System.out.println("鼓励奖");
default:
	System.out.println("没有名次");
	break;
}

循环语句 while
int i = 1;
while (i <= 5) {     //先判断，后执行
	System.out.println(i);
	i++;
}

循环语句 do...while
int i = 1;
do {     //先执行，后判断，so无条件至少会执行一次
	System.out.println(i);
	i++;
} while (i <= 5);

循环语句 for
for (int i = 1; i <= 5; i++) {     //结构更加简洁易读
	System.out.println(i);
}

循环跳转语句 break
int sum = 0;
for (int i = 1; i <= 10; i++) {
	sum = sum + i;
	if (sum > 20) {
		System.out.print("当前的累加值为:" + sum);
		break;     //循环将 1 到 10 之间的整数相加，如果满足累加值大于 20，则跳出循环
	}
}

循环跳转语句 continue
int sum = 0;
for (int i = 1; i <= 10; i++) {
	if (i % 2 == 1) {
		continue;     //如果i为奇数,结束本次循环，进行下一次循环
	}
	sum = sum + i;
}
System.out.print("1到10之间的所有偶数的和为：" + sum);
----
i % 2 == 1     //i是奇数
i % 2 == 0     //i是偶数

循环语句 多重循环 打印九九乘法表     //外层循环每执行一次，内层循环要执行一圈
for (int i = 1; i <= 9; i++) {     //外层循环控制打印行数
	for (int x = 1, y = i; x <= y; x++) {     //内层循环控制打印公式
		System.out.print(x + "*" + y + "=" + x * y + "  ");     //print() 不会换行，println() 会换行
	}
	System.out.println();     //打印完毕换行
}
```