---
author: XhstormR
categories:
- JAVA
date: 2017-07-16T20:48:40+08:00
title: Java Concurrency
---

<!--more-->

Updated on 2017-07-16

> https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html

## Concept
* 串行：多个线程 **按照顺序** 使用同一个核心。（单核心）（Serial）
* 并发：多个线程 **共同轮流** 使用同一个核心。（单核心）（线程 **同时存在**）（Concurrent）
* 并行：多个线程 **各自分别** 使用一一个核心。（多核心）（线程 **同时执行**）（Parallel）
  * 并行是并发的一个 **子集**，区别在于 CPU 是否为多核心。

## Code
### 线程体
#### 无返回值：Runnable
```java
import java.util.concurrent.TimeUnit;

public class Action implements Runnable {
    @Override
    public void run() {     方法无返回值
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Action Done");
    }
}
```
#### 有返回值：Callable
```java
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

public class Task implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {     方法有返回值
        TimeUnit.SECONDS.sleep(1);
        System.out.println("Task Done");
        return 9527;
    }
}
```
### 线程池
#### ThreadPoolExecutor
```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newCachedThreadPool();     创建线程池

                                 executorService.execute(new Action());    执行 Runnable 对象，无返回值
        Future<Integer> future = executorService.submit (new Task());      执行 Callable 对象，有返回值

        executorService.shutdown();     停止接收线程体，并等待执行中的线程结束（不阻塞当前线程）

        System.out.println(future.get());     获得异步执行的结果（若运算未完成，则阻塞当前线程）
    }
}

Note：
int        corePoolSize：线程池的最小线程数
int     maximumPoolSize：线程池的最大线程数
long      keepAliveTime：空闲线程的生存时间
TimeUnit       timeUnit：之前参数的时间单位
BlockingQueue workQueue：存储等待执行的任务

变种：
newSingleThreadExecutor：所有线程串行执行
     newFixedThreadPool：最多 n 个线程并发执行
    newCachedThreadPool：所有线程并发执行
```
#### ScheduledThreadPoolExecutor
```java
import java.time.Instant;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) {
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(2);

        ScheduledFuture<?> scheduledFuture = scheduledExecutorService.scheduleAtFixedRate(() -> {
            System.out.println(Date.from(Instant.now()));
        }, 1, 1, TimeUnit.SECONDS);     重复执行：每隔 1 秒执行

        scheduledExecutorService.schedule(() -> {
            scheduledFuture.cancel(true);     取消任务
            scheduledExecutorService.shutdown();     关闭线程池
        }, 5, TimeUnit.SECONDS);     延期执行：5 秒后执行
    }
}
----
输出：
Fri Jul 21 15:55:53 CST 2017
Fri Jul 21 15:55:54 CST 2017
Fri Jul 21 15:55:55 CST 2017
Fri Jul 21 15:55:56 CST 2017
Fri Jul 21 15:55:57 CST 2017

重复执行：
scheduleAtFixedRate       任务开始时计时
scheduleWithFixedDelay    任务结束时计时

TimeUnit：
 NANOSECONDS：纳秒：1000
MICROSECONDS：微秒：1000
MILLISECONDS：毫秒：1000
     SECONDS：一秒：60
     MINUTES：一分：60
       HOURS：一时：24
        DAYS：一天
```
#### ExecutorCompletionService
```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newCachedThreadPool();
        CompletionService<Integer> completionService = new ExecutorCompletionService<>(executorService);     按照完成任务的先后顺序，依次将结果存入内部队列

        for (int n = 0; n < 3; n++) {
            completionService.submit(() -> {
                int i = ThreadLocalRandom.current().nextInt(5);     随机数生成器（本地线程）
                TimeUnit.SECONDS.sleep(i);
                return i;
            });
        }

        executorService.shutdown();

        for (int n = 0; n < 3; n++) {
            Future<Integer> future = completionService.take();     从内部队列中依次取出结果并移除（若没有结果，则阻塞当前线程）
            System.out.println(future.get());
        }
    }
}
----
输出：
0
1
4
```
#### ForkJoinPool
```java
```
```java
```
```java
```
```java
```
```java
```
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newCachedThreadPool();

        executorService.execute(() -> {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Action Done");
        });

        executorService.shutdown();

        System.out.println(executorService.isShutdown());
        System.out.println(executorService.isTerminated());
        while (true) {
            if (executorService.isTerminated()) {
                break;
            }
        }
        System.out.println(executorService.isShutdown());
        System.out.println(executorService.isTerminated());
    }
}
----
输出：
true
false
Action Done
true
true
```
