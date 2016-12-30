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
}

-------------------------------------------------------

val a = "ABC"     自动推导类型
val b: String = "ABC"     显式声明类型

----

var a = 123     变量
val b = 123     常量

----

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
    println("空指针异常!")
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

fun sum(x: Int = 1, y: Int = 1): Unit {     函数（默认参数）
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

----

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
show("A", *array, "D")     spread 操作符：在数组前加 *
----
输出：
A B C D

-------------------------------------------------------

infix fun Int.abc(x: Int): Int {     中缀函数：为成员函数或扩展函数，只接收一个参数，函数签名标有 infix 关键字
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
val list: MutableList<Int> = array.mapTo(mutableListOf(), { c -> c.toInt() })     mapTo 为高阶函数，{} 为 Lambda 表达式
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
匿名函数：Lambda 表达式。（跟 Java8 的概念相同）
函数引用：通过 `::` 把函数作为参数值传入。

----

val list = listOf(1, 2, 3, 4, 5)
list.map({ i -> i * 2 })     此高阶函数只接收一个函数
等同于
list.map() { i -> i * 2 }     移至括号外
等同于
list.map { i -> i * 2 }     省略括号
等同于
list.map { it * 2 }     使用 `it` 替代

```

## Script
```
D:\Download\kotlinc\bin>kotlinc -script DeleteFile.kts
```

## Reference

* https://realm.io/cn/news/droidcon-michael-pardo-kotlin/
* https://realm.io/cn/news/getting-started-with-kotlin-and-anko/
* https://realm.io/cn/news/oredev-jake-wharton-kotlin-advancing-android-dev/
