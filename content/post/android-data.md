+++
Categories = ["Android"]
date = "2016-10-02T13:27:20+08:00"
title = "Android 数据存储"

+++

<!--more-->

Updated on 2016-10-02

>

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
public class MySQLiteOpenHelper extends SQLiteOpenHelper {
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
