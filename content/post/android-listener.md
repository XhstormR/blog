---
Categories:
- Android
date: 2016-07-12T11:25:48+08:00
title: 实现 Android 监听事件
---

<!--more-->

Updated on 2016-07-12

> 实现 Android 监听事件的写法主要有5种：匿名内部类、内部类、外部类、接口、XML绑定。

## 匿名内部类
```java
Button button1 = (Button) findViewById(R.id.but1);     //向下类型转换
button1.setOnClickListener(new View.OnClickListener() {     //直接 new 接口
    @Override     //实现接口方法
    public void onClick(View view) {
        System.out.println("按钮1");
    }
});
```

## 内部类
```java
public class FirstActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);

        Button button1 = (Button) findViewById(R.id.but1);
        Button button2 = (Button) findViewById(R.id.but2);
        button1.setOnClickListener(A);     //使用内部类对象
        button2.setOnClickListener(A);     //使用内部类对象
    }

    private View.OnClickListener A = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Log.i("Tag", "有按钮被点击");
            switch (v.getId()) {
                case R.id.but1:
                    Toast.makeText(FirstActivity.this, "按钮1", Toast.LENGTH_SHORT).show();
                    break;
                case R.id.but2:
                    Toast.makeText(FirstActivity.this, "按钮2", Toast.LENGTH_SHORT).show();
                    break;
            }
        }
    };
}
```

## 外部类
```java
Button button1 = (Button) findViewById(R.id.but1);
Button button2 = (Button) findViewById(R.id.but2);
button1.setOnClickListener(new A() {     //新建外部类对象
    @Override
    public void onClick(View v) {
        super.onClick(v);
        System.out.println("按钮1");
    }
});
button2.setOnClickListener(new A() {
    @Override     //子类重写父类的方法
    public void onClick(View v) {
        super.onClick(v);     //同时调用父类的方法
        System.out.println("按钮2");
    }
});

----

public class A implements View.OnClickListener {
    @Override     //父类实现接口的方法
    public void onClick(View v) {
        System.out.println("有按钮被点击");
    }
}
```

## 接口
```java
public class FirstActivity extends AppCompatActivity implements View.OnClickListener {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);

        Button button1 = (Button) findViewById(R.id.but1);
        Button button2 = (Button) findViewById(R.id.but2);
        button1.setOnClickListener(this);     //自己实现了接口
        button2.setOnClickListener(this);     //自己实现了接口
    }

    @Override     实现接口方法
    public void onClick(View v) {
        Log.i("Tag", "有按钮被点击");
        switch (v.getId()) {
            case R.id.but1:
                Toast.makeText(this, "按钮1", Toast.LENGTH_SHORT).show();
                break;
            case R.id.but2:
                Toast.makeText(this, "按钮2", Toast.LENGTH_SHORT).show();
                break;
        }
    }
}
```

## XML绑定
```java
布局文件
<Button
        android:onClick="a"     //重点就是 onClick 属性
        android:id="@+id/but1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="按钮1"
        android:textSize="30sp"/>

----

Activity 文件
public class FirstActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_layout);     //引入布局文件
    }

    public void a(View view) {     //对应实现布局文件中 ID 为 but1 的按钮点击事件
        Log.i("Tag", "有按钮被点击");     //在控制台输出信息
        Toast.makeText(this, "按钮1", Toast.LENGTH_SHORT).show();     //在APP中显示信息
    }
}
```