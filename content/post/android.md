+++
Categories = ["Android"]
date = "2016-07-04T19:30:21+08:00"
title = "自学 Android"

+++

<!--more-->

Updated on 2016-07-05

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

Cache：![](/uploads/android-cache.png)

## USB 调试
* 手机开启 USB 调试模式
* 电脑安装 Android USB 驱动

```
D:\Download\Java\android-sdk-windows\platform-tools\adb.exe devices -l
List of devices attached
0123456789ABCDEF       device product:2013023 model:2013023 device:HM2013023

D:\Download\Java\android-sdk-windows\platform-tools\adb.exe shell
shell@HM2013023:/ $ su
root@HM2013023:/ # ls
```

## Android 规范
* Android 组件：所有组件都需要在 `AndroidManifest.xml` 中进行注册。
  * 活动（Activity）：一种包含用户界面的组件，主要用于和用户进行交互。
  * 服务（Service）：用于实现程序后台运行的组件，不需要和用户交互。
  * 广播接收器（Broadcast Receiver）：用于接收和发送广播的组件。
  * 内容提供器（Content Provider）：用于实现不同应用程序之间共享数据的组件。
* 控件属性
  * orientation（方向）：`horizontal`（水平） | `vertical`（垂直）
  * wrap_content：包裹内容。
  * match_parent：铺满容器。
  * sp：Scale-independent Pixels，文字尺寸一律使用 `sp` 单位。
  * dp：Density-independent Pixels，非文字尺寸一律使用 `dp` 单位。
* 实现监听事件的写法：●匿名内部类●外部类●接口

## SVG

![](/uploads/android-architecture.svg "Android 架构")

![](/uploads/android-textview.svg "TextView")

![](/uploads/android-edittext.svg "EditText")

![](/uploads/android-imageview.svg "ImageView")

![](/uploads/android-button.svg "Button")

![](/uploads/android-imagebutton.svg "ImageButton")

## Code
```java
匿名内部类实现监听事件
Button button1 = (Button) findViewById(R.id.but1);
button1.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        System.out.println("123");
    }
});
```

---

Cache：
[![](/uploads/file-into-picture2.png)](http://ww1.sinaimg.cn/large/a038ef72gw1f5lcbds6wvj203k03k1lf "Part1")
[![](/uploads/file-into-picture2.png)](http://ww3.sinaimg.cn/large/a038ef72gw1f5lcbrppq1j203k03ku19 "Part2")
Android USB Driver：
[![](/uploads/file-into-picture2.png)](http://ww4.sinaimg.cn/large/a15b4afegw1f5l3t68pezj203k03k4qw)

[Android Design](/uploads/android-design.png "Android Design")
