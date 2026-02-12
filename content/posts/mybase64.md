---
title: MyBase64
date: 2025-09-09T16:23:54+03:00
author: XhstormR
tags:
  -
---

<!--more-->

> https://play.kotlinlang.org

```kotlin
import java.util.Base64

object MyBase64 {
    private val H2B = HashMap<Char, Char>()
    private val B2H = HashMap<Char, Char>()

    init {
        val myBase64 = "⣿⣾⣽⣼⣻⣺⣹⣸⣷⣶⣵⣴⣳⣲⣱⣰⣯⣮⣭⣬⣫⣪⣩⣨⣧⣦⣥⣤⣣⣢⣡⣠⣟⣞⣝⣜⣛⣚⣙⣘⣗⣖⣕⣔⣓⣒⣑⣐⣏⣎⣍⣌⣋⣊⣉⣈⣇⣆⣅⣄⣃⣂⣁⣀".toCharArray()
        val base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".toCharArray()
        for (i in myBase64.indices) {
            H2B[myBase64[i]] = base64[i]
            B2H[base64[i]] = myBase64[i]
        }
    }

    fun encode(bytes: ByteArray): String {
        val chars = Base64.getEncoder().encodeToString(bytes).toCharArray()
        val sb = StringBuilder()
        for (c in chars) {
            if (c == '=') continue
            sb.append(B2H[c])
        }
        return sb.toString()
    }

    fun decode(myBase64: String): ByteArray {
        val chars = myBase64.toCharArray()
        val sb = StringBuilder()
        for (c in chars) {
            sb.append(H2B[c])
        }
        val padding = 4 - (sb.length % 4)
        if (padding != 4) {
            repeat(padding) {
                sb.append('=')
            }
        }
        return Base64.getDecoder().decode(sb.toString())
    }
}

fun main() {
    val encoded = MyBase64.encode("hello, world! 你好，世界！".toByteArray())
    println(encoded)
    val decoded = MyBase64.decode(encoded)
    println(String(decoded))
    /*
    val i = '⣿'.code
    for (n in 0 until 64) {
        print(Char(i-n))
    }
    */
}
```
