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
用于 **拦截** 客户端的 **请求** 信息和服务端的 **响应** 信息，并对这些信息进行 **过滤**。

### MyFilter1
```kotlin
package a

import javax.servlet.*

class MyFilter1 : Filter {     继承 Filter
    override fun init(filterConfig: FilterConfig) {     用于读取 web.xml 中过滤器的配置参数（<init-param>）
        println("init---MyFilter1")
    }

    override fun doFilter(p0: ServletRequest, p1: ServletResponse, p2: FilterChain) {     核心方法
        println("doFilter---MyFilter1---Start")     放行前
        p2.doFilter(p0, p1)     不过滤（放行）：将请求传递给下一个过滤器（若已为最后一个过滤器，则为目标资源）
        println("doFilter---MyFilter1---End")     放行后

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
        <url-pattern>/*</url-pattern>     匹配所有路径
    </filter-mapping>

    <filter>     过滤器
        <filter-name>f2</filter-name>
        <filter-class>a.MyFilter2</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>f2</filter-name>
        <url-pattern>/*</url-pattern>     匹配所有路径
    </filter-mapping>

</web-app>

过滤器链：若一个请求匹配有多个过滤器，则服务器会按照 web.xml 中定义过滤器的先后顺序将过滤器组装成一条链。
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
* REQUEST：当目标资源是通过 **用户直接访问** 时，将调用该过滤器。（缺省值）
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

直接访问 http://localhost:8080/error.jsp，对 f1 过滤器无效（用户直接访问）
直接访问 http://localhost:8080/1574.jsp，对 f1 过滤器有效（异常处理机制，404）
```

### MyFilter1
```kotlin
package a

import javax.servlet.*
import javax.servlet.annotation.WebFilter

@WebFilter(urlPatterns = arrayOf("/error.jsp"), dispatcherTypes = arrayOf(DispatcherType.ERROR))     //通过注解方式配置过滤器
class MyFilter1 : Filter {
    override fun init(filterConfig: FilterConfig) {}

    override fun doFilter(p0: ServletRequest, p1: ServletResponse, p2: FilterChain) {
        println("发生错误!")
        p2.doFilter(p0, p1)     放行
    }

    override fun destroy() {}
}
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

## 登录页面案例
### JSP
```
index.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录页面</title>
</head>
<body>
<h1>登录页面</h1>
<hr>
<form action="doLogin.jsp" name="loginForm" method="post">
    <table>
        <tr>
            <td>账号：</td>
            <td><input type="text" name="username"></td>
        </tr>
        <tr>
            <td>密码：</td>
            <td><input type="password" name="password"></td>
        </tr>
        <tr>
            <td><input type="reset" value="重置"></td>
            <td><input type="submit" value="登录"></td>
        </tr>
    </table>
</form>
</body>
</html>

doLogin.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("UTF-8");
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    if ("admin".equals(username) && "123456".equals(password)) {
        session.setAttribute("username", username);
        response.sendRedirect("login_successful.jsp");
    } else {
        response.sendRedirect("login_failed.jsp");
    }
%>

login_successful.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录成功</title>
</head>
<body>
<h1>登录成功</h1>
<hr>
欢迎用户：${username}     EL 表达式
</body>
</html>

login_failed.jsp
----
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录失败</title>
</head>
<body>
<h1>登录失败</h1>
<hr>
<a href="/">返回登录页面</a>
</body>
</html>
```

### MyFilter
```kotlin
class MyFilter : Filter {
    lateinit var noFilterList: List<String>

    override fun init(filterConfig: FilterConfig) {
        noFilterList = filterConfig.getInitParameter("noFilterList").split(";")     获取放行关键字
    }

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        val request1 = request as HttpServletRequest
        val response1 = response as HttpServletResponse
        request1.characterEncoding = "UTF-8"     统一指定输入字符集

        val uri = request1.requestURI     请求路径
        if (request1.session.getAttribute("username") != null || uri == "/" || check(uri)) {
            chain.doFilter(request, response)     放行（通过）
        } else {
            response1.sendRedirect("/")     不放行（重定向至根目录）
        }
    }

    override fun destroy() {
    }

    private fun check(s: String) = noFilterList.find { s.contains(it) } != null     若请求路径包含某个关键字，则返回 true
}
```

### web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <filter>
        <filter-name>f</filter-name>
        <filter-class>a.MyFilter</filter-class>
        <init-param>
            <param-name>noFilterList</param-name>     放行关键字
            <param-value>index.jsp;doLogin.jsp;login_failed.jsp</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>f</filter-name>
        <url-pattern>/*</url-pattern>     匹配所有路径
    </filter-mapping>

</web-app>
```
