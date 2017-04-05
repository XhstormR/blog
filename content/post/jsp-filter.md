---
author: XhstormR
categories:
- "JAVA"
date: 2017-04-03T16:12:58+08:00
title: "JSP Filter"
---

<!--more-->

Updated on 2017-04-03

> {{< image "/uploads/jsp-filter.svg" "Filter" "1" "1">}}

## 工作原理
### MyFilter1
```kotlin
package a

import javax.servlet.*

class MyFilter1 : Filter {
    override fun init(filterConfig: FilterConfig) {     用于读取 web.xml 中过滤器的配置参数（<init-param>）
        println("init---MyFilter1")
    }

    override fun doFilter(p0: ServletRequest, p1: ServletResponse, p2: FilterChain) {
        println("doFilter---MyFilter1---Start")
        p2.doFilter(p0, p1)     不过滤（放行）：将请求传递给下一个过滤器（若为最后一个过滤器，则为目标资源）
        println("doFilter---MyFilter1---End")

        要过滤：通过请求转发（request）、请求重定向（response），跳转至其他资源。
    }

    override fun destroy() {     用于释放过滤器所占用的资源
        println("destroy---MyFilter1")
    }
}
```

### MyFilter2
```kotlin
package a

import javax.servlet.*

class MyFilter2 : Filter {
    override fun init(filterConfig: FilterConfig) {
        println("init---MyFilter2")
    }

    override fun doFilter(p0: ServletRequest, p1: ServletResponse, p2: FilterChain) {
        println("doFilter---MyFilter2---Start")
        p2.doFilter(p0, p1)
        println("doFilter---MyFilter2---End")
    }

    override fun destroy() {
        println("destroy---MyFilter2")
    }
}
```

### index.jsp
```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    System.out.println("index.jsp");
%>
<html>
<head>
    <title>Title</title>
</head>
<body>
</body>
</html>
```

### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <filter>     过滤器
        <filter-name>f1</filter-name>
        <filter-class>a.MyFilter1</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>f1</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <filter>     过滤器
        <filter-name>f2</filter-name>
        <filter-class>a.MyFilter2</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>f2</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

</web-app>

过滤器链：若有多个过滤器的 url-pattern 一致，则服务器会按照 web.xml 中定义过滤器的先后顺序将过滤器组装成一条链。
```

### Output
```html
init---MyFilter1
init---MyFilter2

doFilter---MyFilter1---Start
doFilter---MyFilter2---Start
index.jsp
doFilter---MyFilter2---End
doFilter---MyFilter1---End

destroy---MyFilter1
destroy---MyFilter2
```

## Dispatcher
* REQUEST：当目标资源是通过 **用户直接访问** 时，将调用该过滤器。
* FORWARD：当目标资源是通过 **RequestDispatcher.forward()**访问时，将调用该过滤器。
* INCLUDE：当目标资源是通过 **RequestDispatcher.include()** 访问时，将调用该过滤器。
* ERROR：当目标资源是通过 **异常处理机制** 访问时，将调用该过滤器。
* ASYNC：支持异步处理。

### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <filter>
        <filter-name>f1</filter-name>
        <filter-class>a.MyFilter1</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>f1</filter-name>
        <url-pattern>/error.jsp</url-pattern>
        <dispatcher>ERROR</dispatcher>     [REQUEST, FORWARD, INCLUDE, ERROR, ASYNC]
    </filter-mapping>                          ↳ 若未配置 dispatcher，则 REQUEST 为缺省值

    <error-page>
        <location>/error.jsp</location>
    </error-page>

</web-app>

http://localhost:8080/error.jsp     对 f1 过滤器无效（用户直接访问）
http://localhost:8080/15735.jsp     对 f1 过滤器有效（异常处理机制）
```

### MyFilter1
```kotlin
package a

import javax.servlet.*

class MyFilter1 : Filter {
    override fun init(filterConfig: FilterConfig) {}

    override fun doFilter(p0: ServletRequest, p1: ServletResponse, p2: FilterChain) {
        println("记录错误!")
        p2.doFilter(p0, p1)     放行
    }

    override fun destroy() {}
}

-------------------------------------------------------
通过注解方式配置过滤器

MyFilter1
⇳
package a

import javax.servlet.*
import javax.servlet.annotation.WebFilter

@WebFilter(urlPatterns = arrayOf("/error.jsp"), dispatcherTypes = arrayOf(DispatcherType.ERROR))
class MyFilter1 : Filter {
    override fun init(filterConfig: FilterConfig) {}

    override fun doFilter(p0: ServletRequest, p1: ServletResponse, p2: FilterChain) {
        println("记录错误!")
        p2.doFilter(p0, p1)     放行
    }

    override fun destroy() {}
}

----

web.xml
⇳
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <error-page>
        <location>/error.jsp</location>
    </error-page>

</web-app>
```

### error.jsp
```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>错误页面</title>
</head>
<body>
<h1>错误页面</h1>
<hr>
</body>
</html>
```
