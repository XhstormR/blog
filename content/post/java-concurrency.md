---
author: XhstormR
categories:
- JAVA
date: 2017-07-16T20:48:40+08:00
title: Java Concurrency
---

<!--more-->

Updated on 2017-07-16

> {{< image "/uploads/java-concurrency1.svg" "Executor" "1" "1" >}}
>
> -
>
> {{< image "/uploads/java-concurrency2.svg" "Future" "1" "1" >}}
>
> -
>
> {{< image "/uploads/java-concurrency3.svg" "" "1" "1" >}}
>
> -
>
> [https://docs.oracle.com/javase/8/docs/api/java/util/concurrent](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html)

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
    public void run() {     方法签名无返回值，无检查异常
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
    public Integer call() throws Exception {     方法签名有返回值，有检查异常
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
TimeUnit       timeUnit：指示时间参数的单位
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
#### ForkJoinPool（并行框架）
* 主要用于 **计算密集型** 的任务，适合 **任务分而治之** 且 **函数递归调用** 的算法。

##### 无返回值：RecursiveAction
```java
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.RecursiveAction;

public class ComputeAction extends RecursiveAction {
    private final static int THRESHOLD = 200;
    private final double[] array;
    private final int from, to;

    ComputeAction(double[] array, int from, int to) {
        this.array = array;
        this.from = from;
        this.to = to;
    }

    @Override
    protected void compute() {
        if (to - from < THRESHOLD) {     当需要计算的资源小于阈值时，进行计算
            for (int i = from; i < to; i++) {
                array[i] = Math.sin(array[i]) + Math.cos(array[i]) + Math.tan(array[i]);
            }
        } else {     否则，把任务一分为二，进行递归
            int mid = (from + to) >>> 1;
            ComputeAction l = new ComputeAction(array, from, mid);
            ComputeAction r = new ComputeAction(array, mid, to);
            ForkJoinTask.invokeAll(l, r);     阻塞
        }
    }
}
```
##### 有返回值：RecursiveTask
```java
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.RecursiveTask;

public class FindTask extends RecursiveTask<Double> {
    private final static int THRESHOLD = 200;
    private final double[] array;
    private final int from, to;

    FindTask(double[] array, int from, int to) {
        this.array = array;
        this.from = from;
        this.to = to;
    }

    @Override
    protected Double compute() {
        if (to - from < THRESHOLD) {
            double max = 0;
            for (int i = from; i < to; i++) {
                max = Math.max(max, array[i]);
            }
            return max;
        } else {
            int mid = (from + to) >>> 1;
            FindTask l = new FindTask(array, from, mid);
            FindTask r = new FindTask(array, mid, to);
            ForkJoinTask.invokeAll(l, r);     阻塞
            return Math.max(l.join(), r.join());
        }
    }
}
```
##### Main
```java
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ThreadLocalRandom;

public class Main {
    public static void main(String[] args) {
        double[] array = ThreadLocalRandom.current().doubles(1000000).toArray();     生成随机数组

        ForkJoinPool forkJoinPool = new ForkJoinPool();

                        forkJoinPool.invoke(new ComputeAction(array, 0, array.length));  执行 RecursiveAction 对象，无返回值（阻塞）
        Double result = forkJoinPool.invoke(new FindTask(array, 0, array.length));       执行 RecursiveTask   对象，有返回值（阻塞）

        forkJoinPool.shutdown();
    }
}

ForkJoinPool.commonPool() 的并行度默认减 1
```
```java
```

---

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

        executorService.shutdown();     停止接收线程体，并等待执行中的线程结束（不阻塞当前线程）

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
```java
import java.util.Arrays;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.RecursiveAction;
import java.util.concurrent.ThreadLocalRandom;

public class Main {
    private final static int arraySize = 100_000_000;
    private final static int arrayMin = 0;
    private final static int arrayMax = 100_000_000;
    private final static int[] array = ThreadLocalRandom.current().ints(arraySize, arrayMin, arrayMax).toArray();

    private final static int bucketCount = 1000;
    private final static int bucketSize = (arraySize / bucketCount) * 10;
    private final static int bucketInterval = arrayMax / bucketCount;
    private final static int[] bucketIndex = new int[bucketCount];
    private final static int[][] bucketArr = new int[bucketCount][bucketSize];

    public static void main(String[] args) {
        //分桶(可以多线程，但效益不大)
        long l1 = System.currentTimeMillis();
        for (int i : array) {
            int j = i / bucketInterval;
            bucketArr[j][bucketIndex[j]++] = i;
        }

        //排序
        long l2 = System.currentTimeMillis();
        ForkJoinPool forkJoinPool = new ForkJoinPool();
        forkJoinPool.invoke(new SortAction(0, bucketIndex.length));
        forkJoinPool.shutdown();

        //合并
        long l3 = System.currentTimeMillis();
        int[] ints = new int[array.length];
        for (int i = 0, n = 0; i < bucketIndex.length; i++) {
            System.arraycopy(bucketArr[i], 0, ints, n, bucketIndex[i]);
            n += bucketIndex[i];
        }

        //显示
        long l4 = System.currentTimeMillis();
        String format1 = formatNum(arrayMax) + " - " + formatNum(arrayMax);
        String format2 = formatNum(bucketSize) + " 个：";
        for (int i = 0, n = arrayMin; i < bucketIndex.length; i++) {
            System.out.printf(format1, n, n += bucketInterval);
            System.out.printf(format2, bucketIndex[i]);
//            for (int j = 0; j < bucketIndex[i]; j++) {
//                System.out.print(bucketArr[i][j] + " ");
//            }
            System.out.println();
        }

        System.out.println("分桶:" + (l2 - l1));
        System.out.println("排序:" + (l3 - l2));
        System.out.println("合并:" + (l4 - l3));
        System.out.println("总共:" + (l4 - l1));

        check(ints);
    }

    private static void check(int[] ints) {
        for (int i = 0; i < ints.length - 1; i++) {
            if (ints[i] > ints[i + 1]) {
                System.out.println(false);
                return;
            }
        }
        System.out.println(true);
    }

    private static String formatNum(int i) {
        return "%" + countDigits(i) + "d";
    }

    private static int countDigits(int i) {
        int count = 0;
        for (; i != 0; i /= 10) {
            count++;
        }
        return count;
    }

    private static class SortAction extends RecursiveAction {
        private final static int THRESHOLD = 200;
        private final int from, to;

        private SortAction(int from, int to) {
            this.from = from;
            this.to = to;
        }

        @Override
        protected void compute() {
            if (to - from < THRESHOLD) {
                for (int i = from; i < to; i++) {
                    Arrays.sort(bucketArr[i], 0, bucketIndex[i]);
                }
            } else {
                int mid = (from + to) >>> 1;
                SortAction l = new SortAction(from, mid);
                SortAction r = new SortAction(mid, to);
                ForkJoinTask.invokeAll(l, r);
            }
        }
    }
}
----
输出：
略
分桶:1571
排序:1697
合并:94
总共:3362
true
```
