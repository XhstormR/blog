---
Categories:
- Android
date: 2016-10-02T13:27:20+08:00
title: Android 数据存储
---

<!--more-->

Updated on 2016-10-06

> File
>
> SQLite
>
> SharedPreferences
>
> ContentProvider (组件)

## SharedPreferences
一种轻型的数据存储方式，基于 XML 文件存储（Key-Value）键值对数据。

( String、int、long、float、boolean、Set\<String\> )

* SharedPreferences：获取数据 ( getXXX )。
* SharedPreferences.Editor：修改数据 ( putXXX )，存储数据 ( commit、apply )。

### MainActivity.java
```java
public class MainActivity extends Activity {
    private EditText mUserName, mPassword;
    private CheckBox mSaveUserName;
    private SharedPreferences mSharedPreferences;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        mUserName = (EditText) findViewById(R.id.editText);
        mPassword = (EditText) findViewById(R.id.editText2);
        mSaveUserName = (CheckBox) findViewById(R.id.checkBox);
        mSharedPreferences = getSharedPreferences("123", MODE_PRIVATE);     创建自定义 Preferences 文件 (123.xml)
        ----
        mSharedPreferences = PreferenceManager.getDefaultSharedPreferences(MainActivity.this);     获得应用默认 Preferences 文件 (com.example.system.myapplication_preferences.xml)

        loadUserName();
    }

    private void loadUserName() {
        String userName = mSharedPreferences.getString("userName", "");     获得参数
        if (!userName.equals("")) {
            mUserName.setText(userName);
            mSaveUserName.setChecked(true);
        }
    }

    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button:
                String userName = mUserName.getText().toString().trim();
                String passWord = mPassword.getText().toString().trim();
                if ("admin".equals(userName) && "123456".equals(passWord)) {
                    Toast.makeText(MainActivity.this, "登录成功", Toast.LENGTH_SHORT).show();
                    if (mSaveUserName.isChecked()) {     是否保存用户名
                        mSharedPreferences.edit().putString("userName", userName).apply();     设置参数
                    } else {
                        mSharedPreferences.edit().remove("userName").apply();     移除参数
                        ----
                        mSharedPreferences.edit().clear().apply();     清空参数
                    }
                } else {
                    Toast.makeText(MainActivity.this, "登录失败", Toast.LENGTH_SHORT).show();
                }
                break;
            case R.id.button2:
                finish();     结束 Activity
                break;
        }
    }
}
```

### main_activity.xml
```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                android:orientation="vertical"
                android:padding="16dp"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

    <TextView
            android:layout_alignParentStart="true"
            android:layout_alignParentTop="true"
            android:layout_marginTop="20dp"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="用户名："
            android:textSize="20sp"
            android:id="@+id/textView"/>

    <TextView
            android:layout_marginTop="20dp"
            android:layout_alignParentStart="true"
            android:layout_below="@+id/textView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="密    码："
            android:textSize="20sp"
            android:id="@+id/textView2"/>

    <EditText
            android:inputType="text"
            android:textSize="20sp"
            android:id="@+id/editText"
            android:layout_alignBottom="@+id/textView"
            android:layout_toEndOf="@+id/textView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>

    <EditText
            android:inputType="textPassword"
            android:textSize="20sp"
            android:id="@+id/editText2"
            android:layout_alignBottom="@+id/textView2"
            android:layout_toEndOf="@+id/textView2"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>

    <CheckBox
            android:checked="false"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/textView2"
            android:layout_alignParentStart="true"
            android:layout_marginTop="20dp"
            android:text="保存用户名"
            android:id="@+id/checkBox"/>

    <LinearLayout
            android:orientation="horizontal"
            android:layout_below="@+id/checkBox"
            android:layout_alignParentStart="true"
            android:layout_marginTop="20dp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
        <Button
                android:onClick="onClick"
                android:layout_weight="1"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:text="登录"
                android:id="@+id/button"/>
        <Button
                android:onClick="onClick"
                android:layout_weight="1"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:text="退出"
                android:id="@+id/button2"/>
    </LinearLayout>

</RelativeLayout>
```

## SQLite
一种轻量级的数据库，无需依赖，无需配置，无需安装，所有数据都存储在一个文件当中。

( NULL (空值)、INTEGER (整形)、REAL (浮点型)、TEXT (字符串)、BLOB (二进制) )

* SQLiteDatabase：操作数据库的类。
  * 原生 SQL 语句方法：execSQL、rawQuery。
  * 执行 SDK 封装方法：insert、delete、update、query。
* SQLiteOpenHelper：管理数据库的类。
  * onCreate：创建数据库时调用。
  * onUpgrade：更新数据库时调用。
  * getWritableDatabase：以读写方式打开数据库。
  * getReadableDatabase：以只读方式打开数据库。（假）

### MainActivity.java
```java
public class MainActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        SQLiteDatabase db = openOrCreateDatabase("123.db", MODE_PRIVATE, null);     直接新建或打开已存在数据库
        ----
        SQLiteDatabase db = new MySQLiteOpenHelper(MainActivity.this, "123.db", null, 1).getWritableDatabase();     通过 OpenHelper 新建数据库并初始化表

        A(db);     SQL 语句
        B(db);     SDK 封装

        db.close();
    }

    private void A(SQLiteDatabase db) {
        db.beginTransaction();
        for (int i = 0; i < 5; i++) {
            db.execSQL("insert into usertb(name,age) values(?,?)", new Object[]{"王五", "26"});     增
        }
        db.setTransactionSuccessful();
        db.endTransaction();

        db.execSQL("delete from usertb where _id > ?", new Object[]{"3"});     删

        db.execSQL("update usertb set name = ? , age = ? where _id = ?", new Object[]{"李四", "28", "3"});     改

        Cursor cursor = db.rawQuery("select * from usertb where name = ? order by _id desc", new String[]{"王五"});     查
        Show(cursor);
    }

    private void B(SQLiteDatabase db) {
        ContentValues contentValues = new ContentValues();
        for (int i = 0; i < 5; i++) {
            contentValues.clear();
            contentValues.put("name", "王五");
            contentValues.put("age", 26);
            db.insert("usertb", null, contentValues);     增
        }

        db.delete("usertb", "name like ?", new String[]{"%四%"});     删

        contentValues.clear();
        contentValues.put("age", 5);
        db.update("usertb", contentValues, "name = ?", new String[]{"王五"});     改

        Cursor cursor = db.query("usertb", null, "_id > ?", new String[]{"0"}, null, null, "age");     查
        Show(cursor);
    }

    private void Show(Cursor cursor) {
        /*方案一*/
//        while (cursor.moveToNext()) {     行
////            int id = cursor.getInt(0);     列
////            String name = cursor.getString(1);
////            int age = cursor.getInt(2);
//            int id = cursor.getInt(cursor.getColumnIndex("_id"));
//            String name = cursor.getString(cursor.getColumnIndex("name"));
//            int age = cursor.getInt(cursor.getColumnIndex("age"));
//            Log.i("Tag", id + "::" + name + "::" + age);
//        }
//        cursor.close();

        /*方案二*/
        String[] columnNames = cursor.getColumnNames();
        String[] column = new String[columnNames.length];
        while (cursor.moveToNext()) {     行
            for (int i = 0; i < columnNames.length; i++) {
                column[i] = cursor.getString(cursor.getColumnIndex(columnNames[i]));     列
            }
            Log.i("Tag", Arrays.toString(column));
        }
        cursor.close();
    }
}
```

### MySQLiteOpenHelper.java
```java
public class MySQLiteOpenHelper extends SQLiteOpenHelper {     继承 SQLiteOpenHelper
    public MySQLiteOpenHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {     创建数据库时调用
        db.execSQL("create table if not exists usertb(_id integer primary key autoincrement,name text not null,age integer not null)");
        db.execSQL("insert into usertb(name,age) values(?,?)", new Object[]{"Admin", "0"});
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {     更新数据库时调用
    }
}
```

## File
自定义数据文件。

### MainActivity.java
```java
public class MainActivity extends Activity {
    private EditText editText;
    private TextView textView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);
        editText = (EditText) findViewById(R.id.editText);
        textView = (TextView) findViewById(R.id.textView);
        A();
    }

    public void onClick(View view) throws IOException {
        switch (view.getId()) {
            case R.id.button1:     保存
                String string = editText.getText().toString();
                BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(openFileOutput("123.txt", MODE_APPEND), "utf-8"));
                bufferedWriter.write(string);                       （/data/data/com.example.system.myapplication/files/123.txt，追加模式）
                bufferedWriter.close();
                break;
            case R.id.button2:     读取
                StringBuilder stringBuilder = new StringBuilder();
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(openFileInput("123.txt"), "utf-8"));
                for (String s; (s = bufferedReader.readLine()) != null; ) {     （/data/data/com.example.system.myapplication/files/123.txt）
                    stringBuilder.append(s);
                }
                bufferedReader.close();
                textView.setText(stringBuilder.toString());
                break;
        }
    }

    private void A() {
        内部存储：
        File filesDir = this.getFilesDir();
        File cacheDir = this.getCacheDir();
        File dir = this.getDir("123456", MODE_PRIVATE);
        依次为：
        /data/data/com.example.system.myapplication/files     数据目录
        /data/data/com.example.system.myapplication/cache     缓存目录
        /data/data/com.example.system.myapplication/app_123456

        外部存储：
        File externalFilesDir = this.getExternalFilesDir(null);
        File externalCacheDir = this.getExternalCacheDir();
        File externalDir = new File(Environment.getExternalStorageDirectory(), "123456");
        依次为：
        /storage/sdcard0/Android/data/com.example.system.myapplication/files     数据目录
        /storage/sdcard0/Android/data/com.example.system.myapplication/cache     缓存目录
        /storage/sdcard0/123456
        操作外部存储需要权限：
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    }
}
```

### main_activity.xml
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:padding="16dp"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
    <EditText
            android:gravity="center"
            android:hint="输入"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:id="@+id/editText"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="保存"
            android:id="@+id/button1"/>
    <Button
            android:onClick="onClick"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="读取"
            android:id="@+id/button2"/>
    <TextView
            android:gravity="center"
            android:text="内容"
            android:textSize="25sp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:id="@+id/textView"/>
</LinearLayout>
```

## ContentProvider
用于实现不同应用程序之间共享数据的组件。

* ContentProvider：内容提供器，通过 Uri 地址给外部应用程序访问来提供数据。`out`
* ContentResolver：内容解析器，通过访问外部应用程序的 Uri 地址来获得数据。`in`
* ContentResolver 通过指定 Uri 访问 ContentProvider，调用其提供的增删改查方法。

### MainActivity.java
```java
import android.provider.ContactsContract.CommonDataKinds.Email;
import android.provider.ContactsContract.CommonDataKinds.Phone;
import android.provider.ContactsContract.CommonDataKinds.StructuredName;
import android.provider.ContactsContract.Contacts;
import android.provider.ContactsContract.Data;
import android.provider.ContactsContract.RawContacts;
....

public class MainActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);
        A();     查
        B();     增
    }

    private void A() {
        ContentResolver contentResolver = getContentResolver();
        查询联系人
        String[] column = {Contacts._ID, Contacts.DISPLAY_NAME, Contacts.LAST_TIME_CONTACTED};     查询列
        Cursor cursor = contentResolver.query(Contacts.CONTENT_URI, column, null, null, Contacts._ID);
        if (cursor != null) {
            Show(cursor);     解析游标
        }
        查询电话本
        String[] column = {Phone._ID, Phone.DISPLAY_NAME, Phone.NUMBER};     查询列
        Cursor cursor = contentResolver.query(Phone.CONTENT_URI, column, null, null, Phone._ID);
        if (cursor != null) {
            Show(cursor);     解析游标
        }
        查询邮箱
        String[] column = {Email._ID, Email.NAME_RAW_CONTACT_ID, Email.DATA};     查询列
        Cursor cursor = contentResolver.query(Email.CONTENT_URI, column, null, null, Email._ID);
        if (cursor != null) {
            Show(cursor);     解析游标
        }
        需要权限：
        <uses-permission android:name="android.permission.READ_CONTACTS"/>
    }

    private void B() {
        ContentResolver contentResolver = getContentResolver();
        新建联系人
        Uri insert = contentResolver.insert(RawContacts.CONTENT_URI, new ContentValues());
        long parseId = ContentUris.parseId(insert);     获得在表中的 ID
        插入姓名
        ContentValues contentValues = new ContentValues();
        contentValues.put(StructuredName.RAW_CONTACT_ID, parseId);     ID
        contentValues.put(StructuredName.DISPLAY_NAME, "TEST");     姓名
        contentValues.put(StructuredName.MIMETYPE, StructuredName.CONTENT_ITEM_TYPE);     类型为姓名
        contentResolver.insert(Data.CONTENT_URI, contentValues);
        插入电话
        contentValues.clear();
        contentValues.put(Phone.RAW_CONTACT_ID, parseId);     ID
        contentValues.put(Phone.NUMBER, "123456");     电话
        contentValues.put(Phone.MIMETYPE, Phone.CONTENT_ITEM_TYPE);     类型为电话
        contentResolver.insert(Data.CONTENT_URI, contentValues);
        需要权限：
        <uses-permission android:name="android.permission.READ_CONTACTS"/>
        <uses-permission android:name="android.permission.WRITE_CONTACTS"/>
    }

    private void Show(Cursor cursor) {
        String[] columnNames = cursor.getColumnNames();
        String[] column = new String[columnNames.length];
        while (cursor.moveToNext()) {     行
            for (int i = 0; i < columnNames.length; i++) {
                column[i] = cursor.getString(cursor.getColumnIndex(columnNames[i]));     列
            }
            Log.i("Tag", Arrays.toString(column));
        }
        cursor.close();
    }
}
```

### MyContentProvider.java
```java
public class MyContentProvider extends ContentProvider {     继承 ContentProvider
    @Override
    public boolean onCreate() {     初始化操作，应用启动时调用，不应包含耗时操作
        return false;
    }

    @Nullable
    @Override
    public String getType(@NonNull Uri uri) {     返回 Uri 的 MIME 类型
        return null;     （单条数据以 vnd.android.cursor.item/ 开头）
    }                          （多条数据以 vnd.android.cursor.dir/ 开头）

    @Nullable
    @Override     增
    public Uri insert(@NonNull Uri uri, @Nullable ContentValues values) {
        return null;
    }

    @Override     删
    public int delete(@NonNull Uri uri, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }

    @Override     改
    public int update(@NonNull Uri uri, @Nullable ContentValues values, @Nullable String selection, @Nullable String[] selectionArgs) {
        return 0;
    }

    @Nullable
    @Override     查（一般只需实现查询功能，也就是只给外部提供查询功能）
    public Cursor query(@NonNull Uri uri, @Nullable String[] projection, @Nullable String selection, @Nullable String[] selectionArgs, @Nullable String sortOrder) {
        return null;
    }
}

AndroidManifest.xml
⇳
<application

    其余组件

    <provider
            android:name="com.example.system.myapplication.MyContentProvider"
            android:authorities="内容提供器">
    </provider>
</application>
```
