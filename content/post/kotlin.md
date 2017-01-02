+++
Categories = ["Kotlin"]
date = "2016-12-25T10:31:02+08:00"
title = "Kotlin"

+++

<!--more-->

Updated on 2016-12-25

> {{< image "/uploads/kotlin.png" "Kotlin" "1" "1" >}}
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
fun main(args: Array<String>) {     main 函数（程序入口）
    println("Hello World!")
}

-------------------------------------------------------

val a: String     先声明后赋值
a = "ABC"
----
val a: String = "ABC"     声明变量的同时进行初始化（显式声明类型）
----
val a = "ABC"     声明对象的同时进行实例化（自动推导类型）

-------------------------------------------------------

var a = 123     变量（可变）
val b = 123     常量（只读）

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

var a: String = null     编译器报错（不能为 null）
var b: String? = null     通过 `?` 明确标识变量可为 null

println(b.length)     编译器报错（不能直接访问可空变量）
println(b?.length)     通过 `?.` 访问可空变量，返回 null
println(b!!.length)     通过 `!!.` 访问可空变量，抛出异常（KotlinNullPointerException）

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
等同于
val c: Int = if (a != null) a.length else -1
等同于
val d: Int = a?.length ?: -1     `?:` 操作符：若左边表达式的返回值为 null 则执行右边表达式

-------------------------------------------------------

fun sum(x: Int = 1, y: Int = 1): Unit {     函数（参数可设定默认值，以减少重载）
    println("$x+$y=${x + y}")     字符串模板
}
等同于
fun sum(x: Int = 1, y: Int = 1) {     若返回值为 Unit (void)，可省略返回值
    println("$x+$y=${x + y}")
}
等同于
fun sum(x: Int = 1, y: Int = 1) = println("$x+$y=${x + y}")     若函数体只含有一句表达式，可省略函数体和返回值（自动推导类型）

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
等同于
fun hello(name: String) = "Hello,$name"     若函数体只含有一句表达式，可省略函数体和返回值（自动推导类型）

-------------------------------------------------------

fun show(vararg str: String): Unit {     vararg：可变参数，视为数组（Array<out T>）
    for (s in str) {     str 为 Array<out String>
        print(s + " ")
    }
}

val array: Array<String> = arrayOf("B", "C")
show("A", *array, "D")     spread 操作符：在数组前加 `*`
----
输出：
A B C D

-------------------------------------------------------

infix fun Int.abc(x: Int): Int {     中缀函数条件：为成员函数或扩展函数，只接收一个参数，函数签名带有 infix 关键字
    println("OK!")
    return this + x
}

println(1 abc 2 abc 3)
----
输出：
OK!
OK!
6
```

```kotlin
@kotlin.internal.InlineOnly
public inline fun println(message: Int) {     (Int) -> Unit（接收一个 Int，返回一个 Unit）（类库自带函数）
    System.out.println(message)
}

fun a(x: Int): Boolean {     (Int) -> Boolean（接收一个 Int，返回一个 Boolean）
    return x % 2 == 0
}
等同于
fun a(x: Int) = x % 2 == 0

val array = arrayOf(1, 2, 3, 4)
array.filter { it % 2 == 0 }.forEach { System.out.println(it) }     未使用函数引用
或者
array.filter(::a).forEach(::println)     使用函数引用
或者
val aa: (Int) -> Boolean = ::a     将函数引用存储在变量中
val bb: (Int) -> Unit = ::println
array.filter(aa).forEach(bb)
----
输出：
2
4

-------------------------------------------------------

val array: Array<Char> = arrayOf('A', 'B', 'C', 'D')
val list: MutableList<Int> = array.mapTo(mutableListOf(), { c -> c.toInt() })     mapTo 为高阶函数，{} 为 Lambda 表达式（匿名函数）
等同于
val list: MutableList<Int> = array.mapTo(mutableListOf()) { c -> c.toInt() }     高阶函数中若最后一个参数是函数，可移至括号外；若只接收一个函数，可不需要括号
等同于
val list: MutableList<Int> = array.mapTo(mutableListOf()) { it.toInt() }     Lambda 表达式中若只接收一个参数，可用 `it` 替代
等同于
val list: MutableList<Int> = array.mapTo(mutableListOf(), Char::toInt)     Lambda 表达式转为函数引用

println(list)
----
输出：
[65, 66, 67, 68]

高阶函数：一种使用函数作为参数或返回值的函数。
匿名函数：只能作为高阶函数的参数或返回值，也称作 Lambda 表达式，跟 Java8 中的概念相同。
命名函数：可以通过函数引用作为高阶函数的参数。
函数引用：把命名函数作为参数传入，通过在函数名称前加入 `::` 操作符实现。

-------------------------------------------------------

fun a(i: Int): Int {     命名函数（有名字的函数）
    return i * 2
}

val list = listOf(1, 2, 3, 4, 5)
list.map(::a)     函数引用
list.map { it * 2 }     匿名函数（没名字的函数）

-------------------------------------------------------

val list = listOf(1, 2, 3, 4, 5)
list.map({ i -> i * 2 })     此高阶函数只接收一个函数
等同于
list.map() { i -> i * 2 }     移至括号外
等同于
list.map { i -> i * 2 }     省略括号
等同于
list.map { it * 2 }     使用 `it` 替代
```

```kotlin
data class A(val id: Int, val name: String) : Closeable {     数据类：hashCode、equals、toString、copy 等函数将自动生成
    override fun close() {
        println("close!")
    }
}

val a = A(1, "小明")     实例化对象
val b = a.copy(name = "小张")     copy 函数
val (x, y) = a     解构对象

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

a.use {     由于继承自 Closeable，所以能够使用 use 函数（Closeable 接口的扩展函数，用于替代 Java7 的 ARM）
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
val map = mapOf("A" to 0, "B" to 1, "C" to 2)     生成不可变 Map
val mutableList = mutableListOf("A", "B", "C")     生成可变 List

println(list[0])
println(set.contains("A"))
println(map["A"])
----
输出：
A
true
0

for ((k, v) in map) {
    println("$k -> $v")
}
----
输出：
A -> 0
B -> 1
C -> 2

-------------------------------------------------------

val list = listOf('A', 'B', 'C')

list.asIterable()     Iterable：急性求值（多用于小型集合）（默认）
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

list.asSequence()     Sequence：惰性求值（多用于大型集合）（类似于 Java8 中的数据流）
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
```

```kotlin
for：
val intRange: IntRange = 1..5
for (i in intRange) {
    print("$i ")
}
等同于
for (i in 1..5) {     1 2 3 4 5
    print("$i ")
}

for (i in 1 until 5) {     1 2 3 4
    print("$i ")
}

for (i in 2..10 step 2) {     2 4 6 8 10
    print("$i ")
}

for (i in 10 downTo 5) {     10 9 8 7 6 5
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

when（用于替代 Java 中的 switch）：

val i = 8
when {     不带参数，匹配布尔类型，可替代 if-else if 链
    i < 5 -> println("first block")
    i < 10 -> println("second block")
    else -> println("else block")
}
when (i) {     带参数，匹配对应参数类型，替代 switch
    0, 21 -> println("0 or 21")
    in 1..20 -> println("1 to 20")
    !in 22..100 -> print("x<0 or x>100")
    else -> println("other")
}

-------------------------------------------------------

val s = if (Math.random() - Math.random() > 0) {     if 可作为函数提供返回值
    "成功"
} else {
    "失败"
}

val s2 = when (Math.random() - Math.random() > 0) {     when 可作为函数提供返回值
    true -> "成功"
    false -> "失败"
    else -> "失败"
}
```

```kotlin
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
等同于
fun smartCast(x: Any): Boolean {
    when (x) {
        is Boolean -> return x
        is Int -> return x > 0
        is String -> return x.startsWith("Hello")
        else -> return false
    }
}
等同于
fun smartCast(x: Any): Boolean {
    return when (x) {
        is Boolean -> x
        is Int -> x > 0
        is String -> x.startsWith("Hello")
        else -> false
    }
}
等同于
fun smartCast(x: Any) = when (x) {
    is Boolean -> x
    is Int -> x > 0
    is String -> x.startsWith("Hello")
    else -> false
}

-------------------------------------------------------

val any: Any = "ABC" as Any     强制类型转换（若转换失败，则抛出异常 java.lang.ClassCastException）
if (any is String) {     等同于 instanceof
    println(any.length)     自动类型转换（智能转型）
}

-------------------------------------------------------

fun String.abc(c: Char): String {     扩展函数（给一个类添加新的功能）
    return this.filter { it != c }
}

println("Hello".abc('l'))
----
输出：
Heo

-------------------------------------------------------

object MyObject {     单例对象（Singleton）
    val AUTHOR = "XhstormR"

    fun hello(): String {
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

```

## Script
```
D:\Download\kotlinc\bin>kotlinc -script DeleteFile.kts
```

## Reference

* https://realm.io/cn/news/droidcon-michael-pardo-kotlin/
* https://realm.io/cn/news/getting-started-with-kotlin-and-anko/
* https://realm.io/cn/news/oredev-jake-wharton-kotlin-advancing-android-dev/
