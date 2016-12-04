+++
Categories = ["Android"]
date = "2016-07-04T19:30:21+08:00"
title = "自学 Android"

+++

<!--more-->

Updated on 2016-08-27

> {{< image "/uploads/android.svg" "Android" "1" "1" >}}
>
> https://developer.android.com/index.html
>
> https://developer.android.com/reference/classes.html

## 开发环境
* IntelliJ IDEA：https://www.jetbrains.com/idea/download/
  * ~~[Eclipse](https://eclipse.org/downloads/eclipse-packages/) + [ADT](https://developer.android.com/studio/tools/sdk/eclipse-adt.html) 已被 Google 弃用~~
* Android SDK：https://developer.android.com/studio/index.html#win-tools2
  * [Mirror1](http://mirrors.neusoft.edu.cn/android/),[Mirror2](http://android-mirror.bugly.qq.com:8080/),[Mirror3](https://dsx.bugly.qq.com/repository/1),[Mirror4](http://3ba67e7c209a.repository.bugly.qq.com/)
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
distributionUrl=http\://android-mirror.bugly.qq.com:8080/gradle/gradle-3.2.1-all.zip
```

Cache：![](/uploads/android-cache.png)
```html
C:\Users\XhstormR\IntelliJIDEAProjects\MyApplication\build.gradle
⇳
repositories {
    maven { url "http://maven.aliyun.com/nexus/content/groups/public/" }
}
```

### 找不到主题文件
```xml
<style name="AppTheme" parent="@android:style/Theme.DeviceDefault.Light.NoActionBar">
```

### 找不到资源文件
IDEA ➜ Build ➜ `Make Project` or `Rebuild Project`（重新生成 R.java）

### 没有 Assets 文件夹
IDEA ➜ File ➜ New ➜ Folder ➜ Assets Folder（src/main/assets/）

### 导入 SDK 源码
IDEA ➜ File ➜ Project Structure ➜ SDKs ➜ Sourcepath

## Android Debug Bridge
* 手机开启 USB 调试模式
* 电脑安装 Android USB 驱动

```html
adb start-server     启动 ADB
adb kill-server     停止 ADB
adb root     使 ADBD 获得 ROOT 权限

adb reboot     重启手机
adb reboot recovery     重启至 Recovery 模式
adb reboot bootloader     重启至 Fastboot 模式

adb install D:\1.apk     安装 App     -r 允许覆盖安装     -d 允许降级安装
adb uninstall com.baidu.mobile     卸载 App（包名）     -k 保留数据和缓存

adb push D:\1.txt  /mnt/sdcard/Download/1.txt     发送至手机
adb pull /mnt/sdcard/Download/1.txt  D:\1.txt     下载至电脑

D:\Download\Java\android-sdk-windows\platform-tools\adb.exe devices -l     查看设备
List of devices attached
0123456789ABCDEF       device product:2013023 model:2013023 device:HM2013023

D:\Download\Java\android-sdk-windows\platform-tools\adb.exe shell     登录设备
shell@HM2013023:/ $ su
root@HM2013023:/ # ls
root@HM2013023:/ # exit

wm size     查看屏幕分辨率
wm density     查看屏幕密度
dumpsys window displays     查看显示屏参数
screencap -p /sdcard/123.png     截图
screenrecord /sdcard/123.mp4     录屏
date -s 20160823.131500     设置日期和时间
cat /system/build.prop     查看硬件和系统属性
cat /data/misc/wifi/*.conf     查看连接过的 WIFI 密码

PackageManager
pm list packages     显示所有应用     -d 禁用的应用     -e 启用的应用     -3 第三方应用     -s 系统应用
pm list packages google     包名带 google 字段的应用
pm clear com.baidu.mobile     清除数据和缓存
pm list users     查看用户
pm list libraries     查看系统安装的库
pm list features     查看系统支持的功能
（总应用个数 = 禁用+启用 = 系统+第三方）

ActivityManager
am start -n com.example.app/.ExampleActivity -es str ABC     调用 Activity 并发送数据 extra string（Key-Value）
am start -a android.intent.action.CALL -d tel:10086     发送 Intent（拨打电话）
am start -a android.intent.action.VIEW -d http://xhstormr.tk/     发送 Intent（打开网站）
am startservice ...     调用 Service
am broadcast ...     发送广播
am force-stop com.baidu.mobile     强制停止 App
dumpsys activity activities | grep mFocusedActivity     查看前台 Activity

/data/property/persist.sys.usb.config     配置 USB
⇳
mtp,adb     作为媒体设备,开启调试模式

远程 ADB
adb devices -l
    List of devices attached
    10.32.17.39:1234       device product:2013023 model:2013023 device:HM2013023
启动
adb tcpip 1234     连接手机
adb connect 10.32.17.39:1234
停止
adb disconnect
adb usb     连接手机
```

### Vysor
* Link：[WebStore](https://chrome.google.com/webstore/detail/vysor/gidgenkbbabolejbgbpnhbimgjbffefm),[Github](https://github.com/koush/vysor.io/releases/latest)
* 破解：uglify.js ➜ function e(){this.licensed=**true**;this.licenseCached=**true**}

## Android 规范
* [Android Design](/uploads/android-design.png "Android Design")
* Android 组件：所有组件都需要在 `AndroidManifest.xml ➜ application` 里进行注册。
  * 活动（Activity）：一种包含用户界面的组件，主要用于和用户进行交互。
  * 服务（Service）：用于实现程序后台运行的组件，不需要和用户交互。
  * 广播接收器（Broadcast Receiver）：用于接收和发送广播的组件。
  * 内容提供器（Content Provider）：用于实现不同应用程序之间共享数据的组件。
* 控件属性：
  * sp：Scale-independent Pixels（可伸缩像素），文字尺寸一律使用 `sp` 单位。
  * dp：Density-independent Pixels（密度无关像素），非文字尺寸使用 `dp` 单位。
  * orientation（方向）：`horizontal`（水平） | `vertical`（垂直）
  * wrap_content：包裹内容。
  * match_parent：铺满容器。
  * layout_weight：占据父容器 **剩余空间** 的比例。**外**
      * 假设屏幕宽度为 X，2个控件的宽度都为 `match_parent` 的情况下，原有宽度为 X，2个控件的宽度也都为 X，那么剩余宽度为 X-(X+X)=-X；左边的控件占三分之一，所以左边总宽度为 X+(-X)*(1/3)=(2/3)X。
      * 建议将 `width` 或 `height` 设为 `0dp`，这样就可以理解为屏占比了。
  * margin：外边距，控件边框与控件边框的距离。**外**
  * padding：内边距，控件边框与控件内容的距离。**里**
  * layout_gravity：控件位置。**外**
  * gravity：内容位置。**里**
* 布局优化：布局层次一样的情况下，LinearLayout 的性能要稍高于 RelativeLayout。
  * include：将可重用的布局提取出来并通过 `include` 标签导入使用。
      * merge：若通过 `include` 标签导入的布局不需要顶节点，可以将顶节点标签替换为`merge`，顶节点会被直接忽略而子控件会被直接导入，以降低布局嵌套层次。
  * ViewStub：导入的布局会惰性加载，在创建主布局时不进行实例化，需要在代码中手动实例化，以节省内存并加快布局创建速度。（不支持导入 `merge` 布局）

---

* ListView：以 **列表** 形式显示条目的控件。（行）
  * 数据适配器：把复杂的数据绑定至指定控件上，是数据源和控件之间的桥梁。
      * ArrayAdapter（数组适配器）：用于绑定格式单一的数据。（数组或集合）
      * SimpleAdapter（简单适配器）：用于绑定格式复杂的数据。（特定泛型集合）
  * 事件监听器：监听某种动作行为并做出响应，是程序和用户系统交互的桥梁。
      * OnItemClickListener：监听列表中单个条目的点击事件。
      * OnScrollListener：监听列表的滚动。
* GridView：以 **表格** 形式显示条目的控件。（格）（可以用于替代 TableLayout 布局）
* Spinner：以 **下拉列表** 形式显示条目的控件。（行）
* DatePicker && TimePicker：日期选择器 && 时间选择器。
* ProgressBar：环形进度条、水平进度条（精确）。
  * SeekBar：拖动条，ProgressBar 的子类。
* WebView：显示网页的控件。
* ViewFlipper：多页面自动轮播并且带有动画效果的控件。
  * `setInAnimation()` ⟺ `setOutAnimation()`：设置进入(退出)屏幕时的动画。
  * `showPrevious()` ⟺ `showNext()`：显示前(后)一页。
  * `startFlipping()` ⟺ `stopFlipping()`：开始(停止)循环切换。
  * `setFlipInterval()`：设置切换页面的时间间隔，eg. 1s = 1000。
* ScrollView：包裹的子控件屏幕显示不完全，需要通过滚动来显示完整的控件。
  * ScrollView 垂直滚动，HorizontalScrollView 水平滚动。
  * `getScrollY()`：获得滚动条的滚动距离。
  * `scrollTo()`：使滚动条移动至指定位置。
  * `scrollBy()`：使滚动条的滚动距离增加或减少。
  * `getHeight()`：获得控件的高度。（在 onLayout 方法运行后被确定）
  * `getMeasuredHeight()`：获得控件的高度。（在 onMeasure 方法运行后被确定）
      * 在 onLayout 方法中使用 `getMeasuredHeight()`，除此之外都使用`getHeight()`。
* Gallery：画廊、缩略图浏览器。
* ImageSwitcher：用于显示图片并切换的控件，可以设置切换时的动画效果。
  * ImageView 的选择器，需要实现 ViewFactory 中的 makeView() 方法为其返回 ImageView。

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

![](/uploads/android-layout.svg "Layout")

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
            Toast.makeText(compoundButton.getContext(), "选中" + compoundButton.getText().toString(), Toast.LENGTH_SHORT).show();
        } else {                                                  ⇳ （上下文对象，字符串消息，显示时间）
            Toast.makeText(compoundButton.getContext(), "取消" + compoundButton.getText().toString(), Toast.LENGTH_SHORT).show();
        }
    }
}

-------------------------------------------------------

RadioGroup && RadioButton
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
public class FirstActivity extends AppCompatActivity implements RadioGroup.OnCheckedChangeListener {
    @Override                                                                                            ↳ 注意是实现 RadioGroup 类的监听方法，而不是 CompoundButton 类的
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

-------------------------------------------------------

ListView
布局文件
main_activity.xml
⇳
<ListView
        android:scrollbars="vertical"     显示垂直滚动条
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/listView"/>
item.xml     简单适配器的自定义布局文件
⇳
<ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/ic_launcher"
        android:id="@+id/imageView"/>
<TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Test"
        android:id="@+id/textView"/>

----

Activity 文件
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener, AbsListView.OnScrollListener {
    private String[] data1 = {"1", "2", "3", "4", "5", "6"};     数据源

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        ListView listView = (ListView) findViewById(R.id.listView);     1控件

        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, data1);
        listView.setAdapter(arrayAdapter);     3将控件与适配器绑定                               ↳ 2数组适配器（上下文对象，布局文件，数据源）

        SimpleAdapter simpleAdapter = new SimpleAdapter(this, getdata(), R.layout.item, new String[]{"image", "text"}, new int[]{R.id.imageView, R.id.textView});
        listView.setAdapter(simpleAdapter);     3将控件与适配器绑定                             ↳ 2简单适配器（上下文对象，数据源，布局文件，索引(Map中的键名)，绑定控件ID(与索引成对应关系)）

        listView.setOnItemClickListener(this);     监听点击条目
        listView.setOnScrollListener(this);     监听滚动变化
    }

    private List<Map<String, Object>> getdata() {     数据源：由许多 Map 所组成的 List 集合，一个 Map 对应一个条目
        List<Map<String, Object>> data2 = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("image", R.mipmap.ic_launcher);     (键,值)
            map.put("text", "文本" + i);
            data2.add(map);
        }
        return data2;
    }

    @Override
    public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {
        if (firstVisibleItem == 0) {
            Log.i("Tag", "在顶部");
        }
        if (firstVisibleItem + visibleItemCount == totalItemCount) {
            Log.i("Tag", "在底部");
        }
    }

    @Override
    public void onScrollStateChanged(AbsListView view, int scrollState) {     滚动变化
        switch (scrollState) {
            case SCROLL_STATE_TOUCH_SCROLL:
                Log.i("Tag", "1正在滚动(手指未离开)");
                break;
            case SCROLL_STATE_FLING:
                Log.i("Tag", "2正在滑动(手指已离开)");
                break;
            case SCROLL_STATE_IDLE:
                Log.i("Tag", "3停止滚动");
                break;
        }
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {     点击条目
        Toast.makeText(this, position + "\n" + parent.getItemAtPosition(position).toString(), Toast.LENGTH_SHORT).show();
    }                                           ↳ 显示索引位置和对应数据源中的数据
}

下滑增加新条目
case SCROLL_STATE_FLING:
    Map<String, Object> map = new HashMap<>();
    map.put("image", R.mipmap.ic_launcher);
    map.put("text", "新条目");
    data2.add(map);
    simpleAdapter.notifyDataSetChanged();     更新控件数据，同步 UI 线程
    break;

-------------------------------------------------------

DatePicker && TimePicker
布局文件
<DatePicker
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/datePicker"/>
<TimePicker
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/timePicker"/>

----

Activity 文件
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        DatePicker datePicker = (DatePicker) findViewById(R.id.datePicker);
        TimePicker timePicker = (TimePicker) findViewById(R.id.timePicker);
        Calendar calendar = Calendar.getInstance();     java.util.Calendar 类

        int year = calendar.get(Calendar.YEAR);     年
        int month = calendar.get(Calendar.MONTH) + 1;     月（从零开始）
        int day = calendar.get(Calendar.DAY_OF_MONTH);     日
        int hour = calendar.get(Calendar.HOUR_OF_DAY);     小时
        int minute = calendar.get(Calendar.MINUTE);     分钟
        setTitle(year + "-" + month + "-" + day + "-" + hour + ":" + minute);     设置标题栏

        datePicker.init(year, calendar.get(Calendar.MONTH), day, new DatePicker.OnDateChangedListener() {     日期选择器（年，月，日，监听器）
            @Override
            public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                setTitle(year + "-" + (monthOfYear + 1) + "-" + dayOfMonth);
            }
        });

        timePicker.setOnTimeChangedListener(new TimePicker.OnTimeChangedListener() {     时间选择器（监听器）
            @Override
            public void onTimeChanged(TimePicker view, int hourOfDay, int minute) {
                setTitle(hourOfDay + ":" + minute);
            }
        });

        new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener() {     对话框形式的日期选择器（上下文对象，监听器，年，月，日）.show()
            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                setTitle(year + "-" + (monthOfYear + 1) + "-" + dayOfMonth);
            }
        }, year, calendar.get(Calendar.MONTH), day).show();

        new TimePickerDialog(this, new TimePickerDialog.OnTimeSetListener() {     对话框形式的时间选择器（上下文对象，监听器，小时，分钟，是否为24小时制）.show()
            @Override
            public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                setTitle(hourOfDay + ":" + minute);
            }
        }, hour, minute, true).show();
    }
}

-------------------------------------------------------

GridView
布局文件
main_activity.xml
⇳
<GridView
        android:numColumns="3"     一行三列，可以设置自适应 auto_fit
        android:horizontalSpacing="10dp"     列间距
        android:verticalSpacing="10dp"     行间距
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/gridView"/>
item.xml     简单适配器的自定义布局文件
⇳
LinearLayout ⟺ android:gravity="center"     整体居中
<ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/ic_launcher"
        android:id="@+id/imageView"/>
<TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Test"
        android:id="@+id/textView"/>

----

Activity 文件
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        GridView gridView = (GridView) findViewById(R.id.gridView);     1控件
        SimpleAdapter simpleAdapter = new SimpleAdapter(this, getdata(), R.layout.item, new String[]{"image", "text"}, new int[]{R.id.imageView, R.id.textView});
        gridView.setAdapter(simpleAdapter);     3将控件与适配器绑定                             ↳ 2简单适配器（上下文对象，数据源，布局文件，索引(Map中的键名)，绑定控件ID(与索引成对应关系)）
        gridView.setOnItemClickListener(this);     监听点击条目
    }

    private List<Map<String, Object>> getdata() {     数据源
        List<Map<String, Object>> data = new ArrayList<>();
        for (int i = 0; i < 9; i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("image", R.mipmap.ic_launcher);
            map.put("text", "文本" + i);
            data.add(map);
        }
        return data;
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Log.i("Tag", parent + "\n" + view + "\n" + position + "\n" + id);
        Log.i("Tag", ((TextView) view.findViewById(R.id.textView)).getText().toString());     获得点击条目中的控件
    }
}

-------------------------------------------------------

Spinner
布局文件
main_activity.xml
⇳
<Spinner
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/spinner"/>
<TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="New Text"
        android:id="@+id/textView"/>
item.xml     简单适配器的自定义布局文件
⇳
LinearLayout ⟺ android:orientation="horizontal"     横向排列
<ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@mipmap/ic_launcher"
        android:id="@+id/imageView"/>
<TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Test"
        android:id="@+id/textView2"/>

----

Activity 文件
public class MainActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {
    private String[] strings = {"文本1", "文本2", "文本3", "文本4",};     数据源
    private TextView textView;
    private Spinner spinner;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        textView = (TextView) findViewById(R.id.textView);
        spinner = (Spinner) findViewById(R.id.spinner);     1控件

        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, strings);     2数组适配器
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);     设置下拉样式
        spinner.setAdapter(arrayAdapter);     3将控件与适配器绑定

        SimpleAdapter simpleAdapter = new SimpleAdapter(this, getdata(), R.layout.item, new String[]{"image", "text"}, new int[]{R.id.imageView, R.id.textView2});     2简单适配器
        simpleAdapter.setDropDownViewResource(R.layout.item);     设置下拉样式
        spinner.setAdapter(simpleAdapter);     3将控件与适配器绑定

        spinner.setOnItemSelectedListener(this);     监听器
    }

    private List<Map<String, Object>> getdata() {     数据源
        List<Map<String, Object>> data = new ArrayList<>();
        for (String string : strings) {
            Map<String, Object> map = new HashMap<>();
            map.put("image", R.mipmap.ic_launcher);
            map.put("text", string);
            data.add(map);
        }
        return data;
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        textView.setText(position + "\n" + ((TextView) view.findViewById(R.id.textView2)).getText().toString());
    }                                     ↳ 显示索引位置并且获得点击条目中的控件

    @Override
    public void onNothingSelected(AdapterView<?> parent) {
    }
}

-------------------------------------------------------

ProgressBar
布局文件
main_activity.xml
⇳
<ProgressBar
        android:progressDrawable="@drawable/progressbar"     覆盖系统自带的样式（可选）
        android:secondaryProgress="60"     第二进度条
        android:progress="30"     第一进度条
        android:max="100"     最大进度条
        android:indeterminate="false"     设置为精确进度
        style="?android:attr/progressBarStyleHorizontal"     设置为水平进度条
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/progressBar"/>
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="增加"
        android:id="@+id/increase"/>
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="减少"
        android:id="@+id/decrease"/>
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="重置"
        android:id="@+id/reset"/>
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="对话框形式"
        android:id="@+id/dialog"/>
<TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="New Text"
        android:id="@+id/textView"/>
progressbar.xml     自定义进度条样式
⇳
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:id="@android:id/background">     最大进度条
        <shape>
            <solid android:color="#ff9d9e9d"/>     填充色
        </shape>
    </item>
    <item android:id="@android:id/secondaryProgress">     第二进度条
        <clip>
            <shape>
                <solid android:color="#008a9f"/>
            </shape>
        </clip>
    </item>
    <item android:id="@android:id/progress">     第一进度条
        <clip>
            <shape>
                <solid android:color="#00ddff"/>
            </shape>
        </clip>
    </item>
</layer-list>

----

Activity 文件
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private ProgressBar progressBar;
    private Button btn_increase;
    private Button btn_decrease;
    private Button btn_reset;
    private Button btn_dialog;
    private TextView textView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        progressBar = (ProgressBar) findViewById(R.id.progressBar);
        btn_increase = (Button) findViewById(R.id.increase);
        btn_decrease = (Button) findViewById(R.id.decrease);
        btn_reset = (Button) findViewById(R.id.reset);
        btn_dialog = (Button) findViewById(R.id.dialog);
        textView = (TextView) findViewById(R.id.textView);

        btn_increase.setOnClickListener(this);
        btn_decrease.setOnClickListener(this);
        btn_reset.setOnClickListener(this);
        btn_dialog.setOnClickListener(this);
        textView.setText("第一进度条：" + progressBar.getProgress() + "%第二进度条：" + progressBar.getSecondaryProgress() + "%最大进度条：" + progressBar.getMax());
    }                                                                           ↳ 获取进度

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.increase:
                progressBar.incrementProgressBy(10);     改变进度
                progressBar.incrementSecondaryProgressBy(10);
                break;
            case R.id.decrease:
                progressBar.incrementProgressBy(-10);     改变进度
                progressBar.incrementSecondaryProgressBy(-10);
                break;
            case R.id.reset:
                progressBar.setProgress(30);     设置进度
                progressBar.setSecondaryProgress(60);
                break;
            case R.id.dialog:
                ProgressDialog progressDialog = new ProgressDialog(this);     实例化对话框
                progressDialog.setTitle("对话框标题");
                progressDialog.setMessage("对话框信息");
                progressDialog.setIcon(R.mipmap.ic_launcher);     对话框图标

                progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);     设置为水平进度条
                progressDialog.setIndeterminate(false);     设置为精确进度
                progressDialog.setMax(100);     设置最大进度
                progressDialog.incrementProgressBy(30);     改变进度

                progressDialog.setButton(DialogInterface.BUTTON_POSITIVE, "确定", new DialogInterface.OnClickListener() {     确定按钮
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Toast.makeText(MainActivity.this, "已确定", Toast.LENGTH_SHORT).show();
                    }
                });
                progressDialog.setButton(DialogInterface.BUTTON_NEGATIVE, "取消", new DialogInterface.OnClickListener() {     取消按钮
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Toast.makeText(MainActivity.this, "已取消", Toast.LENGTH_SHORT).show();
                    }
                });
                progressDialog.setCancelable(false);     不可以通过返回按钮退出对话框
                progressDialog.show();     显示对话框
                break;
        }
        textView.setText("第一进度条：" + progressBar.getProgress() + "%第二进度条：" + progressBar.getSecondaryProgress() + "%最大进度条：" + progressBar.getMax());
    }
}

-------------------------------------------------------

WebView
布局文件
main_activity.xml
<WebView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/webView"/>
配置文件
AndroidManifest.xml
<uses-permission android:name="android.permission.INTERNET"/>     网络访问权限

----

Activity 文件
public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        webView = (WebView) findViewById(R.id.webView);

        webView.loadUrl("https://www.bing.com/");     加载 Web 页面
        webView.loadUrl("file:///android_asset/example.html");     加载本地页面
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {     不使用外部游览器打开页面
                view.loadUrl(url);
                return true;
            }
        });
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {     弹出 ProgressDialog 显示页面加载进度
                if (newProgress == 100) {
                    if (progressDialog != null && progressDialog.isShowing()) {
                        progressDialog.dismiss();     关闭对话框
                        progressDialog = null;
                    }
                } else {
                    if (progressDialog == null) {
                        progressDialog = new ProgressDialog(MainActivity.this);
                        progressDialog.setTitle("正在加载");
                        progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
                        progressDialog.setProgress(newProgress);
                        progressDialog.show();     显示对话框
                    } else {
                        progressDialog.setProgress(newProgress);
                    }
                }
            }
        });
        WebSettings settings = webView.getSettings();     获得 WebSettings 对象
        settings.setJavaScriptEnabled(true);     启用 JavaScript
        settings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);     优先使用缓存
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {     判断是否为返回键
            if (webView.canGoBack()) {
                webView.goBack();     返回上一页面
                return true;     消耗掉事件
            } else {
                finish();     结束当前 Activity
            }
        }
        return super.onKeyDown(keyCode, event);
    }
}

-------------------------------------------------------

ViewFlipper
布局文件
main_activity.xml
<ViewFlipper
        android:id="@+id/viewFlipper"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
</ViewFlipper>

----

Activity 文件
public class MainActivity extends Activity implements View.OnTouchListener {
    private ViewFlipper viewFlipper;
    private float startX;     起始X轴坐标

    @Override
    protected void onCreate(@Nullable final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        viewFlipper = (ViewFlipper) findViewById(R.id.viewFlipper);
        viewFlipper.addView(getImageView(R.mipmap.ic_launcher));     动态导入页面
        viewFlipper.addView(getImageView(R.mipmap.ic_launcher));
        viewFlipper.addView(getImageView(R.mipmap.ic_launcher));

        viewFlipper.setInAnimation(this, R.anim.left_in);     设置进入动画
        viewFlipper.setOutAnimation(this, R.anim.left_out);     设置退出动画
        viewFlipper.setFlipInterval(2000);     设置切换页面的间隔为 2s
        viewFlipper.startFlipping();     第一种：页面轮播

        viewFlipper.setOnTouchListener(this);     第二种：手势切换（设置监听器）
    }

    private ImageView getImageView(int resID) {     获得 ImageView
        ImageView imageView = new ImageView(this);
        imageView.setImageResource(resID);     内容图片
        imageView.setBackgroundResource(resID);     背景图片
        return imageView;
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:     1手指按下
                startX = event.getX();     获得起始X轴坐标
                break;
            case MotionEvent.ACTION_MOVE:     2手指滑动
                break;
            case MotionEvent.ACTION_UP:     3手指离开
                if (event.getX() - startX > 100) {     向右滑动看前一页面
                    viewFlipper.setInAnimation(MainActivity.this, R.anim.left_in);
                    viewFlipper.setOutAnimation(MainActivity.this, R.anim.left_out);
                    viewFlipper.showPrevious();     显示前一页
                }
                if (startX - event.getX() > 100) {     向左滑动看后一页
                    viewFlipper.setInAnimation(MainActivity.this, R.anim.right_in);
                    viewFlipper.setOutAnimation(MainActivity.this, R.anim.right_out);
                    viewFlipper.showNext();     显示后一页
                }
                break;
        }
        return true;     消耗掉事件
    }
}

-------------------------------------------------------

ScrollView
布局文件
main_activity.xml
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Up"
        android:id="@+id/button"/>
<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Down"
        android:id="@+id/button2"/>
<ScrollView
        android:scrollbars="none"     不显示滚动条
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/scrollView">
    <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:id="@+id/textView"/>
</ScrollView>

----

Activity 文件
public class MainActivity extends Activity implements View.OnTouchListener, View.OnClickListener {
    private ScrollView scrollView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        TextView textView = (TextView) findViewById(R.id.textView);
        textView.setText(getResources().getString(R.string.text));     获得 strings.xml 里的资源 text

        scrollView = (ScrollView) findViewById(R.id.scrollView);
        Button up = (Button) findViewById(R.id.button);
        Button down = (Button) findViewById(R.id.button2);

        scrollView.setOnTouchListener(this);     监听器
        up.setOnClickListener(this);     监听器
        down.setOnClickListener(this);     监听器

        scrollView.setHorizontalScrollBarEnabled(false);     不显示横向滚动条
        scrollView.setVerticalScrollBarEnabled(false);     不显示纵向滚动条
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:     1手指按下
                break;
            case MotionEvent.ACTION_MOVE:     2手指移动
                break;
            case MotionEvent.ACTION_UP:     3手指离开
                if (scrollView.getScrollY() == 0) {     滚动距离为 0 时
                    Log.i("Tag", "在顶部");
                }
                if (scrollView.getScrollY() + scrollView.getHeight() == scrollView.getChildAt(0).getHeight()) {     滚动距离+父容器高度(屏幕高度)=子控件高度 时
                    Log.i("Tag", "在底部");
                    ((TextView) this.findViewById(R.id.textView)).append(getResources().getString(R.string.string));     追加文本
                }
                break;
        }
        return false;     不消耗事件，让 TextView 得以滚动
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button:
                scrollView.scrollBy(0, -30);     向上滚动 30
                break;
            case R.id.button2:
                scrollView.scrollBy(0, 30);     向下滚动 30
                break;
        }
    }
}

-------------------------------------------------------

Gallery + ImageSwitcher
布局文件
main_activity.xml
<Gallery
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/gallery"/>
<ImageSwitcher
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/imageSwitcher"/>

----

Activity 文件
public class MainActivity extends Activity implements AdapterView.OnItemSelectedListener, ViewSwitcher.ViewFactory {
    private int[] res = {R.mipmap.ic_launcher, R.mipmap.ic_launcher, R.mipmap.ic_launcher};     数据源
    private ImageSwitcher imageSwitcher;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        Gallery gallery = (Gallery) findViewById(R.id.gallery);     1控件
        MyBaseAdapter myBaseAdapter = new MyBaseAdapter(this, res);     2自定义适配器（上下文对象，数据源）
        gallery.setAdapter(myBaseAdapter);     3将控件与适配器绑定

        gallery.setOnItemSelectedListener(this);     加载监听器

        imageSwitcher = (ImageSwitcher) findViewById(R.id.imageSwitcher);
        imageSwitcher.setFactory(this);     加载 ViewFactory，实现 makeView() 方法
        imageSwitcher.setInAnimation(AnimationUtils.loadAnimation(this, android.R.anim.fade_in));     设置进入动画
        imageSwitcher.setOutAnimation(AnimationUtils.loadAnimation(this, android.R.anim.fade_out));     设置退出动画
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        imageSwitcher.setBackgroundResource(res[position]);     设置背景图片
//        imageSwitcher.setBackgroundResource(res[position % res.length]);     循环页面
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {
    }

    @Override
    public View makeView() {     创建 View
        ImageView imageView = new ImageView(this);
        imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);     设置图片缩放模式为等比例缩放并居中
        return imageView;
    }
}
----
public class MyBaseAdapter extends BaseAdapter {     自定义适配器
    private Context context;     上下文对象
    private int[] res;     数据源

    public MyBaseAdapter(Context context, int[] res) {     构造方法
        this.context = context;
        this.res = res;
    }

    @Override
    public int getCount() {     获得页面数量
        return res.length;
//        return Integer.MAX_VALUE;     循环页面
    }

    @Override
    public Object getItem(int position) {     获得数据对象
        return res[position];
    }

    @Override
    public long getItemId(int position) {     获得数据ID
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {     获得页面
        ImageView imageView = new ImageView(context);
        imageView.setBackgroundResource(res[position]);     设置背景图片
//        imageView.setBackgroundResource(res[position % res.length]);     循环页面
        imageView.setLayoutParams(new ViewGroup.LayoutParams(400, 300));     设置控件宽高
        imageView.setScaleType(ImageView.ScaleType.FIT_XY);     设置图片缩放模式为铺满控件
        return imageView;
    }
}

-------------------------------------------------------

SeekBar
布局文件
main_activity.xml
⇳
<SeekBar
        android:progressDrawable="@drawable/progressbar"     覆盖系统自带的样式（可选）
        android:thumb="@drawable/seekbar_thumb"     覆盖系统自带的样式（可选）
        android:progress="50"     第一进度条
        android:max="100"     最大进度条
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/seekBar"/>
seekbar_thumb.xml     自定义拖动按钮样式
⇳
<selector xmlns:android="http://schemas.android.com/apk/res/android">     选择器
    <item android:state_pressed="true" android:state_window_focused="true" android:drawable="@mipmap/ic_launcher"/>     按下
    <item android:state_focused="true" android:state_window_focused="true" android:drawable="@mipmap/ic_launcher"/>     焦点
    <item android:state_selected="true" android:state_window_focused="true" android:drawable="@mipmap/ic_launcher"/>     选中
    <item android:drawable="@mipmap/ic_launcher"/>     默认
</selector>

----

Activity 文件
public class MainActivity extends Activity implements SeekBar.OnSeekBarChangeListener {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        SeekBar seekBar = (SeekBar) findViewById(R.id.seekBar);
        seekBar.setOnSeekBarChangeListener(this);     设置监听器
    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        Log.i("Tag", "2正在拖动:" + String.valueOf(progress));
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
        Log.i("Tag", "1开始拖动");
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        Log.i("Tag", "3停止拖动");
    }
}
```

---

```java
android:visibility="visible"     可见
button.setVisibility(View.VISIBLE);
----
android:visibility="invisible"     隐形（不可见，占据空间）
button.setVisibility(View.INVISIBLE);
----
android:visibility="gone"     隐藏（不可见，释放空间）
button.setVisibility(View.GONE);

-------------------------------------------------------

include     导入布局
----
<include layout="@layout/common_title"/>     导入的布局

merge     忽略顶节点，直接导入子控件
----
<merge xmlns:android="http://schemas.android.com/apk/res/android"     忽略
       android:orientation="vertical"     忽略
       android:layout_width="match_parent"     忽略
       android:layout_height="match_parent">     忽略
    <ProgressBar
            android:layout_centerInParent="true"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
    <TextView
            android:text="请稍后"
            android:layout_centerInParent="true"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
</merge>

ViewStub     导入布局（惰性加载）
----
<ViewStub
        android:layout="@layout/common_title"     导入的布局
        android:layout_height="wrap_content"
        android:layout_width="wrap_content"
        android:id="@+id/viewStub"/>
----
viewStub.setOnInflateListener()     设置加载时的监听器（可选）
View view = viewStub.inflate();     开始加载并接收实例化的布局 View

-------------------------------------------------------

RadioButton 做出 TAB 效果
布局文件
<RadioButton
        android:checked="true"     默认选中
        android:drawableTop="@mipmap/ic_launcher"     放置图片
        android:background="@drawable/button"     背景样式
        android:button="@null"     无按钮样式
        android:gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="TAB"
        android:id="@+id/radioButton"/>
背景样式 (button.xml)
<selector xmlns:android="http://schemas.android.com/apk/res/android">     选择器
    <item android:drawable="@color/gray" android:state_checked="true"/>
    <item android:drawable="@color/white"/>
</selector>
```

---

[Maven0](https://mvnrepository.com/),
[Maven1](https://repo1.maven.org/maven2/),
[Maven2](https://repo.maven.apache.org/maven2/),
[JCenter](https://jcenter.bintray.com/),
[Mirror](http://maven.aliyun.com/),
[Build](https://jcenter.bintray.com/com/android/tools/build/gradle/)

Cache：
[![](/uploads/file-into-picture2.png)](http://ww1.sinaimg.cn/large/a038ef72gw1f5lcbds6wvj203k03k1lf "Part1")
[![](/uploads/file-into-picture2.png)](http://ww3.sinaimg.cn/large/a038ef72gw1f5lcbrppq1j203k03ku19 "Part2")
Android USB Driver：
[![](/uploads/file-into-picture2.png)](http://ww4.sinaimg.cn/large/a15b4afegw1f5l3t68pezj203k03k4qw)
