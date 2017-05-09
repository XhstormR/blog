---
Categories:
- Android
date: 2016-11-19T14:11:15+08:00
title: RxBus
---

<!--more-->

Updated on 2016-11-19

> {{< image "/uploads/android-rxbus.png" "Subject" "1" "1" >}}

* Subject 抽象类：继承 Observable 类并实现 Observer 接口，即同时充当被观察者和观察者，可以当作一个事件管道，一端输入，一端输出。
  * PublishSubject：观察者只能收到订阅之后被观察者所发送的事件。
      * 之后
  * ReplaySubject：观察者能够收到订阅之前被观察者所发送的所有事件。
      * 之前 + 之后
  * BehaviorSubject：观察者能够收到订阅之前被观察者所发送的最后一个事件。
      * 1 + 之后
  * AsyncSubject：观察者只能收到被观察者结束后所发送的最后一个事件。
      * 1
  * SerializedSubject：用于把 Subject 对象包装成线程安全的 Subject。

## RxBus.java - v0.1
```java
import android.support.annotation.NonNull;
import rx.Observable;
import rx.subjects.PublishSubject;
import rx.subjects.SerializedSubject;
import rx.subjects.Subject;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class RxBus {
    private static final RxBus INSTANCE = new RxBus();
    private final ConcurrentHashMap<Object, List<Subject>> mSubjectMap = new ConcurrentHashMap<>();

    private RxBus() {
    }

    public static RxBus getInstance() {
        return INSTANCE;
    }

    public <T> Observable<T> register(@NonNull Object tag, @NonNull Class<T> classOfT) {
        List<Subject> subjectList = mSubjectMap.get(tag);
        if (null == subjectList) {
            subjectList = new ArrayList<>();
            mSubjectMap.put(tag, subjectList);
        }

        Subject<T, T> subject = new SerializedSubject<>(PublishSubject.create());
        subjectList.add(subject);
        return subject;
    }

    public void unRegister(@NonNull Object tag, @NonNull Observable observable) {
        List<Subject> subjectList = mSubjectMap.get(tag);
        if (null != subjectList) {
            if (subjectList.contains(((Subject) observable))) {
                subjectList.remove((Subject) observable);
            }
            if (subjectList.isEmpty()) {
                mSubjectMap.remove(tag);
            }
        }
    }

    @SuppressWarnings("unchecked")
    public void post(@NonNull Object tag, @NonNull Object content) {
        List<Subject> subjectList = mSubjectMap.get(tag);
        if (null != subjectList) {
            for (Subject subject : subjectList) {
                subject.onNext(content);
            }
        }
    }
}
```

## RxBus.java - v0.2
```java
import android.support.annotation.NonNull;
import rx.Observable;
import rx.subjects.PublishSubject;
import rx.subjects.SerializedSubject;
import rx.subjects.Subject;

public class RxBus {
    private static final RxBus INSTANCE = new RxBus();     单例模式（饿汉方式）
    private final Subject<Object, Object> mBus = new SerializedSubject<>(PublishSubject.create());     事件总线（PublishSubject）

    private RxBus() {     私有构造方法
    }

    public static RxBus getInstance() {     获得实例
        return INSTANCE;
    }

    public <T> Observable<T> toObservable(@NonNull Class<T> classOfT) {     转为 Observable
        return mBus.ofType(classOfT);     过滤掉类型不匹配的事件（ofType = filter + cast），防止 ClassCastException
    }

    public void post(@NonNull Object o) {     发送事件
        mBus.onNext(o);
    }
}
```

### MessageEvent.java
```java
public class MessageEvent {     POJO（plain old Java object）
    public final int mId;
    public final String mMsg;

    public MessageEvent(int id, String msg) {
        mId = id;
        mMsg = msg;
    }
}
```

## 实例
```java
public class MainActivity extends Activity {
    private final CompositeSubscription mCompositeSubscription = new CompositeSubscription();     Subscription 集合

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);

        Subscription subscribe1 = RxView.clicks(activityMainBinding.button)     绑定控件的单击事件
                .doOnUnsubscribe(() -> Log.w("Tag", "取消绑定1"))     取消订阅时回调
                .subscribe(
                        aVoid -> {     处理单击
                            Log.w("Tag", "单击");
                            RxBus.getInstance().post("单击_String");     发送事件（发送 String）
                        },
                        error -> Log.w("Tag", error.toString()),     出现异常
                        () -> Log.w("Tag", "onComplete"));     完成事件

        Subscription subscribe2 = RxView.longClicks(activityMainBinding.button)     绑定控件的长按事件
                .doOnUnsubscribe(() -> Log.w("Tag", "取消绑定2"))     取消订阅时回调
                .subscribe(
                        aVoid -> {     处理长按
                            Log.w("Tag", "长按");
                            RxBus.getInstance().post(new MessageEvent(123, "长按_MessageEvent"));     发送事件（发送 MessageEvent）
                        },
                        error -> Log.w("Tag", error.toString()),     出现异常
                        () -> Log.w("Tag", "onComplete"));     完成事件

        Subscription subscribe3 = RxBus.getInstance().toObservable(String.class)     订阅事件（类型为 String）
                .doOnUnsubscribe(() -> Log.w("Tag", "取消订阅1"))     取消订阅时回调
                .subscribe(
                        s -> Log.w("Tag", s),     处理事件
                        error -> Log.w("Tag", error.toString()),     出现异常
                        () -> Log.w("Tag", "onComplete"));     完成事件

        Subscription subscribe4 = RxBus.getInstance().toObservable(MessageEvent.class)     订阅事件（类型为 MessageEvent）
                .doOnUnsubscribe(() -> Log.w("Tag", "取消订阅2"))     取消订阅时回调
                .subscribe(
                        messageEvent -> Log.w("Tag", String.format("%s_%d", messageEvent.mMsg, messageEvent.mId)),     处理事件
                        error -> Log.w("Tag", error.toString()),     出现异常
                        () -> Log.w("Tag", "onComplete"));     完成事件

        mCompositeSubscription.addAll(subscribe1, subscribe2, subscribe3, subscribe4);     集中管理 Subscription
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mCompositeSubscription.clear();     取消订阅并清空集合中的所有 Subscription，避免内存泄漏
    }
}
----
输出：
12782-12782/com.example.myapp.myapplication W/Tag: 单击
12782-12782/com.example.myapp.myapplication W/Tag: 单击_String
12782-12782/com.example.myapp.myapplication W/Tag: 长按
12782-12782/com.example.myapp.myapplication W/Tag: 长按_MessageEvent_123
12782-12782/com.example.myapp.myapplication W/Tag: 取消订阅2
12782-12782/com.example.myapp.myapplication W/Tag: 取消订阅1
12782-12782/com.example.myapp.myapplication W/Tag: 取消绑定2
12782-12782/com.example.myapp.myapplication W/Tag: 取消绑定1
```