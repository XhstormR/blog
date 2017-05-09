---
Categories:
- Android
date: 2016-08-16T14:10:08+08:00
title: Android ViewPager
---

<!--more-->

Updated on 2016-08-20

> ViewPager 通常与 Fragment 搭配使用以实现页面导航。

## Activity
```java
public class MainActivity extends FragmentActivity implements ViewPager.OnPageChangeListener {
                                                               ↳ 继承 v4 的 FragmentActivity
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        List<View> viewList = new ArrayList<>();     页面数据源
        View view1 = View.inflate(this, R.layout.view1, null);     Layout ➜ View（上下文对象，布局文件，添加父容器）
        View view2 = View.inflate(this, R.layout.view2, null);
        View view3 = View.inflate(this, R.layout.view3, null);
        View view4 = View.inflate(this, R.layout.view4, null);
        viewList.add(view1);
        viewList.add(view2);
        viewList.add(view3);
        viewList.add(view4);

        List<android.support.v4.app.Fragment> fragmentList = new ArrayList<>();     页面数据源
        fragmentList.add(new MyFragment1());
        fragmentList.add(new MyFragment2());
        fragmentList.add(new MyFragment3());
        fragmentList.add(new MyFragment4());

        List<String> titleList = new ArrayList<>();     标题数据源
        titleList.add("第一个页面");
        titleList.add("第二个页面");
        titleList.add("第三个页面");
        titleList.add("第四个页面");

        ViewPager viewPager = (ViewPager) findViewById(R.id.viewPager);     1控件

        MyPagerAdapter myPagerAdapter = new MyPagerAdapter(viewList, titleList);     2适配器
        viewPager.setAdapter(myPagerAdapter);     3将控件与适配器绑定

        MyFragmentPagerAdapter myFragmentPagerAdapter = new MyFragmentPagerAdapter(getSupportFragmentManager(), fragmentList, titleList);     2适配器
        viewPager.setAdapter(myFragmentPagerAdapter);     3将控件与适配器绑定                              ↳ 通过 v4 的 FragmentActivity 获得 SupportFragmentManager

        viewPager.addOnPageChangeListener(this);     监听页面滚动

        viewPager.setCurrentItem(0);     页面跳转

        PagerTabStrip tab = (PagerTabStrip) findViewById(R.id.tab);     修改标题栏
        tab.setTextColor(Color.parseColor("#daa520"));     文字颜色
        tab.setBackgroundColor(Color.parseColor("#7fff00"));     背景颜色
        tab.setTabIndicatorColor(Color.parseColor("#b22222"));     标题栏颜色
        tab.setDrawFullUnderline(false);     不显示下划线
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
    }

    @Override
    public void onPageSelected(int position) {     位置从 0 开始
        Toast.makeText(this, "第" + (position + 1) + "页", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onPageScrollStateChanged(int state) {
    }
}
```

## Adapter
### PagerAdapter
```java
public class MyPagerAdapter extends PagerAdapter {     实现适配器
    private List<View> viewList;     页面数据源
    private List<String> titleList;     标题数据源

    public MyPagerAdapter(List<View> viewList, List<String> titleList) {     构造方法
        this.viewList = viewList;
        this.titleList = titleList;
    }

    @Override
    public int getCount() {     获得页面数量
        return viewList.size();
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {     判断对象 Key 是否来自页面
        return view == object;
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {     实例化页面
        container.addView(viewList.get(position));
        return viewList.get(position);     返回判断对象 Key
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {     销毁页面
        container.removeView(viewList.get(position));
    }

    @Override
    public CharSequence getPageTitle(int position) {     获得页面标题
        return titleList.get(position);
    }
}

-------------------------------------------------------
最多同时加载三个页面。
```
#### 数据源：View（Layout）
```xml
view1
----
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
    <TextView
            android:gravity="center"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="第一个页面"
            android:id="@+id/textView"/>
</LinearLayout>
```

### Fragment(State)PagerAdapter
```java
public class MyFragmentPagerAdapter extends FragmentPagerAdapter {     实现适配器
    private List<Fragment> fragmentList;     页面数据源
    private List<String> titleList;     标题数据源

    public MyFragmentPagerAdapter(FragmentManager fm, List<Fragment> fragmentList, List<String> titleList) {     构造方法
        super(fm);
        this.fragmentList = fragmentList;
        this.titleList = titleList;
    }

    @Override
    public int getCount() {     获得页面数量
        return fragmentList.size();
    }

    @Override
    public Fragment getItem(int position) {     获得页面
        return fragmentList.get(position);
    }

    @Override
    public CharSequence getPageTitle(int position) {     获得页面标题
        return titleList.get(position);
    }
}

-------------------------------------------------------
最多同时加载三个页面。

销毁：
FragmentPagerAdapter：执行至 onDestroyView()。
FragmentStatePagerAdapter：执行至 onDetach()，完全销毁。
```
#### 数据源：Fragment
```java
MyFragment1
----
public class MyFragment1 extends android.support.v4.app.Fragment {     继承 v4 的 Fragment

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.view1, container, false);     Layout ➜ View
    }
}
```

## Layout
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">

    <android.support.v4.view.ViewPager
            android:id="@+id/viewPager"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">
        <android.support.v4.view.PagerTabStrip
                android:id="@+id/tab"
                android:layout_gravity="top"     标题位置
                android:layout_width="wrap_content"
                android:layout_height="wrap_content">
        </android.support.v4.view.PagerTabStrip>
    </android.support.v4.view.ViewPager>

</LinearLayout>

-------------------------------------------------------
PagerTabStrip：可点击标题跳转至对应页面。
PagerTitleStrip：不可交互。
```