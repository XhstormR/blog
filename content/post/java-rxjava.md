+++
Categories = ["JAVA"]
date = "2016-11-13T19:48:15+08:00"
title = "RxJava"

+++

<!--more-->

Updated on 2016-11-16

> 响应式编程
>
> https://github.com/ReactiveX/RxJava
>
> http://reactivex.io/RxJava/javadoc/rx/Observable.html
>
> [Operators](http://reactivex.io/documentation/operators.html)
> |
> [Operators](http://rxmarbles.com/)

## Observable - 被观察者
```java
Observable<String> observable = Observable.create(new Observable.OnSubscribe<String>() {
    @Override
    public void call(Subscriber<? super String> subscriber) {     作为参数传入的观察者
        subscriber.onNext("A");
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

observable.subscribe(observer);     被观察者订阅观察者
一旦被观察者调用 subscribe() 方法订阅观察者，被观察者中的唯一成员 OnSubscribe 将执行 call() 方法并将观察者作为参数传入
```

## Observer - 观察者
```java
Observer<String> observer = new Observer<String>() {     接口
    @Override
    public void onCompleted() {     完成事件
        System.out.println("onCompleted");
    }

    @Override
    public void onError(Throwable e) {     出现异常，框架自动调用
        System.out.println("onError");
    }

    @Override
    public void onNext(String s) {     处理事件
        System.out.println(s);
    }
};

-------------------------------------------------------

Subscriber<String> subscriber = new Subscriber<String>() {     抽象类（继承但未实现 Observer 接口）
    @Override
    public void onCompleted() {     完成事件
        System.out.println("onCompleted");
    }

    @Override
    public void onError(Throwable e) {     出现异常，框架自动调用
        System.out.println("onError");
    }

    @Override
    public void onNext(String s) {     处理事件
        System.out.println(s);
    }
};

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
默认情况下事件流在调用 subscribe() 的线程上运行，可以通过以下 2 种方法指定运行线程：

* （一次）`subscribeOn()`：指定运行线程。
* （多次）`observeOn()`：切换运行线程。
  * `subscribeOn()` 用于指定最开始事件流的运行线程，后期可通过 `observeOn()` 随时切换其运行线程。

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
                .flatMap(author -> Observable.from(author.mArticle))     一对多（手动转换为 Observable）（推荐使用 concatMap，解决 flatMap 事件交叉问题）
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
                .first()     选取最前
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

    private static void b() throws InterruptedException {     debounce
        Observable<Long> observable = Observable.interval(300, TimeUnit.MILLISECONDS);     每隔 300 毫秒发送数字
        observable
                .debounce(250, TimeUnit.MILLISECONDS)     过滤发送过快的事件（前后时间间隔小于 250 毫秒的事件将被过滤）
                .take(10)
                .subscribe(System.out::println, System.out::println, () -> System.exit(0));
        Thread.sleep(Integer.MAX_VALUE);
        ----
        输出：
        0
        1
        2
        3
        4
        5
        6
        7
        8
        9
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
