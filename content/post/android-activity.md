---
Categories:
- Android
date: 2016-07-18T09:57:11+08:00
title: Android Activity
---

<!--more-->

Updated on 2016-07-18

> {{< image "/uploads/android-activity-life-cycle.svg" "Activity 生命周期方法" "1" "1" >}}

## Activity 的生命周期

![](/uploads/android-activity-life.svg "Activity 生命周期")

根据 Activity 生命周期方法可以分为以下三组：

* 完整生命周期（Entire lifetime）
* 前台生命周期（Foreground lifetime）
* 后台生命周期（Visible lifetime）

## 注册 Activity
```xml
AndroidManifest.xml
⇳
<application
        android:allowBackup="true"     允许导出备份文件
        android:supportsRtl="true"     支持左右翻转布局
        android:label="@string/app_name"     应用名称
        android:icon="@mipmap/ic_launcher"     应用图标
        android:theme="@style/AppTheme">     应用主题

    <activity android:name="com.example.system.myapplication.MainActivity">     注册 Activity
        <intent-filter>     标签
            <action android:name="android.intent.action.MAIN"/>     设置为入口 Activity
            <category android:name="android.intent.category.LAUNCHER"/>
        </intent-filter>
    </activity>

    其余组件

</application>
```

## 保护 Activity
```xml
应用A - AndroidManifest.xml
⇳
<permission
        android:name="aa.bb.cc.dd"
        android:protectionLevel="normal"/>
<activity
        android:name=".MainActivity"
        android:permission="aa.bb.cc.dd"/>     添加权限，受到保护

应用B - AndroidManifest.xml
⇳
<uses-permission android:name="aa.bb.cc.dd"/>     申请权限
```

## Activity 之间的通信
```java
1
---
AndroidManifest.xml
⇳
<activity android:name=".B">
    <intent-filter>     标签
        <action android:name="aa.bb.cc"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</activity>

A.class
⇳
public void onClick(View view) {
    Intent intent = new Intent();
    intent.setAction("aa.bb.cc");
    intent.addCategory("android.intent.category.DEFAULT");
    startActivity(intent);
}

-------------------------------------------------------

2
---
public class A extends AppCompatActivity {
    private Button button1;
    private Button button2;
    private TextView textView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        Log.i("Tag", "A ---> 1onCreate");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.a);
        button1 = (Button) findViewById(R.id.a_bt1);
        button2 = (Button) findViewById(R.id.a_bt2);
        textView = (TextView) findViewById(R.id.a_tv1);

        button1.setOnClickListener(new View.OnClickListener() {     按钮一，第一种方式，无返回值 A ➜ B
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(A.this, B.class);     Intent（上下文对象，目标 Activity）
                intent.putExtra("str1", "数据传入");     放入数据
                startActivity(intent);     无返回值跳转页面
            }
        });
        button2.setOnClickListener(new View.OnClickListener() {     按钮二，第二种方式，有返回值 A ➜ B ➜ A
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(A.this, B.class);     Intent（上下文对象，目标 Activity）
                startActivityForResult(intent, 1);     有返回值跳转页面（意图，请求码）
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {     接收数据（请求码，结果码，回传数据）
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1 && resultCode == 2) {     通过请求码和结果码判断是哪个 Activity 回传的数据
            textView.setText(data.getStringExtra("str1"));     显示回传数据
        }
    }

    @Override
    protected void onStart() {
        Log.i("Tag", "A ---> 2onStart");
        super.onStart();
    }

    @Override
    protected void onResume() {
        Log.i("Tag", "A ---> 3onResume");
        super.onResume();
    }

    @Override
    protected void onPause() {
        Log.i("Tag", "A ---> 4onPause");
        super.onPause();
    }

    @Override
    protected void onStop() {
        Log.i("Tag", "A ---> 5onStop");
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        Log.i("Tag", "A ---> 6onDestroy");
        super.onDestroy();
    }

    @Override
    protected void onRestart() {
        Log.i("Tag", "A ---> 7onRestart");
        super.onRestart();
    }
}

----

public class B extends AppCompatActivity {
    private Button button;
    private TextView textView;
    private Intent intent;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.b);
        button = (Button) findViewById(R.id.b_bt1);
        textView = (TextView) findViewById(R.id.b_tv1);
        intent = getIntent();     接收传入的意图

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (intent.getStringExtra("str1") != null) {     判断是通过按钮一启动还是按钮二启动
                    textView.setText(intent.getStringExtra("str1"));     按钮一，接收并显示数据
                } else {
                    intent = new Intent();     按钮二，新建意图作为容器
                    intent.putExtra("str1", "数据传出");     放入数据
                    setResult(2, intent);     传出数据（结果码，意图）
                    finish();     结束当前 Activity
                }
            }
        });
    }
}

-------------------------------------------------------

通过 Intent 调用外部浏览器
---
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        Button button = (Button) findViewById(R.id.button);

        button.setOnClickListener(new View.OnClickListener() {     点击按钮调用外部浏览器打开网页
            @Override
            public void onClick(View v) {
                Uri uri = Uri.parse("https://www.bing.com/");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
            }
        });
    }
}
```

## 关于 finish() 和 System.exit(0)
* finish()：结束调用此方法的 `Activity` 的生命周期，也就是按顺序执行至 `onDestroy()`。
* System.exit(0)：直接停止该 App 的虚拟机，相当于App直接断电，不应该使用此方法。