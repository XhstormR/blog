+++
Categories = ["Kotlin"]
date = "2016-12-25T10:31:02+08:00"
title = "Kotlin"

+++

<!--more-->

Updated on 2017-02-13

> {{< image "/uploads/kotlin2.svg" "Kotlin" "1" "1" "225" >}}
>
> https://kotlin.link/
>
> https://kotlinlang.org/
>
> https://devdocs.io/kotlin-reference/
>
> https://kotlinlang.org/docs/reference/idioms.html
>
> https://kotlinlang.org/api/latest/jvm/stdlib/index.html
>
> https://try.kotlinlang.org/
>
> https://kotlinlang.org/docs/kotlin-docs.pdf
>
> https://github.com/JetBrains/kotlin/releases/latest
>
> https://jcenter.bintray.com/org/jetbrains/kotlin/kotlin-stdlib/

## Code
```kotlin
// ABC

/* DEF
    GHI */

-------------------------------------------------------

fun main(args: Array<String>) {     main 函数（程序入口）
    println("Hello World!")
}

-------------------------------------------------------

val a: String     先声明后赋值（没有初始化时，必须显式声明类型）
a = "ABC"
----
val a: String = "ABC"     声明对象的同时进行实例化（显式声明类型）
----
val a = "ABC"     声明对象的同时进行实例化（自动推导类型）

-------------------------------------------------------
Kotlin 中没有（Primitive）基本数据类型，一切皆为（Reference）引用数据类型。

var a = 123     变量（引用可变 get/set）
val b = 123     常量（引用只读 get）

-------------------------------------------------------

val a = """     原始字符串
fun helloWorld(val name : String) {
   println("Hello, world!")
}
"""

----

val a = "ABC"
val b = "$a 的长度为${a.length}"     字符串模板

-------------------------------------------------------
Kotlin 中尽量将变量声明为不可空，不可变。

var a: String = null     编译器报错：不可空变量
var b: String? = null     通过 `?` 明确标识变量可为 null（可空变量）

println(b.length)     编译器报错：不能直接访问可空变量
println(b?.length)     通过 `?.` 访问可空变量，返回 null
println(b!!.length)     通过 `!!.` 访问可空变量，抛出 KotlinNullPointerException 异常

try {     try-catch
    println(b!!.length)
} catch (e: KotlinNullPointerException) {
    println("发生空指针异常!")
}

----

val a: String? = null

val b: Int = if (a != null) {     空检查
    a.length     不需要通过 `?.` 访问可空变量
} else {
    -1
}
可简化为
val c: Int = if (a != null) a.length else -1     可用于替代 Java 中的三元运算符
可简化为
val d: Int = a?.length ?: -1     `?:` 操作符：若左边表达式的返回值为 null 则执行右边表达式

-------------------------------------------------------

fun sum(x: Int = 1, y: Int = 1): Unit {     函数（设置参数默认值，以减少重载）
    println("$x+$y=${x + y}")     字符串模板
}
可简化为
fun sum(x: Int = 1, y: Int = 1) {     若返回值为 Unit (void)，则可省略返回值
    println("$x+$y=${x + y}")
}
可简化为
fun sum(x: Int = 1, y: Int = 1) = println("$x+$y=${x + y}")     若函数体只含有 1 句表达式，则可省略函数体和返回值（自动推导类型）

sum()
sum(3)
sum(y = 3)     命名参数
----
输出：
1+1=2
3+1=4
1+3=4

-------------------------------------------------------

fun hello(name: String): String {
    return "Hello,$name"
}
可简化为
fun hello(name: String) = "Hello,$name"     若函数体只含有 1 句表达式，可省略函数体和返回值（自动推导类型）

-------------------------------------------------------

fun show(vararg str: String): Unit {     vararg：可变长参数，参数数量 [0,∞)，视为数组 Array<out T>
    for (s in str) {     str 为 Array<out String>
        print(s + " ")
    }
}

val array: Array<String> = arrayOf("B", "C")
show("A", *array, "D")     （spread）展开操作符：在数组前加上 `*`
----
输出：
A B C D
```

```kotlin
fun a(x: Int): Boolean {
    return x % 2 == 0
}
可简化为
fun a(x: Int) = x % 2 == 0     函数类型：(Int) -> Boolean（需要 Int，返回 Boolean）

@kotlin.internal.InlineOnly
public inline fun println(message: Int) {     函数类型：(Int) -> Unit（需要 Int，返回 Unit）（类库自带函数）
    System.out.println(message)
}

val array = arrayOf(1, 2, 3, 4)

array     使用函数引用
    .filter(::a)
    .forEach(::println)
等同于
array     使用 Lambda 表达式
    .filter { it % 2 == 0 }
    .forEach { System.out.println(it) }
等同于
val aa: (Int) -> Boolean = ::a     将函数引用存储在变量中，类型（声明）为 "函数类型"
val bb: (Int) -> Unit = ::println
array
    .filter(aa)
    .forEach(bb)
----
输出：
2
4

-------------------------------------------------------
高阶函数：一种将函数作为参数或返回值的函数。
    ↳ 函数参数：
            ↳ Lambda 表达式：跟 Java8 中的概念相同，只能作为高阶函数的参数或返回值。
            ↳ 匿名函数：没名字的函数，只能作为高阶函数的参数或返回值。
            ↳ 命名函数：可以通过函数引用作为高阶函数的参数。
                    ↳ 函数引用：把命名函数作为参数传入，通过在函数名称前加入 `::` 操作符实现。

Lambda 表达式会形成一个闭包（捕捉使用到的外部变量，形成一个作用域），可以通过 Inline，消除这种开销。
对象是带方法的数据；
闭包是带数据的方法。（Closure）

val array: Array<Char> = arrayOf('A', 'B', 'C', 'D')

val list: MutableList<Int> = array.mapTo(mutableListOf(), { c -> c.toInt() })     mapTo 为高阶函数，{} 为 Lambda 表达式
可简化为
val list: MutableList<Int> = array.mapTo(mutableListOf()) { c -> c.toInt() }     高阶函数中若最后一个参数是函数参数，可移至括号外；若只需要一个函数参数，可省略括号
可简化为
val list: MutableList<Int> = array.mapTo(mutableListOf()) { it.toInt() }     Lambda 表达式中若只接收一个参数，可用 `it` 替代
可简化为
val list: MutableList<Int> = array.mapTo(mutableListOf(), Char::toInt)     Lambda 表达式转为函数引用

println(list)
----
输出：
[65, 66, 67, 68]

-------------------------------------------------------

fun a(i: Int): Int {
    return i * 2
}
可简化为
fun a(i: Int) = i * 2     命名函数（有名字的函数）

val list = listOf(1, 2, 3, 4, 5)

list.map(fun(i: Int): Int {
    return i * 2
})
可简化为
list.map(fun(i: Int) = i * 2)     匿名函数（没名字的函数）
----
list.map(::a)     对命名函数使用函数引用
----
list.map { it * 2 }     Lambda 表达式

-------------------------------------------------------

val list = listOf(1, 2, 3, 4, 5)

list.map({ i -> i * 2 })     此高阶函数只需要一个函数参数
可简化为
list.map() { i -> i * 2 }     移至括号外
可简化为
list.map { i -> i * 2 }     省略括号
可简化为
list.map { it * 2 }     使用 `it` 替代

-------------------------------------------------------
无标签限制的 this 指向包含当前代码的最内层。

val stringBuilder = StringBuilder("123").apply a@ {     在 Lambda 表达式处显式声明标签，以区分重名标签和 this 对象
    println(this@a)
    "456".apply {
        println(this@apply)
        this@a.append(this@apply)
    }
}
println(stringBuilder)
----
输出：
123
456
123456

-------------------------------------------------------
有标签限制的 break 跳转至该标签指定的循环，继续后面的表达式。
有标签限制的 continue 跳转至该标签指定的循环，继续下一次迭代。

a@ for (x in 0..9) {
    b@ for (y in 10..19) {
        if (x == 5 && y == 15) {
            break@a     跳转至最外层循环并结束，最后输出：5 14
        }
        println("$x $y")
    }
}

-------------------------------------------------------
无标签限制的 return 返回结果至最直接包含它的函数；
带标签限制的 return 一般应用于高阶函数中的 Lambda 表达式。

inline 签名一般与高阶函数搭配使用，以优化 Lambda 表达式，直接将代码写至调用处，来减少函数调用栈的层数，但
会增加代码生成量。

Kotlin 类库中的大部分高阶扩展函数都带有 inline 签名，使其成为内联高阶扩展函数，导致 Lambda 表达式不会引入
新作用域，函数体中的变量和外部环境中的变量具有相同的语义。

fun main(args: Array<String>) {
    a()
    println("————————————")
    b()
    println("————————————")
    c()
}
fun a() {
    val list1 = listOf(1, 2, 3, 4)
    println(list1)
    val list2 = list1.filter {     Lambda 表达式：无标签限制，返回结果至 fun a()（最直接包含此 Lambda 表达式的函数）
        print("+ ")
        it % 2 == 0
        return
    }
    println()
    println(list2)
}
fun b() {
    val list1 = listOf(1, 2, 3, 4)
    println(list1)
    val list2 = list1.filter {     Lambda 表达式：有标签限制，返回结果至 filter
        print("+ ")
        return@filter it % 2 == 0     隐式标签（与接收该 Lambda 表达式的高阶函数同名）
    }
    println()
    println(list2)
}
fun c() {
    val list1 = listOf(1, 2, 3, 4)
    println(list1)
    val list2 = list1.filter(fun(i: Int): Boolean {     匿名函数：返回结果至 filter
        print("+ ")
        return i % 2 == 0
    })
    println()
    println(list2)
}
----
输出：
[1, 2, 3, 4]
+
————————————
[1, 2, 3, 4]
+ + + +
[2, 4]
————————————
[1, 2, 3, 4]
+ + + +
[2, 4]

-------------------------------------------------------

fun main(args: Array<String>) {
    print(1)
    a {     未内联高阶函数：return 有 1 个选项，返回结果至 a
        print(2)
        return@a     隐式标签（与接收该 Lambda 表达式的高阶函数同名）
    }
    print(3)
    ----
    输出：
    123

    print(1)
    b {     已内联高阶函数：return 有 2 个选项，返回结果至 b（带标签） 或 main（不带标签）（最直接包含此 Lambda 表达式的函数）
        print(2)
        return
    }
    print(3)
    ----
    输出：
    12

    print(1)
    b {     已内联高阶函数
        print(2)
        return@b     隐式标签（与接收该 Lambda 表达式的高阶函数同名）
    }
    print(3)
    ----
    输出：
    123
}

fun a(block: () -> Unit) {     未内联高阶函数
    block()
}

inline fun b(block: () -> Unit) {     已内联高阶函数
    block()
}

-------------------------------------------------------
注意 inline 修饰函数，crossinline、noinline 修饰函数参数

inline fun a1(block: () -> Unit) {
    block()     作为函数调用
}

inline fun a2(crossinline block: () -> Unit) {     可以通过 crossinline 修饰函数参数，交叉内联此函数参数
    thread { block() }     作为函数调用
    等同于
    thread(block = { block() })     移至括号内并命名参数
}

inline fun x(block: () -> Unit) {
    thread(block = block)     编译器报错：不能将内联函数作为参数传入
}

inline fun b(noinline block: () -> Unit) {     可以通过 noinline 修饰函数参数，取消内联此函数参数，从而可以作为参数传入；但 inline 签名就没起到作用了
    thread(block = block)     作为普通参数传入
}
```

```kotlin
data class A(val id: Int, val name: String) : Closeable {     数据类：hashCode、equals、toString、copy 等函数将自动生成
    override fun close() {
        println("close!")
    }
}

val a = A(1, "小明")     实例化对象
val b = a.copy(name = "小张")     copy 函数（深度复制）
val (x, y) = a     解构声明（component 函数）

println("$x $y")     字符串模板
println(a)
println(b)
----
输出：
1 小明
A(id=1, name=小明)
A(id=1, name=小张)

-------------------------------------------------------

with(a) {     语法糖
    println("[${this.id}, ${this.name}]")
}
----
输出：
[1, 小明]

-------------------------------------------------------

a.use {     由于主动继承自 Closeable，所以能够使用 use 函数（Closeable 接口的扩展函数，用于替代 Java7 的 ARM）
    println("[${it.id}, ${it.name}]")
}
----
输出：
[1, 小明]
close!
```

```kotlin
val list = listOf("A", "B", "C")     生成不可变 List（元素不可被添加或删除，只读）
val set = setOf("A", "B", "C")     生成不可变 Set
val map = mapOf("A" to 0, "B" to 1, "C" to 2)     生成不可变 Map（Kotlin 中的 Map 存储的是 Pair）
val mutableList = mutableListOf("A", "B", "C")     生成可变 List

println(list[0])
println(set.contains("A"))
println(map["A"])
----
输出：
A
true
0

for ((k, v) in map) {     解构声明（Kotlin 中的 Map 存储的是 Pair）
    println("$k -> $v")
}
----
输出：
A -> 0
B -> 1
C -> 2

-------------------------------------------------------

val list = listOf('A', 'B', 'C')

list.asIterable()     Iterable：急性求值（Eager）（多用于小型集合）（默认）
        .filter {
            println("filter：$it")
            true
        }
        .map {
            println("map：$it")
            it.toInt()
        }
        .first().let(::println)
----
输出：
filter：A
filter：B
filter：C
map：A
map：B
map：C
65

list.asSequence()     Sequence：惰性求值（Lazy）（多用于大型集合）（类似于 Java8 中的数据流）
        .filter {
            println("filter：$it")
            true
        }
        .map {
            println("map：$it")
            it.toInt()
        }
        .first().let(::println)
----
输出：
filter：A
map：A
65

-------------------------------------------------------

val map: Map<String, List<Int>> = (1..9)
        .map { it * 3 }     映射
        .filter { it < 20 }     过滤
        .groupBy { it % 2 == 0 }     分组
        .mapKeys {     映射
            if (it.key) {
                "偶数"
            } else {
                "奇数"
            }
        }
println(map)
----
输出：
{奇数=[3, 9, 15], 偶数=[6, 12, 18]}

-------------------------------------------------------

val list: List<Any> = listOf("A", "B", "C", 1, 2, 3, 4)
list.filter { it is Int && it % 2 != 0 }.forEach(::println)
                    ↳ 判断类型    ↳ 自动转型                ↳ 函数引用
----
输出：
1
3
```

```kotlin
for：
val intRange: IntRange = 1..5     范围表达式
for (i in intRange) {
    print("$i ")
}
可简化为
for (i in 1..5) {     1 2 3 4 5
    print("$i ")
}

for (i in 1 until 5) {     1 2 3 4
    print("$i ")
}

for (i in 2..10 step 2) {     2 4 6 8 10     （步长）
    print("$i ")
}

for (i in 10 downTo 5) {     10 9 8 7 6 5     （降序）
    print("$i ")
}

for (c in "Hello") {
    println(c)
}

if (i in 1..10) {
    println("YES")
} else {
    println("NO")
}

遍历对象并带有索引位置
----
val strs = arrayOf("A", "B", "C")
for ((index, s) in strs.withIndex()) {     对 IndexedValue<T> 的解构声明
    println("$index -> $s")
}
strs.forEachIndexed { index, s ->
    println("$index -> $s")
}
----
输出：
0 -> A
1 -> B
2 -> C
0 -> A
1 -> B
2 -> C

-------------------------------------------------------

while、do...while：
var i = 0
while (i < 5) {
    println(i)
    i++
}
do {
    println(i)
    i++
} while (i < 10)
----
输出：
0
1
2
3
4
5
6
7
8
9

-------------------------------------------------------

when（和所有分支条件进行顺序比较，用于替代 Java 中的 switch）：

val i = 8
when (i) {     提供参数，匹配对应参数类型，替代 switch
    0, 21 -> println("0 or 21")
    in 1..20 -> println("1 to 20")     在
    !in 22..100 -> print("x<0 or x>100")     不在
    is Int -> print("is Int")     是（Smart Cast）
    !is Int -> print("not Int")     不是
    else -> println("other")
}
when {     不提供参数，匹配布尔类型，可替代 if-else if 链
    i < 5 -> println("first block")
    i < 10 -> println("second block")
    else -> println("else block")
}

-------------------------------------------------------
流程控制语句可作为表达式提供返回值。

val s = if (Math.random() - Math.random() > 0) {
    "成功"
} else {
    "失败"
}
可简化为
val s = if (Math.random() - Math.random() > 0) "成功" else "失败"     替代三元运算符

val s2 = when (Math.random() - Math.random() > 0) {
    true -> "成功"
    false -> "失败"
    else -> "失败"
}

-------------------------------------------------------

fun smartCast(x: Any): Boolean {     自动类型转换（智能转型）
    if (x is Boolean) {     通过类型检查后自动转换类型
        return x
    } else if (x is Int) {
        return x > 0
    } else if (x is String) {
        return x.startsWith("Hello")
    } else {
        return false
    }
}
可简化为
fun smartCast(x: Any): Boolean {     用 when 替代 if-else if 链
    when (x) {
        is Boolean -> return x
        is Int -> return x > 0
        is String -> return x.startsWith("Hello")
        else -> return false
    }
}
可简化为
fun smartCast(x: Any): Boolean {     用 when 作为返回值
    return when (x) {
        is Boolean -> x
        is Int -> x > 0
        is String -> x.startsWith("Hello")
        else -> false
    }
}
可简化为
fun smartCast(x: Any) = when (x) {     简化表达式（省略函数体和返回值）
    is Boolean -> x
    is Int -> x > 0
    is String -> x.startsWith("Hello")
    else -> false
}
```

```kotlin
val any: Any = "ABC" as Any     强制类型转换（若转换失败，则抛出异常 java.lang.ClassCastException）
----
if (any is String) {     等同于 instanceof，若通过检查，则在代码块中进行智能转型（Smart Cast）
    println(any.length)     类型：String
}
println(any.length)     类型：Any，无 length 属性，报错

-------------------------------------------------------

fun String.abc(c: Char): String {     扩展函数（给一个类添加新的功能）
    return this.filter { it != c }     false 过滤，true 不过滤
}
可简化为
fun String.abc(c: Char) = this.filter { it != c }

println("Hello".abc('l'))
----
输出：
Heo

fun String.Companion.abc() {     静态扩展函数（给一个类的伴生对象添加新的功能）
    println("ABC")
}
可简化为
fun String.Companion.abc() = println("ABC")

String.abc()     直接调用而不通过对象
----
输出：
ABC

val String.str1: String     扩展属性（只能为 val），同样也有静态扩展属性
    get() = "Hello"

println("".str1)
----
输出：
Hello

-------------------------------------------------------
中缀函数条件：
1. 为成员函数或扩展函数
2. 函数签名带有 infix 关键字
3. 只接收 1 个参数

infix fun Int.abc(x: Int): Int {
    println("OK!")
    return this + x
}

println(1.abc(2).abc(3))     点号标记法
等同于
println(1 abc 2 abc 3)     中缀标记法
----
输出：
OK!
OK!
6

-------------------------------------------------------
var <propertyName>: <PropertyType> [= <property_initializer>]
    [<getter>]
    [<setter>]

Kotlin 中对属性的访问自动转为编译器自动生成的默认 get/set，我们可对其进行自定义。
----
class A {
    var s: String = "Hi"
        get() {     get 可见性与此属性可见性一致
            println("Get")
            return field
        }
        set(value) {     set 可见性可设置为 private；另外 val 没有 set 函数和后备 field
            if (value.startsWith("H")) {
                println("Set true")
                field = value     field：当前属性 s；this：当前类 A
            } else {
                println("Set false")
            }
        }
}

val a = A()
a.s = "World"
println(a.s)
a.s = "Hello"
println(a.s)
----
输出：
Set false
Get
Hi
Set true
Get
Hello

-------------------------------------------------------
委托属性（get/set 的工厂函数）

class A {
    val s1: String by lazy {     延迟属性：只会在第一次访问 get 的时候执行该代码块，并赋值
        println("123")                    ↳ 计算时为 synchronized，若不需要可关闭线程同步：by lazy(LazyThreadSafetyMode.NONE) {}
        "AAA"
    }
    var s2: String by Delegates.observable("XXX") { prop, old, new ->     可观察属性：属性改变之后回调，afterChange
        println("$old -> $new")                         ↳ 初始值
    }
    var s3: String by Delegates.vetoable("XXX") { prop, old, new ->     可观察属性：属性改变之前回调，beforeChange
        println("$old -> $new")                     ↳ 初始值
        return@vetoable true     true 接收，false 丢弃
    }
}

val a = A()
println(a.s1)
a.s2 = "BBB"
println(a.s2)
a.s3 = "CCC"
println(a.s3)
----
输出：
123
AAA
XXX -> BBB
BBB
XXX -> CCC
CCC

委托属性：所有属性存储至 Map 中
----
class User(val map: Map<String, Any?>) {     若属性包含 var 则需换成 MutableMap
    val name: String by map     属性名作为 Key
    val age: Int by map
}

val user = User(mapOf("name" to "ABC", "age" to 25))     Key-Value（Kotlin 中的 Map 存储的是 Pair）
println("${user.name} ${user.age}")
----
输出：
ABC 25

-------------------------------------------------------

属性延迟加载（延迟初始化）
----
class A {
    val a: String by lazy {     val 使用委托属性 by lazy {}：只会在第一次访问 get 的时候执行该代码块，并赋值
        println("123")
        "AAA"
    }
    lateinit var b: String     var 使用关键字 lateinit：可稍后手动初始化（若访问 get 时未初始化，则抛出 UninitializedPropertyAccessException 异常）
}

val a = A()
println(a.a)
a.b = "BBB"
println(a.b)
----
输出：
123
AAA
BBB

-------------------------------------------------------
编译期常数值：属性值在编译期间就能够确定，需满足以下条件：
1. 为顶级属性或者是 object 的成员
2. 为 String 或者是基本类型
3. 为 val 且没有自定义的 get 函数

const val i = 5
```

```kotlin
class A {
    var name = ""
    var age = 20
}
可简化为
class A constructor(var name: String = "", var age: Int = 20) {     主构造函数
}
可简化为
class A(var name: String = "", var age: Int = 20)     主构造函数无注解和修饰符，可省略 constructor；无类体，可省略 {}

-------------------------------------------------------

data class A(var name: String, var age: Int) {     Kotlin 中的类可以有一个主（要）构造函数和多个次（要）构造函数
    init {
        println("主构造函数 or 初始化块")
    }

    constructor(name: String) : this(name, 0) {     次构造函数都需要 委托 给主构造函数
        println("次构造函数1")
    }

    constructor(age: Int) : this("无名氏", age) {
        println("次构造函数2")
    }
}

println(A("张三", 20))
println(A("张三"))
println(A(20))
//println(A())     报错，没有无参构造函数
----
输出：
主构造函数 or 初始化块
A(name=张三, age=20)
-
主构造函数 or 初始化块
次构造函数1
A(name=张三, age=0)
-
主构造函数 or 初始化块
次构造函数2
A(name=无名氏, age=20)

-------------------------------------------------------
如果主构造函数的所有参数都有默认值，则默认再生成一个无参次构造函数。
如果没有声明任何（主或次）构造函数，则默认生成 public 无参主构造函数。

data class A private constructor(var name: String, var des: String) {     指定主构造函数为 private
    constructor(name: String) : this(name, "欢迎：$name")     默认 public
}

println(A("张三"))
//println(A("张三", "ABC"))     报错，主构造函数为 private
----
输出：
A(name=张三, des=欢迎：张三)

-------------------------------------------------------

import javafx.application.Application
import javafx.scene.Scene
import javafx.scene.layout.BorderPane
import javafx.stage.Stage

fun main(args: Array<String>) {     JavaFX
    Application.launch(A::class.java, *args)     从 KClass 对象获得 Class 对象
}

class A : Application() {     继承 Application 抽象类（显式调用构造函数）
    override fun start(primaryStage: Stage) {     实现抽象函数
        primaryStage.title = "ABC"
        primaryStage.width = 400.toDouble()
        primaryStage.height = 300.toDouble()
        primaryStage.scene = Scene(BorderPane())
        primaryStage.show()
    }
}
```

```kotlin
interface A {     接口（跟 Java 一样，单继承多实现）
    val i: Int     抽象属性
    val j: Int     属性：已提供访问器实现（若属性修饰为 var，还需提供 set() 实现）
        get() = 2

    fun a()     抽象函数
    fun b() {}     函数：已提供函数实现
}

class B : A {     通过类实现接口
    override val i: Int
        get() = 1
    override fun a() {}
}

val a = object : A {     通过对象表达式实现接口（匿名内部类）
    override val i: Int
        get() = 1
    override fun a() {}
}

-------------------------------------------------------

对象表达式（匿名内部类）：
val o = object {
    val x = 1
    val y = 2
    val z = 3
    operator fun component1() = x     解构函数
    operator fun component2() = y     解构函数
    operator fun component3() = z     解构函数
}
等同于
val o = object : Any() {     Kotlin 中 Any 是所有类的父类
    val x = 1
    val y = 2
    val z = 3
    operator fun component1() = x
    operator fun component2() = y
    operator fun component3() = z
}

val (x, y, z) = o     解构声明
println(x + y + z)     6
println(o.x + o.y + o.z)     6

-------------------------------------------------------

对象声明（单例模式）：
object MyObject {     单例对象（Singleton）
    val AUTHOR = "XhstormR"     属性为 static

    fun hello(): String {     函数不为 static，可加上 "@JvmStatic" 注解成为 static 函数，针对属性同样还有 "@JvmField"，都仅对 Java 互操作有影响。
        return "Hello $AUTHOR!"
    }
}

println(MyObject.AUTHOR)
println(MyObject.hello())
----
输出：
XhstormR
Hello XhstormR!

-------------------------------------------------------

open class A     A 类

interface B     B 接口

class C : A(), B     C 继承 A 并实现 B（类默认生成无参主构造函数，接口无构造函数且默认开放）
```

```kotlin
（operator）操作符重载
----
class A(var i: Int) {
    operator fun inc(): A {     a++
        i++
        return this
    }

    operator fun dec(): A {     a--
        i--
        return this
    }

    operator fun invoke(): Int {     a()
        return i
    }

    operator fun get(index: Int): Int {     a[0]
        return i
    }

    operator fun set(index: Int, int: Int) {     a[0] = 123
        i = int
    }

    operator fun compareTo(o: A): Int {     >,<,>=,<=
        return i.compareTo(o.i)
    }

    override operator fun equals(other: Any?): Boolean {     ==,!=（IDE 生成）
        if (this === other) return true
        if (other?.javaClass != javaClass) return false
        other as A
        if (i != other.i) return false
        return true
    }

    override fun hashCode(): Int {     IDE 生成
        return i
    }

    override fun toString(): String {     IDE 生成
        return "A(i=$i)"
    }
}
```

```kotlin
Java：
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

-------------------------------------------------------

Kotlin：
open class Test1 {     Kotlin 跟 Java 相反，类和方法都默认为 final（最终），需用 open（开放）指明可以继承
    companion object {     伴生对象（静态内部类 Companion）（static 初始化块、方法、属性）
        init {
            println("1父类静态初始化块")
        }
    }

    init {
        println("2父类初始化块")
        println("3父类构造函数(主)")
    }
}
----
class Test2 : Test1() {     需显式调用父类的构造方法
    companion object {     伴生对象（静态内部类 Companion）（static 初始化块、方法、属性）
        init {
            println("1子类静态初始化块")
        }
    }

    init {
        println("2子类初始化块")
        println("3子类构造函数(主)")
    }
}
----
fun main(args: Array<String>) {
    val a: Test1 = Test2()     多态
    val companion = Test2.Companion     获得类中的伴生对象
}
----
输出：
1父类静态初始化块
1子类静态初始化块
2父类初始化块
3父类构造函数(主)
2子类初始化块
3子类构造函数(主)

-------------------------------------------------------

class A {
    companion object {     伴生对象（静态内部类 Companion）（static 初始化块、方法、属性）
        var i = 0
        init {
            println("静态初始化块")
        }
    }

    init {
        println("${++i} 初始化块 构造函数(主)")
    }
}

A()
A()
A()
A()
----
输出：
静态初始化块
1 初始化块 构造函数(主)
2 初始化块 构造函数(主)
3 初始化块 构造函数(主)
4 初始化块 构造函数(主)

-------------------------------------------------------

class A {
    companion object {     伴生对象（静态内部类 Companion）（static 初始化块、方法、属性）
        val list = arrayListOf<A>()
    }

    init {
        list.add(this)
    }
}

A()
A()
A()
println(A.list)
----
输出：
[A@2f0e140b, A@7440e464, A@49476842]

-------------------------------------------------------
默认内部类静态化，可在一定程度上降低发生内存泄露的概率。
很多时候内部类仅用来存储数据，并不需要访问外部类的成员。

class Outer {
    private val bar = 1
    class Nested {     Java 中的静态内部类：相当于独立出来的类，不会持有其外部类的强引用。
        fun foo() = 2
    }
}

Outer.Nested().foo()     不需要实例化外部类

----

class Outer {
    private val bar = 1
    inner class Nested {     Java 中的内部类：默认持有其外部类的强引用。
        fun foo() = bar     可以访问外部类的成员
    }
}

Outer().Nested().foo()     需要实例化外部类
```

```kotlin
val array = arrayOfNulls<Int>(5)     创建容量为 5 以 null 填充的空数组
for (i in array.indices) {
    println(array[i])
}
----
输出：
null
null
null
null
null

-------------------------------------------------------

val s1 = "ABC"
val s2 = StringBuilder("ABC").toString()
println(s1 == s2)     比较实际内容（ operator，调用 equals()），对应 !=
println(s1 === s2)     比较内存地址（Java 中的 `==`），对应 !==
----
输出：
true
false

-------------------------------------------------------

Kotlin：
val a: Char = 'A'     在 Java 中为基本数据类型 char
val b: Char? = 'B'     在 Java 中为引用数据类型 Character
println(a)
println(b)

Convert to Java：
char a = 65;
Character b = Character.valueOf('B');
System.out.println(a);
System.out.println(b);

-------------------------------------------------------

FileOutputStream("""D:\123.txt""", true).bufferedWriter().use { it.write("${LocalDateTime.now()}\n") }     写
FileInputStream("""D:\123.txt""").bufferedReader().useLines { it.forEach(::println) }     读

-------------------------------------------------------

println(String().javaClass)     从实例对象获得 Class 对象
println(String::class.java)     从 KClass 对象获得 Class 对象
----
输出：
class java.lang.String     完全类名限定符
class java.lang.String
```

![](/uploads/kotlin-transform.png "Transform")

## Script
```
D:\Download\kotlinc\bin>kotlinc -script DeleteFile.kts
```

## JavaScript
```
D:\Download\kotlinc\bin>kotlinc-js -output 123.js A.kt
```

```
D:\Download\kotlinc\lib\kotlin-stdlib-js.jar\kotlin.js
```

```html
<html>
<head>
    <meta charset="UTF-8">
    <title>123</title>
</head>
<body>
    <script type="text/javascript" src="kotlin.js"></script>
    <script type="text/javascript" src="123.js"></script>
</body>
</html>
```

## Reference

* https://realm.io/cn/news/droidcon-michael-pardo-kotlin/
* https://realm.io/cn/news/getting-started-with-kotlin-and-anko/
* https://realm.io/cn/news/oredev-jake-wharton-kotlin-advancing-android-dev/
