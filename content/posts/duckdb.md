---
title: DuckDB
date: 2026-04-14T11:42:04+08:00
author: XhstormR
tags:
    -
---

<!--more-->

> https://github.com/duckdb/duckdb
>
> https://www.duckdb.org/docs/current/sql/statements/overview

## 数据清洗

```sql
-- 导入数据
CREATE TABLE tbl1 AS
FROM
  '/Users/leo/Downloads/123.csv';

CREATE OR REPLACE TABLE tbl1 AS
FROM
  read_csv(
    '/Users/leo/Downloads/*.csv',
    header = true,
    filename = true,
    union_by_name = true
  );

-- 追加数据
INSERT INTO tbl1 BY NAME
FROM read_csv('/Users/leo/Downloads/123.csv');

-- 查找没有任何数据的列
SELECT
  list(column_name)
FROM
  (SUMMARIZE tbl1)
WHERE
  null_percentage = 100;

-- 清洗数据（创建新表）
CREATE OR REPLACE TABLE tbl2 AS
SELECT DISTINCT ON ("Issue key") -- 排除重复行
  * EXCLUDE ('Due Date', 'Environment', ...) -- 排除空数据列
FROM
  tbl1;

-- 导出数据
COPY tbl2 TO '/Users/leo/Downloads/output.csv' (HEADER, DELIMITER ',');

COPY (
  SELECT
    "Issue key",
    "Priority",
    "Summary",
    "Description"
  FROM
    tbl2
) TO '/Users/leo/Downloads/output.csv' (HEADER, DELIMITER ',');

-- 分区导出（按行拆分）
COPY (
  SELECT
    "Issue key",
    "Priority",
    "Summary",
    "Description"
  FROM
    tbl2
) TO '/Users/leo/Downloads/output/' (
  FORMAT csv,
  PARTITION_BY ("Issue key"),
  WRITE_PARTITION_COLUMNS,
  OVERWRITE_OR_IGNORE
);
```
