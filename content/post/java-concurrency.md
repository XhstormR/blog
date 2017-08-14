---
author: XhstormR
categories:
- JAVA
date: 2017-07-16T20:48:40+08:00
title: Java Concurrency
---

<!--more-->

Updated on 2017-07-29

> {{< image "/uploads/java-concurrency1.svg" "Executor" "1" "1" >}}
>
> -
>
> {{< image "/uploads/java-concurrency2.svg" "Future" "1" "1" >}}
>
> -
>
> {{< image "/uploads/java-concurrency3.svg" "Queue" "1" "1" >}}
>
> -
>
> {{< image "/uploads/java-concurrency4.svg" "" "1" "1" >}}
>
> -
>
> [https://docs.oracle.com/javase/8/docs/api/java/util/concurrent](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html)
> |
> [中文](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/util/concurrent/package-summary.html)

## Concept
* 串行：多个线程 **按照顺序** 使用同一个核心。（单核心）（Serial）
* 并发：多个线程 **共同轮流** 使用同一个核心。（单核心）（线程 **同时存在**）（Concurrent）
* 并行：多个线程 **各自分别** 使用　一个核心。（多核心）（线程 **同时执行**）（Parallel）
  * 并行是并发的一个 **子集**，区别在于 CPU 是否为多核心。

---

* `Blocking　`：　阻塞并发，内部使用 **锁**。
* `Concurrent`：非阻塞并发，内部使用 **CAS 操作**。

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
    private final static int THRESHOLD = 200;     影响任务个数
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
            ForkJoinTask.invokeAll(l, r);
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
### 并发队列
#### ArrayBlockingQueue
* **先入先出** 队列，内部实现为数组，支持 **公平访问策略**。

#### LinkedBlockingQueue
* **先入先出** 队列，内部实现为链表。
* 生产者-消费者实现：
  * 生产者向队列 **添加元素**：当队列 **已满** 时，生产者会被阻塞；
  * 消费者从队列 **移除元素**：当队列 **为空** 时，消费者会被阻塞。

##### Producer
```java
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class Producer implements Runnable {
    private final static AtomicInteger productID = new AtomicInteger();     原子 int
    private final BlockingQueue<Integer> queue;

    public Producer(BlockingQueue<Integer> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < 10; i++) {
                TimeUnit.MILLISECONDS.sleep(25);
                int id = productID.getAndIncrement();
                queue.put(id);     队列满时阻塞
                System.out.println("生产:" + id);
            }
            queue.put(-1);     队列满时阻塞
            System.out.println("生产结束");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
##### Consumer
```java
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

public class Consumer implements Runnable {
    private final BlockingQueue<Integer> queue;

    public Consumer(BlockingQueue<Integer> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            int i;
            while ((i = queue.take()) != -1) {     队列空时阻塞
                TimeUnit.MILLISECONDS.sleep(50);
                System.out.println("消费:" + i);
            }
            System.out.println("消费结束");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
##### Main
```java
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

public class Main {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new LinkedBlockingQueue<>(10);     指定队列容量为 10
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < 5; i++) {
            executorService.execute(new Producer(queue));
            executorService.execute(new Consumer(queue));
        }
        executorService.shutdown();
    }
}
```
#### PriorityBlockingQueue
* 队列中的元素会 **根据给定规则进行排序**。

#### DelayQueue
* 队列内部持有一个 PriorityBlockingQueue，用于存储元素并 **根据延迟时间进行排序**。
* 队列中的元素需要 **实现 Delayed 接口**。
  * `getDelay` 方法用于获取剩余延迟。
  * `compareTo` 方法对元素进行比较。

##### DelayObject
```java
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

public class DelayObject implements Delayed {
    private final static TimeUnit TIME_UNIT = TimeUnit.MILLISECONDS;     内部计时单位
    private final long delay;      延迟时间
    private final long submit;     提交时间
    private final long expired;    到期时间

    public DelayObject(long delay, TimeUnit unit) {
        this.delay = TIME_UNIT.convert(delay, unit);
        this.submit = System.currentTimeMillis();
        this.expired = this.submit + this.delay;
    }

    @Override
    public long getDelay(TimeUnit unit) {
        return unit.convert(expired - System.currentTimeMillis(), TIME_UNIT);
    }

    @Override
    public int compareTo(Delayed o) {
        long l1 = this.getDelay(TIME_UNIT);
        long l2 = o.getDelay(TIME_UNIT);
        return Long.compare(l1, l2);
    }

    @Override
    public String toString() {
        return "DelayObject{" +
                "submit=" + submit +
                ", expired=" + expired +
                ", delay=" + delay +
                '}';
    }
}
```
##### Main
```java
import java.util.concurrent.DelayQueue;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        DelayQueue<DelayObject> queue = new DelayQueue<>();
        for (int i = 0; i < 5; i++) {
            queue.put(new DelayObject(i, TimeUnit.SECONDS));
        }
        while (!queue.isEmpty()) {
            System.out.println(queue.take());
        }
    }
}
----
输出：
DelayObject{submit=1501135689170, expired=1501135689170, delay=0}
DelayObject{submit=1501135689170, expired=1501135690170, delay=1000}
DelayObject{submit=1501135689170, expired=1501135691170, delay=2000}
DelayObject{submit=1501135689170, expired=1501135692170, delay=3000}
DelayObject{submit=1501135689170, expired=1501135693170, delay=4000}
```

#### SynchronousQueue
* 提供线程间进行 **数据传递的场所**，支持 **公平访问策略**。
* 调用其插入方法时，必须 **等待另一个线程调用其移除方法**，队列本身 **不存储任何元素**。

#### LinkedTransferQueue（推荐）
* SynchronousQueue、ConcurrentLinkedQueue、LinkedBlockingQueue 的超集。

##### Producer
```java
import java.util.concurrent.TransferQueue;
import java.util.concurrent.atomic.AtomicInteger;

public class Producer implements Runnable {
    private final static AtomicInteger productID = new AtomicInteger();
    private final TransferQueue<Integer> queue;

    public Producer(TransferQueue<Integer> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < 10; i++) {
                int id = productID.getAndIncrement();
                queue.transfer(id);     等待另一个线程调用其移除方法
                System.out.println("生产:" + id);
            }
            queue.transfer(-1);     等待另一个线程调用其移除方法
            System.out.println("生产结束");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

void       transfer(E e)
boolean tryTransfer(E e)
boolean tryTransfer(E e, long timeout, TimeUnit unit)
----
若没有线程调用其移除方法，则等待另一个线程调用其移除方法。
若没有线程调用其移除方法，一一一一一一一一一一一一一一则丢弃该元素，并立即返回 false。
若没有线程调用其移除方法，则在指定时间内等待；若超时，则丢弃该元素，并立即返回 false。
```
##### Consumer
```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TransferQueue;

public class Consumer implements Runnable {
    private final TransferQueue<Integer> queue;

    public Consumer(TransferQueue<Integer> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            int i;
            while ((i = queue.take()) != -1) {
                TimeUnit.SECONDS.sleep(1);
                System.out.println("消费:" + i);
            }
            System.out.println("消费结束");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
##### Main
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedTransferQueue;
import java.util.concurrent.TransferQueue;

public class Main {
    public static void main(String[] args) {
        TransferQueue<Integer> queue = new LinkedTransferQueue<>();
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < 2; i++) {
            executorService.execute(new Producer(queue));
            executorService.execute(new Consumer(queue));
        }
        executorService.shutdown();
    }
}
----
输出：
生产:0
生产:1
消费:0
消费:1
生产:2
生产:3
消费:2
消费:3
生产:4
生产:5
消费:5
消费:4
...
生产:16
生产:17
消费:16
消费:17
生产:18
生产:19
消费:18
消费:19
消费结束
生产结束
生产结束
消费结束
```
### 原子变量
* 原子性 -> Unsafe 类 -> CAS 操作 -> cmpxchg 指令

#### 基本数据类型：AtomicInteger
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger i = new AtomicInteger();

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int n = 0; n < 5; n++) {
            executorService.execute(() -> {
                for (int j = 0; j < 1000; j++) {
                    i.getAndIncrement();     原子操作
                }
            });
        }
        executorService.shutdown();
        executorService.awaitTermination(1, TimeUnit.DAYS);

        System.out.println(i.get());
    }
}
----
输出：
5000
```
#### 引用数据类型：AtomicReference
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicReference<Element> reference = new AtomicReference<>(new Element(0, 0));

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int n = 0; n < 5; n++) {
            executorService.execute(() -> {
                for (int j = 0; j < 1000; j++) {
                    boolean flag = false;
                    while (!flag) {     自旋锁
                        Element oldElement = reference.get();
                        Element newElement = new Element(oldElement.x + 1, oldElement.y + 1);
                        flag = reference.compareAndSet(oldElement, newElement);     原子替换
                    }
                }
            });
        }
        executorService.shutdown();
        executorService.awaitTermination(1, TimeUnit.DAYS);

        System.out.println(reference.get());
    }
}
----
输出：
Element{x=5000, y=5000}

class Element {
    public int x;
    public int y;

    public Element(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "Element{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
```
#### 属性原子更新：AtomicIntegerFieldUpdater
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicIntegerFieldUpdater<Element> fieldUpdater = AtomicIntegerFieldUpdater.newUpdater(Element.class, "id");     内部使用反射
        Element element = new Element(0);

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int n = 0; n < 5; n++) {
            executorService.execute(() -> {
                for (int j = 0; j < 1000; j++) {
                    fieldUpdater.getAndIncrement(element);     原子更新属性
                }
            });
        }
        executorService.shutdown();
        executorService.awaitTermination(1, TimeUnit.DAYS);

        System.out.println(element);
    }
}
----
输出：
Element{id=5000}

class Element {
    public volatile int id;     应用原子更新的属性必须为 volatile（保证可见性）

    public Element(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Element{" +
                "id=" + id +
                '}';
    }
}
```
#### 　　原子数组：AtomicIntegerArray
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicIntegerArray;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicIntegerArray ints = new AtomicIntegerArray(5);
        ints.set(0, 1);

        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int n = 0; n < 5; n++) {
            executorService.execute(() -> {
                for (int j = 0; j < 1000; j++) {
                    ints.getAndIncrement(4);
                }
            });
        }
        executorService.shutdown();
        executorService.awaitTermination(1, TimeUnit.DAYS);

        System.out.println(ints);
    }
}
----
输出：
[1, 0, 0, 0, 5000]
```

---

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws InterruptedException {
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

        executorService.awaitTermination(1, TimeUnit.DAYS);     阻塞当前线程，等待执行中的线程结束

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
        //分桶(可以使用多线程，但效益不大)
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
...
分桶:1571
排序:1697
合并:94
总共:3362
true
```
