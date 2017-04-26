---
author: XhstormR
categories:
- "JAVA"
date: 2017-04-11T18:15:43+08:00
title: "JSP Servlet"
---

<!--more-->

Updated on 2017-04-11

>

## 工作原理
### MyServlet
```kotlin
package a

import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class MyServlet : HttpServlet() {
    init {
        println("实例化")
    }

    override fun init() {
        println("初始化")
    }

    override fun destroy() {
        println("销毁")
    }

    override fun doGet(req: HttpServletRequest, resp: HttpServletResponse) {
        println("处理请求 Get")
        resp.contentType = "text/html;charset=UTF-8"
        val out = resp.writer
        out.write("<strong>ABC</strong><br>")
    }

    override fun doPost(req: HttpServletRequest, resp: HttpServletResponse) {
        println("处理请求 Post")
        resp.contentType = "text/html;charset=UTF-8"
        val out = resp.writer
        out.write("<strong>ABC</strong><br>")
    }
}
```

### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <servlet>
        <servlet-name>s</servlet-name>
        <servlet-class>a.MyServlet</servlet-class>
        <load-on-startup>1</load-on-startup>     设置为自动加载（值越小越先加载）
    </servlet>
    <servlet-mapping>
        <servlet-name>s</servlet-name>
        <url-pattern>/abc</url-pattern>
    </servlet-mapping>

</web-app>
```