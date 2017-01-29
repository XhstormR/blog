+++
date = "2017-01-26T20:22:26+08:00"
title = "jOOQ"
Categories = ["JAVA"]

+++

<!--more-->

Updated on 2017-01-26

> {{< image "/uploads/jooq.png" "jOOQ" "1" "0" >}}
>
> https://github.com/jOOQ/jOOQ
>
> https://www.jooq.org/javadoc/latest/allclasses-noframe.html
>
> https://jcenter.bintray.com/org/jooq/
>
> https://jcenter.bintray.com/org/postgresql/postgresql/

## Concept
* 结构化查询语言（SQL）：Structured Query Language
  * 数据定义语言（DDL）：Data Definition Language
      * 用于建立（CREATE）、修改（ALTER）、删除（DROP）数据库对象。
  * 数据操纵语言（DML）：Data Manipulation Language
      * 用于改变（INSERT、UPDATE、DELETE）数据库数据。
  * 数据查询语言（DQL）：Data Query Language
      * 用于查询（SELECT）所需要的数据。
  * 数据控制语言（DCL）：Data Control Language
      * 用于执行权限的授予和收回操作、创建用户，包括授予（GRANT）语句，收回（REVOKE）语句。
  * 事务控制语言（TCL）：Transaction Control Language
      * 用于维护数据一致性的语句，包括提交（COMMIT）、回滚（ROLLBACK）、保存点（SAVEPOINT）。
* 增删改查（CRUD）：增加（Create），查询（Retrieve），修改（Update），删除（Delete）
* 事务（Transaction）：数据库中 **保证交易可靠** 的机制（ACID）。
  * 原子性（Atomicity）：对于数据修改，要么全都执行，要么全都不执行。
  * 一致性（Consistency）：所有的数据都保持一致状态。
  * 隔离性（Isolation）：与其它并发事务所作的修改隔离。
  * 持久性（Durability）：对于系统的影响是永久性的。
* 数据访问对象（DAO）：Data Access Object
  * 用于封装所有对数据库的访问，使数据访问逻辑和业务逻辑分开。
* 对象关系映射（ORM）：Object Relation Mapping
      * **类**中的**对象**的**属性**（Java）<— 映射（ORM） —>**表**中的**关系**的**字段**（Database）

## Map
```bash
java -Dorg.jooq.no-logo=true -cp jooq-3.9.1.jar;jooq-meta-3.9.1.jar;jooq-codegen-3.9.1.jar;postgresql-9.4.1212.jar;. org.jooq.util.GenerationTool 123.xml
```

```xml
123.xml
⇳
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<configuration xmlns="http://www.jooq.org/xsd/jooq-codegen-3.9.0.xsd">
  <jdbc>
    <driver>org.postgresql.Driver</driver>
    <url>jdbc:postgresql://127.0.0.1:5432/postgres</url>
    <user>123</user>
    <password>123456</password>
  </jdbc>

  <generator>
    <name>org.jooq.util.JavaGenerator</name>

    <database>
      <name>org.jooq.util.postgres.PostgresDatabase</name>
      <inputSchema>public</inputSchema>
      <includes>.*</includes>
      <excludes></excludes>
    </database>

    <target>
      <packageName>sql.generated</packageName>
      <directory>D:\123</directory>
    </target>
  </generator>
</configuration>
```

## Query
```kotlin
import org.jooq.impl.DSL
import sql.generated.tables.Weather

fun main(args: Array<String>) {
    System.setProperty("org.jooq.no-logo", "true")
    val dslContext = DSL.using("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val result = dslContext.select().from(Weather.WEATHER).fetch()
    or
    val result = dslContext.resultQuery("select * from weather").fetch()
    or
    val result = dslContext.resultQuery("select {0},{1},{2},{3},{4} from {5}", DSL.name("city"), DSL.name("temp_lo"), DSL.name("temp_hi"), DSL.name("date"), DSL.name("prcp"), DSL.name("weather")).fetch()
    result.forEach {
        val str = it[Weather.WEATHER.CITY]
        val i1 = it[Weather.WEATHER.TEMP_LO]
        val i2 = it[Weather.WEATHER.TEMP_HI]
        val date = it[Weather.WEATHER.DATE]
        val float = it[Weather.WEATHER.PRCP]
        println("|$str |$i1 |$i2 |$date |$float")
    }
    println("共 ${result.size} 条记录")
    dslContext.close()
}
```

```java
build.gradle
⇳
compile 'org.jetbrains.kotlin:kotlin-stdlib:+'
compile 'org.jooq:jooq:+'
compile 'org.postgresql:postgresql:9.4.1212'
```

## JDBC Property
```kotlin
val properties = Properties().apply { this.load(File("db.properties").inputStream()) }
println(properties["jdbc.url"])
println(properties["jdbc.user"])
println(properties["jdbc.password"])
----
输出：
jdbc:postgresql://127.0.0.1:5432/postgres
123
123456
```

```
db.properties
⇳
jdbc.url=jdbc:postgresql://127.0.0.1:5432/postgres
jdbc.user=123
jdbc.password=123456
```

## Native Method
### Statement 接口
* Statement 主要用于执行一次性静态 SQL 语句，效率不高，也不能防止 SQL Injection。

```kotlin
import java.sql.DriverManager

fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val statement = connection.createStatement()

    val sql1 = "INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27')"
    val sql2 = "SELECT * FROM weather"

    val i = statement.executeUpdate(sql1)     返回影响的记录数
    val resultSet = statement.executeQuery(sql2)     返回查询的结果集

    var c = 0
    while (resultSet.next()) {
        c++
        val str = resultSet.getString("city")
        val i1 = resultSet.getInt("temp_lo")
        val i2 = resultSet.getInt("temp_hi")
        val date = resultSet.getDate("date")
        val float = resultSet.getFloat("prcp")
        println("|$str |$i1 |$i2 |$date |$float")
    }
    println("共 $c 条记录")
    connection.close()
}
```

### PreparedStatement 接口
* 继承自 Statement 接口。
* PreparedStatement 重用 SQL 语句并防止 SQL Injection（转义特殊字符）。

```kotlin
import java.sql.Date
import java.sql.DriverManager

fun main(args: Array<String>) {
    val sql1 = "INSERT INTO weather VALUES (?, ?, ?, ?, ?)"     设置占位符
    val sql2 = "SELECT * FROM weather WHERE city = ?"

    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val preparedStatement1 = connection.prepareStatement(sql1)
    val preparedStatement2 = connection.prepareStatement(sql2)

    preparedStatement1.setString(1, "San Francisco")     填充占位符
    preparedStatement1.setInt(2, 46)
    preparedStatement1.setInt(3, 50)
    preparedStatement1.setFloat(4, 0.25f)
    preparedStatement1.setDate(5, Date.valueOf("1994-11-27"))
    val i = preparedStatement1.executeUpdate()     返回影响的记录数

    preparedStatement2.setString(1, "San Francisco")     填充占位符
    val resultSet = preparedStatement2.executeQuery()     返回查询的结果集

    var c = 0
    while (resultSet.next()) {
        c++
        val str = resultSet.getString("city")
        val i1 = resultSet.getInt("temp_lo")
        val i2 = resultSet.getInt("temp_hi")
        val date = resultSet.getDate("date")
        val float = resultSet.getFloat("prcp")
        println("|$str |$i1 |$i2 |$date |$float")
    }
    println("共 $c 条记录")
    connection.close()
}
```

### ResultSet 接口
```kotlin
import java.sql.DriverManager
import java.sql.ResultSet

fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE)     指定结果集可滚动并感知数据变化，可更新
    val resultSet = statement.executeQuery("SELECT * FROM weather")

    val resultSetMetaData = resultSet.metaData     结果集元数据
    for (i in 1..resultSetMetaData.columnCount) {
        val s1 = resultSetMetaData.getColumnName(i)     在 Table 中的列名
        val s2 = resultSetMetaData.getColumnTypeName(i)     在 Database 中的类型
        val s3 = resultSetMetaData.getColumnClassName(i)     在 Java 中的类型
        println("|$s1 |$s2 |$s3")
    }

    var c = 0
    while (resultSet.next()) {     遍历结果集
        c++
        val str = resultSet.getString("city")
        val i1 = resultSet.getInt("temp_lo")
        val i2 = resultSet.getInt("temp_hi")
        val date = resultSet.getDate("date")
        val float = resultSet.getFloat("prcp")
        println("|$str |$i1 |$i2 |$date |$float")
    }
    println("共 $c 条记录")
    connection.close()
}

Tips：
Statement stmt = conn.createStatement(type, concurrency);
PreparedStatement stmt = conn.prepareStatement(sql, type, concurrency);
```

### Transaction
```kotlin
fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val statement = connection.createStatement()

    try {
        val b = connection.autoCommit     保存自动提交状态
        connection.autoCommit = false     关闭自动提交
        statement.executeUpdate("UPDATE weather SET temp_hi = temp_hi - 2, temp_lo = temp_lo - 2 WHERE date > '1994-11-28'")
        statement.executeUpdate("UPDATE weather SET prcp = 0.0 WHERE city = 'Hayward'")
        connection.commit()     统一提交事务，失败则回滚
        connection.autoCommit = b     恢复自动提交状态
    } catch (e: SQLException) {
        connection.rollback()     失败时回滚事务
    }
    connection.close()     释放资源
}
```

### Batch
```kotlin
fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val statement = connection.createStatement()

    val sql = "INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27')"
    for (i in 1..1005) {
        statement.addBatch(sql)     添加至批处理
        if (i % 500 == 0) {     防止 Out Of Memory
            statement.executeBatch()     统一提交批处理
            statement.clearBatch()     清空批处理
        }
    }
    statement.executeBatch()     提交剩余批处理
    statement.clearBatch()
    connection.close()
}
```
