+++
Categories = ["Android"]
date = "2016-10-17T17:13:39+08:00"
title = "Android 系统服务"

+++

<!--more-->

Updated on 2016-10-17

>

## MainActivity.java
```java
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        LayoutInflater inflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);     通过 getSystemService 获得 LayoutInflater 对象
        View view = inflater.inflate(R.layout.activity_main, null);
        setContentView(view);
    }

    public void onClick(View view) {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);     管理网络连接
        WifiManager wifiManager = (WifiManager) getSystemService(Context.WIFI_SERVICE);     管理 WIFI
        AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);     管理音量
        ActivityManager activityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);     管理运行中的 Activity
        switch (view.getId()) {
            case R.id.button1:
                NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
                boolean isConnected = networkInfo != null && networkInfo.isConnected();
                Log.w("Tag", "网络连接？：" + isConnected);       true == 连接网络后（需等待一会）
                break;
            case R.id.button2:
                boolean isWifiEnabled = wifiManager.isWifiEnabled();
                Log.w("Tag", "WIFI状态？：" + isWifiEnabled);     true == 打开 WIFI 后（需等待一会）
                break;
            case R.id.button3:
                int streamVolume = audioManager.getStreamVolume(AudioManager.STREAM_SYSTEM);     获取当前系统音量
                int streamMaxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_SYSTEM);     获取最大系统音量
                Log.w("Tag", streamVolume + ":" + streamMaxVolume);
                break;
            case R.id.button4:
                List<ActivityManager.RunningTaskInfo> runningTasks = activityManager.getRunningTasks(10);     获得当前正在运行的前 10 个应用（方法已被弃用）
                for (ActivityManager.RunningTaskInfo runningTask : runningTasks) {
                    String packageName = runningTask.topActivity.getPackageName();     应用包名
                    Log.w("Tag", packageName);
                }
                break;
            case R.id.toggleButton1:
                boolean isChecked = ((ToggleButton) view).isChecked();
                boolean isSucceed = wifiManager.setWifiEnabled(isChecked);
                Log.w("Tag", "打开WIFI？：" + isChecked + "，操作成功？：" + isSucceed);
                break;
        }
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
            android:text="网络是否连接"
            android:id="@+id/button1"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="WIFI是否打开"
            android:id="@+id/button2"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="获取系统音量"
            android:id="@+id/button3"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="获取应用包名"
            android:id="@+id/button4"/>
    <ToggleButton
            android:onClick="onClick"
            android:textOn="关闭WIFI"
            android:textOff="开启WIFI"
            android:checked="false"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:id="@+id/toggleButton1"/>
</LinearLayout>
```

## AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>     获得网络状态
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>     获得 WIFI 状态
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>     改变 WIFI 状态
<uses-permission android:name="android.permission.GET_TASKS"/>     获得应用运行列表（已被弃用）
```