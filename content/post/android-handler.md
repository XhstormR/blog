+++
Categories = ["Android"]
date = "2016-10-25T20:25:47+08:00"
title = "Android Handler"

+++

<!--more-->

Updated on 2016-10-25

>

## post ➜ Runnable
### MainActivity.java
```java
public class MainActivity extends Activity {
    private ImageView mImageView;
    private final Handler mHandler = new Handler();
    private Runnable mRunnable = new Runnable() {     A：第一种（postDelayed）
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
            android:text="启动"
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
                        mHandler.sendMessage(message);     发送 Message

                        第二种（推荐）
                        Message message = mHandler.obtainMessage(0, 123, 456, "你好");     重用 Message
                        message.sendToTarget();     发送 Message
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

## 防止 Handler 内存泄漏
* 导致原因：
  * 非静态的内部类会隐式持有其外部类的引用。
  * Handler 对象发送的 Message 对象会持有此 Handler 对象的引用。
  * Message ➜ Handler ➜ Activity ➜ Activity 资源无法回收（内存泄漏）
* 解决方案：
  * 声明 Handler 为 `static` 或者为其新建类文件。
  * 使用弱引用持有外部的 Activity。

```java

```