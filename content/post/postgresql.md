+++
Categories = ["SQL"]
date = "2017-02-19T20:39:57+08:00"
title = "PostgreSQL"

+++

<!--more-->

Updated on 2017-02-19

> {{< image "/uploads/postgresql.svg" "PostgreSQL" "1" "1" "375" >}}
>
> https://www.postgresql.org/
>
> https://jcenter.bintray.com/org/postgresql/postgresql/
>
> https://www.enterprisedb.com/download-postgresql-binaries

## Concept
* 结构化查询语言（SQL）：Structured Query Language
  * 数据定义语言（DDL）：Data Definition Language
      * 用于建立（CREATE）、修改（ALTER）、删除（DROP）数据库对象。
  * 数据操纵语言（DML）：Data Manipulation Language
      * 用于改变（INSERT、UPDATE、DELETE）数据库数据。
  * 数据查询语言（DQL）：Data Query Language
      * 用于查询（SELECT）所需要的数据。
  * 数据控制语言（DCL）：Data Control Language
      * 用于权限的授予（GRANT）和收回（REVOKE），创建用户（CREATE USER）。
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
  * 数据传递对象
      * 值对象（Value Object）
      * 实体对象（Entity）
* 对象关系映射（ORM）：Object Relation Mapping
      * **类**中的**对象**的**属性**（Java）<— 映射（ORM） —>**表**中的**记录**的**字段**（Database）
