+++
Categories = ["Android"]
date = "2016-11-19T08:00:39+08:00"
title = "JsonUtil"

+++

<!--more-->

Updated on 2016-11-19

> https://github.com/google/gson

## JsonUtil.java
```java
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import java.util.ArrayList;
import java.util.List;

public class JsonUtil {
    private static Gson mGson = new Gson();     单例模式

    public static <T> String objectToString(T object) {     对象，List ➜ String
        return mGson.toJson(object);
    }

    public static <T> T stringToObject(String json, Class<T> classOfT) {     String ➜ 对象
        return mGson.fromJson(json, classOfT);
    }

    public static <T> List<T> stringToList(String json, Class<T> classOfT) {     String ➜ List
        List<T> list = new ArrayList<>();
        JsonArray jsonArray = new JsonParser().parse(json).getAsJsonArray();
        jsonArray.forEach(jsonElement -> list.add(mGson.fromJson(jsonElement, classOfT)));
        return list;
    }
}
```

## Test.java
```java
import java.util.Arrays;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        People people = new People("ABC", 25);
        List<People> peoples = Arrays.asList(people, people, people);

        String s1 = JsonUtil.objectToString(people);
        String s2 = JsonUtil.objectToString(peoples);

        People p1 = JsonUtil.stringToObject(s1, People.class);
        List<People> p2 = JsonUtil.stringToList(s2, People.class);

        System.out.println(s1);
        System.out.println(s2);
        System.out.println(p1);
        System.out.println(p2);
    }

    private static class People {
        private String name;
        private int age;

        private People(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return "People{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    '}';
        }
    }
}
----
输出：
{"name":"ABC","age":25}
[{"name":"ABC","age":25},{"name":"ABC","age":25},{"name":"ABC","age":25}]
People{name='ABC', age=25}
[People{name='ABC', age=25}, People{name='ABC', age=25}, People{name='ABC', age=25}]
```