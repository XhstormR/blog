---
Categories:
- Android
date: 2016-11-19T14:12:15+08:00
title: RxBinding
---

<!--more-->

Updated on 2016-11-19

> https://github.com/JakeWharton/RxBinding

## Button
```java
ActivityMainBinding activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
Button button = activityMainBinding.button;
-------------------------------------------------------

RxView
        .clicks(button)     绑定单击事件
        .throttleFirst(1, TimeUnit.SECONDS)     防止多次点击（1 秒内只发送第一个点击事件）
        .subscribe(aVoid -> Log.w("Tag", "单击"));

or

RxView
        .clicks(button)     绑定单击事件
        .doOnNext(aVoid -> {
            button.setEnabled(false);     禁用按钮
            Log.w("Tag", "单击");
        })
        .delay(1, TimeUnit.SECONDS)     延迟 1 秒（等待时默认会切换至计算线程）
        .observeOn(AndroidSchedulers.mainThread())     切回至主线程
        .doOnNext(aVoid -> button.setEnabled(true))     启用按钮
        .subscribe();

-------------------------------------------------------

RxView
        .longClicks(button)     绑定长按事件
        .subscribe(aVoid -> Log.w("Tag", "长按"));
```

## CheckBox
```java
ActivityMainBinding activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
Button button = activityMainBinding.button;
CheckBox checkBox = activityMainBinding.checkBox;
-------------------------------------------------------

RxCompoundButton
        .checkedChanges(checkBox)
        .subscribe(aBoolean -> button.setEnabled(aBoolean));     选中才启用按钮
```

## ListView
```java
ActivityMainBinding activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
Character[] res = new Character[20];     数据源
for (int i = 0, j = 65; i < res.length; i++) {
    res[i] = ((char) j++);
}
ListView listView = activityMainBinding.listView;     1控件
ArrayAdapter<Character> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, res);     2数组适配器
listView.setAdapter(adapter);     3将控件与适配器绑定
-------------------------------------------------------

RxAdapterView
        .itemClicks(listView)     绑定单击事件
        .subscribe(integer -> Log.w("Tag", "单击:" + integer));

-------------------------------------------------------

RxAdapterView
        .itemLongClicks(listView)     绑定长按事件
        .subscribe(integer -> Log.w("Tag", "长按:" + integer));

-------------------------------------------------------

RxAbsListView
        .scrollEvents(listView)     绑定滚动事件
        .subscribe(absListViewScrollEvent -> {
            switch (absListViewScrollEvent.scrollState()) {
                case SCROLL_STATE_TOUCH_SCROLL:
                    Log.w("Tag", "1正在滚动(手指未离开)");
                    break;
                case SCROLL_STATE_FLING:
                    Log.w("Tag", "2正在滑动(手指已离开)");
                    break;
                case SCROLL_STATE_IDLE:
                    Log.w("Tag", "3停止滚动");
                    break;
            }
            if (absListViewScrollEvent.firstVisibleItem() == 0) {
                Log.w("Tag", "在顶部");
            }
            if (absListViewScrollEvent.firstVisibleItem() + absListViewScrollEvent.visibleItemCount() == absListViewScrollEvent.totalItemCount()) {
                Log.w("Tag", "在底部");
            }
        });
```