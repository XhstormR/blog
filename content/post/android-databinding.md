+++
Categories = ["Android"]
date = "2016-11-26T23:15:56+08:00"
title = "Data Binding Framework"

+++

<!--more-->

Updated on 2016-12-03

> {{< image "/uploads/android-databinding.svg" "Data Binding" "1" "1" >}}
>
> Model（数据），View（界面），Controller（业务逻辑）
>
> MVC（Model - View - Controller）
>
> MVP（Model - View - Presenter）
>
> MVVM（Model - View - ViewModel）
>
> Model（数据），View（界面），ViewModel（双向绑定）
>
> https://developer.android.com/topic/libraries/data-binding/index.html

## 双向绑定
* View Listeners：将 View 响应事件产生的数据设置到 Model 中。
  * 将 View 的事件映射到 Model 可以承载的数据格式。
* Data Bindings：在 Model 发生变化时通知 View 作出响应。
  * 将 Model 的数据映射到 View 的界面上。

## 启用 Data Binding
```java
build.gradle
⇳
android {
    dataBinding {
        enabled = true
    }
}
```

## Binding Data
```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ActivityMainBinding activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
    User user = new User("A", 25);     Data Objects                         ↳ activity_main.xml ➜ ActivityMainBinding.java
    activityMainBinding.setUser(user);     Binding Data Objects
}
```

```xml
<layout xmlns:android="http://schemas.android.com/apk/res/android">     <layout> 节点

    <data>     <data> 节点（相当于 ViewModel，是 Model 和 View 之间的桥梁）
        <import type="com.example.myapp.myapplication.User"/>
        <variable
                name="user"     user 初始为 null，所以各属性为各自的初始值，以防止因 NullPointerException 而 Crash
                type="User"/>
    </data>

    <LinearLayout     <ViewGroup> 节点
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"
            android:padding="16dp">
        <TextView
                android:text='@{""+user.name}'     @{表达式}
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/textView1"/>
        <TextView
                android:text="@{``+user.age,default=35}"     设计阶段预览值（,default=35）
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/textView2"/>
    </LinearLayout>

</layout>
```

## Data Objects（Data Bindings）
### 可观测对象
```java
public class User extends BaseObservable {     继承已实现 Observable 接口的 BaseObservable
    private String name;
    private int age;

    public User(String name, int age) {     构造函数
        this.name = name;
        this.age = age;
    }

    @Bindable     绑定数据（生成 BR.name）
    public String getName() {
        return name;
    }

    @Bindable     绑定数据（生成 BR.age）
    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
        notifyPropertyChanged(BR.name);     通知数据改变
    }

    public void setAge(int age) {
        this.age = age;
        notifyPropertyChanged(BR.age);     通知数据改变
    }
}

-------------------------------------------------------

user.setName("B");
String s = user.getName();
```

```xml
<data>
    <import type="com.example.myapp.myapplication.User"/>
    <variable
            name="user"
            type="User"/>
</data>

----

android:text='@{""+user.name}'
android:text='@{""+user.age}'
```

### 可观测字段
```java
public class User {
    public final ObservableField<String> name = new ObservableField<>();     ObservableField（可观测对象）
    public final ObservableInt age = new ObservableInt();     ObservableInt（可观测对象）

    public User(String name, int age) {     构造函数
        this.name.set(name);
        this.age.set(age);
    }
}

-------------------------------------------------------

user.name.set("B");
String s = user.name.get();
```

```xml
<data>
    <import type="com.example.myapp.myapplication.User"/>
    <variable
            name="user"
            type="User"/>
</data>

----

android:text='@{""+user.name}'
android:text='@{""+user.age}'
```

### 可观测集合
#### ObservableArrayMap
索引为对象

```java
ObservableArrayMap<String, Object> user = new ObservableArrayMap<>();
user.put("name", "A");
user.put("age", 25);

-------------------------------------------------------

user.put("name", "B");
Object o = user.get("name");
```

```xml
<data>
    <import type="android.databinding.ObservableMap"/>
    <variable
            name="user"
            type="ObservableMap"/>
</data>

----

android:text='@{""+user["name"]}'
android:text='@{""+user["age"]}'
```

#### ObservableArrayList
索引为整数

```java
ObservableArrayList<Object> user = new ObservableArrayList<>();
user.add("A");
user.add(25);

-------------------------------------------------------

user.set(0, "B");
Object o = user.get(0);
```

```xml
<data>
    <import type="android.databinding.ObservableList"/>
    <variable
            name="user"
            type="ObservableList"/>
</data>

----

android:text='@{""+user[0]}'
android:text='@{""+user[1]}'
```

## Event Handling（View Listeners）
### Method References
数据绑定时就评估表达式，方法签名需相同。
```java
public class A {
    public void a(View view) {     对应接口 OnClickListener 中的 onClick 方法
        Log.w("Tag", "单击_" + view.getResources().getResourceEntryName(view.getId()));
    }

    public boolean b(View view) {     对应接口 OnLongClickListener 中的 onLongClick 方法
        Log.w("Tag", "长按_" + view.getResources().getResourceEntryName(view.getId()));
        return true;
    }

    public void c(CharSequence s, int i1, int i2, int i3) {     对应接口 TextWatcher 中的 onTextChanged 方法
        Log.w("Tag", s.toString());
    }
}
```

```xml
<data>
    <import type="com.example.myapp.myapplication.A"/>
    <variable
            name="a"
            type="A"/>
</data>

----

<EditText
        android:onClick="@{a.a}"     传入对应方法即可，也可表达为 "@{a::a}"
        android:onLongClick="@{a.b}"
        android:onTextChanged="@{a.c}"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/editText"/>
```

### Listener Bindings
事件发生时才评估表达式，只需返回值相同。
```java
public class A {
    public void a(User user) {     onClick 返回 void
        Log.w("Tag", String.format("单击_%s_%s", user.name.get(), user.age.get()));
    }

    public boolean b() {     onLongClick 返回 boolean
        Log.w("Tag", "长按");
        return true;
    }

    public void c(User user, CharSequence s) {     onTextChanged 返回 void
        Log.w("Tag", String.format("%s_%s_%s", s, user.name.get(), user.age.get()));
    }
}
```

```xml
<data>
    <import type="com.example.myapp.myapplication.A"/>
    <import type="com.example.myapp.myapplication.User"/>
    <variable
            name="a"
            type="A"/>
    <variable
            name="user"
            type="User"/>
</data>

----

<EditText     Listener Bindings 本质是回调方法，使用 Lambda 表达式传递参数，若无需自动生成的监听器提供的参数，则可省略参数列表
        android:onClick="@{()->a.a(user)}"
        android:onLongClick="@{()->a.b()}"
        android:onTextChanged="@{(s,i1,i2,i3)->a.c(user,s)}"     未省略参数列表
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/editText"/>
```

### @={}
仅支持 text、checked、year、mouth、hour、rating、progress 等属性。
```xml
<data>
    <variable
            name="s"
            type="String"/>     lang 包下的类自动导入
    <variable
            name="b"
            type="Boolean"/>     lang 包下的类自动导入
</data>

----

<TextView
        android:text="@{s}"     自动同步
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
<TextView
        android:text="@{``+b}"     自动同步
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
<EditText
        android:text="@={s}"     自动更新
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
<CheckBox
        android:checked="@={b}"     自动更新
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

### OnPropertyChangedCallback
```java
Observable.OnPropertyChangedCallback propertyChangedCallback = new Observable.OnPropertyChangedCallback() {     抽象类
    @Override
    public void onPropertyChanged(Observable sender, int propertyId) {     属性改变时调用
        Log.w("Tag", propertyId + "_" + sender.toString());
    }
};

user.name.addOnPropertyChangedCallback(propertyChangedCallback);     添加回调
user.name.removeOnPropertyChangedCallback(propertyChangedCallback);     移除回调
```

## 注解
### BindingAdapter
将 XML 中定义的属性值与对应的实现方法绑定在一起。

#### 绑定自定义属性
**添加** 新的 XML 属性及其实现。

```java
@BindingAdapter("abc")     注解（该方法与自定义属性 app:abc 关联）
public static void a(TextView view, int height) {     为控件设置高度（该方法可以写在任意位置）
    ViewGroup.LayoutParams layoutParams = view.getLayoutParams();
    layoutParams.height = height;
    view.setLayoutParams(layoutParams);
}

-------------------------------------------------------

@BindingAdapter("abc")
public static void a(TextView view, int oldHeight, int newHeight) {     另外也可获取旧值（View，oldValue，newValue）（oldValue 最初为对应初始值，以防止 NullPointerException）
    Log.w("Tag", String.format("旧值:%d,新值:%d", oldHeight, newHeight));
}
```

```xml
<data>
    <variable
            name="height"
            type="Integer"/>     lang 包下的类自动导入
</data>

----

<TextView
        app:abc="@{height}"     使用自定义属性，传入 int，控件高度
        android:text='@{``+user.name}'
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/textView1"/>
```

#### 绑定系统属性
对原有 XML 属性进行 **重写**。

```java
@BindingAdapter("android:src")     注解（该方法与系统属性 android:src 关联）
public static void b(ImageView view, String url) {     为 ImageView 加载图片（该方法可以写在任意位置）
    Single
            .just(url)
            .map(s -> {
                Bitmap bitmap = null;
                try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new URL(s).openStream())) {
                    bitmap = BitmapFactory.decodeStream(bufferedInputStream);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return bitmap;
            })
            .observeOn(AndroidSchedulers.mainThread())
            .subscribeOn(Schedulers.io())
            .subscribe(view::setImageBitmap);
}
```

```xml
<data>
    <variable
            name="url"
            type="String"/>     lang 包下的类自动导入
</data>

----

<ImageView
        android:src="@{url}"     @{} 表达式中传入 String
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
<ImageView
        android:src="@mipmap/ic_launcher"     普通表达式不受影响
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

#### 组合
```java
注解（同时关联自定义属性 i1，i2，false 表示控件使用二者其一便可匹配该方法，缺失的属性用其初始值替代，默认为 true）
例：
若控件只使用了 i1，则 pic 为 0；
若控件只使用了 i2，则 url 为 null。

@BindingAdapter(value = {"i1", "i2"}, requireAll = false)
public static void a(ImageView view, String url, int pic) {     图片加载完成之前显示占位图（该方法可以写在任意位置）
    Single
            .just(url)
            .map(s -> {
                Bitmap bitmap = null;
                try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new URL(url).openStream())) {
                    bitmap = BitmapFactory.decodeStream(bufferedInputStream);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return bitmap;
            })
            .doOnSubscribe(() -> view.setImageResource(pic))     设置 resId 占位图（可在非 UI 线程）
            .observeOn(AndroidSchedulers.mainThread())     切换至 UI 线程 (2)
            .subscribeOn(Schedulers.io())     指定最开始在IO线程中运行 (1)
            .subscribe(view::setImageBitmap);     设置 Bitmap（必须在 UI 线程）
}
```

```xml
<data>
    <import type="com.example.myapp.myapplication.R"/>     导入资源类 R
    <variable
            name="url"
            type="String"/>
</data>

----

<ImageView
        app:i1="@{url}"     使用自定义属性，传入 String，图片链接
        app:i2="@{R.mipmap.ic_launcher}"     使用自定义属性，传入 int，占位图
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

### BindingConversion
```java
@BindingConversion
public static ColorDrawable a(int color) {     接收 int，转换为 ColorDrawable 对象（该方法可以写在任意位置）
    Log.w("Tag", String.format("方法被调用，color = %d", color));
    return new ColorDrawable(color);
}
```

```xml
<EditText
        android:background="@{@color/colorAccent}"     @{} 表达式中传入 int，background 属性接收 ColorDrawable 对象
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
<EditText
        android:background="@color/colorAccent"     普通表达式不受影响
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
```

## Code

```java
使用静态方法
-------------------------------------------------------
public class A {
    public static String a(String s) {
        return "你好:" + s;
    }
}
```

```xml
<data>
    <import type="com.example.myapp.myapplication.A"/>
    <import type="com.example.myapp.myapplication.User"/>
    <variable
            name="user"
            type="User"/>
</data>

----

android:text="@{A.a(user.name)}"
```

```xml
自定义 Binding 类名及生成位置
（默认为 activity_main.xml ➜ com.example.myapp.myapplication.databinding.ActivityMainBinding.java）
-------------------------------------------------------
<data class="ABC">     com.example.myapp.myapplication.databinding.ABC
    ...
</data>

<data class=".ABC">     com.example.myapp.myapplication.ABC
    ...
</data>

<data class="com.example.ABC">     com.example.ABC
    ...
</data>
```

```java
运算符
（只有 this，super，new，<>泛型不支持）
-------------------------------------------------------
android:text='@{user.name ?? "无名氏"}'     "A" ?? "B"     选取第一个非空值作为结果
等同于
android:text='@{user.name != null ? user.name : "无名氏"}'     "A" != null ? "A" : "B"

android:text="@{``+user.age}"     "``"
等同于
android:text='@{""+user.age}'     '""'
```

```xml
使用 ID
-------------------------------------------------------

<TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
<EditText
        android:onTextChanged="@{(s,i1,i2,i3)->textView.setText(s)}"     textView 同步显示输入
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

-------------------------------------------------------

<data>
    <variable
            name="b"
            type="Boolean"/>     Boolean 初始值为 false
</data>

----

<TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
<EditText
        android:id="@+id/editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
<Button
        android:enabled="@{b}"     自动同步
        android:onClick="@{()->textView.setText(editText.getText())}"     使用 ID，直接在布局中处理逻辑
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="New Button"/>
<CheckBox
        android:checked="@={b}"     自动更新（勾选启用按钮）
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

-------------------------------------------------------

<data>
    <import type="android.view.View"/>
</data>

----

<CheckBox
        android:id="@+id/checkBox"     勾选显示图片并启用按钮
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
<ImageView
        android:visibility="@{checkBox.checked?View.VISIBLE:View.GONE}"     显示或隐藏（隐式自动更新）
        android:src="@mipmap/ic_launcher"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
<Button
        android:enabled="@{checkBox.checked}"     启用或禁用（隐式自动更新）
        android:text="New Button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
```