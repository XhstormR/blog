---
author: XhstormR
categories:
- Hibernate
date: 2017-05-19T20:17:25+08:00
title: Hibernate Query Language
---

<!--more-->

Updated on 2017-05-19

> {{< image "/uploads/hibernate-hql.svg" "" "1" "1" >}}
>
> 面向对象的查询语言
>
> select... + **from...** + where... + group by... + having... + order by...
>
> http://docs.huihoo.com/hibernate/reference-v3_zh-cn/queryhql.html

## 检索对象：from
```kotlin
sessionFactory.currentSession.use {
    it.beginTransaction()

    val query = it.createQuery("from Customer", Customer::class.java)
    query.list().forEach { println(it.name) }

    val query = it.createQuery("from Commodity c,Seller s", Array<Any>::class.java)     设置别名
    query.list().forEach { println(Arrays.toString(it)) }     笛卡尓积

    it.transaction.commit()
}

list()   ：无视缓存并加载整个数据，发送  1  条 SQL 语句。
iterate()：检索缓存并延迟加载数据，发送 1+N 条 SQL 语句。
```

## 选择属性：select
```kotlin
单个属性：

原生对象
----
val query = it.createQuery("select birthday from Customer", Date::class.java)
query.list().forEach { println(it) }

数据去重
----
val query = it.createQuery("select distinct sex from Customer", String::class.java)
query.list().forEach { println(it) }

多个属性：

默认为 Array
----
val query = it.createQuery("select name,address,tel from Seller", Array<Any>::class.java)
query.list().forEach { println(Arrays.toString(it)) }

指定为 List
----
val query = it.createQuery("select new list(name,address,tel) from Seller", List::class.java)
query.list().forEach { println(it) }

指定为 Map
----
val query = it.createQuery("select new map(name,address,tel) from Seller", Map::class.java)
query.list().forEach { println("${it["0"]}  ${it["1"]}  ${it["2"]}") }
----
val query = it.createQuery("select new map(name as n,address as a,tel as t) from Seller", Map::class.java)     设置别名
query.list().forEach { println("${it["n"]}  ${it["a"]}  ${it["t"]}") }

指定为自定义对象 Test
----
val query = it.createQuery("select new Test(name,address,tel) from Seller", Test::class.java)
query.list().forEach { println(it) }
```

### Test
```kotlin
data class Test(var s1: String, var s2: String, var s3: String)
```

## 限制范围：where
```kotlin
比较运算：

=, !=, <, >, <=, >=
----
val query = it.createQuery("from Commodity c where c.price>400", Commodity::class.java)
query.list().forEach { println(it.name) }

四则运算：

+, -, *, /
----
val query = it.createQuery("from Commodity c where c.price*5<2000", Commodity::class.java)
query.list().forEach { println(it.price) }

范围运算：

[not] between v1 and v2
----
val query = it.createQuery("from Customer c where c.age between 20 and 35", Customer::class.java)
query.list().forEach { println(it.age) }

逻辑运算：

and, or, not
且， 或， 非
----
val query = it.createQuery("from Commodity c where (c.price between 100 and 5000) and (c.category not like '%童装%')", Commodity::class.java)
query.list().forEach { println(it.name) }

集合运算：

元素是否属于集合（参数为集合，value in ?）：
[not] in (v1, v2, v3)
----
val query = it.createQuery("from Customer c where c.age in (20,35)", Customer::class.java)     底层使用 Statement 接口
query.list().forEach { println(it.age) }
----
val query = it.createQuery("from Customer c where c.age in :values", Customer::class.java)     底层使用 PreparedStatement 接口
query.setParameter("values", arrayListOf(20, 35))     设置参数
query.list().forEach { println(it.age) }

元素是否属于集合（参数为元素，? in list）：
[not] member of -> [not] in
----
val orderForm = it.get(OrderForm::class.java, 1)
val query = it.createQuery("from Customer c where :values member of c.orderforms", Customer::class.java)
query.setParameter("values", orderForm)     设置参数
query.list().forEach { println(it.name) }

集合是否为空集：
is empty -> not exists
is not empty -> exists
----
val query = it.createQuery("select o.orderitems.size from OrderForm o where o.orderitems is not empty", Integer::class.java)
query.list().forEach { println(it) }

空值判断：

is [not] null
----
val query = it.createQuery("from Commodity c where c.description is null", Commodity::class.java)
query.list().forEach { println(it.name) }

字符串匹配：

精确匹配：like '张爱玲'
模糊匹配：like '张%'
通配符：
%：任意字符
_：任意一个字符
----
val query = it.createQuery("from Customer c where c.address like '%北京%'", Customer::class.java)
query.list().forEach { println(it.address) }

uniqueResult：查询结果最多只能有一个，否则抛出异常。
----
val query = it.createQuery("from Customer c where c.age>30", Customer::class.java)
val customer = query.uniqueResultOptional().orElse(Customer(name = "不存在"))
println(customer.name)
```

## 排序结果：order by
* 升序排序（由低到高）：asc
* 降序排序（由高到低）：desc

```kotlin
val query = it.createQuery("from Commodity c order by c.seller.id asc,c.price desc,c.name asc", Commodity::class.java)     多排序规则
query.list().forEach { println("${it.seller?.id}  ${it.price}  ${it.name}") }

----
输出：
1  200  女士套装
1  200  男士西服
1  120  中式童装
2  4000  笔记本电脑
2  400  移动硬盘
3  5000  液晶电视
3  4000  滚筒洗衣机
4  50  《Java核心》
4  40  《海底两万里》
4  30  《hibernate编程》
```

## Source

### Seller（商家）
```kotlin
import javax.persistence.*

@Entity
@NamedQuery(name = "allSeller", query = "from Seller")
data class Seller(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var name: String? = null,
        var tel: String? = null,
        var address: String? = null,
        var website: String? = null,
        var star: Int? = null,
        var business: String? = null,
        @OneToMany(mappedBy = "seller", cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        val commoditys: MutableList<Commodity> = arrayListOf()
) {
    fun addCommodity(commodity: Commodity) {
        commoditys.add(commodity)
        commodity.seller = this
    }

    fun removeCommodity(commodity: Commodity) {
        commoditys.remove(commodity)
        commodity.seller = null
    }
}
```

### Commodity（商品）
```kotlin
import javax.persistence.*

@Entity
data class Commodity(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var name: String? = null,
        var price: Int? = null,
        var unit: String? = null,
        var category: String? = null,
        var description: String? = null,
        @ManyToOne
        var seller: Seller? = null,
        @OneToMany(mappedBy = "commodity", cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        val orderitems: MutableList<OrderItem> = arrayListOf()
) {
    fun addOrderItem(orderItem: OrderItem) {
        orderitems.add(orderItem)
        orderItem.commodity = this
    }

    fun removeOrderItem(orderItem: OrderItem) {
        orderitems.remove(orderItem)
        orderItem.commodity = null
    }
}
```

### Customer（客户）
```kotlin
import java.util.*
import javax.persistence.*

@Entity
data class Customer(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var name: String? = null,
        var tel: String? = null,
        var address: String? = null,
        var email: String? = null,
        var sex: String? = null,
        var description: String? = null,
        var age: Int? = null,
        var birthday: Date? = null,
        @OneToMany(mappedBy = "customer", cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        val orderforms: MutableList<OrderForm> = arrayListOf()
) {
    fun addOrderForm(orderForm: OrderForm) {
        orderforms.add(orderForm)
        orderForm.customer = this
    }

    fun removeOrderForm(orderForm: OrderForm) {
        orderforms.remove(orderForm)
        orderForm.customer = null
    }
}
```

### OrderForm（订单）
```kotlin
import java.util.*
import javax.persistence.*

@Entity
data class OrderForm(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var tradedate: Date? = null,
        var status: String? = null,
        var amount: Int? = null,
        @ManyToOne
        var customer: Customer? = null,
        @OneToMany(mappedBy = "orderForm", cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        val orderitems: MutableList<OrderItem> = arrayListOf()
) {
    fun addOrderItem(orderItem: OrderItem) {
        orderitems.add(orderItem)
        orderItem.orderForm = this
    }

    fun removeOrderItem(orderItem: OrderItem) {
        orderitems.remove(orderItem)
        orderItem.orderForm = null
    }
}
```

### OrderItem（订单明细）
```kotlin
import javax.persistence.*

@Entity
data class OrderItem(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var amount: Int? = null,
        var actprice: Int? = null,
        var discount: Int? = null,
        @ManyToOne
        var orderForm: OrderForm? = null,
        @ManyToOne
        var commodity: Commodity? = null
)
```

### A
```kotlin
import org.hibernate.SessionFactory
import org.hibernate.boot.MetadataSources
import org.hibernate.boot.registry.StandardServiceRegistryBuilder
import java.util.*

val sessionFactory: SessionFactory by lazy {
    val registry = StandardServiceRegistryBuilder().configure().build()
    MetadataSources(registry).buildMetadata().buildSessionFactory()
}

fun main(args: Array<String>) {
    val seller1 = Seller(name = "A服装店", tel = "13000000000", address = "中国重庆市××区", website = "www.a.com", star = 5, business = "经营各种服装")
    val seller2 = Seller(name = "B数码店", tel = "15800000000", address = "中国杭州市××区", website = "www.b.com", star = 4, business = "经营各种数码产品")
    val seller3 = Seller(name = "C电器店", tel = "16800000000", address = "中国深圳市××区", website = "www.c.com", star = 4, business = "经营各种家电")
    val seller4 = Seller(name = "D书籍店", tel = "17600000000", address = "中国西安市××区", website = "www.d.com", star = 5, business = "经营各种书籍")

    val customer1 = Customer(name = "张三", tel = "13800000000", address = "中国上海××区××路", email = "13800000000@138.com", sex = "男", age = 25, birthday = Date(), description = "热爱编程的程序员")
    val customer2 = Customer(name = "李四", tel = "13888888888", address = "中国北京××区××路", email = "13888888888@138.com", sex = "女", age = 20, birthday = Date(), description = "酷爱网购的白领")
    val customer3 = Customer(name = "王五", tel = "15888888888", address = "中国深圳××区××路", email = "15888888888@158.com", sex = "男", age = 35, birthday = Date(), description = "这个家伙很懒，什么也没有留下")

    val commodity1 = Commodity(name = "中式童装", price = 120, unit = "套", category = "童装", description = "中式童装")
    val commodity2 = Commodity(name = "女士套装", price = 200, unit = "套", category = "女装", description = "女士职业套装")
    val commodity3 = Commodity(name = "男士西服", price = 200, unit = "套", category = "男装", description = "男士西服套装")
    val commodity4 = Commodity(name = "笔记本电脑", price = 4000, unit = "台", category = "电脑", description = "双核笔记本电脑")
    val commodity5 = Commodity(name = "移动硬盘", price = 400, unit = "块", category = "电脑周边", description = "1T移动硬盘")
    val commodity6 = Commodity(name = "液晶电视", price = 5000, unit = "台", category = "电视", description = "4k液晶电视")
    val commodity7 = Commodity(name = "滚筒洗衣机", price = 4000, unit = "台", category = "洗衣机", description = "滚筒洗衣机")
    val commodity8 = Commodity(name = "《hibernate编程》", price = 30, unit = "", category = "实体书", description = "介绍hibernate编程")
    val commodity9 = Commodity(name = "《Java核心》", price = 50, unit = "", category = "实体书", description = "介绍Java编程核心")
    val commodity10 = Commodity(name = "《海底两万里》", price = 40, unit = "", category = "电子书", description = "经典科幻小说")

    val orderForm1 = OrderForm(status = "已收货", amount = 4400, tradedate = Date())
    val orderForm2 = OrderForm(status = "已发货", amount = 520, tradedate = Date())
    val orderForm3 = OrderForm(status = "已付款", amount = 9120, tradedate = Date())

    val orderItem1 = OrderItem(discount = 1, amount = 1, actprice = 4000)
    val orderItem2 = OrderItem(discount = 1, amount = 1, actprice = 400)
    val orderItem3 = OrderItem(discount = 1, amount = 1, actprice = 120)
    val orderItem4 = OrderItem(discount = 1, amount = 1, actprice = 200)
    val orderItem5 = OrderItem(discount = 1, amount = 1, actprice = 200)
    val orderItem6 = OrderItem(discount = 1, amount = 1, actprice = 5000)
    val orderItem7 = OrderItem(discount = 1, amount = 1, actprice = 4000)
    val orderItem8 = OrderItem(discount = 1, amount = 1, actprice = 30)
    val orderItem9 = OrderItem(discount = 1, amount = 1, actprice = 50)
    val orderItem10 = OrderItem(discount = 1, amount = 1, actprice = 40)

    seller1.let {
        it.addCommodity(commodity1)
        it.addCommodity(commodity2)
        it.addCommodity(commodity3)
    }
    seller2.let {
        it.addCommodity(commodity4)
        it.addCommodity(commodity5)
    }
    seller3.let {
        it.addCommodity(commodity6)
        it.addCommodity(commodity7)
    }
    seller4.let {
        it.addCommodity(commodity8)
        it.addCommodity(commodity9)
        it.addCommodity(commodity10)
    }

    customer1.addOrderForm(orderForm1)
    customer2.addOrderForm(orderForm2)
    customer3.addOrderForm(orderForm3)

    orderForm1.let {
        it.addOrderItem(orderItem1)
        it.addOrderItem(orderItem2)
    }
    orderForm2.let {
        it.addOrderItem(orderItem3)
        it.addOrderItem(orderItem4)
        it.addOrderItem(orderItem5)
    }
    orderForm3.let {
        it.addOrderItem(orderItem6)
        it.addOrderItem(orderItem7)
        it.addOrderItem(orderItem8)
        it.addOrderItem(orderItem9)
        it.addOrderItem(orderItem10)
    }

    commodity1.addOrderItem(orderItem3)
    commodity2.addOrderItem(orderItem4)
    commodity3.addOrderItem(orderItem5)
    commodity4.addOrderItem(orderItem1)
    commodity5.addOrderItem(orderItem2)
    commodity6.addOrderItem(orderItem6)
    commodity7.addOrderItem(orderItem7)
    commodity8.addOrderItem(orderItem8)
    commodity9.addOrderItem(orderItem9)
    commodity10.addOrderItem(orderItem10)

    sessionFactory.currentSession.use {
        it.beginTransaction()
        it.save(seller1)
        it.save(seller2)
        it.save(seller3)
        it.save(seller4)
        it.save(customer1)
        it.save(customer2)
        it.save(customer3)
        it.transaction.commit()
    }

    sessionFactory.close()
}
```
