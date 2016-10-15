+++
Categories = ["Android"]
date = "2016-10-13T12:21:04+08:00"
title = "Android Service"

+++

<!--more-->

Updated on 2016-10-14

>

## 启动服务

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
                startService(intent);     启动服务（一旦调用 startService，就必须手动停止服务）
                break;
            case R.id.button2:
                stopService(intent);     停止服务
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

### MainActivity.java
```java

```

### MyService.java
```java

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
