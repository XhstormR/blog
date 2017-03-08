+++
Categories = ["JAVA"]
date = "2016-07-27T14:25:38+08:00"
title = "集合"

+++

<!--more-->

Updated on 2016-08-01

> {{< image "/uploads/java-collection.svg" "集合框架" "1" "1" >}}

* 集合：能够存储 **任意数量** 且具有 **共同属性** 的对象的 **容器**。
  * 集合容量可变，数组容量固定。各自工具类：`java.util.Collections` | `java.util.Arrays`。
  * 集合中的元素是任意类型的对象的引用，泛型则规定集合只能存放特定类型的对象。
  * 集合存储的是对象的 **引用**，默认为 `Object` 类型，可通过泛型指定存入集合的对象类型（泛型的子类也可存入集合）。
      * 基本数据类型可通过包装类转换成引用数据类型。

## List[.](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/util/ArrayList.html) and Set[.](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/util/HashSet.html)
```java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));     Arrays.asList() 将数组转化为 List
String[] strings = {"1", "2", "3"};

集合转数组
String[] ListToArray = new String[list.size()];
list.toArray(ListToArray);

增
----
list.add("A");     A B C A     加入集合
list.add(0, "A");     A A B C     插入集合
list.addAll(1, Arrays.asList(strings));     A 1 2 3 B C     插入集合

删
----
list.remove(0);     B C     删除集合中的对象
list.remove(string);     B C     删除集合中的对象     String string = list.get(0) 获得对象的引用
list.removeAll(Arrays.asList(strings));     C     删除集合中的对象     String[] strings = {list.get(0), list.get(1)} 获得对象的引用并转换为 List

改
----
list.set(1, "A");     A A C     修改集合中的对象

查
----
list.get(0);     获得对象 A
list.size();     获得集合容量
list.indexOf("A")     0     索引对象，没有匹配对象则返回 -1     实现原理同 contains 方法
list.contains("A")     true     是否包含该对象     该方法调用对象的 equals 方法进行比较；通过重写 equals 方法使其比较数据本身，而不是对象内存地址，以获得更好的扩展。
list.containsAll(Arrays.asList("A", "C"))     true     是否包含该对象            ⇳
                                                                                                                HashSet 先比较 hashCode，再调用 equals 方法，所以还需要重写 hashCode 方法。
遍历集合
1     foreach
for (String i : list) {
    System.out.println(i);
}

2     迭代器
Iterator iterator = list.iterator();     接收集合的迭代器
for (; iterator.hasNext(); ) {
    System.out.println(iterator.next());
}

-------------------------------------------------------
Set<String> list = new HashSet<>(Arrays.asList("A", "B", "A"));     A B
Set 是无序且不可重复的，所以不会有重复对象的引用，也不会含有具体位置的方法。
```

## Map[.](http://download.java.net/jdk/jdk-api-localizations/jdk-api-zh-cn/publish/1.6.0/html/zh_CN/api/java/util/HashMap.html)
* Map 提供一种映射关系 ⟺ **键值对**(Key,Value)，能够根据 `Key` 值快速查找 `Value` 值。
  * 键值对以 Entry 类型的对象形式存在，其中的 `Key` 值无序且不可重复。

```java
Map<Integer, String> map = new HashMap<>();

增
----
map.put(1, "A");     添加映射关系

删
----
map.remove(1);     移除指定键的映射关系，同时返回映射值 (栈的 pop)
map.clear();     清空映射关系

改
----
map.put(1, "B");     覆盖已有的映射关系

查
----
map.get(1);     获得指定键所映射的值
map.size();     获得映射关系数
map.containsKey(1);     true     是否包含该 Key     实现原理同 contains 方法
map.containsValue("A");     true     是否包含该 Value     实现原理同 contains 方法

遍历 Map
1     entrySet     键 值
Set<Map.Entry<Integer, String>> entrySet = map.entrySet();     接收包含 Entry 对象的 Set 集合
for (Map.Entry<Integer, String> entry : entrySet) {
    System.out.println(entry.getKey() + " " + entry.getValue());
}

2     keySet     键
Set<Integer> keyset = map.keySet();     接收包含 Key 的 Set 集合
for (int i : keyset) {
    System.out.println(i + " " + map.get(i));
}

3     values     值
Collection list = map.values();     接收包含 Value 的 Collection 集合
for (Object i : list) {
    System.out.println(i);
}
```

## List 排序

```java
生成 10 个不重复的 10 位以内的随机字符串并排序输出
----
public class A {
    private static List<String> list = new ArrayList<>();

    public static void main(String[] args) {
        generateList();
        Collections.sort(list);     排序集合
        getList();
    }

    private static void generateList() {     生成集合
        String strings = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        String string = "";
        Random random = new Random();     实例化 Random
        for (int j = 0; j < 10; j++) {
            do {
                string = "";     重置字符串
                for (int i = 0, k = random.nextInt(10); i < k; i++) {     random.nextInt(10) 返回 [0,10) 以内的随机整数
                    string += strings.charAt(random.nextInt(62));
                }
            } while (list.contains(string));     确保字符串不重复
            list.add(string);
        }
    }

    private static void getList() {     遍历集合
        int j = 0;
        for (String i : list) {
            System.out.println("元素" + j + "：" + i);
            j++;
        }
    }
}
----
输出：
元素0：0CcjLX
元素1：DsJ9tF
元素2：ErW5sK59k
元素3：JuD
元素4：Q54tooYP
元素5：VVZ
元素6：dQStqTlKn
元素7：fwVv
元素8：pnY3c
元素9：ri6NDi

Tips：
字符串比较规则：
数字：0-9
大写字母：A-Z
小写字母：a-z

-------------------------------------------------------

对自定义类进行排序
----
public class A {
    private static List<Student> list = new ArrayList<>(Arrays.asList(new Student(1, "CC"), new Student(2, "AA"), new Student(3, "BB")));

    public static void main(String[] args) {
        Collections.sort(list);     使用默认比较规则，调用 compareTo，等同于 list.sort(null)
        getlist();
        System.out.println("---------");
        Collections.sort(list, new Student());     使用临时比较规则，调用 compare，等同于 list.sort(new Student())
        getlist();
    }

    private static void getlist() {
        for (Student i : list) {
            System.out.println(i.id + ":" + i.name);
        }
    }
}

class Student implements Comparable<Student>, Comparator<Student> {     实现接口
    int id;
    String name;

    Student() {
    }

    Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(Student o) {     默认比较规则
        return ((Integer) this.id).compareTo(o.id);     比较 id
    }

    @Override
    public int compare(Student o1, Student o2) {     临时比较规则
        return o1.name.compareTo(o2.name);     比较 name
    }
}
----
输出：
1:CC
2:AA
3:BB
---------
2:AA
3:BB
1:CC

Tips：
实现以下接口代表该类是可以比较大小的，可以进行自然排序：
java.lang.Comparable     默认比较规则     compareTo(Object o)
java.util.Comparator       临时比较规则     compare(Object o1, Object o2)
返回值：
0      相等     o1=o2
1      大于     o1>o2
-1     小于     o1<o2
```