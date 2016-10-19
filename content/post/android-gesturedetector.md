+++
Categories = ["Android"]
date = "2016-10-18T19:21:52+08:00"
title = "Android 手势识别"

+++

<!--more-->

Updated on 2016-10-18

>

## GestureDetector
### MainActivity.java
```java
public class MainActivity extends Activity {
    private ImageView mImageView;
    private GestureDetector mGestureDetector;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mImageView = (ImageView) findViewById(R.id.imageView);
        mGestureDetector = new GestureDetector(MainActivity.this, new MyGestureListener());

        mImageView.setLongClickable(true);     设置可以长按
        mImageView.setOnTouchListener(new View.OnTouchListener() {     设置监听器
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                mGestureDetector.onTouchEvent(event);     转发 MotionEvent 给 GestureDetector
                return true;     消耗掉事件（不继续传递）
            }
        });
    }

    private class MyGestureListener extends GestureDetector.SimpleOnGestureListener {
        @Override
        public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {     e1 起始，e2 结束
            if (e1.getX() - e2.getX() > 50) {
                Log.w("Tag", "向左滑动");
            }
            if (e2.getX() - e1.getX() > 50) {
                Log.w("Tag", "向右滑动");
            }
            return super.onFling(e1, e2, velocityX, velocityY);
        }

        @Override
        public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {     e1 起始，e2 结束
            Log.w("Tag", "onScroll");
            return super.onScroll(e1, e2, distanceX, distanceY);
        }

        @Override
        public boolean onDown(MotionEvent e) {     按下
            Log.w("Tag", "onDown");
            return super.onDown(e);
        }

        @Override
        public boolean onSingleTapUp(MotionEvent e) {     单击抬起
            Log.w("Tag", "onSingleTapUp");
            return super.onSingleTapUp(e);
        }

        @Override
        public boolean onSingleTapConfirmed(MotionEvent e) {     单击（确认不是双击）
            Log.w("Tag", "onSingleTapConfirmed");
            return super.onSingleTapConfirmed(e);
        }

        @Override
        public boolean onDoubleTap(MotionEvent e) {     双击
            Log.w("Tag", "onDoubleTap");
            return super.onDoubleTap(e);
        }

        @Override
        public boolean onDoubleTapEvent(MotionEvent e) {     双击事件（按下，移动，抬起）
            Log.w("Tag", "onDoubleTapEvent");
            return super.onDoubleTapEvent(e);
        }

        @Override
        public void onShowPress(MotionEvent e) {     短按
            Log.w("Tag", "onShowPress");
            super.onShowPress(e);
        }

        @Override
        public void onLongPress(MotionEvent e) {     长按
            Log.w("Tag", "onLongPress");
            super.onLongPress(e);
        }

        @Override
        public boolean onContextClick(MotionEvent e) {     点击 Context
            Log.w("Tag", "onContextClick");
            return super.onContextClick(e);
        }
    }
}
```

### activity_main.xml
```xml
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:padding="16dp"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    <ImageView
            android:background="#3F51B5"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:id="@+id/imageView"/>
</LinearLayout>
```

## GestureOverlayView
* 生成手势文件并放入项目：
  1. [samples-23_r02.zip](http://mirrors.neusoft.edu.cn/android/repository/samples-23_r02.zip)\android-6.0\legacy\GestureBuilder
  2. /mnt/sdcard/gestures ➜ res\raw\gestures

### MainActivity.java
```java
public class MainActivity extends Activity implements GestureOverlayView.OnGesturePerformedListener {
    private GestureOverlayView mGestureOverlayView;
    private GestureLibrary mGestureLibrary;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mGestureLibrary = GestureLibraries.fromRawResource(MainActivity.this, R.raw.gestures);     手势库（res\raw\gestures）
        mGestureLibrary.load();     加载手势

        mGestureOverlayView = (GestureOverlayView) findViewById(R.id.gestureOverlayView);
        mGestureOverlayView.addOnGesturePerformedListener(this);     设置监听器
    }

    @Override
    public void onGesturePerformed(GestureOverlayView overlay, Gesture gesture) {
        Prediction prediction = mGestureLibrary.recognize(gesture).get(0);     用手势库匹配该 gesture
        if (prediction.score >= 2.0) {     匹配度
            switch (prediction.name) {
                case "1":
                    Log.w("Tag", "1");
                    break;
                case "2":
                    Log.w("Tag", "2");
                    break;
                case "3":
                    Log.w("Tag", "3");
                    break;
                case "你":
                    Log.w("Tag", "你");
                    break;
                case "好":
                    Log.w("Tag", "好");
                    break;
            }
        } else {
            Log.w("Tag", "没有该手势");
        }
    }
}
```

### activity_main.xml
```xml
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:padding="16dp"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <android.gesture.GestureOverlayView
            android:fadeEnabled="true"     启用淡出效果
            android:fadeDuration="1000"     淡出时间
            android:gestureColor="#ff0000"     笔画颜色
            android:gestureStrokeWidth="30"     笔画粗细
            android:gestureStrokeType="multiple"     设置为多笔画
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:id="@+id/gestureOverlayView">
        <ImageView     包裹控件
                android:background="#3F51B5"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:id="@+id/imageView"/>
    </android.gesture.GestureOverlayView>

</LinearLayout>
```
