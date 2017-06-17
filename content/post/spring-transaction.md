---
author: XhstormR
categories:
- Spring
date: 2017-06-15T12:53:18+08:00
title: Spring Transaction
---

<!--more-->

Updated on 2017-06-15

> {{< image "/uploads/spring.png" "Spring Framework" "1" "1" >}}
>
> https://github.com/brettwooldridge/HikariCP
>
> https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/transaction/TransactionDefinition.html
>
> https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html

## Concept
* 事务的传播行为：Propagation
  * 作用：解决业务层中方法之间互相调用而产生的事务如何传递的问题。
  * 在 **相同** 事务中：REQUIRED
  * 在 **不同** 事务中：REQUIRES_NEW
  * 在 **嵌套** 事务中：NESTED
* 事务的隔离级别：Isolation
* 只读事务：readOnly
  * 作用：禁止 **增删改** 操作。
* 发生异常一回滚事务：-Exception
* 发生异常不回滚事务：+Exception

## Configuration
### build.gradle.kts
```bash
compile("org.springframework:spring-orm:+")
compile("org.springframework:spring-context:+")

compile("com.zaxxer:HikariCP:+")
compile("org.slf4j:slf4j-jdk14:+")
compile("org.postgresql:postgresql:+")

compile("org.hibernate:hibernate-core:+")
compile("org.hibernate:hibernate-hikaricp:+")
```

### hibernate.properties
```bash
hibernate.show_sql=true
hibernate.format_sql=false
hibernate.hbm2ddl.auto=update
hibernate.dialect=org.hibernate.dialect.PostgreSQL95Dialect
hibernate.current_session_context_class=org.springframework.orm.hibernate5.SpringSessionContext

hibernate.connection.provider_class=org.hibernate.hikaricp.internal.HikariCPConnectionProvider
hibernate.hikari.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
hibernate.hikari.dataSource.url=jdbc:postgresql://127.0.0.1:5432/postgres
hibernate.hikari.username=123
hibernate.hikari.password=123456
#hibernate.hikari.driverClassName=org.postgresql.Driver
#hibernate.hikari.jdbcUrl=jdbc:postgresql://127.0.0.1:5432/postgres
```

### hibernate.cfg.xml
```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <mapping class="entity.Account"/>
    </session-factory>
</hibernate-configuration>
```

## 编程式事务管理
### 基于 TransactionTemplate
#### entity
##### Account
```kotlin
package entity

import javax.persistence.*

@Entity
data class Account(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int? = null,
        var name: String? = null,
        var money: Int = 0
)
```
#### dao
##### AccountDao
```kotlin
package dao

interface AccountDao {
    fun outMoney(id: Int, money: Int)
    fun inMoney(id: Int, money: Int)
}
```
##### AccountDaoImpl
```kotlin
package dao

import entity.Account
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.orm.hibernate5.HibernateTemplate
import org.springframework.stereotype.Component

@Component
open class AccountDaoImpl : AccountDao {
    @Autowired
    private lateinit var hibernateTemplate: HibernateTemplate

    override fun outMoney(id: Int, money: Int) {
        val account = hibernateTemplate.get(Account::class.java, id).apply { this.money -= money }
        hibernateTemplate.update(account)
    }

    override fun inMoney(id: Int, money: Int) {
        val account = hibernateTemplate.get(Account::class.java, id).apply { this.money += money }
        hibernateTemplate.update(account)
    }
}
```
#### service
##### AccountService
```kotlin
package service

interface AccountService {
    fun transfer(out: Int, `in`: Int, money: Int)
}
```
##### **AccountServiceImpl**
```kotlin
package service

import dao.AccountDao
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.transaction.support.TransactionTemplate

@Component
open class AccountServiceImpl : AccountService {
    @Autowired
    private lateinit var accountDao: AccountDao
    @Autowired
    private lateinit var transactionTemplate: TransactionTemplate     注入事务管理模板

    override fun transfer(out: Int, `in`: Int, money: Int) {
        transactionTemplate.execute {     在同一个事务中执行
            accountDao.outMoney(out, money)
            accountDao.inMoney(`in`, money)
        }
    }
}
```
#### **AppConfig**
```kotlin
import org.hibernate.SessionFactory
import org.hibernate.boot.MetadataSources
import org.hibernate.boot.registry.StandardServiceRegistryBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.orm.hibernate5.HibernateTemplate
import org.springframework.orm.hibernate5.HibernateTransactionManager
import org.springframework.transaction.support.TransactionTemplate

@Configuration
@ComponentScan(basePackages = arrayOf("dao", "service"))
open class AppConfig {
    @Bean
    open fun sessionFactory(): SessionFactory {
        val registry = StandardServiceRegistryBuilder().configure().build()
        return MetadataSources(registry).buildMetadata().buildSessionFactory()
    }

    @Bean
    open fun hibernateTemplate(sessionFactory: SessionFactory): HibernateTemplate {
        return HibernateTemplate(sessionFactory)
    }

    @Bean
    open fun transactionManager(sessionFactory: SessionFactory): HibernateTransactionManager {
        return HibernateTransactionManager(sessionFactory)
    }

    ----

    @Bean
    open fun transactionTemplate(transactionManager: HibernateTransactionManager): TransactionTemplate {
        return TransactionTemplate(transactionManager)     事务管理模板
    }
}
```
#### Main
```kotlin
import entity.Account
import org.hibernate.SessionFactory
import org.springframework.context.annotation.AnnotationConfigApplicationContext
import service.AccountService

fun main(args: Array<String>) {
    val context = AnnotationConfigApplicationContext(AppConfig::class.java)

    context.getBean(SessionFactory::class.java).openSession().use {
        it.beginTransaction()
        it.save(Account(name = "张三", money = 1000))
        it.save(Account(name = "李四", money = 1000))
        it.save(Account(name = "王五", money = 1000))
        it.transaction.commit()
    }

    context.getBean(AccountService::class.java).transfer(1, 2, 400)

    context.destroy()
}
```

## 声明式事务管理
### 基于 TransactionProxyFactoryBean
#### 略
#### service.AccountServiceImpl
```kotlin
package service

import dao.AccountDao
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
open class AccountServiceImpl : AccountService {
    @Autowired
    private lateinit var accountDao: AccountDao

    override fun transfer(out: Int, `in`: Int, money: Int) {
        accountDao.outMoney(out, money)
        accountDao.inMoney(`in`, money)
    }
}
```
#### **AppConfig**
```kotlin
import org.hibernate.SessionFactory
import org.hibernate.boot.MetadataSources
import org.hibernate.boot.registry.StandardServiceRegistryBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.orm.hibernate5.HibernateTemplate
import org.springframework.orm.hibernate5.HibernateTransactionManager
import org.springframework.transaction.interceptor.TransactionProxyFactoryBean
import service.AccountService
import java.util.*

@Configuration
@ComponentScan(basePackages = arrayOf("dao", "service"))
open class AppConfig {
    @Bean
    open fun sessionFactory(): SessionFactory {
        val registry = StandardServiceRegistryBuilder().configure().build()
        return MetadataSources(registry).buildMetadata().buildSessionFactory()
    }

    @Bean
    open fun hibernateTemplate(sessionFactory: SessionFactory): HibernateTemplate {
        return HibernateTemplate(sessionFactory)
    }

    @Bean
    open fun transactionManager(sessionFactory: SessionFactory): HibernateTransactionManager {
        return HibernateTransactionManager(sessionFactory)
    }

    ----

    @Bean
    open fun accountServiceProxy(accountService: AccountService, transactionManager: HibernateTransactionManager): TransactionProxyFactoryBean {
        return TransactionProxyFactoryBean().apply {     代理对象
            this.setTarget(accountService)     设置目标对象（增强对象）
            this.setTransactionManager(transactionManager)     设置事务管理器
            this.setTransactionAttributes(Properties().apply { this["*"] = "PROPAGATION_REQUIRED" })     设置事务属性
        }
    }
}
```
#### **Main**
```kotlin
import entity.Account
import org.hibernate.SessionFactory
import org.springframework.context.annotation.AnnotationConfigApplicationContext
import service.AccountService

fun main(args: Array<String>) {
    val context = AnnotationConfigApplicationContext(AppConfig::class.java)

    context.getBean(SessionFactory::class.java).openSession().use {
        it.beginTransaction()
        it.save(Account(name = "张三", money = 1000))
        it.save(Account(name = "李四", money = 1000))
        it.save(Account(name = "王五", money = 1000))
        it.transaction.commit()
    }

    context.getBean("accountServiceProxy", AccountService::class.java).transfer(1, 2, 400)     使用代理对象

    context.destroy()
}
```

### 基于注解（推荐）
#### 略
#### **service.AccountServiceImpl**
```kotlin
package service

import dao.AccountDao
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
@Transactional     使用事务
open class AccountServiceImpl : AccountService {
    @Autowired
    private lateinit var accountDao: AccountDao

    override fun transfer(out: Int, `in`: Int, money: Int) {
        accountDao.outMoney(out, money)
        accountDao.inMoney(`in`, money)
    }
}
```
#### **AppConfig**
```kotlin
import org.hibernate.SessionFactory
import org.hibernate.boot.MetadataSources
import org.hibernate.boot.registry.StandardServiceRegistryBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.orm.hibernate5.HibernateTemplate
import org.springframework.orm.hibernate5.HibernateTransactionManager
import org.springframework.transaction.annotation.EnableTransactionManagement

@Configuration
@EnableTransactionManagement     启用支持注解驱动的事务管理
@ComponentScan(basePackages = arrayOf("dao", "service"))
open class AppConfig {
    @Bean
    open fun sessionFactory(): SessionFactory {
        val registry = StandardServiceRegistryBuilder().configure().build()
        return MetadataSources(registry).buildMetadata().buildSessionFactory()
    }

    @Bean
    open fun hibernateTemplate(sessionFactory: SessionFactory): HibernateTemplate {
        return HibernateTemplate(sessionFactory)
    }

    @Bean
    open fun transactionManager(sessionFactory: SessionFactory): HibernateTransactionManager {
        return HibernateTransactionManager(sessionFactory)
    }
}
```
#### Main
```kotlin
import entity.Account
import org.hibernate.SessionFactory
import org.springframework.context.annotation.AnnotationConfigApplicationContext
import service.AccountService

fun main(args: Array<String>) {
    val context = AnnotationConfigApplicationContext(AppConfig::class.java)

    context.getBean(SessionFactory::class.java).openSession().use {
        it.beginTransaction()
        it.save(Account(name = "张三", money = 1000))
        it.save(Account(name = "李四", money = 1000))
        it.save(Account(name = "王五", money = 1000))
        it.transaction.commit()
    }

    context.getBean(AccountService::class.java).transfer(1, 2, 400)

    context.destroy()
}
```
