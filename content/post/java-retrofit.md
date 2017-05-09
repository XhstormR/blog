---
Categories:
- JAVA
date: 2016-12-05T16:32:13+08:00
title: Retrofit
---

<!--more-->

Updated on 2016-12-22

> RESTful API
>
> 网络请求框架
>
> Retrofitting OkHttp
>
> 1.Retrofit 封装参数，2.OkHttp 访问网络，3.Retrofit 解析结果
>
> https://github.com/square/retrofit
>
> https://github.com/square/okhttp
>
> https://github.com/square/okio
>
> https://jcenter.bintray.com/com/squareup/retrofit2/

## Introduction
### String
```java
public interface DoubanService {     定义服务接口
    @GET("v2/book/{id}")     @Path：占位符 {id}     （子 URL 不以 / 开头）
    Observable<String> book(@Path("id") int id);
}

----

Retrofit retrofit = new Retrofit.Builder()     ServiceFactory
        .baseUrl("https://api.douban.com/")     （父 URL 以 / 结尾）
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create())     使用 RxJava 回调
        .addConverterFactory(ScalarsConverterFactory.create())     使用 String 格式
        .build();

DoubanService service = retrofit.create(DoubanService.class);     创建服务实例

Observable<String> book = service.book(26840298);     调用服务接口，返回 Observable<String> 对象

book
        .observeOn(AndroidSchedulers.mainThread())
        .subscribeOn(Schedulers.io())
        .subscribe(
                s -> Log.w("Tag", s),
                error -> Log.w("Tag", error),
                () -> Log.w("Tag", "onComplete"));     开始访问 "https://api.douban.com/v2/book/26840298"

-------------------------------------------------------

Call 原生回调：
call.execute();     开始同步请求
call.enqueue(Callback);     开始异步请求

call.cancel();     取消请求

-------------------------------------------------------

@Path     替换请求地址中的变量
@Body     POST 请求中的请求体
@Query     通过注解的名字指明 query 参数的名字
@Header     通过注解的名字指明 header 参数的名字
```

### JSON
```java
public interface DoubanService {     定义服务接口
    @GET("v2/book/{id}")     @Path：占位符 {id}
    Observable<Book> book(@Path("id") int id);   若不需要定制 JSON 对象，可直接换为 Observable<JsonObject>
}

----

Retrofit retrofit = new Retrofit.Builder()     ServiceFactory
        .baseUrl("https://api.douban.com/")
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create())     使用 RxJava 回调
        .addConverterFactory(GsonConverterFactory.create())     使用 JSON 格式（若要添加多个返回格式，converter 添加顺序：JSON 需在最后）
        .build();

DoubanService service = retrofit.create(DoubanService.class);     创建服务实例

Observable<Book> book = service.book(26840298);     调用服务接口，返回 Observable<Book> 对象

book
        .observeOn(AndroidSchedulers.mainThread())
        .subscribeOn(Schedulers.io())
        .subscribe(
                b -> Log.w("Tag", b.toString()),
                error -> Log.w("Tag", error),
                () -> Log.w("Tag", "onComplete"));     开始访问 "https://api.douban.com/v2/book/26840298"

----

public class Book {     定义 JSON 对象
    public String title;
    public String subtitle;
    public String[] author;
    public String pages;
    public String price;
    public String image;

    @Override
    public String toString() {
        return "Book{" +
                "title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", author=" + Arrays.toString(author) +
                ", pages='" + pages + '\'' +
                ", price='" + price + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
```

## Interceptor
```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()     自定义 OkHttpClient（OkHttpClient 在整个 App 中应为单例）
        .addInterceptor(new Interceptor() {     添加拦截器
            @Override
            public Response intercept(Chain chain) throws IOException {
                Log.w("Tag", chain.request().url().toString());     打印请求网址
                return chain.proceed(chain.request());     继续执行
            }
        })
        .build();

Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("https://api.douban.com/")
        .client(okHttpClient)     指定 OkHttpClient
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
        .addConverterFactory(ScalarsConverterFactory.create())
        .build();
```

## Code
```java
public interface APIService {
    @GET("get")
    Observable<JsonObject> get(@Query("name") String s);

    @GET("get")
    Observable<JsonObject> get2(@Query("name") List<String> list);

    @GET("headers")
    Observable<JsonObject> headers(@Header("User-Agent") String s);

    @Headers("Content-Type:text/plain")
    @POST("post")
    Observable<JsonObject> post(@Body String s);

    @FormUrlEncoded     与 @Field 搭配使用
    @POST("post")
    Observable<JsonObject> post2(@Field("book") String book);     //同样也接收 List，也有 @FieldMap

    @GET("https://api.douban.com/v2/book/search")
    Observable<JsonObject> searchBook(
            @Query("q") String key,     //@Query：键值对 q=key
            @Query("tag") String tag,
            @Query("start") int offset,
            @Query("count") int size);

    @GET("https://api.douban.com/v2/book/search")
    Observable<JsonObject> searchBook2(@QueryMap Map<String, Object> map);

    @GET("http://apis.baidu.com/apistore/weatherservice/citylist")
    Observable<JsonObject> getWeather(
            @Header("apikey") String apikey,     //同样也有 @HeaderMap
            @Query("cityname") String cityname);

    @Headers("apikey:fb71ed4dc47c3559ebf3bf588304608f")
    @GET("http://apis.baidu.com/apistore/weatherservice/citylist")
    Observable<JsonObject> getWeather2(@Query("cityname") String cityname);

    @GET
    Observable<JsonObject> getJSON(@Url String url);

    @Streaming     大文件
    @GET
    Observable<ResponseBody> downloadFile(@Url String url);     ResponseBody 为原生返回值
}

----

public class MainActivity extends Activity {
    private static final Action1<Object> mAction1 = o -> Log.w("Tag", o.toString());     Observer

    private static final Observable.Transformer<Object, Object> mTransformer = observable ->     重用操作链
            observable
                    .observeOn(AndroidSchedulers.mainThread())     切换至主线程 (2)
                    .subscribeOn(Schedulers.io());     指定最开始在IO线程中运行 (1)

    @SuppressWarnings("unchecked")     压制警告（强制类型转换）
    private static <T> Observable.Transformer<T, T> applySchedulers() {     重用操作链
        return ((Observable.Transformer<T, T>) mTransformer);     返回 Transformer 对象（为了不丢失类型信息而强制转换）
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DataBindingUtil.setContentView(this, R.layout.activity_main);

        final OkHttpClient okHttpClient = new OkHttpClient.Builder()     自定义 OkHttpClient（OkHttpClient 在整个 App 中应为单例）
                .connectTimeout(10, TimeUnit.SECONDS)     设置超时时间
                .retryOnConnectionFailure(true)     失败重连
                .addInterceptor(chain -> {     添加拦截器
                    Log.w("Tag", chain.request().url().toString());     打印请求网址
                    return chain.proceed(chain.request());     继续执行
                })
                .build();

        final Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://echo.getpostman.com/")
                .client(okHttpClient)     指定 OkHttpClient
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())     使用 RxJava 回调
                .addConverterFactory(GsonConverterFactory.create())     使用 JSON 格式
                .build();

        final APIService service = retrofit.create(APIService.class);     创建服务实例

        final List<String> list = Arrays.asList("AA", "BB", "CC", "DD");

        service.get("AA")
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://echo.getpostman.com/get?name=AA"

        service.get2(list)
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://echo.getpostman.com/get?name=AA&name=BB&name=CC&name=DD"

        service.headers("Chrome")
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://echo.getpostman.com/headers"

        service.post("Hello World!")
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://echo.getpostman.com/post"

        service.post2("ABC")
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://echo.getpostman.com/post"

        final Map<String, Object> map = new ArrayMap<>();
        map.put("q", "无人");
        map.put("tag", "");
        map.put("start", 0);
        map.put("count", 5);

        service.searchBook("无人", null, 0, 5)
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://api.douban.com/v2/book/search?q=无人&start=0&count=5"

        service.searchBook2(map)
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://api.douban.com/v2/book/search?q=无人&tag=&count=5&start=0"

        service.getWeather("fb71ed4dc47c3559ebf3bf588304608f", "重庆")
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "http://apis.baidu.com/apistore/weatherservice/citylist?cityname=重庆"

        service.getWeather2("重庆")
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "http://apis.baidu.com/apistore/weatherservice/citylist?cityname=重庆"

        service.getJSON("https://www.v2ex.com/api/members/show.json?username=xhstormr")
                .compose(applySchedulers())
                .subscribe(mAction1);     开始访问 "https://www.v2ex.com/api/members/show.json?username=xhstormr"

        service.downloadFile("http://ww4.sinaimg.cn/large/a15b4afegw1f7vhnqa9soj203k03kwfe")
                .subscribeOn(Schedulers.io())     指定最开始在IO线程中运行
                .subscribe(
                        responseBody -> {     下载图片至 /storage/sdcard0/123456/123.png
                            File dir = new File(Environment.getExternalStorageDirectory(), "123456");
                            dir.mkdirs();
                            try (BufferedSource bufferedSource = responseBody.source();
                                 BufferedSink bufferedSink = Okio.buffer(Okio.sink(new File(dir, "123.png")))) {
                                bufferedSink.writeAll(bufferedSource);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        },
                        error -> Log.w("Tag", error.toString()),
                        () -> Log.w("Tag", "onComplete"));
    }
}
```

## Reference

* https://zhuanlan.zhihu.com/p/21808012
