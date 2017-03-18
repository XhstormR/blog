+++
Categories = ["JAVA"]
date = "2017-03-18T16:25:36+08:00"
title = "JSP JavaBean 模式"

+++

<!--more-->

Updated on 2017-03-18

>

## src

### dao

#### ItemDAO
```kotlin
package dao

import entity.Item
import util.DBHelp

object ItemDAO {
    @JvmStatic
    fun getAllItems() = mutableListOf<Item>().apply {     从数据库中获取所有商品
        DBHelp.connection
                .prepareStatement("SELECT * FROM item;")
                .executeQuery()
                .use {
                    while (it.next()) {
                        val item = Item(
                                id = it.getInt("id"),
                                name = it.getString("name"),
                                city = it.getString("city"),
                                price = it.getInt("price"),
                                number = it.getInt("number"),
                                picture = it.getString("picture")
                        )
                        this.add(item)
                    }
                }
    }

    @JvmStatic
    fun getVisitedItems(s: String) = mutableListOf<Item>().apply {     根据 Cookie 从数据库中获取所有历史游览商品
        s
                .split('|')     String ➜ List<String>
                .reversed()     逆转
                .map(String::toInt)     String ➜ Int
                .map { getItemById(it) }     Int ➜ Item
                .forEach { this.add(it) }
    }

    @JvmStatic
    fun getItemById(id: Int) = DBHelp.connection     根据 ID 从数据库中获取商品
            .prepareStatement("SELECT * FROM item WHERE id = ?;").apply { this.setInt(1, id) }
            .executeQuery()
            .use {
                if (it.next()) {
                    val item = Item(
                            id = it.getInt("id"),
                            name = it.getString("name"),
                            city = it.getString("city"),
                            price = it.getInt("price"),
                            number = it.getInt("number"),
                            picture = it.getString("picture")
                    )
                    item
                } else {
                    val item = Item(
                            id = 0,
                            name = "null",
                            city = "null",
                            price = 0,
                            number = 0,
                            picture = "null"
                    )
                    item
                }
            }
}
```

### entity

#### Item
```kotlin
package entity

data class Item(     数据类：商品实体
        val id: Int,
        val name: String,
        val city: String,
        val price: Int,
        val number: Int,
        val picture: String
)
```

### util

#### DBHelp
```kotlin
package util

import java.sql.Connection
import java.sql.DriverManager

object DBHelp {
    @JvmStatic
    val connection: Connection by lazy {     获得数据库连接
        Class.forName("org.postgresql.Driver")
        DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    }
}
```

#### CookieHelp
```kotlin
package util

object CookieHelp {
    @JvmStatic
    fun addCookie(cookie: String, id: Int) = cookie     添加 Cookie 并去重
            .split('|')     String ➜ List
            .toMutableList().apply { this.add(id.toString()) }     添加
            .distinct()     去重
            .fold("") { str, s -> if (str == "") s else str + '|' + s }     List ➜ String

    @JvmStatic
    fun cutCookie(cookie: String) = if (cookie.split('|').count() > 5) cookie.substring(cookie.indexOf('|') + 1) else cookie     字符串中只保留最近 5 个商品 ID
}
```

## web
### index.jsp
```html
<%@ page import="dao.ItemDAO" %>
<%@ page import="entity.Item" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>商品列表</title>
    <style type="text/css">
        div {
            float: left;
            margin: 10px;
        }

        div dd {
            margin: 0;
            font-size: 10pt;
        }
    </style>
</head>
<body>
<h1>商品列表</h1>
<hr>
<center>
    <table width="700" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td>
                <%
                    final List<Item> list = ItemDAO.getAllItems();     从数据库中获取所有商品
                    for (Item item : list) {     开始循环
                %>
                <div>
                    <dl>
                        <dt>
                            <a href="details.jsp?id=<%=item.getId()%>"><img src="images/<%=item.getPicture()%>" width="120" height="90" border="1"/></a>
                        </dt>
                        <dd><%=item.getName() %>
                        </dd>
                        <dd>产地:<%=item.getCity()%>&nbsp;&nbsp;价格:￥ <%=item.getPrice()%>
                        </dd>
                    </dl>
                </div>
                <%
                    }     结束循环
                %>
            </td>
        </tr>
    </table>
</center>
</body>
</html>
```

### details.jsp
```html
<%@ page import="dao.ItemDAO" %>
<%@ page import="entity.Item" %>
<%@ page import="util.CookieHelp" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>     指定输出字符集
<html>
<head>
    <title>商品详情</title>
    <style type="text/css">
        div {
            float: left;
            margin: 5px 30px;
        }

        div dd {
            margin: 0;
            font-size: 10pt;
        }
    </style>
</head>
<body>
<h1>商品详情</h1>
<hr>
<%
    request.setCharacterEncoding("UTF-8");     指定输入字符集
%>
<%
    final int id = Integer.valueOf(request.getParameter("id"));     获得正在游览的商品 ID
    final Item item = ItemDAO.getItemById(id);     实例化实体
%>
<%
    boolean hasCookie = false;
    final Cookie[] cookies = request.getCookies();
    for (Cookie c : cookies) {
        if (c.getName().equals("visitedItem")) {     处理商品游览历史 Cookie
            hasCookie = true;
            String s1 = CookieHelp.addCookie(c.getValue(), id);     添加商品 ID 并去重
            String s2 = CookieHelp.cutCookie(s1);     Cookie 只保留最近 5 个商品 ID
            c.setValue(s2);
            response.addCookie(c);     添加 Cookie
            break;
        }
    }
    if (!hasCookie) {
        Cookie c = new Cookie("visitedItem", String.valueOf(id));     不存在则新建 visitedItem Cookie
        response.addCookie(c);     添加 Cookie
    }
%>
<center>
    <table width="700" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td width="70%" valign="top">
                <table>
                    <tr>
                        <td rowspan="4"><img src="images/<%=item.getPicture()%>" width="200" height="160"/></td>
                    </tr>
                    <tr>
                        <td><B><%=item.getName()%>
                        </B></td>
                    </tr>
                    <tr>
                        <td>产地：<%=item.getCity()%>
                        </td>
                    </tr>
                    <tr>
                        <td>价格：<%=item.getPrice()%>￥</td>
                    </tr>
                </table>
            </td>
            <td width="30%" bgcolor="#EEE" align="center">
                <br>
                <b>您最近浏览的商品</b><br>
                <%
                    for (Cookie c : request.getCookies()) {
                        if (c.getName().equals("visitedItem")) {
                            List<Item> list = ItemDAO.getVisitedItems(c.getValue());     根据 Cookie 从数据库中获取所有历史游览商品
                            for (Item i : list) {     开始循环
                %>
                <div>
                    <dl>
                        <dt>
                            <a href="details.jsp?id=<%=i.getId()%>"><img src="images/<%=i.getPicture()%>" width="120" height="90" border="1"/></a>
                        </dt>
                        <dd><%=i.getName()%>
                        </dd>
                        <dd>产地:<%=i.getCity()%>&nbsp;&nbsp;价格:<%=i.getPrice()%> ￥</dd>
                    </dl>
                </div>
                <%
                            }     结束循环
                            break;
                        }
                    }
                %>
            </td>
        </tr>
    </table>
</center>
</body>
</html>
```

## sql
```sql
CREATE TABLE item (
  id      SERIAL,
  name    TEXT    NOT NULL,
  city    TEXT    NOT NULL,
  price   INTEGER NOT NULL,
  number  INTEGER NOT NULL,
  picture TEXT    NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO item (name, city, price, number, picture) VALUES ('沃特篮球鞋', '佛山', '180', '500', '001.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('安踏运动鞋', '福州', '120', '800', '002.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('耐克运动鞋', '广州', '500', '1000', '003.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('阿迪达斯T血衫', '上海', '388', '600', '004.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('李宁文化衫', '广州', '180', '900', '005.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('小米3', '北京', '1999', '3000', '006.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('小米2S', '北京', '1299', '1000', '007.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('thinkpad笔记本', '北京', '6999', '500', '008.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('dell笔记本', '北京', '3999', '500', '009.jpg');
INSERT INTO item (name, city, price, number, picture) VALUES ('ipad5', '北京', '5999', '500', '010.jpg');
```
