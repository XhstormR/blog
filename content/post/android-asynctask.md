---
Categories:
- Android
date: 2016-09-02T09:10:56+08:00
title: Android AsyncTask
---

<!--more-->

Updated on 2016-09-02

> {{< image "/uploads/android-asynctask.svg" "AsyncTask" "1" "1" >}}
>
> 由于 Android 是单线程模型，只有主线程能够操作 UI，所以要避免在主线程中执行耗时操作，而是应该放到子线程中执行，以防止出现 ANR（Application Not Responding）对话框。

## MainActivity1.java
```java
public class MainActivity1 extends Activity {
    private ProgressBar progressBar;
    private MyAsyncTask myAsyncTask;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity1);

        progressBar = (ProgressBar) findViewById(R.id.progressBar);

        myAsyncTask = new MyAsyncTask();
        myAsyncTask.execute();     执行任务
    }

    @Override
    protected void onDestroy() {     与 Activity 生命周期进行绑定
        super.onDestroy();
        if (myAsyncTask != null && myAsyncTask.getStatus() == AsyncTask.Status.RUNNING) {
            myAsyncTask.cancel(true);     标记为关闭状态
        }
    }
                                                                         输入参数，执行进度，返回结果
    private class MyAsyncTask extends AsyncTask<Void, Integer, Void> {     内部类
        @Override
        protected Void doInBackground(Void... params) {     输入参数，开始耗时操作
            Log.i("Tag", "2doInBackground");
            for (int i = 0; i < 100; i++) {     模拟进度条加载
                if (isCancelled()) {     是否为关闭状态
                    return;     尽快结束任务
                }
                publishProgress(i);     更新执行进度
                try {
                    Thread.sleep(200);     等待 0.2 秒
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            return null;     返回结果给 onPostExecute
        }

        @Override
        protected void onPreExecute() {     执行前的准备工作
            Log.i("Tag", "1onPreExecute");
            super.onPreExecute();
        }

        @Override
        protected void onPostExecute(Void aVoid) {     返回结果
            Log.i("Tag", "3onPostExecute");
            super.onPostExecute(aVoid);
        }

        @Override
        protected void onProgressUpdate(Integer... values) {     执行进度
            Log.i("Tag", "onProgressUpdate");
            super.onProgressUpdate(values);
            if (isCancelled()) {     是否为关闭状态
                return;     尽快结束任务
            }
            progressBar.setProgress(values[0]);     设置进度条进度
        }
    }
}
```

---

## MainActivity2.java
```java
public class MainActivity2 extends Activity {
    private ImageView imageView;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity2);

        imageView = (ImageView) findViewById(R.id.imageView);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);

        String url = "http://blog.xhstormr.tk/uploads/children-of-the-sun1.jpg";     图片地址
        new MyAsyncTask().execute(url);     输入参数，执行任务
    }
                                                                         输入参数，执行进度，返回结果
    private class MyAsyncTask extends AsyncTask<String, Void, Bitmap> {     内部类
        @Override
        protected Bitmap doInBackground(String... params) {     输入参数，开始耗时操作 ( URL ➜ 图片)
            String url = params[0];
            Bitmap bitmap = null;
            try {     开始访问网络
                URLConnection connection = new URL(url).openConnection();     获得网络连接对象
                InputStream inputStream = connection.getInputStream();     获得输入流
                BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);     包装为带缓冲区的输入流
                bitmap = BitmapFactory.decodeStream(bufferedInputStream);     将输入流解析为 Bitmap
                inputStream.close();     关闭输入流
                bufferedInputStream.close();     关闭输入流
            } catch (IOException e) {
                e.printStackTrace();
            }
            return bitmap;     返回结果给 onPostExecute
        }

        @Override
        protected void onPreExecute() {     执行前的准备工作
            super.onPreExecute();
            progressBar.setVisibility(View.VISIBLE);     显示圆形进度条
        }

        @Override
        protected void onPostExecute(Bitmap bitmap) {     返回结果
            super.onPostExecute(bitmap);
            progressBar.setVisibility(View.GONE);     隐藏圆形进度条
            imageView.setImageBitmap(bitmap);     加载图片
        }

        @Override
        protected void onProgressUpdate(Void... values) {     执行进度
            super.onProgressUpdate(values);
        }
    }
}
```