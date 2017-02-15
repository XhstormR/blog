+++
Categories = ["JAVA"]
date = "2017-02-14T15:29:22+08:00"
title = "Java Socket"

+++

<!--more-->

Updated on 2017-02-14

>

* Socket：**操作系统提供** 的一个 API 接口，**不属于** TCP/IP 协议栈，工作在应用层与传输层之间，由 **协议** 和 **地址** 共同确定。
  * 协议：TCP（面向连接，可靠）、UDP（面向无连接，不可靠）。
  * 地址：
      * IP：IPv4（192.168.1.1）、IPv6。
      * 端口：[0,65535]，其中 [0,1023] 为系统所保留。
* Uniform Resource Locator（URL）：统一资源定位器，表示 Internet 上某一 **资源地址**。
  * `http://blog.xhstormr.tk:80/post/jooq/index.html?abc=123&def=456#top`
      * 由 **协议名** 和 **资源名** 共同组成，中间用 **冒号** 隔开。

## InetAddress
```kotlin
fun main(args: Array<String>) {
//    InetAddress.getByName("192.168.1.2")
//    InetAddress.getByName("DESKTOP-OPN10MH")
    val inetAddress = InetAddress.getLocalHost()
    println(inetAddress)
    println("计算机名：${inetAddress.hostName}")
    println("IP地址：${inetAddress.hostAddress}")
    println("IP地址（字节数组）：${Arrays.toString(inetAddress.address)}")
}

----
输出：
DESKTOP-OPN10MH/192.168.1.2
计算机名：DESKTOP-OPN10MH
IP地址：192.168.1.2
IP地址（字节数组）：[-64, -88, 1, 2]
```

## URL
```kotlin
fun main(args: Array<String>) {
    val url1 = URL("http://blog.xhstormr.tk:80")
    val url2 = URL(url1, "/post/jooq/index.html?abc=123&def=456#top")
    println(url2)
    println("协议：${url2.protocol}")
    println("主机：${url2.host}")
    println("端口：${url2.port}")
    println("文件名：${url2.file}")
    println("文件路径：${url2.path}")
    println("相对路径(#)：${url2.ref}")
    println("查询参数(?)：${url2.query}")
}

----
输出：
http://blog.xhstormr.tk:80/post/jooq/index.html?abc=123&def=456#top
协议：http
主机：blog.xhstormr.tk
端口：80
文件名：/post/jooq/index.html?abc=123&def=456
文件路径：/post/jooq/index.html
相对路径(#)：top
查询参数(?)：abc=123&def=456
```

## TCP
* Socket
* ServerSocket

```kotlin

```

## UDP
* DatagramSocket
* DatagramPacket

```kotlin

```
