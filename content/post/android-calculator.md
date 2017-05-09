---
Categories:
- Android
date: 2016-07-19T10:48:46+08:00
title: Android 计算器
---

<!--more-->

Updated on 2016-07-23

> [{{< image "/uploads/android-calculator.png" "Calculator" "1" "0" >}}](http://ww4.sinaimg.cn/large/a15b4afegw1f650hwobvnj203k03kk3x)

## FirstActivty.java
```java
package com.example.system.myapplication;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import java.util.Stack;

public class FirstActivty extends AppCompatActivity implements View.OnClickListener {
    private Button btn_0;
    private Button btn_1;
    private Button btn_2;
    private Button btn_3;
    private Button btn_4;
    private Button btn_5;
    private Button btn_6;
    private Button btn_7;
    private Button btn_8;
    private Button btn_9;
    private Button btn_dian;
    private Button btn_jian;
    private Button btn_jia;
    private Button btn_cheng;
    private Button btn_chu;
    private Button btn_clear;
    private Button btn_delete;
    private Button btn_equal;
    private EditText editText;
    private String str = "";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.first_activity);

        btn_0 = (Button) findViewById(R.id.btn_0);
        btn_1 = (Button) findViewById(R.id.btn_1);
        btn_2 = (Button) findViewById(R.id.btn_2);
        btn_3 = (Button) findViewById(R.id.btn_3);
        btn_4 = (Button) findViewById(R.id.btn_4);
        btn_5 = (Button) findViewById(R.id.btn_5);
        btn_6 = (Button) findViewById(R.id.btn_6);
        btn_7 = (Button) findViewById(R.id.btn_7);
        btn_8 = (Button) findViewById(R.id.btn_8);
        btn_9 = (Button) findViewById(R.id.btn_9);
        btn_dian = (Button) findViewById(R.id.btn_dian);
        btn_jia = (Button) findViewById(R.id.btn_jia);
        btn_jian = (Button) findViewById(R.id.btn_jian);
        btn_cheng = (Button) findViewById(R.id.btn_cheng);
        btn_chu = (Button) findViewById(R.id.btn_chu);
        btn_clear = (Button) findViewById(R.id.btn_clear);
        btn_delete = (Button) findViewById(R.id.btn_delete);
        btn_equal = (Button) findViewById(R.id.btn_equal);
        editText = (EditText) findViewById(R.id.editText);

        btn_0.setOnClickListener(this);
        btn_1.setOnClickListener(this);
        btn_2.setOnClickListener(this);
        btn_3.setOnClickListener(this);
        btn_4.setOnClickListener(this);
        btn_5.setOnClickListener(this);
        btn_6.setOnClickListener(this);
        btn_7.setOnClickListener(this);
        btn_8.setOnClickListener(this);
        btn_9.setOnClickListener(this);
        btn_dian.setOnClickListener(this);
        btn_jia.setOnClickListener(this);
        btn_jian.setOnClickListener(this);
        btn_cheng.setOnClickListener(this);
        btn_chu.setOnClickListener(this);
        btn_clear.setOnClickListener(this);
        btn_delete.setOnClickListener(this);
        btn_equal.setOnClickListener(this);
        editText.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_0:
            case R.id.btn_1:
            case R.id.btn_2:
            case R.id.btn_3:
            case R.id.btn_4:
            case R.id.btn_5:
            case R.id.btn_6:
            case R.id.btn_7:
            case R.id.btn_8:
            case R.id.btn_9:
                str += ((Button) view).getText().toString();
                break;
            case R.id.btn_dian:
                if (!str.isEmpty() && !str.matches(".* \\S*\\.\\S*$")) {     使用正则表达式防止重复输入
                    str += ((Button) view).getText().toString();
                }
                break;
            case R.id.btn_jia:
            case R.id.btn_jian:
            case R.id.btn_cheng:
            case R.id.btn_chu:
                if (!str.isEmpty() && !str.matches(".*[+-/*] $")) {     使用正则表达式防止重复输入
                    str += " " + ((Button) view).getText().toString() + " ";
                }
                break;
            case R.id.btn_clear:     清空
                str = "";
                break;
            case R.id.btn_delete:     退位
                str = str.isEmpty() ? "" : str.substring(0, str.length() - 1);
                break;
            case R.id.btn_equal:     计算
                str = str.isEmpty() ? "" : calculate(reverse(str));
                break;
        }
        editText.setText(str);
    }

     ----- 后面代码可参考 "栈" -----

    private static String reverse(String str) {     中缀表达式转后缀表达式
        Stack<String> stack = new Stack<>();
        Stack<String> stack1 = new Stack<>();
        Stack<String> stack2 = new Stack<>();
        for (String i : reverseString(str.split(" "))) {
            stack.push(i);
        }
        for (; !stack.empty(); ) {
            String i = stack.peek();
            switch (i) {
                case "+":
                case "-":
                    if (stack1.empty()) {
                        stack1.push(stack.pop());
                    } else {
                        for (; !stack1.empty(); ) {
                            stack2.push(stack1.pop());
                        }
                        stack1.push(stack.pop());
                    }
                    break;
                case "*":
                case "/":
                    if (stack1.empty() || stack1.peek().equals("+") || stack1.peek().equals("-")) {
                        stack1.push(stack.pop());
                    } else {
                        stack2.push(stack1.pop());
                    }
                    break;
                default:
                    stack2.push(stack.pop());
                    break;
            }
        }
        for (; !stack1.empty(); ) {
            stack2.push(stack1.pop());
        }
        String[] strings = new String[stack2.size()];
        for (int i = 0, j = stack2.size(); i < j; i++) {
            strings[i] = stack2.pop();
        }
        String string = "";
        for (String i : reverseString(strings)) {
            string += i + " ";
        }
        return string;
    }

    private static String[] reverseString(String[] str) {     反转数组
        String[] strings = new String[str.length];
        for (int i = 0, j = str.length; i < j; i++) {
            strings[i] = str[str.length - i - 1];
        }
        return strings;
    }

    private static String calculate(String str) {     后缀表达式求值
        if (str.matches(".*0 /.*-.*")) {
            return "-∞";
        } else if (str.matches(".*0 /.*+.*")) {
            return "∞";
        }
        Stack<String> stack = new Stack<>();
        double a, b;

        for (String i : str.split(" ")) {
            switch (i) {
                case "+":
                    a = Double.parseDouble(stack.pop());
                    b = Double.parseDouble(stack.pop());
                    stack.push(String.valueOf(b + a));
                    break;
                case "-":
                    a = Double.parseDouble(stack.pop());
                    b = Double.parseDouble(stack.pop());
                    stack.push(String.valueOf(b - a));
                    break;
                case "*":
                    a = Double.parseDouble(stack.pop());
                    b = Double.parseDouble(stack.pop());
                    stack.push(String.valueOf(b * a));
                    break;
                case "/":
                    a = Double.parseDouble(stack.pop());
                    b = Double.parseDouble(stack.pop());
                    stack.push(String.valueOf(b / a));
                    break;
                default:
                    stack.push(i);
                    break;
            }
        }
        return stack.pop();
    }
}
```

## first_activity.xml
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:padding="5dp">

    <EditText
            android:keepScreenOn="true"     保持屏幕常亮
            android:focusable="false"     不可获取焦点
            android:focusableInTouchMode="false"     不可获取焦点
            android:layout_weight="2"
            android:background="@drawable/view_bg"
            android:id="@+id/editText"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:hint="结果"
            android:textSize="30sp"
            android:gravity="end|bottom"
            android:padding="20dp"/>

    <TableLayout
            android:layout_weight="3"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:stretchColumns="*"
            android:shrinkColumns="*">

        <TableRow
                android:layout_weight="1"
                android:layout_width="match_parent"
                android:layout_height="0dp">

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="C"
                    android:textSize="25sp"
                    android:textColor="#ff7700"
                    android:gravity="center"
                    android:id="@+id/btn_clear"
                    android:layout_column="0"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="DEL"
                    android:textSize="25sp"
                    android:textColor="#ff7700"
                    android:gravity="center"
                    android:id="@+id/btn_delete"
                    android:layout_column="1"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="/"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_chu"
                    android:layout_column="2"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="*"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_cheng"
                    android:layout_column="3"/>

        </TableRow>

        <TableRow
                android:layout_weight="1"
                android:layout_width="match_parent"
                android:layout_height="0dp">

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="7"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_7"
                    android:layout_column="0"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="8"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_8"
                    android:layout_column="1"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="9"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_9"
                    android:layout_column="2"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="-"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_jian"
                    android:layout_column="3"/>

        </TableRow>

        <TableRow
                android:layout_weight="1"
                android:layout_width="match_parent"
                android:layout_height="0dp">

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="4"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_4"
                    android:layout_column="0"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="5"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_5"
                    android:layout_column="1"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="6"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_6"
                    android:layout_column="2"/>

            <Button
                    android:background="@drawable/button_selector"
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:text="+"
                    android:textSize="25sp"
                    android:gravity="center"
                    android:id="@+id/btn_jia"
                    android:layout_column="3"/>
        </TableRow>

    </TableLayout>

    <LinearLayout
            android:layout_weight="2"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:orientation="horizontal">

        <LinearLayout
                android:layout_weight="3"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:orientation="vertical">

            <LinearLayout
                    android:layout_weight="1"
                    android:layout_width="match_parent"
                    android:layout_height="0dp">

                <Button
                        android:background="@drawable/button_selector"
                        android:layout_weight="1"
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:text="1"
                        android:textSize="25sp"
                        android:gravity="center"
                        android:id="@+id/btn_1"/>

                <Button
                        android:background="@drawable/button_selector"
                        android:layout_weight="1"
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:text="2"
                        android:textSize="25sp"
                        android:gravity="center"
                        android:id="@+id/btn_2"/>

                <Button
                        android:background="@drawable/button_selector"
                        android:layout_weight="1"
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:text="3"
                        android:textSize="25sp"
                        android:gravity="center"
                        android:id="@+id/btn_3"/>
            </LinearLayout>

            <LinearLayout
                    android:layout_weight="1"
                    android:layout_width="match_parent"
                    android:layout_height="0dp">

                <Button
                        android:background="@drawable/button_selector"
                        android:layout_weight="2"
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:text="0"
                        android:textSize="25sp"
                        android:gravity="center"
                        android:id="@+id/btn_0"/>

                <Button
                        android:background="@drawable/button_selector"
                        android:layout_weight="1"
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:text="."
                        android:textSize="25sp"
                        android:gravity="center"
                        android:id="@+id/btn_dian"/>
            </LinearLayout>

        </LinearLayout>

        <Button
                android:background="@drawable/equal_selector"
                android:gravity="center"
                android:layout_weight="1"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:text="="
                android:textSize="25sp"
                android:id="@+id/btn_equal"/>
    </LinearLayout>

</LinearLayout>
```

## drawable
```xml
view_bg.xml
---
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="5dp"/>     圆角
    <solid android:color="#f7de63"/>     填充色
    <stroke     边框
            android:width="5dp"
            android:color="#00ffffff"/>
    <gradient     渐变色
            android:startColor="#ffffff"
            android:endColor="#ff0000"/>
</shape>

-------------------------------------------------------

button_bg.xml
---
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="5dp"/>
    <solid android:color="@color/beige"/>
    <stroke
            android:width="5dp"
            android:color="#00ffffff"/>
</shape>

button_press.xml
---
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="5dp"/>
    <solid android:color="@color/wheat"/>
    <stroke
            android:width="5dp"
            android:color="#00ffffff"/>
</shape>

button_selector.xml
---
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/button_press" android:state_pressed="true"/>
    <item android:drawable="@drawable/button_bg"/>
</selector>

-------------------------------------------------------

equal_bg.xml
---
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="5dp"/>
    <solid android:color="#ff7700"/>
    <stroke
            android:width="5dp"
            android:color="#00ffffff"/>
</shape>

equal_press.xml
---
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <corners android:radius="5dp"/>
    <solid android:color="#ffae00"/>
    <stroke
            android:width="5dp"
            android:color="#00ffffff"/>
</shape>

equal_selector.xml
---
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/equal_press" android:state_pressed="true"/>     点击状态
    <item android:drawable="@drawable/equal_bg"/>     普通状态
</selector>

-------------------------------------------------------

styles.xml
---
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">     全屏页面
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>
</resources>
```

## colors.xml
```xml
<color name="pink">#ffc0cb</color><!--粉红色 -->
<color name="lightpink">#ffb6c1</color><!--亮粉红色 -->
<color name="white">#ffffff</color><!--白色 -->
<color name="peachpuff">#ffdab9</color><!--桃色 -->
<color name="gold">#ffd700</color><!--金色 -->
<color name="ivory">#fffff0</color><!--象牙色 -->
<color name="lightyellow">#ffffe0</color><!--亮黄色 -->
<color name="yellow">#ffff00</color><!--黄色 -->
<color name="snow">#fffafa</color><!--雪白色 -->
<color name="floralwhite">#fffaf0</color><!--花白色 -->
<color name="lemonchiffon">#fffacd</color><!--柠檬绸色 -->
<color name="cornsilk">#fff8dc</color><!--米绸色 -->
<color name="seaShell">#fff5ee</color><!--海贝色 -->
<color name="lavenderblush">#fff0f5</color><!--淡紫红 -->
<color name="papayawhip">#ffefd5</color><!--番木色 -->
<color name="blanchedalmond">#ffebcd</color><!--白杏色 -->
<color name="mistyrose">#ffe4e1</color><!--浅玫瑰色 -->
<color name="bisque">#ffe4c4</color><!--桔黄色 -->
<color name="moccasin">#ffe4b5</color><!--鹿皮色 -->
<color name="navajowhite">#ffdead</color><!--纳瓦白 -->
<color name="orange">#ffa500</color><!--橙色 -->
<color name="lightsalmon">#ffa07a</color><!--亮肉色 -->
<color name="darkorange">#ff8c00</color><!--暗桔黄色 -->
<color name="coral">#ff7f50</color><!--珊瑚色 -->
<color name="hotpink">#ff69b4</color><!--热粉红色 -->
<color name="ghostwhite">#f8f8ff</color><!--幽灵白 -->
<color name="mintcream">#f5fffa</color><!--薄荷色 -->
<color name="whitesmoke">#f5f5f5</color><!--烟白色 -->
<color name="beige">#f5f5dc</color><!--米色 -->
<color name="wheat">#f5deb3</color><!--浅黄色 -->
<color name="sandybrown">#f4a460</color><!--沙褐色 -->
<color name="tomato">#ff6347</color><!--西红柿色 -->
<color name="orangered">#ff4500</color><!--红橙色 -->
<color name="deeppink">#ff1493</color><!--深粉红色 -->
<color name="fuchsia">#ff00ff</color><!--紫红色 -->
<color name="magenta">#ff00ff</color><!--红紫色 -->
<color name="red">#ff0000</color><!--红色 -->
<color name="oldlace">#fdf5e6</color><!--老花色 -->
<color name="lightgoldenrodyellow">#fafad2</color><!--亮金黄色 -->
<color name="linen">#faf0e6</color><!--亚麻色 -->
<color name="antiquewhite">#faebd7</color><!--古董白 -->
<color name="salmon">#fa8072</color><!--鲜肉色 -->
<color name="azure">#f0ffff</color><!--天蓝色 -->
<color name="palevioletred">#db7093</color><!--苍紫罗兰色 -->
<color name="goldenrod">#daa520</color><!--金麒麟色 -->
<color name="orchid">#da70d6</color><!--淡紫色 -->
<color name="thistle">#d8bfd8</color><!--蓟色 -->
<color name="lightgray">#d3d3d3</color><!--亮灰色 -->
<color name="lightgrey">#d3d3d3</color><!--亮灰色 -->
<color name="tan">#d2b48c</color><!--茶色 -->
<color name="chocolate">#d2691e</color><!--巧可力色 -->
<color name="peru">#cd853f</color><!--秘鲁色 -->
<color name="indianred">#cd5c5c</color><!--印第安红 -->
<color name="mediumvioletred">#c71585</color><!--中紫罗兰色 -->
<color name="silver">#c0c0c0</color><!--银色 -->
<color name="darkkhaki">#bdb76b</color><!--暗黄褐色 -->
<color name="rosybrown">#bc8f8f</color><!--褐玫瑰红 -->
<color name="mediumorchid">#ba55d3</color><!--中粉紫色 -->
<color name="darkgoldenrod">#b8860b</color><!--暗金黄色 -->
<color name="firebrick">#b22222</color><!--火砖色 -->
<color name="powderblue">#b0e0e6</color><!--粉蓝色 -->
<color name="lightsteelblue">#b0c4de</color><!--亮钢兰色 -->
<color name="paleturquoise">#afeeee</color><!--苍宝石绿 -->
<color name="greenyellow">#adff2f</color><!--黄绿色 -->
<color name="lightblue">#add8e6</color><!--亮蓝色 -->
<color name="darkgray">#a9a9a9</color><!--暗灰色 -->
<color name="darkgrey">#a9a9a9</color><!--暗灰色 -->
<color name="brown">#a52a2a</color><!--褐色 -->
<color name="sienna">#a0522d</color><!--赭色 -->
<color name="darkorchid">#9932cc</color><!--暗紫色 -->
<color name="palegreen">#98fb98</color><!--苍绿色 -->
<color name="darkviolet">#9400d3</color><!--暗紫罗兰色 -->
<color name="mediumpurple">#9370db</color><!--中紫色 -->
<color name="skyblue">#87ceeb</color><!--天蓝色 -->
<color name="gray">#808080</color><!--灰色 -->
<color name="grey">#808080</color><!--灰色 -->
<color name="olive">#808000</color><!--橄榄色 -->
<color name="purple">#800080</color><!--紫色 -->
<color name="maroon">#800000</color><!--粟色 -->
<color name="aquamarine">#7fffd4</color><!--碧绿色 -->
<color name="chartreuse">#7fff00</color><!--黄绿色 -->
<color name="lawngreen">#7cfc00</color><!--草绿色 -->
<color name="mediumslateblue">#7b68ee</color><!--中暗蓝色 -->
<color name="darkcyan">#008b8b</color><!--暗青色 -->
<color name="teal">#008080</color><!--水鸭色 -->
<color name="green">#008000</color><!--绿色 -->
<color name="darkgreen">#006400</color><!--暗绿色 -->
<color name="blue">#0000ff</color><!--蓝色 -->
<color name="mediumblue">#0000cd</color><!--中兰色 -->
<color name="darkblue">#00008b</color><!--暗蓝色 -->
<color name="lightslategray">#778899</color><!--亮蓝灰 -->
<color name="lightslategrey">#778899</color><!--亮蓝灰 -->
<color name="slategray">#708090</color><!--灰石色 -->
<color name="slategrey">#708090</color><!--灰石色 -->
<color name="olivedrab">#6b8e23</color><!--深绿褐色 -->
<color name="slateblue">#6a5acd</color><!--石蓝色 -->
<color name="dimgray">#696969</color><!--暗灰色 -->
<color name="dimgrey">#696969</color><!--暗灰色 -->
<color name="mediumaquamarine">#66cdaa</color><!--中绿色 -->
<color name="cornflowerblue">#6495ed</color><!--菊兰色 -->
<color name="cadetblue">#5f9ea0</color><!--军兰色 -->
<color name="darkolivegreen">#556b2f</color><!--暗橄榄绿 -->
<color name="indigo">#4b0082</color><!--靛青色 -->
<color name="mediumturquoise">#48d1cc</color><!--中绿宝石 -->
<color name="darkslateblue">#483d8b</color><!--暗灰蓝色 -->
<color name="steelblue">#4682b4</color><!--钢兰色 -->
<color name="royalblue">#4169e1</color><!--皇家蓝 -->
<color name="turquoise">#40e0d0</color><!--青绿色 -->
<color name="mediumseagreen">#3cb371</color><!--中海蓝 -->
<color name="limegreen">#32cd32</color><!--橙绿色 -->
<color name="midnightblue">#191970</color><!--中灰兰色 -->
<color name="aqua">#00ffff</color><!--浅绿色 -->
<color name="cyan">#00ffff</color><!--青色 -->
<color name="springgreen">#00ff7f</color><!--春绿色 -->
<color name="lime">#00ff00</color><!--酸橙色 -->
<color name="mediumspringgreen">#00fa9a</color><!--中春绿色 -->
<color name="darkturquoise">#00ced1</color><!--暗宝石绿 -->
<color name="deepskyblue">#00bfff</color><!--深天蓝色 -->
<color name="navy">#000080</color><!--海军色 -->
<color name="black">#000000</color><!--黑色 -->
<color name="darkslategray">#2f4f4f</color><!--暗瓦灰色 -->
<color name="darkslategrey">#2f4f4f</color><!--暗瓦灰色 -->
<color name="seagreen">#2e8b57</color><!--海绿色 -->
<color name="forestgreen">#228b22</color><!--森林绿 -->
<color name="lightseagreen">#20b2aa</color><!--亮海蓝色 -->
<color name="dodgerblue">#1e90ff</color><!--闪兰色 -->
<color name="honeydew">#f0fff0</color><!--蜜色 -->
<color name="aliceblue">#f0f8ff</color><!--艾利斯兰 -->
<color name="khaki">#f0e68c</color><!--黄褐色 -->
<color name="lightcoral">#f08080</color><!--亮珊瑚色 -->
<color name="palegoldenrod">#eee8aa</color><!--苍麒麟色 -->
<color name="violet">#ee82ee</color><!--紫罗兰色 -->
<color name="darksalmon">#e9967a</color><!--暗肉色 -->
<color name="lightgreen">#90ee90</color><!--亮绿色 -->
<color name="darkseagreen">#8fbc8f</color><!--暗海兰色 -->
<color name="saddlebrown">#8b4513</color><!--重褐色 -->
<color name="darkmagenta">#8b008b</color><!--暗洋红 -->
<color name="darkred">#8b0000</color><!--暗红色 -->
<color name="blueviolet">#8a2be2</color><!--紫罗兰蓝色 -->
<color name="lightskyblue">#87cefa</color><!--亮天蓝色 -->
<color name="lavender">#e6e6fa</color><!--淡紫色 -->
<color name="lightcyan">#e0ffff</color><!--亮青色 -->
<color name="burlywood">#deb887</color><!--实木色 -->
<color name="crimson">#dc143c</color><!--暗深红色 -->
<color name="plum">#dda0dd</color><!--洋李色 -->
<color name="gainsboro">#dcdcdc</color><!--淡灰色 -->
```