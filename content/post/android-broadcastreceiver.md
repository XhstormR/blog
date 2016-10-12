+++
Categories = ["Android"]
date = "2016-10-10T20:16:37+08:00"
title = "Android BroadcastReceiver"

+++

<!--more-->

Updated on 2016-10-10

>

* Broadcast（发）：发送 Broadcast 用于进程或线程间进行通信。
  * 普通广播：所有监听该广播的接收器都可以（理论上同时）接收到该广播。
      * 动态注册的接收器 **总是** 先于静态注册的接收器收到广播。
      * 并行处理。
  * 有序广播：按照接收器的优先级顺序（链式）接收广播。（-1000 至 1000）
      * 监听该广播的接收器可以中断传播，也可以放入数据传递给下一个接收器。
      * **同等级** 的动态注册的接收器先于静态注册的接收器收到广播。
      * 串行处理。
* BroadcastReceiver（收）：对 Broadcast 进行过滤接收并响应，四大组件之一。
  * 静态注册：在 AndroidManifest.xml 中进行注册。( 常驻型 )
  * 动态注册：在运行时的 Java 代码中进行注册，程序结束后取消注册。( 非常驻型 )

## MainActivity.java
```java
public class MainActivity extends Activity {
    private MyBroadcastReceiver mMyBroadcastReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mMyBroadcastReceiver = new MyBroadcastReceiver();     广播接收器
        IntentFilter intentFilter = new IntentFilter("action1");     过滤信息（接受行动）
        intentFilter.setPriority(100);     优先级
        registerReceiver(mMyBroadcastReceiver, intentFilter);     动态注册（广播接收器，过滤信息）
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mMyBroadcastReceiver);     取消动态注册
    }

    public void onClick(View view) {
        Intent intent = new Intent("action1");     意图（行动）
        switch (view.getId()) {
            case R.id.button1:
                intent.putExtra("msg", "普通广播");
                sendBroadcast(intent);     发送普通广播
                break;
            case R.id.button2:
                intent.putExtra("msg", "有序广播");
                sendOrderedBroadcast(intent, null);     发送有序广播（意图，权限）
                break;                                          ↳ 接收器不需要权限
        }
    }
}
```

## MyBroadcastReceiver.java
```java
public class MyBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {     不应包含耗时操作
        Log.w("Tag", intent.getStringExtra("msg") + "_" + intent.getAction());
        Bundle bundle = new Bundle();
        bundle.putString("str", "新消息");

        ----有序广播----

        abortBroadcast();     中断广播

        传递数据
        setResultCode(1);
        setResultData("ABC");
        setResultExtras(bundle);
        setResult(1, "ABC", bundle);

        接收数据
        int resultCode = getResultCode();
        String resultData = getResultData();
        Bundle resultExtras = getResultExtras(true);
        resultExtras.getString("str", "无消息");
    }
}
```

## activity_main.xml
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
            android:text="发送普通广播"
            android:id="@+id/button1"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="发送有序广播"
            android:id="@+id/button2"/>
</LinearLayout>
```

## AndroidManifest.xml
```xml
<application

    其余组件

    <receiver     静态注册
            android:name=".MyBroadcastReceiver"
            android:exported="false">     禁止跨进程使用（不接收外部广播）
        <intent-filter android:priority="200">     优先级
            <action android:name="action1"/>     过滤信息（接受行动）
        </intent-filter>
    </receiver>
</application>
```
