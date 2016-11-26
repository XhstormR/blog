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
    User user = new User("A", 25);
    activityMainBinding.setUser(user);
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