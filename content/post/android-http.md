+++
Categories = ["Android"]
date = "2016-10-31T08:00:57+08:00"
title = "Android HTTP (待)"

+++

<!--more-->

Updated on 2016-11-01

>

## 加载网页和图片
### MainActivity.java
```java
public class MainActivity extends Activity {
    private WebView mWebView;
    private ImageView mImageView;
    private Handler mHandler = new Handler(new Handler.Callback() {     传入回调接口，避免内存泄漏
        @Override
        public boolean handleMessage(Message msg) {     处理 Message（主线程 Looper）
            switch (msg.what) {
                case 1:
                    WebSettings settings = mWebView.getSettings();     获得 WebSettings 对象
                    settings.setUserAgentString("Nexus");     设置 User Agent
                    settings.setJavaScriptEnabled(true);     启用 JavaScript
                    mWebView.loadDataWithBaseURL(null, msg.obj.toString(), "text/html;charset=utf-8", null, null);     加载网页
                    break;
                case 2:
                    mImageView.setScaleType(ImageView.ScaleType.FIT_XY);     设置图片缩放模式为铺满控件
                    mImageView.setImageBitmap(((Bitmap) msg.obj));     加载图片
                    break;
            }
            return true;
        }
    });

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.webView);
        mImageView = (ImageView) findViewById(R.id.imageView);

        new MyThread("http://blog.xhstormr.tk/", "http://blog.xhstormr.tk/uploads/children-of-the-sun1.jpg", mHandler).start();     启动线程
    }

    private static class MyThread extends Thread {
        private String mURL;
        private String mImage;
        private Handler mHandler;

        private MyThread(String URL, String image, Handler handler) {
            mURL = URL;
            mImage = image;
            mHandler = handler;
        }

        @Override
        public void run() {
            new Thread() {
                @Override
                public void run() {
                    try {     下载网页
                        StringBuilder stringBuilder = new StringBuilder();
                        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new URL(mURL).openStream(), "utf-8"));
                        for (String s; (s = bufferedReader.readLine()) != null; ) {
                            stringBuilder.append(s);
                        }
                        bufferedReader.close();

                        mHandler.obtainMessage(1, stringBuilder.toString()).sendToTarget();     发送 Message（网页源代码）
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }.start();     在新线程中执行，避免阻塞

            try {     下载图片
                BufferedInputStream bufferedInputStream = new BufferedInputStream(new URL(mImage).openStream());
                Bitmap bitmap = BitmapFactory.decodeStream(bufferedInputStream);
                bufferedInputStream.close();

                mHandler.obtainMessage(2, bitmap).sendToTarget();     发送 Message（Bitmap）
            } catch (IOException e) {
                e.printStackTrace();
            }
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
        android:background="@color/colorPrimary"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    <WebView
            android:layout_weight="1"     高度各占50%
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:id="@+id/webView"/>
    <ImageView
            android:layout_weight="1"     高度各占50%
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:id="@+id/imageView"/>
</LinearLayout>
```