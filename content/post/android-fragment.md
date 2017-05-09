---
Categories:
- Android
date: 2016-08-12T14:47:11+08:00
title: Android Fragment
---

<!--more-->

Updated on 2016-08-14

> {{< image "/uploads/android-fragment.svg" "Fragment 生命周期方法" "1" "1" >}}

## FragmentManager
* `findFragmentById()` ⟺ `findFragmentByTag()`：获得 Fragment 对象。
* `addOnBackStackChangedListener()`：添加监听回退栈变化的监听器。
* `popBackStack()`：弹出回退栈，模拟用户按下返回按钮。

## FragmentTransaction
* `add()` ⟺ `remove()`：`onAttach()-onResume()` ⟺ `onPause()-onDetach()`
* `attach()` ⟺ `detach()`：`onCreateView()-onResume()` ⟺ `onPause()-onDestroyView()`
* `show()` ⟺ `hide()`：不执行生命周期中的方法，仅仅是显示或隐藏。
* `replace()`：销毁容器中所有的 Fragment，再添加一个指定的 Fragment。

---

## 创建 Fragment
### Fragment.java
```java
public class Fragment extends android.app.Fragment {     继承 Fragment

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        Log.i("Tag", "Fragment ---> 3onCreateView");
        View view = inflater.inflate(R.layout.fragment, container, false);     Layout ➜ View（布局文件，所在父容器，是否添加父容器）

        TextView textView = (TextView) view.findViewById(R.id.textView);
        textView.setText("我是Fragment");

        return view;     可返回 null，即不显示 UI
    }

    @Override
    public void onAttach(Activity activity) {
        Log.i("Tag", "Fragment ---> 1onAttach");
        super.onAttach(activity);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        Log.i("Tag", "Fragment ---> 2onCreate");
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        Log.i("Tag", "Fragment ---> 4onActivityCreated");
        super.onActivityCreated(savedInstanceState);
    }

    @Override
    public void onStart() {
        Log.i("Tag", "Fragment ---> 5onStart");
        super.onStart();
    }

    @Override
    public void onResume() {
        Log.i("Tag", "Fragment ---> 6onResume");
        super.onResume();
    }

    @Override
    public void onPause() {
        Log.i("Tag", "Fragment ---> 7onPause");
        super.onPause();
    }

    @Override
    public void onStop() {
        Log.i("Tag", "Fragment ---> 8onStop");
        super.onStop();
    }

    @Override
    public void onDestroyView() {
        Log.i("Tag", "Fragment ---> 9onDestroyView");
        super.onDestroyView();
    }

    @Override
    public void onDestroy() {
        Log.i("Tag", "Fragment ---> 10onDestroy");
        super.onDestroy();
    }

    @Override
    public void onDetach() {
        Log.i("Tag", "Fragment ---> 11onDetach");
        super.onDetach();
    }
}
```

### fragment.xml
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="New Text"
            android:id="@+id/textView"/>
</LinearLayout>
```

## 加载 Fragment
### 静态加载
```xml
main_activity.xml
⇳
<fragment
        android:name="com.example.system.myapplication.Fragment"     加载的 Fragment 类
        android:id="@+id/MyFragment"     标识 Fragment
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
```

### 动态加载
```java
main_activity.xml
⇳
<LinearLayout     容器
        android:id="@+id/container"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
</LinearLayout>

MainActivity.java
⇳
FragmentManager fragmentManager = getFragmentManager();     获得 FragmentManager 对象
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();     开启事务
fragmentTransaction.add(R.id.container, new Fragment(), "MyFragment");     加载 Fragment（放置容器，加载的 Fragment 类，标识 Fragment）
fragmentTransaction.addToBackStack(null);     添加事务至回退栈
fragmentTransaction.commit();     提交事务
```

## Fragment 通信
### 传入
```java
不存在
----
MainActivity.java
⇳
Fragment fragment = new Fragment();     Fragment
Bundle bundle = new Bundle();     数据包
bundle.putString("data", "数据传入");     导入数据
fragment.setArguments(bundle);     导入数据包
FragmentManager fragmentManager = getFragmentManager();     获得 FragmentManager 对象
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();     开启事务
fragmentTransaction.add(R.id.container, fragment, "MyFragment");     加载 Fragment
fragmentTransaction.addToBackStack(null);     添加事务至回退栈
fragmentTransaction.commit();     提交事务

Fragment.java
⇳
Bundle bundle = getArguments();     获取数据包
String string = bundle.getString("data");     获取数据

已存在
----
接口 (MyListener.java)
interface MyListener {
    void setText(String string);
}

MainActivity.java
⇳
Fragment fragmentById = fragmentManager.findFragmentById(R.id.MyFragment);     通过 ID 获得 Fragment 对象
((MyFragment) fragmentById).setText("数据传入");     调用接口方法
Fragment fragmentByTag = fragmentManager.findFragmentByTag("MyFragment");     通过 Tag 获得 Fragment 对象
((MyFragment) fragmentByTag).setText("数据传入");     调用接口方法

MyFragment.java     implements MyListener
⇳
@Override
public void setText(String string) {     实现接口方法
    Toast.makeText(getActivity(), string, Toast.LENGTH_SHORT).show();
}                                    ↳ 获得宿主 Activity 对象
```

### 传出
```java
接口 (MyListener.java)
interface MyListener {
    void setText(String string);
}

MainActivity.java     implements MyListener
⇳
@Override
public void setText(String string) {     实现接口方法
    Toast.makeText(this, string, Toast.LENGTH_SHORT).show();
}

Fragment.java
⇳
((MyListener) getActivity()).setText("数据传出");     调用接口方法
                          ↳ 获得宿主 Activity 对象
```