---
Categories:
- Android
date: 2016-09-28T15:18:02+08:00
title: Android 异步加载
---

<!--more-->

Updated on 2016-09-28

> AsyncTask 异步访问网络
>
> LruCache 内存缓存图片
>
> ListView 加载图片（滚动状态，静止状态）
>
> BaseAdapter 缓存页面（convertView，ViewHolder）

## MainActivity.java
```java
public class MainActivity extends Activity {
    private ListView mListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mListView = (ListView) findViewById(R.id.list_item);

        new NewsAsyncTask().execute("http://www.imooc.com/api/teacher?type=4&num=30");     开始异步任务
    }
                                                                           输入参数，执行进度，返回结果
    private class NewsAsyncTask extends AsyncTask<String, Void, List<CourseBean>> {
        @Override
        protected List<CourseBean> doInBackground(String... params) {     获得 ListView 的 Item 列表
            List<CourseBean> courseBeanList = new ArrayList<>();

            try {
                StringBuilder stringBuilder = new StringBuilder();     下载 JSON
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new URL(params[0]).openStream(), "utf-8"));
                for (String s; (s = bufferedReader.readLine()) != null; ) {
                    stringBuilder.append(s);
                }
                bufferedReader.close();

                JSONObject jsonObject = new JSONObject(stringBuilder.toString());     解析 JSON
                JSONArray jsonArray = jsonObject.getJSONArray("data");
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject dataJsonObject = jsonArray.getJSONObject(i);
                    courseBeanList.add(new CourseBean(dataJsonObject.getString("picSmall"), dataJsonObject.getString("name"), dataJsonObject.getString("description")));
                }
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }

            return courseBeanList;     返回结果给 onPostExecute
        }

        @Override
        protected void onPostExecute(List<CourseBean> courseBeanList) {     返回结果
            super.onPostExecute(courseBeanList);
            ListAdapter listAdapter = new ListAdapter(MainActivity.this, courseBeanList, mListView);     自定义适配器
            mListView.setAdapter(listAdapter);     将控件与适配器绑定
        }
    }
}
```

## CourseBean.java
```java
public class CourseBean {
    private String ImageURL;
    private String Title;
    private String Content;

    public CourseBean(String imageURL, String title, String content) {
        ImageURL = imageURL;
        Title = title;
        Content = content;
    }

    @Override
    public String toString() {
        return "CourseBean{" +
                "ImageURL='" + ImageURL + '\'' +
                ", Title='" + Title + '\'' +
                ", Content='" + Content + '\'' +
                '}';
    }

    public String getImageURL() {
        return ImageURL;
    }

    public void setImageURL(String imageURL) {
        ImageURL = imageURL;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }
}
```

## ListAdapter.java
```java
public class ListAdapter extends BaseAdapter implements AbsListView.OnScrollListener {
    public static String[] URLs;
    private List<CourseBean> mList;
    private LayoutInflater mInflater;
    private ImageLoader mImageLoader;
    private int mStart, mEnd;
    private boolean mFirstIn;

    public ListAdapter(Context context, List<CourseBean> courseBeanList, ListView listView) {
        mFirstIn = true;
        mList = courseBeanList;
        mInflater = LayoutInflater.from(context);
        mImageLoader = new ImageLoader(listView);

        URLs = new String[mList.size()];
        for (int i = 0; i < mList.size(); i++) {
            URLs[i] = mList.get(i).getImageURL();
        }

        listView.setOnScrollListener(this);     为 ListView 设置监听器
    }

    @Override
    public int getCount() {
        return mList.size();
    }

    @Override
    public Object getItem(int position) {
        return mList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        CourseBean courseBean = mList.get(position);
        ViewHolder viewHolder;
        if (convertView == null) {
            convertView = mInflater.inflate(R.layout.item_layout, null);
            viewHolder = new ViewHolder((TextView) convertView.findViewById(R.id.title), (TextView) convertView.findViewById(R.id.content), (ImageView) convertView.findViewById(R.id.image));
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }
        viewHolder.title.setText(courseBean.getTitle());
        viewHolder.content.setText(courseBean.getContent());

        viewHolder.image.setTag(courseBean.getImageURL());     设置 ImageView 的身份标记
        mImageLoader.showImage(viewHolder.image, courseBean.getImageURL());     滚动时加载可见项图片

        return convertView;
    }

    @Override
    public void onScrollStateChanged(AbsListView view, int scrollState) {
        if (scrollState == SCROLL_STATE_IDLE) {
            mImageLoader.loadImage(mStart, mEnd);     静止时加载可见项图片
        } else {
            mImageLoader.cancelAllTask();     滚动时停止任务（停止更新 UI 视图中的图片，减少重绘，使滚动流畅）
        }
    }

    @Override
    public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {
        mStart = firstVisibleItem;
        mEnd = firstVisibleItem + visibleItemCount;
        if (mFirstIn && visibleItemCount > 0) {     第一次显示时调用
            mFirstIn = false;
            mImageLoader.loadImage(mStart, mEnd);
        }
    }

    private class ViewHolder {
        private TextView title;
        private TextView content;
        private ImageView image;

        private ViewHolder(TextView title, TextView content, ImageView image) {
            this.title = title;
            this.content = content;
            this.image = image;
        }
    }
}
```

## ImageLoader.java
```java
public class ImageLoader {
    private ListView mListView;
    private Set<AsyncTask> mTask;     任务列表
    private LruCache<String, Bitmap> mCache;     内存缓存

    public ImageLoader(ListView listView) {
        mListView = listView;
        mTask = new HashSet<>();

        int cacheSize = ((int) Runtime.getRuntime().maxMemory()) / 4;
        mCache = new LruCache<String, Bitmap>(cacheSize) {     实例化缓存
            @Override
            protected int sizeOf(String key, Bitmap value) {     获取每次存入的缓存大小
                return value.getByteCount();
            }
        };
    }

    public void showImage(ImageView imageView, String imageURL) {     滚动时加载可见项图片
        Bitmap bitmap = mCache.get(imageURL);     从缓存中获取
        if (bitmap == null) {
            imageView.setImageResource(R.mipmap.ic_launcher);     加载默认图片
        } else {
            imageView.setImageBitmap(bitmap);     加载缓存图片
        }
    }

    public void loadImage(int start, int end) {     静止时加载可见项图片
        for (int i = start; i < end; i++) {
            String imageURL = ListAdapter.URLs[i];
            Bitmap bitmap = mCache.get(imageURL);     从缓存中获取
            if (bitmap == null) {
                mTask.add(new DownloadImage().execute(imageURL));     加载网络图片并加入任务列表
            } else {
                ImageView imageView = (ImageView) mListView.findViewWithTag(imageURL);
                imageView.setImageBitmap(bitmap);     加载缓存图片
            }
        }
    }

    public void cancelAllTask() {
        for (AsyncTask task : mTask) {
            task.cancel(false);     Cancel 状态下 doInBackground 结束后不会调用 onPostExecute，而会调用 onCancelled
        }                         ↳ false 代表不调用 Thread.interrupt()
    }

    private class DownloadImage extends AsyncTask<String, Void, Bitmap> {
        private String imageURL;

        @Override
        protected Bitmap doInBackground(String... params) {     下载图片
            imageURL = params[0];
            Bitmap bitmap = null;
            try {
                BufferedInputStream bufferedInputStream = new BufferedInputStream(new URL(imageURL).openStream());
                bitmap = BitmapFactory.decodeStream(bufferedInputStream);     解析为 Bitmap
                bufferedInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            if (mCache.get(imageURL) == null) {
                mCache.put(imageURL, bitmap);     将图片添加至缓存
            }
            return bitmap;
        }

        @Override
        protected void onPostExecute(Bitmap bitmap) {
            super.onPostExecute(bitmap);
            ImageView imageView = (ImageView) mListView.findViewWithTag(imageURL);
            imageView.setImageBitmap(bitmap);
            mTask.remove(this);     任务完成（已缓存图片），移出任务列表
        }

        @Override
        protected void onCancelled(Bitmap bitmap) {     滚动时不更新 UI 视图中的图片，减少重绘，使滚动流畅
            super.onCancelled(bitmap);
            mTask.remove(this);     任务完成（已缓存图片），移出任务列表
        }
    }
}
```

## activity_main.xml
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
    <ListView
            android:id="@+id/list_item"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
    </ListView>
</LinearLayout>
```

## item_layout.xml
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="horizontal"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:padding="4dp">

    <ImageView
            android:id="@+id/image"
            android:src="@mipmap/ic_launcher"
            android:layout_width="64dp"
            android:layout_height="64dp"/>

    <LinearLayout
            android:paddingStart="4dp"
            android:paddingEnd="0dp"
            android:orientation="vertical"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
        <TextView
                android:gravity="center_vertical"
                android:id="@+id/title"
                android:maxLines="1"
                android:text="New Text"
                android:textSize="15sp"
                android:layout_weight="1"
                android:layout_width="match_parent"
                android:layout_height="0dp"/>
        <TextView
                android:gravity="center_vertical"
                android:id="@+id/content"
                android:maxLines="3"
                android:text="New Text"
                android:textSize="12sp"
                android:layout_weight="1"
                android:layout_width="match_parent"
                android:layout_height="0dp"/>
    </LinearLayout>

</LinearLayout>
```
