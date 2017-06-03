---
Categories:
- JAVA
date: 2017-01-26T20:22:26+08:00
title: jOOQ
---

<!--more-->

Updated on 2017-02-01

> {{< image "/uploads/jooq.png" "jOOQ" "1" "0" >}}
>
> https://github.com/jOOQ/jOOQ
>
> https://www.jooq.org/javadoc/latest/allclasses-noframe.html
>
> https://jcenter.bintray.com/org/jooq/
>
> https://jcenter.bintray.com/org/postgresql/postgresql/

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

-------------------------------------------------------

原生 SQL 语句
----
val result = dslContext.resultQuery("select * from weather").fetch()
val result = dslContext.resultQuery("select {0},{1},{2},{3},{4} from {5}", DSL.name("city"), DSL.name("temp_lo"), DSL.name("temp_hi"), DSL.name("date"), DSL.name("prcp"), DSL.name("weather")).fetch()

防止 SQL Injection
----
DSL.name("abc")     "abc"
DSL.inline("abc")      'abc'
```

```kotlin
import org.jooq.impl.DSL
import sql.generated.tables.Weather
import sql.generated.tables.records.WeatherRecord

fun main(args: Array<String>) {
    System.setProperty("org.jooq.no-logo", "true")
    val dslContext = DSL.using("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val result = dslContext.select().from(Weather.WEATHER).fetch {     RecordMapper（ORM）
        val str = it[Weather.WEATHER.CITY]
        val i1 = it[Weather.WEATHER.TEMP_LO]
        val i2 = it[Weather.WEATHER.TEMP_HI]
        val date = it[Weather.WEATHER.DATE]
        val float = it[Weather.WEATHER.PRCP]
        WeatherRecord(str, i1, i2, float, date)
    }

    result.forEach { println("|${it.city} |${it.tempLo} |${it.tempHi} |${it.date} |${it.prcp}") }
    println("共 ${result.size} 条记录")
    dslContext.close()
}
```

```java
build.gradle
⇳
compile 'org.jetbrains.kotlin:kotlin-stdlib:+'
compile 'org.jooq:jooq:+'
compile 'org.postgresql:postgresql:42.0.0'
```

## Insert
```kotlin
import org.jooq.impl.DSL
import sql.generated.tables.Weather.WEATHER
import java.sql.Date

fun main(args: Array<String>) {
    System.setProperty("org.jooq.no-logo", "true")
    val dslContext = DSL.using("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    dslContext.insertInto(WEATHER,
            WEATHER.CITY, WEATHER.TEMP_LO, WEATHER.TEMP_HI, WEATHER.DATE, WEATHER.PRCP)
            .values("Chongqing", 25, 29, Date.valueOf("2017-01-27"), 0.25f)
            .values("Chongqing", 25, 29, Date.valueOf("2017-01-28"), 0.25f)
            .values("Chongqing", 25, 29, Date.valueOf("2017-01-29"), 0.25f)
            .execute()     插入 3 条数据
}
```

## JDBC Property
```kotlin
val properties = Properties().apply { this.load(File("db.properties").inputStream()) }
println(properties["jdbc.url"])
println(properties["jdbc.username"])
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
jdbc.username=123
jdbc.password=123456
```

## Native Method
### Statement 接口
* Statement 主要用于执行一次性静态 SQL 语句，效率不高，也不能防止 SQL Injection。

```kotlin
import java.sql.DriverManager

fun main(args: Array<String>) {
    Class.forName("org.postgresql.Driver")
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val statement = connection.createStatement()

    val sql1 = "INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27')"
    val sql2 = "SELECT * FROM weather"

    val i = statement.executeUpdate(sql1)     执行 DML 语句，返回影响的记录数
    val resultSet = statement.executeQuery(sql2)     执行 DQL 语句，返回查询的结果集

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
    val sql1 = "INSERT INTO weather VALUES (?, ?, ?, ?, ?);"     设置占位符
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
    val resultSet = statement.executeQuery("SELECT * FROM weather;")

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
        statement.executeUpdate("UPDATE weather SET temp_hi = temp_hi - 2, temp_lo = temp_lo - 2 WHERE date > '1994-11-28';")
        statement.executeUpdate("UPDATE weather SET prcp = 0.0 WHERE city = 'Hayward'")
        connection.commit()     统一提交事务，失败则回滚
        connection.autoCommit = b     恢复至原有提交状态
    } catch (e: SQLException) {
        connection.rollback()     失败时回滚事务
    }
    connection.close()     释放资源
}
```

### Batch
```kotlin
Statement：
fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val statement = connection.createStatement()

    val sql = "INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');"
    for (i in 0..1004) {     共 1005 条数据
        statement.addBatch(sql)     添加至批处理
        if (i % 500 == 0) {     防止因存储过多待处理 SQL 语句，而导致 Out Of Memory
            statement.executeBatch()     统一提交 SQL 语句，降低网络通信次数
            statement.clearBatch()     清空批处理
        }
    }
    statement.executeBatch()     提交剩余 SQL 语句
    statement.clearBatch()
    connection.close()
}

----

PreparedStatement：
fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val prepareStatement = connection.prepareStatement("INSERT INTO employee (id) VALUES (?);")

    for (i in 0..1004) {
        prepareStatement.setInt(1, i)
        prepareStatement.addBatch()
        if (i % 500 == 0) {
            prepareStatement.executeBatch()
            prepareStatement.clearBatch()
        }
    }
    prepareStatement.executeBatch()
    prepareStatement.clearBatch()
    connection.close()
}
```

### Paging
```kotlin
每次只请求 1 页数据量，对内存压力较小，适合大数据量的表：
fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val prepareStatement = connection.prepareStatement("SELECT * FROM employee LIMIT 10 OFFSET ?;")     只取 10 条数据，偏移量每次递增 10

    fun a(i: Int) = i * 10     偏移量每次递增 10

    for (i in 0..4) {
        prepareStatement.setInt(1, a(i))
        val resultSet = prepareStatement.executeQuery()
        while (resultSet.next()) {
            val int = resultSet.getInt("id")
            val str = resultSet.getString("name")
            println("|$int |$str")
        }
        println("———————")
    }
    connection.close()
}

----

一次性取出所有数据，对内存压力较大，适合小数据量的表：
fun main(args: Array<String>) {
    val connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/postgres", "123", "123456")
    val statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE)     可滚动结果集
    val resultSet = statement.executeQuery("SELECT * FROM employee;")     包含 1005 条记录

    a(2, resultSet)     第 2 页（10 - 19）
    a(1, resultSet)     第 1 页（00 - 09）
    a(5, resultSet)     第 5 页（40 - 49）

    connection.close()
}

fun a(p: Int, resultSet: ResultSet) {
    val x = (p - 1) * 10
    val y = p * 10
    var j = 0
    resultSet.beforeFirst()
    while (resultSet.next()) {
        if (x <= j && j < y) {
            val int = resultSet.getInt("id")
            val str = resultSet.getString("name")
            println("|$int |$str")
        } else if (j >= y) {
            break
        }
        j++
    }
}
```
