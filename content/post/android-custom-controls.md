---
Categories:
- Android
date: 2016-07-13T16:48:22+08:00
title: 自定义 Android 控件
---

<!--more-->

Updated on 2016-07-13

> 通过自定义 Android 控件实现多个文本跑马灯效果。

## 单个跑马灯
```xml
布局文件
<TextView
        android:id="@+id/textView1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Long Text,Long Text,Long Text."
        android:textSize="30sp"

        android:singleLine="true"     强制为单行
        android:ellipsize="marquee"     文字溢出效果为跑马灯（需要在选中状态）
        android:focusable="true"     可以设为选中状态
        android:focusableInTouchMode="true"     在触摸模式下可以设为选中状态
        />
```

## 多个跑马灯
```java
布局文件
<com.example.system.myapplication.MyTextView     使用自定义控件的类
        android:id="@+id/textView1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Long Text,Long Text,Long Text."
        android:textSize="30sp"

        android:singleLine="true"     强制为单行
        android:ellipsize="marquee"     文字溢出效果为跑马灯（需要在选中状态）
        />

<com.example.system.myapplication.MyTextView
        android:id="@+id/textView2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Long Text,Long Text,Long Text."
        android:textSize="30sp"

        android:singleLine="true"
        android:ellipsize="marquee"
        />

----

自定义控件的类 - MyTextView
public class MyTextView extends TextView {     继承于 TextView 并重写它的 isFocused() 方法
    public MyTextView(Context context) {
        super(context);
    }

    public MyTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public MyTextView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override     重写判断是否为焦点的方法
    public boolean isFocused() {
        return true;     始终返回 true，代表一直有焦点
    }
}
```