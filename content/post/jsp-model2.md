---
author: XhstormR
categories:
- "JAVA"
date: 2017-04-30T20:41:07+08:00
title: "JSP Model2"
---

<!--more-->

Updated on 2017-04-30

> MVC 模式
>
> MVC（Model - View - Controller）
>
> Model - JavaBean（数据）
>
> View - JSP（界面）
>
> Controller - Servlet（业务逻辑）

## src

### dao

#### ItemDAO
```kotlin
package dao

import entity.Item
import util.DBHelp

object ItemDAO {
    @JvmStatic
    fun getAllItems() = mutableListOf<Item>().apply {
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
    fun getItemById(id: Int) = DBHelp.connection
            .prepareStatement("SELECT * FROM item WHERE id = ?;").apply { this.setInt(1, id) }
            .executeQuery()
            .use {
                if (it.next())
                    Item(
                            id = it.getInt("id"),
                            name = it.getString("name"),
                            city = it.getString("city"),
                            price = it.getInt("price"),
                            number = it.getInt("number"),
                            picture = it.getString("picture")
                    )
                else
                    Item(
                            id = 0,
                            name = "null",
                            city = "null",
                            price = 0,
                            number = 0,
                            picture = "null"
                    )
            }
}
```

### entity

#### Item
```kotlin
package entity

data class Item(
        val id: Int,
        val name: String,
        val city: String,
        val price: Int,
        val number: Int,
        val picture: String
)
```

#### Cart
```kotlin
package entity

data class Cart(val goods: HashMap<Item, Int> = hashMapOf()) {
    fun add(item: Item, number: Int): Boolean {
        if (goods.containsKey(item)) {
            goods[item] = number + goods[item]!!
        } else {
            goods[item] = number
        }
        return true
    }

    fun remove(item: Item): Boolean {
        goods.remove(item)
        return true
    }

    fun getTotalPrice(): Double {
        var p = 0.0
        goods.mapKeys { it.key.price }.forEach { t, u -> p += t * u }
        return p
    }
}
```

### servlet

#### MyServlet
```kotlin
package servlet

import dao.ItemDAO
import entity.Cart
import javax.servlet.annotation.WebServlet
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@WebServlet(urlPatterns = arrayOf("/abc"))
class MyServlet : HttpServlet() {
    override fun doGet(request: HttpServletRequest, response: HttpServletResponse) {
        response.contentType = "text/html;charset=UTF-8"
        val action = request.getParameter("action")
        when (action) {
            "add" -> {
                if (addToCart(request)) {
                    response.writer.use { it.print("添加成功") }
                } else {
                    response.writer.use { it.print("添加失败") }
                }
            }
            "delete" -> {
                if (deleteFormCart(request)) {
                    response.sendRedirect("/cart.jsp")
                } else {
                    response.sendRedirect("/cart.jsp")
                }
            }
            "show" -> {
                response.sendRedirect("/cart.jsp")
            }
        }
    }

    private fun addToCart(request: HttpServletRequest): Boolean {
        val id = request.getParameter("id").toInt()
        val num = request.getParameter("num").toInt()
        val item = ItemDAO.getItemById(id)
        var cart = request.session.getAttribute("cart")

        val flag: Boolean
        if (cart != null && cart is Cart) {
            flag = cart.add(item, num)
        } else {
            cart = Cart().apply { request.session.setAttribute("cart", this) }
            flag = cart.add(item, num)
        }
        return flag
    }

    private fun deleteFormCart(request: HttpServletRequest): Boolean {
        val id = request.getParameter("id").toInt()
        val item = ItemDAO.getItemById(id)
        val cart = request.session.getAttribute("cart") as Cart
        val flag = cart.remove(item)
        return flag
    }
}
```

### util

#### DBHelp
```kotlin
package util

import java.sql.Connection
import java.sql.DriverManager

object DBHelp {
    val connection: Connection by lazy {
        Class.forName("org.postgresql.Driver")
        DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    }
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
                    final List<Item> list = ItemDAO.getAllItems();
                    for (Item item : list) {
                %>
                <div>
                    <dl>
                        <dt>
                            <a href="details.jsp?id=<%=item.getId()%>"><img src="images/<%=item.getPicture()%>"
                                                                            width="120" height="90" border="1"/></a>
                        </dt>
                        <dd><%=item.getName() %>
                        </dd>
                        <dd>产地:<%=item.getCity()%>&nbsp;&nbsp;价格:￥ <%=item.getPrice()%>
                        </dd>
                    </dl>
                </div>
                <%
                    }
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
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>商品详情</title>
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
<h1>商品详情</h1>
<hr>
<%
    request.setCharacterEncoding("UTF-8");
%>
<%
    final int id = Integer.valueOf(request.getParameter("id"));
    final Item item = ItemDAO.getItemById(id);
%>
<center>
    <table width="700" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td valign="top">
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
                    <tr>
                        <td>购买数量：
                            <input id="number" type="number" min="1" max="100" value="1"/>
                            <span onclick="c(0)">-</span>
                            <span onclick="c(1)">+</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a onclick="a()"><img src="images/in_cart.png"></a>
                            <a onclick="b()"><img src="images/view_cart.jpg"/></a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</center>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script>
    function a() {
        var id = new URLSearchParams(location.search).get('id');
        var num = parseInt(document.getElementById("number").value);
        var data = {
            action: "add",
            id: id,
            num: num
        };
        $.ajax({
            url: "/abc",
            type: "get",
            data: data,
            success: function (s) {
                alert(s);
            }
        });
    }

    function b() {
        var data = {
            action: "show"
        };
        var params = decodeURIComponent($.param(data));
        location.href = location.protocol + '//' + location.host + '/abc?' + params;
    }

    function c(flag) {
        var e = document.getElementById("number");
        var num = parseInt(e.value);
        if (flag === 0) {
            num--;
        } else if (flag === 1) {
            num++;
        }
        if (num < 1) {
            e.value = 1;
        } else if (num > 100) {
            e.value = 100;
        } else {
            e.value = num;
        }
    }
</script>
</body>
</html>
```

### cart.jsp
```html
<%@ page import="entity.Cart" %>
<%@ page import="entity.Item" %>
<%@ page import="java.util.HashMap" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>购物车</title>
</head>
<body>
<h1>购物车</h1>
<hr>
<table>
    <tr>
        <th>商品名称</th>
        <th>商品单价</th>
        <th>购买数量</th>
        <th>商品价格</th>
        <th>操作</th>
    </tr>
    <%
        final Cart cart = (Cart) request.getSession().getAttribute("cart");
        if (cart != null) {
            HashMap<Item, Integer> goods = cart.getGoods();
            for (Item i : goods.keySet()) {
                final int x = i.getPrice();
                final int y = goods.get(i);
    %>
    <tr>
        <td><%=i.getName()%>
        </td>
        <td><%=x%>
        </td>
        <td><%=y%>
        </td>
        <td><%=x * y%>
        </td>
        <td><a onclick="a()" href="/abc?action=delete&id=<%=i.getId()%>">删除</a>
        </td>
    </tr>
    <%
            }
        }
    %>
    <tr>
        <td colspan="5" style="background-color: lightgreen">总计：<%=cart == null ? 0.0 : cart.getTotalPrice() %>￥
        </td>
    </tr>
</table>
<script>
    function a() {
        window.event.returnValue = confirm("确认要删除？");
    }
</script>
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
