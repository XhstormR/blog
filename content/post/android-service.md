---
Categories:
- Android
date: 2016-10-13T12:21:04+08:00
title: Android Service
---

<!--more-->

Updated on 2016-10-16

> {{< image "/uploads/android-service.svg" "Service 生命周期方法" "1" "1" >}}

## 启动服务
* 调用 `startService()` 后服务便会在后台无限期运行，需手动停止服务。
* 如果服务已经启动，再调用 `startService()`，则只会调用 `onStartCommand()`。

### MainActivity.java
```java
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);     设置点击内容 Intent
        Notification.Builder builder = new Notification.Builder(this).setContentTitle("标题").setContentText("内容").setSmallIcon(R.mipmap.ic_launcher).setContentIntent(pendingIntent);     通知

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);     获得通知管理
        notificationManager.notify(1, builder.build());     显示状态栏通知（通知 ID，通知）
    }

    public void onClick(View view) {
        Intent intent = new Intent(MainActivity.this, MyService.class);
        intent.putExtra("msg", "信息");
        switch (view.getId()) {
            case R.id.button1:
                startService(intent);     启动服务
                break;
            case R.id.button2:
                stopService(intent);     停止服务（一旦调用了 startService，就必须手动停止服务）
                break;
        }
    }
}
```

### MyService.java
```java
public class MyService extends Service {

    @Override
    public void onCreate() {     调用一次
        Log.i("Tag", "Service ---> 1onCreate");
        super.onCreate();

        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);     设置点击内容 Intent
        Notification.Builder builder = new Notification.Builder(this).setContentTitle("新标题").setContentText("新内容").setSmallIcon(R.mipmap.ic_launcher).setContentIntent(pendingIntent);     通知

        startForeground(1, builder.build());     设置为前台服务（通知 ID，通知）
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {     startService 调用；处在 UI 线程，不应包含耗时操作，可以通过启动新线程来完成
        Log.i("Tag", "Service ---> 2onStartCommand" + intent);
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {     调用一次
        Log.i("Tag", "Service ---> 3onDestroy");
        super.onDestroy();
        stopForeground(true);     取消前台服务（同时移除状态栏通知）
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {     bindService 调用
        return null;
    }
}
----
输出：
16307-16307/com.example.myapp.myapplication I/Tag: Service ---> 1onCreate
16307-16307/com.example.myapp.myapplication I/Tag: Service ---> 2onStartCommandIntent { cmp=com.example.myapp.myapplication/.MyService (has extras) }
16307-16307/com.example.myapp.myapplication I/Tag: Service ---> 2onStartCommandIntent { cmp=com.example.myapp.myapplication/.MyService (has extras) }
16307-16307/com.example.myapp.myapplication I/Tag: Service ---> 2onStartCommandIntent { cmp=com.example.myapp.myapplication/.MyService (has extras) }
16307-16307/com.example.myapp.myapplication I/Tag: Service ---> 3onDestroy
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
            android:text="启动服务"
            android:id="@+id/button1"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="停止服务"
            android:id="@+id/button2"/>
</LinearLayout>
```

## 绑定服务
* 绑定服务可以获得服务对象，获取服务的状态和数据并调用服务中的方法，与之通信。
* 通过 `bindService()` 启动的服务，通过 `unbindService()` 解绑后，如果没有绑定对象，服务会自动停止。
* 服务可以同时通过 `startService()` 和 `bindService()` 启动，但之后必须手动调用 `stopService()` 停止服务且停止时服务中没有绑定对象。

### MainActivity.java
```java
public class MainActivity extends Activity {
    private MyService mService;
    private boolean mBound = false;
    private ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {     连接建立时调用，传递 onBind 返回的 IBinder 对象
            MyService.MyBinder myBinder = (MyService.MyBinder) service;     向下类型转换（强制类型转换）
            mService = myBinder.getService();     通过 MyBinder 提供的方法获得 Service 对象
            mBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {     连接意外中断时调用
            mBound = false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mBound) {
            unbindService(mConnection);     取消绑定服务
            mBound = false;
        }
    }

    public void onClick(View view) {
        Intent intent = new Intent(MainActivity.this, MyService.class);
        intent.putExtra("msg", "信息");
        switch (view.getId()) {
            case R.id.button1:
                bindService(intent, mConnection, Context.BIND_AUTO_CREATE);     绑定服务
                break;
            case R.id.button2:
                if (mBound) {
                    unbindService(mConnection);     取消绑定服务（当服务没有绑定对象后，服务会自动停止）
                    mBound = false;
                }
                break;
            case R.id.button3:
                if (mBound) {
                    mService.getRandomNumber();     调用 Service 对象中的方法
                }
                break;
        }
    }
}
```

### MyService.java
```java
public class MyService extends Service {
    private final Binder mBinder = new MyBinder();

    @Override
    public void onCreate() {     调用一次
        Log.i("Tag", "Service ---> 1onCreate");
        super.onCreate();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {     bindService 调用，传递 IBinder
        Log.i("Tag", "Service ---> 2onBind");
        return mBinder;
    }

    @Override
    public boolean onUnbind(Intent intent) {     bindService 调用
        Log.i("Tag", "Service ---> 3onUnbind");
        return super.onUnbind(intent);
    }

    @Override
    public void onDestroy() {     调用一次
        Log.i("Tag", "Service ---> 4onDestroy");
        super.onDestroy();
    }

    public void getRandomNumber() {     提供给外部调用的方法
        Log.i("Tag", String.valueOf(((int) (Math.random() * 100))));
    }

    public class MyBinder extends Binder {     Binder 实现了 IBinder
        public MyService getService() {     IBinder 提供获得 Service 对象的方法
            return MyService.this;
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
            android:text="启动服务"
            android:id="@+id/button1"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="停止服务"
            android:id="@+id/button2"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="使用服务"
            android:id="@+id/button3"/>
</LinearLayout>
```

## AndroidManifest.xml
```xml
<application

    其余组件

    <activity android:name=".MainActivity" android:launchMode="singleInstance">     注册 Activity
        <intent-filter>                                                                                      ↳ 只允许存在一个 Activity 实例
            <action android:name="android.intent.action.MAIN"/>
            <category android:name="android.intent.category.LAUNCHER"/>
        </intent-filter>
    </activity>

    <service android:name=".MyService" android:exported="false"/>     注册服务
                                                                                                    ↳ 禁止跨 App 使用（以 user id 为界）
</application>
```
