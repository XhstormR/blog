---
Categories:
- Android
date: 2016-08-31T11:27:51+08:00
title: Android BaseAdapter
---

<!--more-->

Updated on 2016-08-31

> {{< image "/uploads/android-baseadapter.svg" "Adapter" "1" "1" >}}
>
> 数据适配器把复杂的数据绑定至指定控件，是数据源和控件之间的桥梁。

## MainActivity.java
```java
public class MainActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        List<ItemBean> data = new ArrayList<>();     数据源
        for (int i = 0; i < 20; i++) {
            data.add(new ItemBean(R.mipmap.ic_launcher, "标题" + i, "内容" + i));
        }

        ListView listView = (ListView) findViewById(R.id.listView);     1控件
        MyBaseAdapter myBaseAdapter = new MyBaseAdapter(this, data);     2自定义适配器（上下文对象，数据源）
        listView.setAdapter(myBaseAdapter);     3将控件与适配器绑定
    }
}
```

## ItemBean.java
```java
public class ItemBean {     封装 item 数据，一个 ItemBean 对应一个页面
    public int itemImage;     图片
    public String itemTitle;     标题
    public String itemContent;     内容

    public ItemBean(int itemImage, String itemTitle, String itemContent) {     构造方法
        this.itemImage = itemImage;
        this.itemTitle = itemTitle;
        this.itemContent = itemContent;
    }
}
```

## MyBaseAdapter.java
```java
public class MyBaseAdapter extends BaseAdapter {     自定义适配器
    private List<ItemBean> list;     数据源
    private LayoutInflater inflater;     布局装载器（Layout ➜ View）

    public MyBaseAdapter(Context context, List<ItemBean> list) {     构造方法
        this.list = list;
        this.inflater = LayoutInflater.from(context);
    }

    @Override
    public int getCount() {     获得页面数量
        return list.size();
    }

    @Override
    public Object getItem(int position) {     获得数据对象
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {     获得数据ID
        return position;
    }

    @Override                                                缓存页面
    public View getView(int position, View convertView, ViewGroup parent) {     获得页面
        ItemBean bean = list.get(position);     数据对象
        View view = inflater.inflate(R.layout.item, null);     Layout ➜ View

        TextView title = (TextView) view.findViewById(R.id.title);
        TextView content = (TextView) view.findViewById(R.id.content);
        ImageView image = (ImageView) view.findViewById(R.id.imageView);

        title.setText(bean.itemTitle);
        content.setText(bean.itemContent);
        image.setImageResource(bean.itemImage);

        return view;     第一种毫无优化，每次都自己创建新的 View 并查找控件

        -------------------------------------------------------

        ItemBean bean = list.get(position);     数据对象
        if (convertView == null) {     判断页面是否被缓存
            convertView = inflater.inflate(R.layout.item, null);     Layout ➜ View
        }

        TextView title = (TextView) convertView.findViewById(R.id.title);
        TextView content = (TextView) convertView.findViewById(R.id.content);
        ImageView image = (ImageView) convertView.findViewById(R.id.imageView);

        title.setText(bean.itemTitle);
        content.setText(bean.itemContent);
        image.setImageResource(bean.itemImage);

        return convertView;     第二种使用了缓存页面，但依然需要查找控件

        -------------------------------------------------------

        ItemBean bean = list.get(position);     数据对象
        ViewHolder viewHolder;     声明 ViewHolder
        if (convertView == null) {     判断页面是否被缓存
            convertView = inflater.inflate(R.layout.item, null);     Layout ➜ View
            viewHolder = new ViewHolder();     实例化 ViewHolder

            viewHolder.title = (TextView) convertView.findViewById(R.id.title);     保存至 ViewHolder
            viewHolder.content = (TextView) convertView.findViewById(R.id.content);     保存至 ViewHolder
            viewHolder.imageView = (ImageView) convertView.findViewById(R.id.imageView);     保存至 ViewHolder

            convertView.setTag(viewHolder);     绑定 ViewHolder
        } else {
            viewHolder = (ViewHolder) convertView.getTag();     取出 ViewHolder
        }

        viewHolder.title.setText(bean.itemTitle);
        viewHolder.content.setText(bean.itemContent);
        viewHolder.imageView.setImageResource(bean.itemImage);

        return convertView;     第三种使用了缓存页面并通过 ViewHolder 缓存页面布局
    }

    private static class ViewHolder {     定义静态内部类 ViewHolder 保存页面布局
        private ImageView imageView;     保存的控件
        private TextView title;     保存的控件
        private TextView content;     保存的控件
    }
}
```

---

## main_activity.xml
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
    <ListView
            android:scrollbars="vertical"     显示垂直滚动条
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:id="@+id/listView"/>
</LinearLayout>
```

## item.xml
```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                android:layout_width="match_parent"
                android:layout_height="wrap_content">
    <ImageView
            android:src="@mipmap/ic_launcher"
            android:layout_width="60dp"
            android:layout_height="60dp"
            android:id="@+id/imageView"/>
    <TextView
            android:layout_toEndOf="@+id/imageView"
            android:text="标题"
            android:textSize="30sp"
            android:gravity="center"
            android:layout_width="match_parent"
            android:layout_height="30dp"
            android:id="@+id/title"/>
    <TextView
            android:layout_below="@+id/title"
            android:layout_toEndOf="@+id/imageView"
            android:text="内容"
            android:textSize="25sp"
            android:gravity="start|center_vertical"
            android:layout_width="match_parent"
            android:layout_height="30dp"
            android:id="@+id/content"/>
</RelativeLayout>
```