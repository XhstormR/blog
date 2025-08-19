---
author: XhstormR
tags:
- JAVA
date: 2017-08-07T19:25:50+08:00
title: Java CompletableFuture
---

<!--more-->

Updated on 2017-08-07

> [CompletableFuture API](https://docs.oracle.com/javase/10/docs/api/java/util/concurrent/CompletableFuture.html)
>
> [Stream API](/post/java-8/#stream)

```java
CompletableFuture
        .supplyAsync(() -> "5") //有结果工厂方法
        .thenApplyAsync(v -> Integer.valueOf(v) + 5) //进行转换
        .whenCompleteAsync((v, e) -> System.out.println("记录: " + v + ", " + e)) //进行记录（peek）
        .exceptionally(e -> -1) //处理异常
        .thenAcceptAsync(v -> System.out.println(v)) //进行消耗
        .thenRunAsync(() -> System.out.println("Done"));
----
输出：
记录: 10, null
10
Done

二选二
-------------------------------------------------------
CompletableFuture<Integer> completableFuture = CompletableFuture.completedFuture(5);
CompletableFuture
        .supplyAsync(() -> 5)
        .thenCombineAsync(completableFuture, (x, y) -> x + y) //应用双方的结果（thenApplyAsync*2）
        .thenAcceptAsync(v -> System.out.println(v));
----
输出：
10

CompletableFuture<Integer> completableFuture = CompletableFuture.completedFuture(5);
CompletableFuture
        .supplyAsync(() -> 5)
        .thenAcceptBothAsync(completableFuture, (x, y) -> System.out.println(x + y)); //消耗双方的结果（thenAcceptAsync*2）
----
输出：
10

CompletableFuture<Integer> completableFuture = CompletableFuture.completedFuture(5);
CompletableFuture
        .runAsync(() -> { //无结果工厂方法
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        })
        .runAfterBothAsync(completableFuture, () -> System.out.println("Done")); //等待双方执行完毕
----
输出：
Done

二选一
-------------------------------------------------------
 applyToEitherAsync：应用任意一方先执行完毕的结果
  acceptEitherAsync：消耗任意一方先执行完毕的结果
runAfterEitherAsync：等待任意一方执行完毕

多选
-------------------------------------------------------
CompletableFuture<Void> voidCompletableFuture =     CompletableFuture.allOf(cfs); //等待所有 Future 执行完毕，返回 Void
CompletableFuture<Object> objectCompletableFuture = CompletableFuture.anyOf(cfs); //等待任意一方执行完毕，返回其结果

Note：
以 Async 结尾的方法都是异步执行。

thenComposeAsync 类似于 thenApplyAsync，区别在于 Function 的返回值是 CompletionStage。

handleAsync = thenApplyAsync + exceptionally
```
