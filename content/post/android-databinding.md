+++
Categories = ["Android"]
date = "2016-11-26T23:15:56+08:00"
title = "Data Binding"

+++

<!--more-->

Updated on 2016-11-26

> https://developer.android.com/topic/libraries/data-binding/index.html

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
    User user = new User("A", 25);     Data Objects                                ↳ activity_main.xml ➜ ActivityMainBinding.java
    activityMainBinding.setUser(user);     Binding Data Objects
}
```

## Data Objects
### 可观测对象
```java
public class User extends BaseObservable {     继承 BaseObservable
    private String name;
    private int age;

    public User(String name, int age) {     构造函数
        this.name = name;
        this.age = age;
    }

    @Bindable     绑定数据
    public String getName() {
        return name;
    }

    @Bindable     绑定数据
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

## Event Handling
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
        android:onClick="@{a.a}"     传入方法即可
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
android:text='@{user.name ?? "无名氏"}'
等同于
android:text='@{user.name != null ? user.name : "无名氏"}'

android:text="@{``+user.age}"
等同于
android:text='@{""+user.age}'
```