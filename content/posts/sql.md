---
author: XhstormR
tags:
  - SQL
date: 2018-04-07T15:05:01+08:00
title: SQL 必知必会
---

<!--more-->

Updated on 2018-04-14

> {{< image "uploads/sql-query-order.png" "Select Query Order" "1" "1" "650">}}
>
> https://zh.m.wikipedia.org/zh-cn/SQL

```sql
/*2 检索*/

SELECT *
FROM Products;

SELECT prod_name
FROM Products;

-- DISTINCT 去重，作用于所有列
SELECT DISTINCT vend_id
FROM Products;

-- LIMIT 限制数量，OFFSET 偏移数量
SELECT prod_name
FROM Products
LIMIT 5
OFFSET 5;

/*3 排序*/

-- ORDER BY 排序
SELECT prod_name
FROM Products
ORDER BY prod_name;

-- 按多个列排序
SELECT
  prod_id,
  prod_price,
  prod_name
FROM Products
ORDER BY prod_price, prod_name;
-- 等同于
SELECT
  prod_id,
  prod_price,
  prod_name
FROM Products
ORDER BY 2, 3;

-- DESC 降序排序（缺省为升序 ASC）
SELECT
  prod_id,
  prod_price,
  prod_name
FROM Products
ORDER BY prod_price DESC, prod_name;

/*4 过滤*/

-- 检查单个值
SELECT
  prod_name,
  prod_price
FROM Products
WHERE prod_price = 3.49;

SELECT
  prod_name,
  prod_price
FROM Products
WHERE prod_price <= 10;

-- 不匹配检查
SELECT
  vend_id,
  prod_name
FROM Products
WHERE vend_id != 'DLL01';

-- 范围值检查
SELECT
  prod_name,
  prod_price
FROM Products
WHERE prod_price BETWEEN 5 AND 10;

-- 空值检查
SELECT cust_name
FROM CUSTOMERS
WHERE cust_email IS NULL;

/*5 高级过滤*/

-- AND 且
SELECT
  prod_name,
  prod_price
FROM Products
WHERE vend_id = 'DLL01' AND prod_price <= 4;

-- OR 或
SELECT
  prod_name,
  prod_price
FROM Products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01';

-- NOT 非，条件取反，可以否定（取反）任何条件
SELECT
  prod_name,
  prod_price
FROM Products
WHERE NOT vend_id = 'FNG01';

-- IN 条件范围，与 OR 功能相当，推荐使用
SELECT
  prod_name,
  prod_price
FROM Products
WHERE vend_id IN ('DLL01', 'BRS01');

-- () 条件组合，管理比较顺序
SELECT
  prod_name,
  prod_price
FROM Products
WHERE (vend_id = 'DLL01' OR vend_id = 'BRS01') AND prod_price >= 10;

/*6 通配符*/

-- LIKE 模式匹配，只能用于字符串。出于性能考虑，最好放在过滤条件的最后
-- % 多个字符（任意字符出现任意次数），注意不会匹配 NULL
SELECT
  prod_id,
  prod_name
FROM Products
WHERE prod_name LIKE '%teddy bear%';

-- _ 单个字符（不多也不少）
SELECT
  prod_id,
  prod_name
FROM Products
WHERE prod_name LIKE '__ inch teddy bear%';

/*7 创建计算字段*/

-- TRIM() 函数清除左右两边的空格
-- || 拼接字段
-- AS 使用别名
SELECT vend_name || ' (' || vend_country || ')' AS vend_title
FROM Vendors;
SELECT TRIM(vend_name) || ' (' || TRIM(vend_country) || ')' AS vend_title
FROM Vendors;

-- 执行数字计算
SELECT
  prod_id,
  quantity,
  item_price,
  quantity * item_price AS expanded_price
FROM OrderItems
WHERE order_num = 20008;

-- SELECT 语句可以用于测试表达式
SELECT 3 * 2;
SELECT TRIM('  ABC  ');
SELECT NOW();
SELECT CURRENT_DATE;

/*8 函数*/

-- 数值函数
-- 系统函数
-- 文本函数
SELECT
  vend_name,
  UPPER(vend_name) AS vend_name_upcase
FROM Vendors;

-- 时间函数
SELECT order_num
FROM Orders
WHERE DATE_PART('year', order_date) = 2012;

/*9 汇总数据*/

-- 聚集函数
-- COUNT(*)      总行数
-- COUNT(column) 该列的行数（忽略 NULL）
--   SUM(column) 该列的总和
--   AVG(column) 该列的平均值
--   MAX(column) 该列的最大值
--   MIN(column) 该列的最小值
-- 聚集不同值
-- DISTINCT 去重（缺省为所有行 ALL）
SELECT
  COUNT(DISTINCT prod_price) AS num_price_dist,
  COUNT(prod_price)          AS num_price,
  AVG(DISTINCT prod_price)   AS avg_price_dist,
  AVG(prod_price)            AS avg_price,
  MAX(prod_price)            AS max_price,
  MIN(prod_price)            AS min_price,
  SUM(prod_price)            AS sum_price
FROM Products
WHERE vend_id = 'DLL01';

SELECT SUM(item_price * quantity) AS total_price
FROM OrderItems
WHERE order_num = 20005;

/*10 分组数据*/

-- 创建分组
-- GROUP BY 子句指示 DBMS 进行数据分组，然后对每个组进行聚集，而不是对整个结果集
-- GROUP BY x 根据 x 列进行分组
-- GROUP BY x, y 根据 x 列和 y 列进行分组（将 x 列和 y 列的值视为一个整体来分组）
SELECT
  vend_id,
  COUNT(*) AS num_prods
FROM Products
GROUP BY vend_id;
-- 等同于
SELECT
  vend_id,
  COUNT(*) AS num_prods
FROM Products
GROUP BY 1;

-- 过滤分组
-- WHERE  过滤行，
-- HAVING 过滤组；
-- WHERE  在数据分组前进行过滤，
-- HAVING 在数据分组后进行过滤。
SELECT
  vend_id,
  COUNT(*) AS num_prods -- 计数
FROM Products
WHERE prod_price >= 4 -- 过滤（行级）
GROUP BY 1 -- 分组
HAVING COUNT(*) >= 2 -- 过滤（组级）
ORDER BY num_prods, 1 DESC; -- 排序

/*11 子查询*/

-- 子查询：嵌套在其他查询中的查询，只能查询单个列，总是由内向外进行处理
-- 子查询性能不好，推荐使用联结（JOIN）

-- 填充 IN 操作符
-- 显示订购产品 RGAN01 的顾客列表
SELECT order_num
FROM OrderItems
WHERE prod_id = 'RGAN01';
-- +
SELECT cust_id
FROM Orders
WHERE order_num IN (20007, 20008);
-- =
SELECT cust_id
FROM Orders
WHERE order_num IN (SELECT order_num
                    FROM OrderItems
                    WHERE prod_id = 'RGAN01');
-- +
SELECT
  cust_name,
  cust_contact
FROM Customers
WHERE cust_id IN ('1000000004', '1000000005');
-- =
SELECT
  cust_name,
  cust_contact
FROM Customers
WHERE cust_id IN (SELECT cust_id
                  FROM Orders
                  WHERE order_num IN (SELECT order_num
                                      FROM OrderItems
                                      WHERE prod_id = 'RGAN01'));

-- 填充计算列
SELECT COUNT(*) AS orders
FROM Orders
WHERE cust_id = '1000000001';
-- +
SELECT
  cust_name,
  cust_state
FROM Customers;
-- =
SELECT
  cust_name,
  cust_state,
  (SELECT COUNT(*)
   FROM Orders
   WHERE Orders.cust_id = Customers.cust_id) AS orders -- 避免歧义
FROM Customers;

/*12 联结表*/

-- 联结机制：在一条 SELECT 语句中关联多个表中配对成功的行，返回一组输出
-- 联结方式：首先列出所有表，然后定义表之间的配对条件
-- 注意：
--    ON 只用于连接行（联结）
-- WHERE 只用于过滤行

-- 显示订购产品 RGAN01 的顾客列表
-- 等值联结（内联结）
SELECT
  cust_name,
  cust_contact
FROM Orders, Customers, OrderItems
WHERE prod_id = 'RGAN01'
      AND Orders.order_num = OrderItems.order_num
      AND Orders.cust_id = Customers.cust_id;

-- 简单格式
SELECT
  vend_name,
  prod_name
FROM Vendors, Products
WHERE Vendors.vend_id = Products.vend_id;
-- 等同于
-- 标准格式
SELECT
  vend_name,
  prod_name
FROM Vendors
  -- 联结机制
  INNER JOIN Products
    ON Vendors.vend_id = Products.vend_id; -- 配对条件

/*13 高级联结*/

-- 自联结（self-join）
-- 多次引用相同的表
SELECT
  c1.cust_id,
  c1.cust_name,
  c1.cust_contact
FROM Customers AS c1, Customers AS c2
WHERE c2.cust_contact = 'Jim Jones'
      AND c1.cust_name = c2.cust_name;

-- 自然联结（natural join）
-- 等值联结（内联结）的特例化
-- 联结时，自动比较名称相同的列
-- 输出时，自动去除名称相同的列
SELECT *
FROM Vendors
  NATURAL JOIN Products;
-- 对比
SELECT *
FROM Vendors
  INNER JOIN Products
    ON Vendors.vend_id = Products.vend_id;

SELECT
  cust_name,
  cust_contact
FROM Orders
  NATURAL JOIN Customers
  NATURAL JOIN OrderItems
WHERE prod_id = 'RGAN01';

-- 外联结（outer join）
-- 全外联结：内联结 + 全部表没有配对成功的行（FULL）
-- 左外联结：内联结 + 左边表没有配对成功的行（LEFT）
-- 右外联结：内联结 + 右边表没有配对成功的行（RIGHT）
-- 左外联结和右外联结可以交换使用，区别在于关联表的顺序
SELECT
  Customers.cust_id,
  Orders.order_num
FROM Customers
  LEFT OUTER JOIN Orders
    ON Customers.cust_id = Orders.cust_id;
-- 等同于
SELECT
  Customers.cust_id,
  Orders.order_num
FROM Orders
  RIGHT OUTER JOIN Customers
    ON Customers.cust_id = Orders.cust_id;

-- 带有聚集函数的联结
SELECT
  Customers.cust_id,
  COUNT(Orders.order_num) AS num_ord
FROM Customers
  LEFT OUTER JOIN Orders
    ON Customers.cust_id = Orders.cust_id
GROUP BY Customers.cust_id
ORDER BY 2 DESC;

/*14 组合查询*/

-- 并（union）：执行多条 SELECT 语句，并合并为一个结果集
-- UNION 和 WHERE 的多个 OR 条件所完成的工作相同
-- UNION     无重复行，
-- UNION ALL 有重复行。

SELECT
  cust_name,
  cust_contact
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI')
UNION
SELECT
  cust_name,
  cust_contact
FROM Customers
WHERE cust_name = 'Fun4All';
-- 等同于
SELECT
  cust_name,
  cust_contact
FROM Customers
WHERE cust_state IN ('IL', 'IN', 'MI')
      OR cust_name = 'Fun4All';

/*15 插入数据*/

-- 插入完整行
INSERT INTO Customers
VALUES ('1000000006', 'Toy Land', '123 Any Street', 'New York', 'NY', '11111', 'USA',NULL,NULL);

-- 插入部分行
INSERT INTO Customers (cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip)
VALUES ('1000000006', 'Toy Land', '123 Any Street', 'New York', 'NY', '11111');

-- 导入行（INSERT SELECT）
INSERT INTO Customers (cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip)
  SELECT
    cust_id,
    cust_name,
    cust_address,
    cust_city,
    cust_state,
    cust_zip
  FROM CustNew;

-- 导出行（SELECT INTO）
SELECT *
INTO CustNew
FROM Customers;

/*16 更新和删除数据*/

-- 更新指定行
UPDATE Customers
SET cust_contact = 'Sam Roberts',
  cust_email     = 'sam@toyland.com'
WHERE cust_id = '1000000006';

UPDATE account
SET "role" =
CASE "role"
  WHEN 'USER1' THEN 'STAFF1'
  WHEN 'USER2' THEN 'STAFF2'
  ELSE "role"
END;

-- 删除指定行
DELETE FROM Customers
WHERE cust_id = '1000000006';

-- 删除所有行
TRUNCATE TABLE Customers;

/*17 创建和操纵表*/

/*18 视图*/

-- 一张虚拟表，包含的不是数据，而是 SELECT 语句，用于动态检索数据，可以重用 SQL，简化复杂数据的处理

-- 创建视图
-- 用于封装复杂的查询语句
CREATE OR REPLACE VIEW ProductCustomers AS
  SELECT
    cust_name,
    cust_contact,
    prod_id
  FROM Customers, Orders, OrderItems
  WHERE Customers.cust_id = Orders.cust_id
        AND OrderItems.order_num = Orders.order_num;
-- 用于简化计算字段
CREATE OR REPLACE VIEW OrderItemsExpanded AS
  SELECT
    prod_id,
    quantity,
    item_price,
    quantity * item_price AS expanded_price,
    order_num
  FROM OrderItems;
-- 用于格式化检索出的数据
CREATE OR REPLACE VIEW VendorLocations AS
  SELECT TRIM(vend_name) || ' (' || TRIM(vend_country) || ')'
    AS vend_title
  FROM Vendors;

-- 使用视图
SELECT *
FROM ProductCustomers
WHERE prod_id = 'RGAN01';
SELECT *
FROM OrderItemsExpanded
WHERE order_num = 20008;
SELECT *
FROM VendorLocations;

-- 删除视图
DROP VIEW ProductCustomers;

/*19 存储过程*/

/*20 事务处理*/

/*21 游标*/

/*22 SQL 特性*/

-- 约束：管理如何插入或处理数据库数据
-- 主键
ALTER TABLE Vendors
  ADD PRIMARY KEY (vend_id);
-- 外键
ALTER TABLE Orders
  ADD FOREIGN KEY (cust_id) REFERENCES Customers (cust_id);
-- 检查约束
ALTER TABLE OrderItems
  ADD CHECK (quantity > 0);
-- 唯一约束

-- 索引：改善检索数据的性能
-- 用于对列进行过滤和排序
-- 取值范围越大的列做索引效果越好，比如姓名列就比性别列收益高
CREATE INDEX prod_name_ind
  ON Products (prod_name);

-- 触发器：特殊的存储过程，在单表发生特定动作时自动执行
-- INSERT 时能够访问新数据
-- UPDATE 时能够访问新数据和旧数据
-- DELETE 时能够访问删除的数据
CREATE TABLE emp (
  empname   TEXT,
  salary    INTEGER,
  last_user TEXT,
  last_date TIMESTAMP
);

CREATE OR REPLACE FUNCTION emp_stamp()
  RETURNS TRIGGER AS $$
BEGIN

  IF NEW.empname IS NULL
  THEN
    RAISE EXCEPTION 'empname cannot be null';
  END IF;
  IF NEW.salary IS NULL
  THEN
    RAISE EXCEPTION '% cannot have null salary', NEW.empname;
  END IF;
  IF NEW.salary < 0
  THEN
    RAISE EXCEPTION '% cannot have a negative salary', NEW.empname;
  END IF;

  -- 记录最后操作的人和日期
  NEW.last_user := current_user;
  NEW.last_date := current_timestamp;
  RETURN NEW;

END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER emp_stamp
  BEFORE INSERT OR UPDATE
  ON emp
  FOR EACH ROW EXECUTE PROCEDURE emp_stamp();
```

## Reference

- SQL 风格
  - https://www.sqlstyle.guide/zh/
  - https://launchbylunch.com/posts/2014/Feb/16/sql-naming-conventions/
- SQL Select
  - [https://www.sqlite.org/lang_select.html](https://www.sqlite.org/lang_select.html#fromclause)
  - [https://www.postgresql.org/docs/current/queries-table-expressions.html](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-FROM)
