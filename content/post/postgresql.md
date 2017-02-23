+++
Categories = ["SQL"]
date = "2017-02-19T20:39:57+08:00"
title = "自学 PostgreSQL"

+++

<!--more-->

Updated on 2017-02-19

> {{< image "/uploads/postgresql.svg" "PostgreSQL" "1" "1" "375" >}}
>
> https://www.postgresql.org/
>
> https://jdbc.postgresql.org/download.html
>
> https://www.postgresql.org/docs/current/static/index.html
>
> https://github.com/pgjdbc/pgjdbc
>
> https://github.com/postgres/postgres
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

## Initial
```bash
initdb.exe -A md5 -E UTF8 --no-locale --lc-messages="Chinese (Simplified)_China.936" -U 123 -W -D D:\12345
pg_ctl.exe -l D:\log.txt -D D:\12345 start
pg_ctl.exe -l D:\log.txt -D D:\12345 stop
psql.exe -e -E -h 127.0.0.1 -p 5432 -U 123 -W -d postgres

compile 'org.postgresql:postgresql:42.0.0'
```

## Operate
```bash
\c     切换数据库
\l     列出数据库
\d     列出表、序列、视图
\du     列出角色
\dn     列出模式
\dx     列出扩展

\g     执行查询缓存区
\p     显示查询缓存区
\r     重置查询缓存区
\e     使用外部编辑器编辑查询缓存区
\w     将当前查询缓存区写至文件
\o     将所有查询结果写至文件
\i     将文件写至查询缓存区

\x     垂直显示查询结果（\x\g\x）
\t     只显示查询结果（无页眉和页脚）
\H     切换为 HTML 输出模式

\q     退出 psql
\h     SQL 语法说明
\!     执行外部命令
\set PROMPT1 123     设置提示符（https://www.postgresql.org/docs/current/static/app-psql.html#APP-PSQL-PROMPTING）
\pset pager off     关闭分页
\timing     计时
\conninfo     显示连接信息
\password     修改密码
\encoding     修改客户端编码

show all;     显示所有系统信息
show config_file;     显示系统配置文件
show server_version;     显示系统版本
show server_encoding;     显示服务端编码
show client_encoding;     显示客户端编码

select version();     显示系统版本
select now();     显示当前日期+时间
select current_timestamp;     显示当前日期+时间
select current_date;     显示当前日期
select current_time;     显示当前时间
select current_user;     显示当前用户
select current_database();     显示当前数据库

{}     必选项
[]     可选项
|     选择分隔符
```

## Table
### Create
```sql
DROP TABLE a;

-------------------------------------------------------

CREATE TABLE a (
  id    INTEGER,
  name  TEXT,
  price NUMERIC
);

-------------------------------------------------------
缺省值字段

CREATE TABLE a (
  id    SERIAL,     整形自增
  name  TEXT,
  price NUMERIC DEFAULT 9.99     默认值
);

-------------------------------------------------------
检查约束：字段需要满足某个布尔表达式。
表约束和列约束的区别是声明的位置不一样。

非空约束
检查约束

CREATE TABLE a (
  id    INTEGER,
  name  TEXT NOT NULL,     非空约束
  price NUMERIC,
  CHECK (price > 0),     "a_price_check"（检查约束）（表约束）（匿名）
  CONSTRAINT abc CHECK (price > 0)     "abc"（检查约束）（表约束）（命名）
);

----
唯一性约束

CREATE TABLE a (
  id    INTEGER UNIQUE,     "a_id_key"（唯一性约束）（列约束）（匿名）
  name  TEXT,
  price NUMERIC
);
等同于
CREATE TABLE a (
  id    INTEGER,
  name  TEXT,
  price NUMERIC,
  UNIQUE (id)     "a_id_key"（唯一性约束）（表约束）（匿名）
);
等同于
CREATE TABLE a (
  id    INTEGER,
  name  TEXT,
  price NUMERIC,
  CONSTRAINT abc UNIQUE (id)     "abc"（唯一性约束）（表约束）（命名）
);

----
联合唯一性约束 = 列组 + 唯一性约束

CREATE TABLE a (
  id    INTEGER,
  name  TEXT,
  price NUMERIC,
  UNIQUE (id, name)     "a_id_name_key"（联合唯一性约束）（表约束）（匿名）
);

-------------------------------------------------------
主键 = 主键约束（列或列组）= 唯一且非空 = 唯一性约束 + 非空约束 = 记录的唯一标识符
PRIMARY KEY = UNIQUE NOT NULL

CREATE TABLE a (
  id    INTEGER PRIMARY KEY,     "a_pkey"（匿名）
  name  TEXT,
  price NUMERIC
);
等同于
CREATE TABLE a (
  id    INTEGER CONSTRAINT abc PRIMARY KEY,     "abc"（命名）
  name  TEXT,
  price NUMERIC
);
等同于
CREATE TABLE a (
  id    INTEGER,
  name  TEXT,
  price NUMERIC,
  PRIMARY KEY (id)     "a_pkey"（表约束）
);

----
联合主键 = 列组 + 主键

CREATE TABLE a (
  id    INTEGER,
  name  TEXT,
  price NUMERIC,
  PRIMARY KEY (id, name)     "a_pkey"
);

-------------------------------------------------------
外键 = 外键约束（列或列组）= 匹配（引用）另一张表的主键 = 维持关联表之间的引用完整性（数据一致性）

CREATE TABLE a (     主表
  id    INTEGER PRIMARY KEY,     主键
  name  TEXT,
  price NUMERIC
);

CREATE TABLE b (     从表
  id    INTEGER PRIMARY KEY,     主键
  a_no  INTEGER REFERENCES a (id),     外键
  count INTEGER
);
等同于
CREATE TABLE b (
  id    INTEGER PRIMARY KEY,
  a_no  INTEGER REFERENCES a,     自动将被引用表的主键作为被引用列
  count INTEGER
);
等同于
CREATE TABLE b (
  id    INTEGER PRIMARY KEY,
  a_no  INTEGER,
  count INTEGER,
  FOREIGN KEY (a_no) REFERENCES a     表约束
);
等同于
CREATE TABLE b (     从表
  id    INTEGER,
  a_no  INTEGER,
  count INTEGER,
  PRIMARY KEY (id),     主键（表约束）（匿名）
  FOREIGN KEY (a_no) REFERENCES a     外键（表约束）（匿名）
);

-------------------------------------------------------
当删除或更新主表中的某条记录中的主键字段时，由于该条记录的主键字段被从表中某条记录所引用，所以操作将会失败（缺省）。

操作（主表）：
ON DELETE
ON UPDATE

响应（从表）：
NO ACTION     不允许该操作（事务晚些时候检查）（缺省）
RESTRICT     不允许该操作（事务早些时候检查）（常用）
CASCADE     递归操作（删除引用行、引用行字段置为更新值）（常用）
SET DEFAULT     引用行字段置为默认值
SET NULL     引用行字段置为 NULL

CREATE TABLE b (     从表
  id    INTEGER,
  a_no  INTEGER,
  count INTEGER,
  PRIMARY KEY (id),     主键
  FOREIGN KEY (a_no) REFERENCES a ON UPDATE CASCADE     外键（主表中被引用的记录不允许删除，但允许更新）
);
```

### Alter
```sql
添加字段（列）
-------------------------------------------------------
ALTER TABLE a
  ADD COLUMN description TEXT;     已存在的记录的新字段将自动填充 NULL

ALTER TABLE a
  ADD COLUMN description TEXT DEFAULT '未描述' CHECK (description != '');     可以使用 CREATE TABLE 中对字段的描述语法

删除字段（列）
-------------------------------------------------------
ALTER TABLE a DROP COLUMN description;

添加约束     表中的数据需在约束被添加之前就已经符合约束，否则将添加失败
-------------------------------------------------------
ALTER TABLE a ADD CHECK (name != '');     检查约束
ALTER TABLE a ADD UNIQUE (name);     唯一性约束
ALTER TABLE a ADD FOREIGN KEY (name) REFERENCES b;     外键约束
ALTER TABLE a ALTER COLUMN name SET NOT NULL;     非空约束（没有表约束，只有列约束；并且没有名称）

删除约束
-------------------------------------------------------
ALTER TABLE a DROP CONSTRAINT "a_name_check";     约束
ALTER TABLE a ALTER COLUMN name DROP NOT NULL;     非空约束（没有表约束，只有列约束；并且没有名称）

更改列的默认值     不会影响已存在的记录
-------------------------------------------------------
ALTER TABLE a ALTER COLUMN description SET DEFAULT '未描述';     添加
ALTER TABLE a ALTER COLUMN description DROP DEFAULT;     删除（默认值为 NULL）

更改列的数据类型     表中的数据需通过隐式转换才能成功，否则需要使用 USING 子句进行显式转换
-------------------------------------------------------
ALTER TABLE a ALTER COLUMN description TYPE VARCHAR;

重命名字段
-------------------------------------------------------
ALTER TABLE a RENAME COLUMN description TO characterization;

重命名表
-------------------------------------------------------
ALTER TABLE a RENAME TO b;
```

## Schema

{{< image "/uploads/postgresql-schema.png" "PostgreSQL" "0" "1" >}}

```sql

```

## Tool
* http://www.heidisql.com/download.php
* https://www.postgresql.org/ftp/pgadmin3/pgadmin4/
* https://github.com/sosedoff/pgweb/releases/latest
* https://www.jetbrains.com/datagrip/
