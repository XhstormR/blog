+++
Categories = ["Android"]
date = "2016-07-04T19:30:21+08:00"
title = "自学 Android"

+++

<!--more-->

Updated on 2016-07-12

> ![](/uploads/android.svg "Android")
>
> https://developer.android.com/index.html

## 开发环境
* IntelliJ IDEA：https://www.jetbrains.com/idea/download/
  * ~~[Eclipse](https://eclipse.org/downloads/eclipse-packages/) + [ADT](https://developer.android.com/studio/tools/sdk/eclipse-adt.html) 已被 Google 弃用~~
* Android SDK：https://developer.android.com/studio/index.html#win-tools2
  * [Mirror1](http://mirrors.neusoft.edu.cn/android/),[Mirror2](https://dsx.bugly.qq.com/repository/1)
  * Gradle：https://services.gradle.org/distributions/
      * GRADLE_HOME ➜ D:\Download\Java\gradle-2.14
      * PATH ➜ %GRADLE_HOME%\bin
* JDK：http://www.oracle.com/technetwork/java/javase/downloads/index.html

### 新建 Android 项目卡住
IDEA 的 Android 构建工具是 Gradle，新建项目时会联网下载对应版本的 Gradle 和 Cache。

Gradle：![](/uploads/android-gradle.png)
```html
C:\Users\XhstormR\IntelliJIDEAProjects\MyApplication\gradle\wrapper\gradle-wrapper.properties
⇳
distributionUrl=https\://services.gradle.org/distributions/gradle-2.8-all.zip
```

Cache：![](/uploads/android-cache.png)
```html
C:\Users\XhstormR\IntelliJIDEAProjects\MyApplication\build.gradle
⇳
repositories {
    maven { url "http://maven.aliyun.com/nexus/content/groups/public/" }
}
```

### 找不到资源文件
IDEA ➜ Build ➜ `Make Project` or `Rebuild Project`（重新生成 R.java）

## Android Debug Bridge
* 手机开启 USB 调试模式
* 电脑安装 Android USB 驱动

```html
adb install D:\1.apk     安装APP
adb uninstall 1     卸载APP
adb push D:\1.txt  /mnt/sdcard/Download/1.txt     发送至手机
adb pull /mnt/sdcard/Download/1.txt  D:\1.txt     下载至电脑

D:\Download\Java\android-sdk-windows\platform-tools\adb.exe devices -l     查看设备
List of devices attached
0123456789ABCDEF       device product:2013023 model:2013023 device:HM2013023

D:\Download\Java\android-sdk-windows\platform-tools\adb.exe shell     登录设备
shell@HM2013023:/ $ su
root@HM2013023:/ # ls
root@HM2013023:/ # exit
```

## Android 规范
* [Android Design](/uploads/android-design.png "Android Design")
* Android 组件：所有组件都需要在 `AndroidManifest.xml` 中进行注册。
  * 活动（Activity）：一种包含用户界面的组件，主要用于和用户进行交互。
  * 服务（Service）：用于实现程序后台运行的组件，不需要和用户交互。
  * 广播接收器（Broadcast Receiver）：用于接收和发送广播的组件。
  * 内容提供器（Content Provider）：用于实现不同应用程序之间共享数据的组件。
* 控件属性
  * orientation（方向）：`horizontal`（水平） | `vertical`（垂直）
  * wrap_content：包裹内容。
  * match_parent：铺满容器。
  * sp：Scale-independent Pixels（可伸缩像素），文字尺寸一律使用 `sp` 单位。
  * dp：Density-independent Pixels（密度无关像素），非文字尺寸使用 `dp` 单位。

## SVG

![](/uploads/android-architecture.svg "Android 架构")

![](/uploads/android-textview.svg "TextView")

![](/uploads/android-edittext.svg "EditText")

![](/uploads/android-imageview.svg "ImageView")

![](/uploads/android-button.svg "Button")

![](/uploads/android-imagebutton.svg "ImageButton")

![](/uploads/android-autocompletetextview.svg "AutoCompleteTextView")

![](/uploads/android-autocompletetextviewmulti.svg "MultiAutoCompleteTextView")

![](/uploads/android-togglebutton.svg "ToggleButton")

![](/uploads/android-checkbox.svg "CheckBox")

![](/uploads/android-radiobutton.svg "RadioButton")

## Code
```java
AutoCompleteTextView
布局文件
<AutoCompleteTextView
        android:id="@+id/autoCompleteTextView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"

        android:hint="请输入关键词"     输入文本提示
        android:completionThreshold="2"     输入 2 个字符时开始匹配
        />

----

Activity 文件
public class FirstActivity extends AppCompatActivity {
    private String[] res = {"beijing1", "beijing2", "beijing3", "shanghai1", "shanghai2", "shanghai3"};     数据源

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);

        AutoCompleteTextView a = (AutoCompleteTextView) findViewById(R.id.autoCompleteTextView);     1控件
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, res);     2适配器（上下文对象，布局文件，数据源）
        a.setAdapter(adapter);     3将控件与适配器绑定

        a.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());     4如果是 MultiAutoCompleteTextView 还需要设置分隔符
    }
}

-------------------------------------------------------

ToggleButton
布局文件
<ToggleButton
        android:id="@+id/toggleButton"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"

        android:checked="false"     默认为关
        android:textOff="关"
        android:textOn="开"
        />

<ImageView
        android:id="@+id/imageView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@drawable/png_off"     默认为关的图片
        />

----

Activity 文件
public class FirstActivity extends AppCompatActivity implements CompoundButton.OnCheckedChangeListener {     1通过接口方式实现监听器
    private ToggleButton toggleButton;
    private ImageView imageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);
        toggleButton = (ToggleButton) findViewById(R.id.toggleButton);
        imageView = (ImageView) findViewById(R.id.imageView);

        toggleButton.setOnCheckedChangeListener(this);     3设置监听器
    }

    @Override     2实现接口方法
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        imageView.setBackgroundResource(isChecked ? R.drawable.png_on : R.mipmap.png_off);     通过三元运算符来判断开关状态设置 imageView 的背景图片
    }
}

-------------------------------------------------------

CheckBox
布局文件
<CheckBox
        android:id="@+id/checkBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="篮球"
        android:textAlignment="center"
        android:layout_gravity="center"
        />

<CheckBox
        android:id="@+id/checkBox2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="足球"
        android:textAlignment="center"
        android:layout_gravity="center"
        />

----

Activity 文件
public class FirstActivity extends AppCompatActivity implements CompoundButton.OnCheckedChangeListener {     通过接口方式实现监听器
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);

        CheckBox checkBox = (CheckBox) findViewById(R.id.checkBox);
        CheckBox checkBox2 = (CheckBox) findViewById(R.id.checkBox2);
        checkBox.setOnCheckedChangeListener(this);     设置监听器
        checkBox2.setOnCheckedChangeListener(this);     设置监听器
    }

    @Override
    public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
        Log.i("Tag", b + "");
        if (b) {
            Toast.makeText(compoundButton.getContext(), "选中" + compoundButton.getText().toString(), Toast.LENGTH_SHORT).show();     （上下文对象，字符串消息，显示时间）
        } else {
            Toast.makeText(compoundButton.getContext(), "取消" + compoundButton.getText().toString(), Toast.LENGTH_SHORT).show();
        }
    }
}

-------------------------------------------------------

RadioGroup
布局文件
<RadioGroup
        android:id="@+id/radioGroup"
        android:orientation="horizontal"     水平排列
        android:layout_width="wrap_content"
        android:layout_height="wrap_content">

    <RadioButton
            android:id="@+id/radioButton"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:checked="true"     默认选中
            android:text="男"/>
    <RadioButton
            android:id="@+id/radioButton2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="女"/>

</RadioGroup>

----

Activity 文件
public class FirstActivity extends AppCompatActivity implements RadioGroup.OnCheckedChangeListener {     注意是实现 RadioGroup 类的监听方法，而不是 CompoundButton 类的
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);

        RadioGroup radioGroup = (RadioGroup) findViewById(R.id.radioGroup);
        radioGroup.setOnCheckedChangeListener(this);
    }

    @Override
    public void onCheckedChanged(RadioGroup radioGroup, @IdRes int i) {
        switch (i) {
            case R.id.radioButton:
                Log.i("Tag", "性别为男");
                break;
            case R.id.radioButton2:
                Log.i("Tag", "性别为女");
                break;
        }
    }
}
```

---

[Maven1](https://repo1.maven.org/maven2/),[Maven2](https://repo.maven.apache.org/maven2/),[JCenter](https://jcenter.bintray.com/),[Mirror](http://maven.aliyun.com/)

Cache：
[![](/uploads/file-into-picture2.png)](http://ww1.sinaimg.cn/large/a038ef72gw1f5lcbds6wvj203k03k1lf "Part1")
[![](/uploads/file-into-picture2.png)](http://ww3.sinaimg.cn/large/a038ef72gw1f5lcbrppq1j203k03ku19 "Part2")
Android USB Driver：
[![](/uploads/file-into-picture2.png)](http://ww4.sinaimg.cn/large/a15b4afegw1f5l3t68pezj203k03k4qw)
