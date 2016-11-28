+++
Categories = ["JAVA"]
date = "2016-11-13T19:48:15+08:00"
title = "RxJava"

+++

<!--more-->

Updated on 2016-11-22

> {{< image "/uploads/java-rxjava.png" "RxJava" "1" "1" >}}
>
> 观察者模式
>
> 响应式编程
> |
> 函数式编程
>
> https://github.com/ReactiveX/RxJava
>
> http://reactivex.io/RxJava/javadoc/rx/Observable.html
>
> [Operators](http://reactivex.io/documentation/operators.html)
> |
> [Operators](http://rxmarbles.com/)
>
> [Book](https://mcxiaoke.gitbooks.io/rxdocs/content/)
> |
> [Book](https://www.gitbook.com/book/yuxingxin/rxjava-essentials-cn/details)

## Observable - 被观察者
```java
Observable<String> observable = Observable.create(new Observable.OnSubscribe<String>() {     传入 OnSubscribe，描述事件
    @Override
    public void call(Subscriber<? super String> subscriber) {     作为参数传入的观察者
        subscriber.onNext("A");     事件
        subscriber.onNext("B");
        subscriber.onNext("C");
        subscriber.onCompleted();
    }
});

----

Observable<String> observable = Observable.create(subscriber -> {     简化为 Lambda 表达式
    subscriber.onNext("A");
    subscriber.onNext("B");
    subscriber.onNext("C");
    subscriber.onCompleted();
});

-------------------------------------------------------

Observable<String> observable = Observable.just("A", "B", "C");     快捷方式

-------------------------------------------------------

List<String> list = Arrays.asList("A", "B", "C");
Observable<String> observable = Observable.from(list);     快捷方式

-------------------------------------------------------

observable.subscribe(observer);     被观察者订阅观察者（观察者见下文）
----
输出：
A
B
C
onCompleted

Note：
0. 被观察者发出事件，观察者处理事件。
1. 一旦被观察者调用 subscribe() 方法订阅观察者，被观察者中的唯一成员 OnSubscribe 将执行 call() 方法并将观察者作为参数传入。
2. 调用 subscribe() 方法后会返回 Subscription 接口对象（仅含 2 个方法 unsubscribe 和 isUnsubscribed），代表被观察者与观察者之间的订阅关系。
```

## Observer - 观察者
```java
Observer<String> observer = new Observer<String>() {     接口（最终会被包装为 Subscriber）
    @Override
    public void onCompleted() {     完成事件（调用链结束）
        System.out.println("onCompleted");
    }

    @Override
    public void onError(Throwable e) {     出现异常，框架自动调用（调用链结束）
        System.out.println("onError");
    }

    @Override
    public void onNext(String s) {     处理事件
        System.out.println(s);
    }
};

-------------------------------------------------------

Subscriber<String> subscriber = new Subscriber<String>() {     抽象类（继承但未实现 Observer 接口，且可选择性重写 onStart 方法）
    @Override
    public void onCompleted() {     完成事件（调用链结束）
        System.out.println("onCompleted");
    }

    @Override
    public void onError(Throwable e) {     出现异常，框架自动调用（调用链结束）
        System.out.println("onError");
    }

    @Override
    public void onNext(String s) {     处理事件
        System.out.println(s);
    }
};

调用链：onStart() --> onNext() --> onCompleted()
     |            |                                ↳ onError()
     |            ↳ 此方法只能在调用 subscribe() 的线程上执行，可通过操作符 doOnSubscribe(Action0) 替代且可指定运行线程
     ↳ 当调用链结束后，订阅关系自动解除（Subscription.isUnsubscribed = true）
-------------------------------------------------------

Action1<String> action1 = new Action1<String>() {     快捷方式（被观察者的 subscribe() 方法支持传入 Action1 接口充当 onNext）
    @Override
    public void call(String s) {
        System.out.println(s);
    }
};

----

Action1<String> action1 = s -> System.out.println(s);     简化为 Lambda 表达式
Action1<String> action1 = System.out::println;     简化为方法引用
```

## Scheduler - 线程调度
默认情况下调用链（事件流）在调用 subscribe() 的线程上运行，可以通过以下 2 种方法指定运行线程：

* （一次）`subscribeOn()`：指定其运行线程。
* （多次）`observeOn()`：切换其运行线程。
  * `subscribeOn()` 用于指定最开始调用链（事件流）的运行线程，后期可通过 `observeOn()` 随时切换其运行线程。

```java
Observable
        .create((Observable.OnSubscribe<String>) subscriber -> {
            Log.w("Tag", "create__" + Thread.currentThread().toString());
            subscriber.onNext("");
            subscriber.onCompleted();
        })
        .observeOn(Schedulers.computation())     切换至计算线程 (2)
        .map(s -> {
            Log.w("Tag", "map__" + Thread.currentThread().toString());
            return s;
        })
        .observeOn(AndroidSchedulers.mainThread())     切换至主线程 (3)
        .subscribeOn(Schedulers.io())     指定最开始在IO线程中运行 (1)
        .subscribe(new Subscriber<String>() {
            @Override
            public void onCompleted() {
                Log.w("Tag", "onCompleted__" + Thread.currentThread().toString());
            }

            @Override
            public void onError(Throwable e) {
                Log.w("Tag", "onError");
            }

            @Override
            public void onNext(String s) {
                Log.w("Tag", "onNext__" + Thread.currentThread().toString());
            }
        });
----
输出：
23701-14945/com.example.myapp.myapplication W/Tag: create__Thread[RxIoScheduler-3,5,main]     IO 线程
23701-23824/com.example.myapp.myapplication W/Tag: map__Thread[RxComputationScheduler-2,5,main]     计算线程
23701-23701/com.example.myapp.myapplication W/Tag: onNext__Thread[main,5,main]     主线程
23701-23701/com.example.myapp.myapplication W/Tag: onCompleted__Thread[main,5,main]     主线程

-------------------------------------------------------

实例：加载网络图片
----
Observable
        .just("http://blog.xhstormr.tk/uploads/children-of-the-sun1.jpg")
        .map(s -> {     下载 Bitmap（String ➜ Bitmap）
            Bitmap bitmap = null;
            try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new URL(s).openStream())) {
                bitmap = BitmapFactory.decodeStream(bufferedInputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return bitmap;
        })
        .observeOn(AndroidSchedulers.mainThread())     切换至主线程 (2)
        .subscribeOn(Schedulers.io())     指定最开始在IO线程中运行 (1)
        .subscribe(bitmap -> mImageView.setImageBitmap(bitmap));     加载 Bitmap
```

## Operators - 操作符
类似于 Java 8 中的 Stream 的内部迭代。

### 转换
```java
public class A {
    private static final List<Author> LIST = Arrays.asList(
            new Author("Adam", 23, Arrays.asList("Java1", "Java2")),
            new Author("Bell", 19, Arrays.asList("Python1", "Python2")),
            new Author("Conan", 23, Arrays.asList("PHP1", "PHP2")),
            new Author("David", 26, Arrays.asList("Ruby1", "Ruby2")));     作家列表

    public static void main(String[] args) {
        Observable
                .from(LIST)
                .map(author -> author.mAge)     一对一
                .sorted()     排序
                .subscribe(integer -> System.out.print(integer + " "), System.out::println, () -> System.out.println("\n————————————"));
        Observable
                .from(LIST)
                .map(author -> author.mAge)     一对一
                .sorted()     排序
                .scan(0, (i1, i2) -> i1 + i2)     累加器，提供初始值
                .subscribe(integer -> System.out.print(integer + " "), System.out::println, () -> System.out.println("\n————————————"));
        Observable
                .from(LIST)
                .map(author -> author.mAge)     一对一
                .reduce(0, (i1, i2) -> i1 + i2)     累加器，提供初始值
                .subscribe(integer -> System.out.print(integer + " "), System.out::println, () -> System.out.println("\n————————————"));
        Observable
                .from(LIST)
                .flatMap(author -> Observable.from(author.mArticle))     一对多（手动转换为 Observable）（推荐使用 concatMap，解决 flatMap 事件交叉问题）（flatMap() 底层调用 merge()，concatMap 底层调用 concat()，下同）
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .flatMapIterable(author -> author.mArticle)     一对多（自动转换为 Observable）（推荐使用 concatMapIterable，解决 flatMapIterable 事件交叉问题）
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .groupBy(author -> author.mAge)     按年龄将事件流分组
                .concatMap(groupedObservable -> groupedObservable)     一对多
                .subscribe(author -> System.out.printf("年龄:%d 姓名:%s\n", author.mAge, author.mName), System.out::println, () -> System.out.println("————————————"));
    }

    private static class Author {     作家
        private String mName;     姓名
        private int mAge;     年龄
        private List<String> mArticle;     文章列表

        private Author(String name, int age, List<String> article) {
            mName = name;
            mAge = age;
            mArticle = article;
        }

        @Override
        public String toString() {
            return mName;
        }
    }
}
----
输出：
19 23 23 26
————————————
0 19 42 65 91
————————————
91
————————————
Java1
Java2
Python1
Python2
PHP1
PHP2
Ruby1
Ruby2
————————————
Java1
Java2
Python1
Python2
PHP1
PHP2
Ruby1
Ruby2
————————————
年龄:23 姓名:Adam
年龄:23 姓名:Conan
年龄:19 姓名:Bell
年龄:26 姓名:David
————————————
```

### 过滤
```java
public class A {
    private static final List<Author> LIST = Arrays.asList(
            new Author("Adam", 23, Arrays.asList("Java1", "Java2")),
            new Author("Bell", 19, Arrays.asList("Python1", "Python2")),
            new Author("Conan", 23, Arrays.asList("PHP1", "PHP2")),
            new Author("David", 26, Arrays.asList("Ruby1", "Ruby2")));

    public static void main(String[] args) {
        Observable
                .from(LIST)
                .filter(author -> author.mAge > 25)     过滤
                .subscribe(author -> System.out.printf("年龄:%d 姓名:%s\n", author.mAge, author.mName), System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .take(2)     只取前 2
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .takeLast(2)     只取后 2
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .skip(2)     跳过前 2
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .skipLast(2)     跳过后 2
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .elementAt(0)     选取
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .first()     选取最前（若无数据：first() 直接调用 onError()，takeFirst() 直接调用 onCompleted()，下同）
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(LIST)
                .last()     选取最后
                .subscribe(System.out::println, System.out::println, () -> System.out.println("————————————"));
        Observable
                .from(Arrays.asList(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 1, 2, 3, 4, 5, 6))
                .distinct()     去重
                .subscribe(integer -> System.out.print(integer + " "), System.out::println, () -> System.out.println("\n————————————"));
        Observable
                .from(Arrays.asList(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 1, 2, 3, 4, 5, 6))
                .distinctUntilChanged()     前后去重
                .subscribe(integer -> System.out.print(integer + " "), System.out::println, () -> System.out.println("\n————————————"));
        ----
        输出：
        年龄:26 姓名:David
        ————————————
        Adam
        Bell
        ————————————
        Conan
        David
        ————————————
        Conan
        David
        ————————————
        Adam
        Bell
        ————————————
        Adam
        ————————————
        Adam
        ————————————
        David
        ————————————
        1 2 3 4 5 6
        ————————————
        1 2 3 4 5 6 1 2 3 4 5 6
        ————————————
    }

    private static void a() throws InterruptedException {     takeUntil
        Observable
                .from(Arrays.asList(1, 2, 3, 4, 5, 6))
                .takeUntil(integer -> integer == 3)     一直处理事件，直到事件符合某项条件
                .subscribe(System.out::println);
        ----
        输出：
        1
        2
        3

        Observable<Long> observable1 = Observable.interval(300, TimeUnit.MILLISECONDS);     每隔 300 毫秒发送数字
        Observable<Long> observable2 = Observable.interval(800, TimeUnit.MILLISECONDS);     每隔 800 毫秒发送数字
        observable1
                .takeUntil(observable2)     一直处理事件，直到 observable2 发送了事件
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：
        0
        1
    }

    private static class Author {
        private String mName;
        private int mAge;
        private List<String> mArticle;

        private Author(String name, int age, List<String> article) {
            mName = name;
            mAge = age;
            mArticle = article;
        }

        @Override
        public String toString() {
            return mName;
        }
    }
}
```

### 组合
```java
public class A {
    private static String[] strings = {"A", "B", "C", "D", "E"};
    private static Observable<String> observable1 = Observable     每隔 300 毫秒发送事件：A B C D E
            .interval(300, TimeUnit.MILLISECONDS)
            .take(strings.length)
            .map(aLong -> strings[aLong.intValue()]);
    private static Observable<Long> observable2 = Observable     每隔 500 毫秒发送事件：0 1 2 3 4 5 6 7 8 9
            .interval(500, TimeUnit.MILLISECONDS)
            .take(10);

    public static void main(String[] args) throws InterruptedException {
        a();
        b();
        Thread.sleep(Integer.MAX_VALUE);
    }

    private static void a() {     合并
        Observable
                .merge(observable1, observable2)     无序合并（异步进行）
                .subscribe(o -> System.out.print(o + " "), System.out::println, () -> System.exit(0));
        ----
        输出：
        A 0 B C 1 D E 2 3 4 5 6 7 8 9

        Observable
                .concat(observable1, observable2)     有序合并（同步进行）
                .subscribe(o -> System.out.print(o + " "), System.out::println, () -> System.exit(0));
        ----
        输出：
        A B C D E 0 1 2 3 4 5 6 7 8 9

        observable1
                .startWith(Observable.just("AA", "BB", "CC"))     有序合并（同步进行），底层调用 concat 在其之前插入新事件，接收 Observable 和 Iterable
                .subscribe(o -> System.out.print(o + " "), System.out::println, () -> System.exit(0));
        ----
        输出：
        AA BB CC A B C D E
    }

    private static void b() {     组合
        Observable
                .zip(observable1, observable2, (s, aLong) -> s + aLong)     不可重用
                .subscribe(o -> System.out.print(o + " "), System.out::println, () -> System.exit(0));
        ----
        输出：
        A0 B1 C2 D3 E4

        Observable
                .combineLatest(observable1, observable2, (s, aLong) -> s + aLong)     可重用（与最近的事件组合）
                .subscribe(o -> System.out.print(o + " "), System.out::println, () -> System.exit(0));
        ----
        输出：
        A0 B0 C0 C1 D1 E1 E2 E3 E4 E5 E6 E7 E8 E9

        observable1     左事件源
                .join(     可重用（事件具有有效期，有点像排列组合）
                        observable2,     右事件源
                        s -> Observable.timer(10000, TimeUnit.MILLISECONDS),     左事件有效期
                        aLong -> Observable.timer(0, TimeUnit.MILLISECONDS),     右事件有效期
                        (s, aLong) -> s + aLong)
                .subscribe(o -> System.out.print(o + " "), System.out::println, () -> System.exit(0));
        ----
        输出：
        A0 A1 B1 C1 A2 B2 C2 D2 E2 A3 B3 C3 D3 E3 A4 B4 C4 D4 E4 A5 B5 C5 D5 E5 A6 B6 C6 D6 E6 A7 B7 C7 D7 E7 A8 B8 C8 D8 E8 A9 B9 C9 D9 E9
    }
}
```

## Code

```java
Observable
        .just("A", "B", "C")
        .doOnNext(s -> System.out.printf("%s__%s__%s\n", s, Thread.currentThread().getName(), "doOnNext"))     类似于 Java 8 中的 Stream 的 peek
        .map(s -> {
            System.out.printf("%s__%s__%s\n", s, Thread.currentThread().getName(), "map");
            return s;
        })
        .subscribe(s -> System.out.printf("%s__%s__%s\n", s, Thread.currentThread().getName(), "onNext"), System.out::println, () -> System.exit(0));
Thread.sleep(Integer.MAX_VALUE);
----
输出：     类似于 Java 8 中的 Stream 的垂直执行，像在流水线依次经过每个操作，并通过短路求值尽可能减少操作次数
A__main__doOnNext
A__main__map
A__main__onNext
B__main__doOnNext
B__main__map
B__main__onNext
C__main__doOnNext
C__main__map
C__main__onNext

-------------------------------------------------------

Observable
        .just("A", "B", "C")
        .doOnNext(s -> System.out.printf("%s__%s__%s\n", s, Thread.currentThread().getName(), "doOnNext"))
        .map(s -> {
            System.out.printf("%s__%s__%s\n", s, Thread.currentThread().getName(), "map");
            return s;
        })
        .observeOn(Schedulers.computation())     切换至计算线程 (2)
        .subscribeOn(Schedulers.io())     指定最开始在IO线程中运行 (1)
        .subscribe(s -> System.out.printf("%s__%s__%s\n", s, Thread.currentThread().getName(), "onNext"), System.out::println, () -> System.exit(0));
Thread.sleep(Integer.MAX_VALUE);
----
输出：
A__RxIoScheduler-2__doOnNext
A__RxIoScheduler-2__map
B__RxIoScheduler-2__doOnNext
B__RxIoScheduler-2__map
C__RxIoScheduler-2__doOnNext
C__RxIoScheduler-2__map
A__RxComputationScheduler-1__onNext
B__RxComputationScheduler-1__onNext
C__RxComputationScheduler-1__onNext
```

```java
通过 compose() 操作符重用操作链
-------------------------------------------------------
public class A {
    public static void main(String[] args) {
        final Observable.Transformer<String, String> transformer = new Observable.Transformer<String, String>() {
            @Override
            public Observable<String> call(Observable<String> stringObservable) {     对传入的原始被观察者进行加工
                return stringObservable.doOnUnsubscribe(() -> System.out.println("Unsubscribed")).map(s -> s + "1");
            }
        };     Transformer 对象

        Observable
                .just("A", "B", "C")
                .compose(transformer)     重用 Transformer
                .subscribe(System.out::println);
        Observable
                .just("1", "2", "3")
                .compose(transformer)     重用 Transformer
                .subscribe(System.out::println);
    }
}
----
输出：
A1
B1
C1
Unsubscribed
11
21
31
Unsubscribed

Note：
1. compose() 接收一个 Transformer 接口，此接口继承自 Func1，接收原始 Observable，返回新 Observable。
2. compose() 作用于整个被观察者，flatMap() 作用于每个事件。

-------------------------------------------------------

实例：改进之前线程调度加载网络图片的例子
----
public class A {
    private static final Observable.Transformer<Object, Object> mTransformer = observable ->     单例模式
            observable
                    .observeOn(AndroidSchedulers.mainThread())     切换至主线程 (2)
                    .subscribeOn(Schedulers.io());     指定最开始在IO线程中运行 (1)

    @SuppressWarnings("unchecked")     压制警告（强制类型转换）
    public static <T> Observable.Transformer<T, T> applySchedulers() {
       return ((Observable.Transformer<T, T>) mTransformer);   返回 Transformer 对象（为了不丢失类型信息而强制转换）
    }
}

----

Observable
        .just("http://blog.xhstormr.tk/uploads/children-of-the-sun1.jpg")
        .map(s -> {     下载 Bitmap（String ➜ Bitmap）
            Bitmap bitmap = null;
            try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new URL(s).openStream())) {
                bitmap = BitmapFactory.decodeStream(bufferedInputStream);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return bitmap;
        })
        .compose(A.applySchedulers())     只需传入 A.applySchedulers() 返回的对象，即可后台处理，前台显示
        .subscribe(bitmap -> mImageView.setImageBitmap(bitmap));     加载 Bitmap
```

```java
通过 Observable.defer(Func0) 实现延迟订阅
-------------------------------------------------------
public class A {
    private static String s;

    public static void main(String[] args) {
        Observable<String> observable = Observable.just(s);     直接执行
        s = "ABC";
        observable.subscribe(System.out::println);
        ----
        输出：
        null

        Observable<String> observable = Observable.defer(() -> Observable.just(s));     Func0 接口中的代码将延迟执行
        s = "ABC";
        observable.subscribe(System.out::println);
        ----
        输出：
        ABC
    }
}

Note：
0. just() 和 from() 在创建 Observable 时就存储了对象的值，而 create() 创建的 Observable 在 subscribe() 时才访问对象。
1. defer() 接收一个 Func0 接口并显式声明此接口返回一个 Observable 对象。
2. defer() 中的代码直到订阅才会执行。
```

```java
通过 Schedulers 将耗时操作放到后台线程中执行
-------------------------------------------------------
public class A {
    public static void main(String[] args) throws InterruptedException {
        Schedulers.io().createWorker().schedule(() -> {     Action0 接口中的代码将在 IO 线程中执行
            System.out.println(Thread.currentThread());
            System.exit(0);
        });
        Thread.sleep(Integer.MAX_VALUE);
    }
}
----
输出：
Thread[RxIoScheduler-2,5,main]
```

```java
Single
-------------------------------------------------------

被观察者
----
Single<String> observable = Single.create(new Single.OnSubscribe<String>() {
    @Override
    public void call(SingleSubscriber<? super String> singleSubscriber) {
        singleSubscriber.onSuccess("A");
    }
});

Single<String> observable = Single.just("A");

观察者
----
SingleSubscriber<String> subscriber = new SingleSubscriber<String>() {     SingleSubscriber
    @Override
    public void onSuccess(String value) {     成功
        System.out.println(value);
    }

    @Override
    public void onError(Throwable error) {     异常
        System.out.println(error.toString());
    }
};

实例
----
Single.just("A").subscribe(System.out::println);
----
输出：
A
```

```java
延时执行
-------------------------------------------------------
public class A {
    public static void main(String[] args) throws InterruptedException {
        Observable<Integer> range = Observable.range(0, 3);
        range
                .delay(2, TimeUnit.SECONDS)     2 秒
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：（延时 2 秒后执行）
        0
        1
        2

        Observable<Long> timer = Observable.timer(2, TimeUnit.SECONDS);    2 秒（timer 操作返回计时器 Observable）
        timer
                .delay(2, TimeUnit.SECONDS)     2 秒
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：（延时 4 秒后执行）
        0
    }
}
```

```java
缓解 Backpressure（背部压力）
-------------------------------------------------------

缓冲事件
----
public class A {
    public static void main(String[] args) throws InterruptedException {
        Observable
                .range(0, 10)
                .buffer(2)     将多个事件包装为 List<T>，缓冲区大小为 2
                .subscribe(System.out::println);
        ----
        输出：
        [0, 1]
        [2, 3]
        [4, 5]
        [6, 7]
        [8, 9]

        Observable
                .range(0, 10)
                .buffer(2, 3)     将多个事件包装为 List<T>，缓冲区大小为 2，每次都跳过第 3 个事件
                .subscribe(System.out::println);
        ----
        输出：
        [0, 1]
        [3, 4]
        [6, 7]
        [9]
    }
}

过滤事件
----
public class A {
    public static void main(String[] args) throws InterruptedException {
        Observable<Long> timer = Observable.timer(5, TimeUnit.SECONDS);     5 秒后发出事件（计时器）

        Observable
                .interval(500, TimeUnit.MILLISECONDS)     每隔 500 毫秒发出事件
                .takeUntil(timer)     一直处理事件，直到 timer 发送了事件
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：（CPU 时间不准，无过滤）
        0
        1
        2
        3
        4
        5
        6
        7
        8

        Observable
                .interval(500, TimeUnit.MILLISECONDS)
                .takeUntil(timer)
                .throttleFirst(1, TimeUnit.SECONDS)     每隔 1 秒发出时间段中的第一个事件
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：（CPU 时间不准）
        0
        3
        5
        7

        Observable
                .interval(500, TimeUnit.MILLISECONDS)
                .takeUntil(timer)
                .throttleLast(1, TimeUnit.SECONDS)     每隔 1 秒发出时间段中的最后一个事件（跟 sample() 行为一致）
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：（CPU 时间不准）
        0
        2
        4
        6
        8

        Observable     debounce（去抖）
                .interval(500, TimeUnit.MILLISECONDS)
                .takeUntil(timer)
                .debounce(1, TimeUnit.SECONDS)     1 秒无新事件后，再发送其接收到的最后一个事件
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：（CPU 时间不准）
        8
    }
}
```