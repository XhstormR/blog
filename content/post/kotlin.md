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

----

var a: String = null     编译器报错
var b: String? = null     通过 `?` 标识变量可为 null
println(b?.length)     通过 `?.` 访问可空变量，返回 null
println(b!!.length)     通过 `!!.` 访问可空变量，抛出异常（KotlinNullPointerException）

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

----

```

## Script
```
D:\Download\kotlinc\bin>kotlinc -script DeleteFile.kts
```

## Reference

* https://realm.io/cn/news/droidcon-michael-pardo-kotlin/
* https://realm.io/cn/news/getting-started-with-kotlin-and-anko/
* https://realm.io/cn/news/oredev-jake-wharton-kotlin-advancing-android-dev/
