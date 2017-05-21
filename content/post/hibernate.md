---
author: XhstormR
categories:
- Hibernate
date: 2017-05-14T15:31:36+08:00
title: Hibernate ORM
---

<!--more-->

Updated on 2017-05-14

> {{< image "/uploads/hibernate.png" "Hibernate" "1" "1" >}}
>
> http://hibernate.org/orm/
>
> https://github.com/hibernate/hibernate-orm
>
> https://www.postgresql.org/docs/current/static/index.html
>
> https://dl.bintray.com/hibernate/bundles/org/hibernate/hibernate-release/

## Configuration
### build.gradle.kts
```bash
compile("org.postgresql:postgresql:+")
compile("org.hibernate:hibernate-core:+")
```

### hibernate.cfg.xml
```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="dialect">org.hibernate.dialect.PostgreSQL95Dialect</property>
        <property name="connection.url">jdbc:postgresql://127.0.0.1:5432/postgres</property>
        <property name="connection.driver_class">org.postgresql.Driver</property>
        <property name="connection.username">123</property>
        <property name="connection.password">123456</property>

        <property name="show_sql">true</property>
        <property name="format_sql">false</property>

        <property name="hbm2ddl.auto">update</property>

        <property name="current_session_context_class">thread</property>

        <mapping class="entity.Student"/>     实体
    </session-factory>
</hibernate-configuration>

hbm2ddl.auto（DDL 生成策略）：
     create：启动时重新创建表。
create-drop：启动时重新创建表，结束时再删除表。
     update：启动时验证表结构，不一致时，更新表结构。
   validate：启动时验证表结构，不一致时，抛出异常。

current_session_context_class ➜ thread ➜ org.hibernate.context.internal.ThreadLocalSessionContext
```

## 单表操作
### entity
#### Student
```kotlin
package entity

import java.util.*
import javax.persistence.*     JPA 注解

@Entity     实体
data class Student(
        @Id     主键
        @GeneratedValue(strategy = GenerationType.IDENTITY)     主键整形自增（SERIAL）
        var id: Int? = null,
        var name: String? = null,
        var gender: String? = null,
        var birthday: Date? = null,
        var address: Address? = null,     组件
        var picture: ByteArray? = null,
        @Transient     非字段
        var temp: String? = null
)

@Column(nullable = false, columnDefinition = "timestamp|time|date")     定义字段
timestamp  时间+日期
time       时间
date       日期
```

#### Address
```kotlin
package entity

import javax.persistence.Embeddable

@Embeddable     组件
data class Address(
        var city: String? = null,
        var phone: String? = null,
        var postcode: String? = null
)
```

### A
```kotlin
import entity.Address
import entity.Student
import org.hibernate.SessionFactory
import org.hibernate.boot.MetadataSources
import org.hibernate.boot.registry.StandardServiceRegistryBuilder
import java.util.*

val sessionFactory: SessionFactory by lazy {     会话工厂
    val registry = StandardServiceRegistryBuilder().configure().build()
    MetadataSources(registry).buildMetadata().buildSessionFactory()
}

fun main(args: Array<String>) {
    create()
    retrieve()
    update()
    delete()
    sessionFactory.close()
}

fun create() {
    println("增")
    sessionFactory.currentSession.use {
        it.beginTransaction()     开启事务
        val student = Student(name = "张三丰", gender = "男", birthday = Date(), address = Address(city = "重庆"))
        it.save(student)
        it.transaction.commit()     提交事务
    }

          openSession()：新建会话，会话需手动关闭。
    getCurrentSession()：重用会话，会话会自动关闭。（需要配置 current_session_context_class）
}

fun retrieve() {
    println("查")
    sessionFactory.currentSession.use {
        it.beginTransaction()
        val student = it.get(Student::class.java, 1)
        println(student)
        it.transaction.commit()
    }

     get()：立即执行 SQL 语句，返回实体对象，记录不存在返回 null。（Eager）
    load()：延迟执行 SQL 语句，返回代理对象，记录不存在抛出 ObjectNotFoundException 异常。（Lazy）
}

fun update() {
    println("改")
    sessionFactory.currentSession.use {
        it.beginTransaction()
        val student = it.get(Student::class.java, 1)?.apply { this.gender = "女" }
        if (student != null) {
            it.update(student)
        }
        it.transaction.commit()
    }
}

fun delete() {
    println("删")
    sessionFactory.currentSession.use {
        it.beginTransaction()
        val student = it.get(Student::class.java, 1)
        if (student != null) {
            it.delete(student)
        }
        it.transaction.commit()
    }
}
```

## 多表关联
### 一对一
只需持久化一方（Phone）。

#### 单向引用
```kotlin
import javax.persistence.*     JPA 注解

@Entity
data class Phone(     从表
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        @Column(unique = true)     定义字段
        var number: String? = null,
        @OneToOne(cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        @JoinColumn(unique = true)     定义外键字段
        var details: PhoneDetail? = null     将 PhoneDetail 的主键作为此表的外键
)

----

@Entity
data class PhoneDetail(     主表（与平常状态一致，无需改动）
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var provider: String? = null
)
```

#### 双向引用（优）
```kotlin
@Entity
data class Phone(     主表
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        @Column(unique = true)
        var number: String? = null,
        @OneToOne(mappedBy = "phone", cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        var details: PhoneDetail? = null     由 PhoneDetail 中的 phone 负责关联
) {
    fun addDetails(details: PhoneDetail) {     确保双方关系保持同步
        this.details = details
        details.phone = this
    }

    fun removeDetails() {     确保双方关系保持同步
        if (details != null) {
            this.details = null
            details?.phone = null
        }
    }
}

----

@Entity
data class PhoneDetail(     从表
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var provider: String? = null,
        @OneToOne
        @JoinColumn(unique = true)
        var phone: Phone? = null     将 Phone 的主键作为此表的外键
)
```

### 一对多
只需持久化一方（Person）。

#### 单向引用（一方持有多方集合）
会生成中间表 Person_Phone 来关联两个实体。

```kotlin
@Entity
data class Person(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var name: String? = null,
        @OneToMany(cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        val phones: MutableList<Phone> = arrayListOf()
)

----

@Entity
data class Phone(     与平常状态一致，无需改动
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        @Column(unique = true)
        var number: String? = null
)
```

### 多对一
因未设置级联属性，在不同事务中，需先持久化 **主表** Person，后持久化**从表** Phone。( 先主后从 )

#### 单向引用（多方持有一方引用）
```kotlin
@Entity
data class Person(     主表（与平常状态一致，无需改动）
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var name: String? = null
)

----

@Entity
data class Phone(     从表
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        @Column(unique = true)
        var number: String? = null,
        @ManyToOne
        var person: Person? = null     将 Person 的主键作为此表的外键
)
```

### 一（多）对多（一）
只需持久化一方（Person）。

#### 双向引用（优）
```kotlin
@Entity
data class Person(     主表
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var name: String? = null,
        @OneToMany(mappedBy = "person", cascade = arrayOf(CascadeType.ALL), orphanRemoval = true)
        val phones: MutableList<Phone> = arrayListOf()     由 Phone 中的 person 负责关联
) {
    fun addPhone(phone: Phone) {     确保双方关系保持同步
        phones.add(phone)
        phone.person = this
    }

    fun removePhone(phone: Phone) {     确保双方关系保持同步
        phones.remove(phone)
        phone.person = null
    }
}

----

@Entity
data class Phone(     从表
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        @Column(unique = true)
        var number: String? = null,
        @ManyToOne
        var person: Person? = null     将 Person 的主键作为此表的外键
)
```

### 多对多（略）
