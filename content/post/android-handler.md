+++
Categories = ["Android"]
date = "2016-10-25T20:25:47+08:00"
title = "Android Handler"

+++

<!--more-->

Updated on 2016-10-29

> {{< image "/uploads/android-handler.svg" "Handler 机制" "1" "1" >}}
>
> [ThreadLocal](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/ThreadLocal.html)
>
> [WeakReference](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/lang/ref/WeakReference.html)
>
> [Source Insight](http://www.sourceinsight.com/down35.html)

* Handler：负责发送和处理 Message。
* ThreadLocal：负责保存 Looper，作为线程的局部变量。
  * Looper：负责接收并转发 Message。
      * MessageQueue：负责存储 Message 的容器。

## post ➜ Runnable
### MainActivity.java
```java
public class MainActivity extends Activity {
    private ImageView mImageView;
    private final Handler mHandler = new Handler();
    private final Runnable mRunnable = new Runnable() {     A：第一种（postDelayed）
        private int[] colors = {Color.parseColor("red"), Color.parseColor("blue"), Color.parseColor("green")};     颜色
        private int index;     索引

        @Override
        public void run() {
            index++;
            index %= 3;
            mImageView.setBackgroundColor(colors[index]);     设置背景颜色
            mHandler.postDelayed(this, 1000);     封装线程体为 Message 中的 callback，再传递至 Looper 中的 MessageQueue，并延迟 1 秒后执行
        }                                           ↳ 使用了递归思想，无限循环
    };
    private Thread mThread = new Thread() {     B：第二种（post）
        private int[] colors = {Color.parseColor("red"), Color.parseColor("blue"), Color.parseColor("green")};     颜色

        @Override
        public void run() {
            while (!Thread.interrupted()) {     判断线程是否为中断状态
                for (final int color : colors) {     遍历颜色
                    mHandler.post(new Runnable() {     封装线程体为 Message 中的 callback，再传递至 Looper 中的 MessageQueue
                        @Override
                        public void run() {
                            mImageView.setBackgroundColor(color);     设置背景颜色
                        }
                    });
                    try {
                        Thread.sleep(1000);     当前线程进入阻塞状态 1 秒
                    } catch (InterruptedException e) {     阻塞状态下中断线程将引发该异常，且中断状态将被清除
                        return;     直接返回
                    }
                }
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mImageView = (ImageView) findViewById(R.id.imageView);     需实现每隔 1 秒更换此 ImageView 背景颜色
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mHandler.removeCallbacksAndMessages(null);     A 移除 Looper 中的 MessageQueue 中所有等待处理的 Message
        mThread.interrupt();     B 中断线程
    }

    public void onClick(View view) {     A
        switch (view.getId()) {
            case R.id.button1:
                mHandler.post(mRunnable);     封装线程体为 Message 中的 callback，再传递至 Looper 中的 MessageQueue
                break;
            case R.id.button2:
                mHandler.removeCallbacksAndMessages(null);     移除 Looper 中的 MessageQueue 中所有等待处理的 Message
                break;
        }
    }

    public void onClick(View view) {     B
        switch (view.getId()) {
            case R.id.button1:
                mThread.start();     启动线程
                break;
            case R.id.button2:
                mThread.interrupt();     中断线程
                break;
        }
    }
}
```

### activity_main.xml
```xml
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:padding="16dp"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    <ImageView
            android:layout_gravity="center"
            android:layout_width="150dp"
            android:layout_height="150dp"
            android:id="@+id/imageView"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="开始"
            android:id="@+id/button1"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="停止"
            android:id="@+id/button2"/>
</LinearLayout>
```

## sendMessage ➜ Message
### MainActivity.java
```java
public class MainActivity extends Activity {
    private TextView mTextView;
    private final Handler mHandler = new Handler(new Handler.Callback() {
        @Override
        public boolean handleMessage(Message msg) {     处理 Message（主线程）
            mTextView.setText(1 + ":" + msg.what + ":" + msg.arg1 + ":" + msg.arg2 + ":" + msg.obj);
            return msg.what != 0;     true 代表拦截（不传递），false 代表不拦截（传递）
        }
    }) {
        @Override
        public void handleMessage(Message msg) {     处理 Message（主线程）
            mTextView.setText(2 + ":" + msg.what + ":" + msg.arg1 + ":" + msg.arg2 + ":" + msg.obj);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = (TextView) findViewById(R.id.textView);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mHandler.removeCallbacksAndMessages(null);     移除 Looper 中的 MessageQueue 中所有等待处理的 Message
    }

    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button:
                new Thread() {
                    @Override
                    public void run() {
                        第一种
                        Message message = new Message();
                        message.what = 0;
                        message.arg1 = 123;
                        message.arg2 = 456;
                        message.obj = "你好";
                        mHandler.sendMessage(message);     传递至 Looper 中的 MessageQueue，再发送给对应的 Handler 对象处理

                        第二种（推荐）
                        Message message = mHandler.obtainMessage(0, 123, 456, "你好");     重用 Message
                        message.sendToTarget();     传递至 Looper 中的 MessageQueue，再发送给对应的 Handler 对象处理
                    }
                }.start();     启动线程
                break;
        }
    }
}
```

### activity_main.xml
```xml
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:padding="16dp"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="发送"
            android:id="@+id/button"/>
    <TextView
            android:gravity="center"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="New Text"
            android:textSize="20sp"
            android:id="@+id/textView"/>
</LinearLayout>
```

## 防止 Handler 导致内存泄漏
* 导致原因：
  * 非静态的内部类默认持有其外部类的强引用。
  * Handler 对象发送的 Message 对象会持有此 Handler 对象的引用。
  * Message ➜ Handler ➜ Activity ➜ Activity 资源无法回收（内存泄漏）
* 解决方案：
  * 声明 Handler 为 `static` 或者使用 `Handler.Callback` 接口或者为其新建类文件。
  * 通过弱引用持有外部 Activity。

```java
public class MainActivity extends Activity {
    private static final Runnable mRunnable = new Runnable() {     静态匿名内部类
        @Override
        public void run() {
            Log.w("Tag", Thread.currentThread().toString());
        }
    };
    private final MyHandler mMyHandler = new MyHandler(this);
    private TextView mTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = (TextView) findViewById(R.id.textView);
    }

    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button:
                new Thread() {
                    @Override
                    public void run() {
                        Message message = mMyHandler.obtainMessage(0, 123, 456, "你好");
                        mMyHandler.sendMessage(message);     传递至 Looper 中的 MessageQueue，再发送给对应的 Handler 对象处理
                        mMyHandler.post(mRunnable);     封装线程体为 Message 中的 callback，再传递至 Looper 中的 MessageQueue
                    }
                }.start();     启动线程
                break;
        }
    }

    private static class MyHandler extends Handler {     静态内部类
        private final WeakReference<MainActivity> mActivity;     通过弱引用持有外部 Activity

        private MyHandler(MainActivity activity) {     构造方法
            mActivity = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            MainActivity mainActivity = mActivity.get();
            if (mainActivity != null) {     如果不为空
                mainActivity.mTextView.setText(msg.what + ":" + msg.arg1 + ":" + msg.arg2 + ":" + msg.obj);
            }
        }
    }
}
```

## 自定义 Looper 线程
```java
public class MainActivity extends Activity {
    private final MyHandler mMyHandler = new MyHandler();     与主线程进行关联

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mMyHandler.sendEmptyMessage(1);     Message 在主线程进行处理

        MyThread myThread = new MyThread();
        myThread.start();     启动线程
        try {
            Thread.sleep(100);     阻塞 0.1 秒，等待线程体实例化 mMyHandler，避免空指针异常
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        myThread.mMyHandler.sendEmptyMessage(2);     Message 在子线程进行处理
    }

    private static class MyThread extends Thread {
        private MyHandler mMyHandler;

        @Override
        public void run() {
            Looper.prepare();     为当前线程创建 Looper 并与之绑定
            mMyHandler = new MyHandler();          与子线程进行关联（实例化 Handler 的同时会自动绑定当前线程的 Looper）
            Looper.loop();     Looper 开始工作，无限循环，阻塞方法
        }

        public void stopLoop() {
            Looper.myLooper().quitSafely();     Looper 停止工作
        }
    }

    private static class MyHandler extends Handler {     静态内部类
        @Override
        public void handleMessage(Message msg) {
            Log.w("Tag", msg.what + "::" + Thread.currentThread().toString());
        }
    }
}
----
输出：
21106-21387/com.example.myapp.myapplication W/Tag: 2::Thread[Thread-214,5,main]
21106-21106/com.example.myapp.myapplication W/Tag: 1::Thread[main,5,main]
```

### HandlerThread
```java
public class MainActivity extends Activity {
    private final HandlerThread mHandlerThread = new HandlerThread("123");     已封装好的 Looper 线程，推荐这种方式
    private MyHandler mMyHandler1;
    private MyHandler mMyHandler2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mMyHandler1 = new MyHandler();     无参构造方法
        mMyHandler1.sendEmptyMessage(0);     Message 在主线程进行处理

        mHandlerThread.start();     启动线程
        mMyHandler2 = new MyHandler(mHandlerThread.getLooper());     有参构造方法
        mMyHandler2.sendEmptyMessage(0);     Message 在子线程进行处理
    }

    private static class MyHandler extends Handler {     静态内部类
        private MyHandler() {     无参构造方法（实例化 Handler 的同时会自动绑定当前线程的 Looper）
        }

        private MyHandler(Looper looper) {     有参构造方法（指定 Looper 对象）
            super(looper);
        }

        @Override
        public void handleMessage(Message msg) {
            Log.w("Tag", msg.what + "::" + Thread.currentThread().toString());
        }
    }
}
----
输出：
2853-4062/com.example.myapp.myapplication W/Tag: 0::Thread[123,5,main]
2853-2853/com.example.myapp.myapplication W/Tag: 0::Thread[main,5,main]
```

## 线程之间的交互
```java
public class MainActivity extends Activity {
    private final HandlerThread mHandlerThread = new HandlerThread("123");
    private MyHandler mMyHandler1;
    private MyHandler mMyHandler2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mHandlerThread.start();     启动线程

        mMyHandler1 = new MyHandler();     绑定主线程 Looper
        mMyHandler2 = new MyHandler(mHandlerThread.getLooper());     绑定子线程 Looper
    }

    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button1:
                Message message1 = mMyHandler1.obtainMessage(1, "主线程发往子线程");
                message1.setTarget(mMyHandler2);     指定目标 Handler
                message1.sendToTarget();     传递至 Looper 中的 MessageQueue，再发送给对应的 Handler 对象处理
                break;
            case R.id.button2:
                Message message2 = mMyHandler2.obtainMessage(2, "子线程发往主线程");
                message2.setTarget(mMyHandler1);     指定目标 Handler
                message2.sendToTarget();     传递至 Looper 中的 MessageQueue，再发送给对应的 Handler 对象处理
                break;
        }
    }

    private static class MyHandler extends Handler {     静态内部类
        private MyHandler() {     无参构造方法（实例化 Handler 的同时会自动绑定当前线程的 Looper）
        }

        private MyHandler(Looper looper) {     有参构造方法（指定 Looper 对象）
            super(looper);
        }

        @Override
        public void handleMessage(Message msg) {
            Log.w("Tag", msg.what + "::" + msg.obj + "::" + Thread.currentThread().toString());
        }
    }
}
----
输出：
15749-18518/com.example.myapp.myapplication W/Tag: 1::主线程发往子线程::Thread[123,5,main]
15749-15749/com.example.myapp.myapplication W/Tag: 2::子线程发往主线程::Thread[main,5,main]
```

## 更新 UI 的 4 种方式
```java
public class MainActivity extends Activity {
    private final MyHandler mMyHandler = new MyHandler(this);
    private final MyRunnable mMyRunnable = new MyRunnable(this);
    private TextView mTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = (TextView) findViewById(R.id.textView);
    }

    public void onClick(View view) {     这 4 种方法本质上都是通过 Handler 机制而运行在主线程
        switch (view.getId()) {
            case R.id.button1:
                new Thread() {
                    @Override
                    public void run() {
                        mMyHandler.obtainMessage(1, "你好").sendToTarget();     Handler 方法 sendMessage
                    }
                }.start();     启动新线程
                break;
            case R.id.button2:
                new Thread() {
                    @Override
                    public void run() {
                        mMyHandler.post(mMyRunnable);     Handler 方法 post
                    }
                }.start();     启动新线程
                break;
            case R.id.button3:
                new Thread() {
                    @Override
                    public void run() {
                        mTextView.post(mMyRunnable);     View 方法 post
                    }
                }.start();     启动新线程
                break;
            case R.id.button4:
                new Thread() {
                    @Override
                    public void run() {
                        MainActivity.this.runOnUiThread(mMyRunnable);     Activity 方法 runOnUiThread
                    }
                }.start();     启动新线程
                break;
        }
    }

    private static class MyHandler extends Handler {     静态内部类
        private final WeakReference<MainActivity> mActivity;     通过弱引用持有外部 Activity

        private MyHandler(MainActivity activity) {     构造方法
            mActivity = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            Log.w("Tag", Thread.currentThread().toString());     打印当前线程信息
            MainActivity mainActivity = mActivity.get();
            if (mainActivity != null) {     如果不为空
                mainActivity.mTextView.setText(msg.obj.toString());
            }
        }
    }

    private static class MyRunnable implements Runnable {     静态内部类
        private final WeakReference<MainActivity> mActivity;     通过弱引用持有外部 Activity

        private MyRunnable(MainActivity activity) {     构造方法
            mActivity = new WeakReference<>(activity);
        }

        @Override
        public void run() {
            Log.w("Tag", Thread.currentThread().toString());     打印当前线程信息
            MainActivity mainActivity = mActivity.get();
            if (mainActivity != null) {     如果不为空
                mainActivity.mTextView.setText("你好");
            }
        }
    }
}
----
输出：
3974-3974/com.example.myapp.myapplication W/Tag: Thread[main,5,main]
3974-3974/com.example.myapp.myapplication W/Tag: Thread[main,5,main]
3974-3974/com.example.myapp.myapplication W/Tag: Thread[main,5,main]
3974-3974/com.example.myapp.myapplication W/Tag: Thread[main,5,main]
```