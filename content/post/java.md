+++
Categories = ["JAVA"]
date = "2016-06-10T11:04:52+08:00"
title = "自学 Java"

+++

<!--more-->

Updated on 2016-06-30

> {{< image "/uploads/java.png" "Java" "1" "1" >}}
>
> http://www.tiobe.com/tiobe_index
>
> http://www.oracle.com/technetwork/java/index.html
>
> http://docs.oracle.com/javase/8/docs/index.html
>
> http://docs.oracle.com/javase/8/docs/api/overview-frame.html | [中文版](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/index.html)

## IDE
* Eclipse：http://www.eclipse.org/downloads/eclipse-packages/
  * 汉化包：http://www.eclipse.org/babel/downloads.php
* IntelliJ IDEA：https://www.jetbrains.com/idea/download/
  * 将系统时间调整至 1 年以后再点击试用（Evaluation）。

### IDEA 快捷键
```xml
F2     查找错误

Ctrl+[]     转至大括号处
Ctrl+W     扩大选区
Ctrl+Y     删除行
Ctrl+D     复制行
Ctrl+G     转至行
Ctrl+B     转至声明处
Ctrl+R     替换文本
Ctrl+O     重写方法
Ctrl+H     查看类结构
Ctrl+P     方法参数提示
Ctrl+J     自动代码（Live Templates）
ALT+。   内容辅助（自己设置）
ALT+/     文字补全
ALT+1     打开或隐藏工程面板
ALT+Enter     快速修正
Shift+F6     重构 - 重命名

Ctrl+ALT+T     代码包围
Ctrl+ALT+L     格式化代码
Ctrl+ALT+O     清除无效包引用
Ctrl+Shift+J     合并行
Ctrl+Shift+U     大小写转换
Ctrl+Shift+Enter     完成声明

Ctrl+F9     Make Project
Ctrl+Shift+F10     Run

Ctrl+Shift+加     展开所有代码块
Ctrl+Shift+减     折叠所有代码块

Ctrl+ALT+S     设置
Ctrl+ALT+Shift+S     项目设置

Esc     返回编辑器
Shift+Esc     隐藏最近使用的工具窗口

F3     搜索关键字
ALT+F3     高亮选中文本（same as Ctrl+F）

F12     查看最近使用的工具窗口
Ctrl+F12     查看文件结构
Ctrl+ALT+F12     查看文件路径

ALT+Insert     生成方法
Ctrl+ALT+Insert     新建文件
Ctrl+Shift+Insert     历史复制板
Ctrl+Shift+ALT+Insert     新建临时文件

Ctrl+/     注释行（单行注释）
Ctrl+Shift+/     添加注释（多行注释）

Ctrl+Z     Undo
Ctrl+Shift+Z     Redo

Ctrl+Shift+C     复制绝对路径
Ctrl+Shift+ALT+C     复制相对路径

Ctrl+N     查找类
Ctrl+Shift+N     查找文件
Ctrl+Shift+ALT+N     查找变量

ALT+←→     切换文件
ALT+↑↓     切换方法

ALT+Shift+↑↓     移动行
Ctrl+Shift+↑↓     移动方法

Shift+Enter     在当前行的下一行插入空行
Ctrl+ALT+Enter     在当前行的上一行插入空行
```

### Eclipse 快捷键
```xml
F2     显示工具提示
F3     打开声明文件
F6     调试 - 单步跳过
F11     调试运行

Ctrl+1     快速修正
Ctrl+/     单行注释
Ctrl+S     保存
Ctrl+W     关闭文件
Ctrl+D     删除行
Ctrl+L     转至行
ALT+↑↓     移动行
ALT+/     内容辅助
Shift+Enter     在当前行的下一行插入空行

Ctrl+ALT+/     文字补全
Ctrl+ALT+↑↓     复制行
Ctrl+Shift+S     全部保存
Ctrl+Shift+F     格式化代码
Ctrl+Shift+O     自动导入需要的包
ALT+Shift+J     生成文档注释
ALT+Shift+R     重构 - 重命名
```

## [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
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
public class A{
    public static void main(String[] args){
        System.out.println("HelloWorld!");
    }
}
---------
D:\>javac A.java
D:\>java A     java命令不跟文件后缀名
HelloWorld!
```

## JRE and JAR
1. 复制 `JAVA_HOME` 下的 `jre` 目录到 `123` 目录。
2. 导出项目的 `jar` 包至 `123` 目录。
3. 在 `123` 目录新建 `123.bat` 文件。

{{< image "/uploads/java-jre.png" "" "0" "1" >}}

```xml
123.bat
⇳
cmd /K jre\bin\java -jar 123.jar
```

## Java 规范
* 源文件名：源文件名应该和类名相同。
* 程序入口：所有的 Java 程序由 `public static void main(String[] args)` 方法处开始执行。
* 变量：包含变量类型、变量名、变量值 3 个元素。`String name="Dave";`
  * 常量：一种特殊的变量，由 final 修饰，值不能被改变。`final char SEX = '男';`
      * final 在修饰成员变量时，必须同时设定初值。
* 自动类型转换：表数范围小的可以向表数范围大的进行自动类型转换；将一个小容器的水倒入一个大容器没有问题，但是将一个大容器的水倒入一个小容器则会装不下，会溢出。byte→short(char)→int→long→float→double
* 强制类型转换：直接截断，不会进行四舍五入。`int a = (int)3.1415926;`
* 注释：单行注释（`//`），多行注释（`/**/`），文档注释（`/***/`）。
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
  * default 块可以出现在 **任意位置**，也 **可以省略**。
* 循环语句 for：for 关键字后面括号中的三个表达式都可以省略，但两个 `;` 不能省略。
  * for 循环变量初始化和循环变量变化部分，可以使用 `,` 同时初始化或改变多个循环变量的值。
* 数组（Array）：使用 `数组名.length` 获取数组的长度；使用 `数组名[下标]` 来访问；数组的下标从 0 开始，如长度为 3 ，则下标为 0，1，2。
  * 二维数组：特殊的一维数组，它的每个数组空间中保存的是一个一维数组。
* 方法：用来解决一类问题的代码组合，是一个功能模块。通过 `对象名.方法名()` 调用方法。
  * 访问修饰符：public、protected、private、缺省。
  * 返回值类型：方法不返回任何值，则返回值类型指定为 void；方法具有返回值，则需要指定返回值的类型，并且在方法体中使用 return 语句返回值。
  * 形参：定义方法时的参数，目的是用来定义方法需要传入的参数的个数和类型。
  * 实参：调用方法时的参数，是传递给方法真正被处理的值。
  * 重载： **方法名相同** ，但是形参的个数、顺序或类型不同，则称为方法的重载。
      * 当调用被重载的方法时， Java 会根据参数的个数和类型来判断应该调用哪个重载方法，参数完全匹配的方法将被执行。
      * 判断方法重载的依据：●必须是在同一个类中●方法名相同●方法参数的个数、顺序或类型不同。

---

* 构造方法：是用来初始化对象的方法，与类同名且没有返回值。 `people a = new people();`
  * 当没有指定构造方法时，系统会自动生成一个无参构造方法。所以 **创建对象时,其实执行的是构造方法** 。
  * 有参构造方法的目的就是初始化对象中成员变量的值，并且可以通过条件语句判断值是否合理并赋予默认值。
* static：可以修饰变量、方法、初始化块，被称为静态成员，它属于整个类所有，即 **被类的所有对象共享** ；可以 **直接使用类名访问** ，不需要创建对象。
  * 静态成员属于整个类，当系统第一次使用该类时，就会为其分配内存空间直到该类被卸载才会进行资源回收。
  * 静态变量：无需创建对象直接通过类名访问。
  * 静态方法：无需创建对象直接通过类名访问。
  * 静态初始化块：静态初始化块只在类加载时执行，所以只会执行一次，同时静态初始化块只能给静态变量赋值，不能初始化普通的成员变量。
      * 初始化块：当创建类的实例时，会依次执行初始化块 `{...}`，可以通过初始化块进行数据赋值。
      * 对象实例化执行顺序：静态初始化块 ➜ 初始化块 ➜ 构造方法。

---

* 封装：将类的某些信息隐藏在类内部，不允许外部程序直接访问，而是通过该类提供的方法来实现对隐藏信息的操作和访问。
  * 优点：●只能通过规定的方法访问数据●隐藏类的实例细节，方便修改和实现。
  * 步骤：设置属性为 private ➜ 创建 getter/setter 方法用于属性的读写 ➜ 在 getter/setter 方法中对属性值的合法性进行判断。
* this：代表当前对象，在封装时常用于区分属性和参数。不能对静态成员使用 this，因为它跟对象没有关系。
  * this.属性：操作当前对象的属性。
  * this.方法：调用当前对象的方法。
* 内部类（Inner Class）：定义在 **一个类里面的类** ；与之对应，包含内部类的类被称为外部类。
  * 优点：●内部类提供了更好的封装，可以把内部类隐藏在外部类之内，不允许同一个包中的其他类访问该类●内部类的方法可以直接访问外部类的所有数据，包括私有的数据。
  * 成员内部类：定义了成员内部类后，必须通过外部类对象来创建内部类对象，而不能直接去 new 一个内部类对象。`内部类 对象名 = 外部类对象.new 内部类( );`
  * 静态内部类：用 `static` 修饰的成员内部类，不需要外部类的对象，可以直接创建。`内部类 对象名= new 内部类();`
  * 方法内部类：定义在方法中的类，只在该方法的内部可见，即只在该方法内可以使用。

---

* 继承（extends）：是类与类的一种关系，子类继承于父类（SuperClass），一个类只有一个父类，即单继承。`class 子类 extends 父类 {...}`
  * 优点：子类拥有父类所有的属性和方法（不能为 private），实现代码复用。
  * 重写：子类可以重写父类继承的方法，当调用方法时会优先调用子类的方法。
      * 规则：返回值类型、方法名、参数类型及个数都要与父类继承的方法相同，才为方法的重写。（换句话说 **只重写方法体**）
  * 继承初始化执行顺序：初始化父类（属性初始化 ➜ 构造方法） ➜ 初始化子类（相同）
      * 子类的构造过程中必须调用其父类的构造方法。如果子类的构造方法中没有显式调用父类的构造方法，则系统默认隐式调用父类无参构造方法 `super();`；若显式调用构造方法，则必须放在子类的构造方法第一行。
* super：代表父类对象。
  * super.属性：访问父类的属性。
  * super.方法：访问父类的方法。
* Object类：是 **所有类的父类**；如果一个类没有明确使用 extends 关键字继承另外一个类，那么这个类默认继承于 Object类，且 Object类中的方法适用于所有子类。
  * `toString()` 方法：输出对象在内存中的地址字符串。可以通过重写该方法输出对象的属性值，Eclipse 的源码(Source)菜单中的 `生成toString()` 能自动完成。
  * `equals()` 方法：比较对象的引用是否指向同一块内存地址（比较是否为同一部手机）（`==` 运算符也可以做到）。可以通过重写该方法比较两个对象的属性值是否一致（比较两部手机的属性），Eclipse 的源码(Source)菜单中的 `生成hashCode()和equals()` 能自动完成。
  * `getClass()` 方法：返回类对象。`example：Man b = new Man();`
      * 类对象：关注类的代码信息(有哪些属性、方法)。`Man`
      * 类的对象：关注对象的数据信息(属性值是多少)。`new Man()`

---

* 多态：对象的多种形态；**继承** 是多态的实现基础。
  * 引用多态
      * 父类的引用可以指向本类的对象。`Animal a = new Animal();`
      * 父类的引用可以指向 **子类** 的对象。`Animal b = new Dog();`
  * 方法多态
      * 指向本类对象时，调用的方法为本类方法。
      * 指向子类对象时，调用的方法为 **子类重写或继承的方法**。
          * 即子类独有的方法不可访问，不能通过父类的引用调用子类独有的方法。
* 引用类型转换：使用 `instanceof` 运算符判断一个引用是否是某个类型或某个类型的子类型，从而判断是否可以使用强制类型转换，返回布尔值，通常与 `if` 配合使用。`b instanceof Dog`
  * 向上类型转换（自动类型转换）：小类型到大类型的转换。`Animal b = new Dog();`
  * 向下类型转换（强制类型转换）：大类型到小类型的转换。`Dog c = (Dog)b;`
* 抽象类：用 `abstract` 修饰的类。`public abstract class Phone {...}`
  * 作用： **通过抽象方法约束子类** 必须包含某些方法，但不关注子类如何实现。
  * 规则
      * 用 `abstract` 修饰抽象方法，只有声明， **没有方法体**。`public abstract void call();`
      * 包含抽象方法的类是抽象类。
      * 抽象类可以包含普通方法，也可以没有抽象方法。
      * 抽象类不能直接创建，通过 **引用多态** 指向子类对象来使用。`Phone a = new SmartPhone();`
* 接口（interface）：使用 `interface` 定义接口，由全局常量和公共的抽象方法所组成。
  * 类描述对象的属性和方法，接口则包含类要具有的属性和要实现的方法，它定义了某一批类所要遵守的 **规范**。
      * 接口中的属性：常量，系统会自动添加 `public static final` 修饰符。
      * 接口中的方法：抽象方法，系统会自动添加 `public abstract` 修饰符。
  * 父类单继承（extends），接口多实现（ **implements**）。Java 中的类只能继承单个父类，不够灵活，可以 **通过实现多个接口做补充**。
      * 继承是 **is a** 的关系，谁是谁的关系；接口是 **has a** 的关系，谁有什么的关系。
  * 接口不能直接创建，通过 **引用多态** 指向实现接口的对象来使用。`IPlayGame b = new SmartPhone();`
  * 接口在使用过程中，经常与匿名内部类配合使用。
      * 匿名内部类：没有名字的内部类，不关注类的名字，在使用的时候才定义。

---

* 项目分析
  * 数据模型分析：通过对现实世界事物的主要特征进行抽象化处理，构建出数据结构。（类：方法、属性）
  * 业务模型分析：在设计应用程序之前，应该明确业务开展过程中需要的功能。
  * 显示和流程分析：显示界面的执行过程和流程的处理步骤。
* 面向对象编程（Object Oriented Programming）遵循 **高内聚，低耦合** 的设计原则。
  * 高内聚：块内联系，每个模块尽可能的独立完成某个 **特定的功能**，单一责任原则。
  * 低耦合：块间联系，模块之间的接口尽可能的 **少而简单**。
  * 通常各模块的内聚程度越高，模块间的耦合程度就越低。

## SVG

![](/uploads/java-identifiers.svg "标识符")

![](/uploads/java-final.svg "Final 关键字")

![](/uploads/java-access.svg "访问修饰符")

![](/uploads/java-wrapper.svg "包装类")

![](/uploads/java-wrapper-method.svg "包装类")

![](/uploads/java-arithmetic.svg "算术运算符")

![](/uploads/java-assignment.svg "赋值运算符")

![](/uploads/java-comparison.svg "比较运算符")

![](/uploads/java-logical.svg "逻辑运算符")

![](/uploads/java-interface.svg "接口")

![](/uploads/java-array.svg "数组")

![](/uploads/java-datatype.svg "数据类型")

![](/uploads/java-processControl.svg "流程控制语句")

![](/uploads/java-variable.svg "变量")

![](/uploads/java-class.svg "类和对象")

## Code

```java
int i = 5;
int b = i++;     //先进行赋值，再执行自增，b=5
----
int i = 5;
int b = ++i;     //先执行自增，再进行赋值，b=6

String a = "你好";     //声明变量的同时进行初始化
----
String a;     //先声明后赋值
a = "你好";

Man b = new Man();     //声明对象的同时进行实例化
----
Man b;     //先声明后实例化
b = new Man();

int[] scores = new int[4];     //声明数组的同时进行分配空间，数组长度为 4
----
int[] scores;     //先声明后分配空间，再赋值放入数据，数组长度为 4
scores = new int[4];
scores[0] = 76;
----
int[] scores = { 76, 83, 92, 87 };     //声明数组的同时进行分配空间和赋值

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
if (today.equals("周末")) {     //String 类的 equals() 用于判断字符串内容是否相同，也可用 today == "周末"
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
	break;
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
do {     //先执行，后判断，所以至少会无条件执行一次
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

获取用户输入数字并判断位数
----
import java.util.Scanner;     //导入 java.util 包下的 Scanner 类

public class HelloWorld {
	public static void main(String[] args) {
		Scanner a1 = new Scanner(System.in);     //实例化 Scanner 对象为 a1
		System.out.print("请输入:");     //提示用户输入，使用 print() 不换行
		int num = a1.nextInt();     //获取用户输入并保存在变量中
		int count = 0;
		for (; num != 0; count++) {
			num /= 10;
		}
		System.out.println(count + "位");
		a1.close();     //关闭输入
	}
}
----

获取用户输入班级成绩并计算平均分
----
import java.util.*;     //导入 java.util 包下的所有类

public class HelloWorld {
	public static void main(String[] args) {
		int classNum = 3;     //班级数量
		int stuNum = 4;     //学生数量
		double sum = 0;
		double avg = 0;
		Scanner a1 = new Scanner(System.in);     //实例化 Scanner 对象为 a1
		for (int i = 1; i <= classNum; i++) {
			sum = 0;     //重置班级总分
			System.out.println("请输入第" + i + "个班级的成绩");
			for (int j = 1; j <= stuNum; j++) {
				System.out.print("请输入成绩:");
				sum = sum + a1.nextInt();     //获取用户输入成绩并累加
			}
			avg = sum / stuNum;
			System.out.println("第" + i + "个班级的平均分是" + avg);
		}
		a1.close();     //关闭输入
	}
}
----

-------------------------------------------------------

循环遍历数组
int[] nums = { 1, 2, 3 };
for (int i = 0; i < nums.length; i++) {     //nums.length 获取数组长度
	System.out.println(nums[i]);
}
----
int[] nums = { 1, 2, 3 };
for (int a : nums) {
	System.out.println(a);     //可以使用foreach形式来遍历数组和集合，for 语句的简化版，更简单便捷
}

循环遍历二维数组
int[][] nums = { { 1, 2, 3 }, { 4, 5, 6 } };
for (int i = 0; i < nums.length; i++) {
	for (int j = 0; j < nums[i].length; j++) {
		System.out.println(nums[i][j]);
	}
	System.out.println();
}

使用 Arrays 类操作数组
----
import java.util.Arrays;

public class HelloWorld {
	public static void main(String[] args) {
		int[] scores = { 76, 83, 92, 87 };
		Arrays.sort(scores);     //将数组按升序排序
		String a = Arrays.toString(scores);     //将数组输出为字符串
		System.out.println(a);
	}
}
----

根据用户输入数字，随机生成排序后的数组，并打印数组输出的成字符串
----
import java.util.Arrays;
import java.util.Scanner;

public class HelloWorld {
	public static void main(String[] args) {
		HelloWorld a = new HelloWorld();     //创建对象
		Scanner b = new Scanner(System.in);     //创建对象

		System.out.print("请输入：");
		int num = b.nextInt();     //接收用户输入数字到变量
		int[] arrays = a.arrays(num);     //传递数字
		System.out.println(Arrays.toString(arrays));     //将数组输出为字符串
		b.close();     //关闭输入
	}

	public int[] arrays(int a) {     //方法
		int[] arrays = new int[a];     //生成数组
		for (int i = 0; i < arrays.length; i++) {
			arrays[i] = (int) (Math.random() * 100);     //生成随机数并赋值给数组
		}
		Arrays.sort(arrays);     //排序数组
		return arrays;     //返回数组
	}
}
----

遍历数组输出前三名并判断成绩有效性
----
import java.util.Arrays;

public class HelloWorld {
	public static void main(String[] args) {
		int[] scores = { 89, -23, 64, 91, 119, 52, 73 };
		HelloWorld a = new HelloWorld();
		a.rank(scores);
	}

	public void rank(int[] a) {     //方法
		Arrays.sort(a);     //排序数组
		System.out.println("前三名：");
		for (int i = a.length - 1, count = 0; count < 3; i--) {     //倒序遍历数组
			if (a[i] > 100 || a[i] < 0) {     //判断成绩有效性
				continue;
			}
			System.out.println(a[i]);
			count++;
		}
	}
}
----

遍历数组输出学生年龄的最大值
----
public class HelloWorld2 {
	public static void main(String[] args) {
		HelloWorld2 a = new HelloWorld2();     //创建对象
		int maxScore = a.getMaxAge();     //接收返回值
		System.out.println("最大年龄为：" + maxScore);
	}

	public int getMaxAge() {     //方法
		int[] a = { 19, 23, 21, 19, 25, 29, 17 };
		int max = 0;
		for (int i : a) {     //使用 foreach 形式来遍历数组
			max = max > i ? max : i;     //三元运算符
		}
		return max;
	}
}
----

-------------------------------------------------------

匿名内部类实现接口
IPlayGame i = new IPlayGame() {
	public void playGame() {
		System.out.println("匿名内部类实现接口的方式1");
	}
};
i.playGame();
----
new IPlayGame() {
	public void playGame() {
		System.out.println("匿名内部类实现接口的方式2");     //推荐方式2
	}
}.playGame();

-------------------------------------------------------

Scanner.nextLine() 的用法
Scanner scanner = new Scanner(System.in);
while (true) {
    try {
        int i = scanner.nextInt();
        System.out.println(i);
        break;
    } catch (Exception e) {
        scanner.nextLine();     消耗之前的错误输出，避免死循环
        System.out.println("请重新输入!");
    }
}

-------------------------------------------------------

Math 类
double i = 12.85;
----
Math.ceil(i)       13.0     返回大于参数的最小整数（向上取整）     天花板
Math.floor(i)     12.0     返回小于参数的最大整数（向下取整）     地板
Math.round(i)     13     返回四舍五入后的整数
(int)i     12     强制类型转换，直接截断

Math.random()     0.6019044390548263     返回 (0,1) 之间的随机浮点数

-------------------------------------------------------

System.currentTimeMillis()     返回 Unix 时间戳，单位为毫秒（除以 1000 即为标准 Unix 时间戳 (秒)）
System.nanoTime()     精确计时器，单位为毫微秒
     long l1 = System.nanoTime();
     Some code ...
     long l2 = System.nanoTime();
     System.out.println(l2 - l1);

-------------------------------------------------------

System.getProperties().list(System.out);     获取系统属性

Map<String, String> getenv = System.getenv();     获取环境变量
for (String s : getenv.keySet()) {
    System.out.println(s + "=" + getenv.get(s));
}
```

### 继承初始化执行顺序
```java
class Test1 {
    static {
        System.out.println("1父类静态初始化块");
    }

    {
        System.out.println("2父类初始化块");
    }

    Test1() {
        System.out.println("3父类构造方法");
    }
}
----
class Test2 extends Test1 {
    static {
        System.out.println("1子类静态初始化块");
    }

    {
        System.out.println("2子类初始化块");
    }

    Test2() {
        System.out.println("3子类构造方法");
    }
}
----
class Initial {
    public static void main(String[] args) {
        Test1 a = new Test2();
    }
}
----
输出：
1父类静态初始化块
1子类静态初始化块
2父类初始化块
3父类构造方法
2子类初始化块
3子类构造方法
```

### 装箱和拆箱
```java
装箱：把基本类型转换为包装类，使其具有对象的性质，分为手动装箱和自动装箱。
拆箱：和装箱相反，把包装类对象转换为基本类型的值，分为手动拆箱和自动拆箱。

int i = 5;
----
Integer x = new Integer(i);     手动装箱
Integer y = i;     自动装箱

Integer j = new Integer(10);
----
int m = j.intValue();     手动拆箱
int n = j;     自动拆箱
```