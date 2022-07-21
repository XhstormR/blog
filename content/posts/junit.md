---
author: XhstormR
categories:
- JUnit
date: 2017-05-12T16:30:19+08:00
title: JUnit
---

<!--more-->

Updated on 2017-05-12

> {{< image "/uploads/junit.png" "JUnit" "1" "1" >}}
>
> https://github.com/junit-team/junit5

## 工作原理
### ABC
```java
import org.junit.*;

public class ABC {
    @BeforeClass
    public static void A() {     静态方法
        System.out.println("A");
    }

    @AfterClass
    public static void B() {     静态方法
        System.out.println("B");
    }

    @Before
    public void a() {
        System.out.println("a");
    }

    @After
    public void b() {
        System.out.println("b");
    }

    @Test     测试用例
    public void test1() {
        System.out.println("test1");
        Assert.assertEquals(2, 1 + 1);     断言（预期值，实际值）
    }

    @Test(expected = AssertionError.class)     预期异常
    public void test2() {
        System.out.println("test2");
        Assert.fail();     直接失败（抛出 AssertionError 异常）
    }

    @Test(timeout = 1000)     超时设置（单位：毫秒）
    public void test3() throws InterruptedException {
        System.out.println("test3");
        Thread.sleep(100);
    }

    @Ignore     忽略测试用例
    @Test
    public void test4() {
        System.out.println("test4");
        Assert.assertEquals(1, 4 / 0);
    }
}

----
输出：
A
a
test1
b
a
test2
b
a
test3
b
Test ignored.
B
```

## 测试套件
### A
```java
import org.junit.Test;

public class A {
    @Test
    public void test1() {
        System.out.println("A.test1");
    }

    @Test
    public void test2() {
        System.out.println("A.test2");
    }
}
```

### B
```java
import org.junit.Test;

public class B {
    @Test
    public void test1() {
        System.out.println("B.test1");
    }

    @Test
    public void test2() {
        System.out.println("B.test2");
    }
}
```

### C
```java
import org.junit.Test;

public class C {
    @Test
    public void test1() {
        System.out.println("C.test1");
    }

    @Test
    public void test2() {
        System.out.println("C.test2");
    }
}
```

### ABC
```java
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({A.class, B.class, C.class})
public class ABC {     测试套件
}

----
输出：
A.test1
A.test2
B.test1
B.test2
C.test1
C.test2
```

## 参数设置
### ABC
```java
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.ArrayList;
import java.util.List;

@RunWith(Parameterized.class)
public class ABC {
    private int output;
    private int input1;
    private int input2;

    public ABC(int output, int input1, int input2) {     构造方法（初始化参数）
        this.output = output;
        this.input1 = input1;
        this.input2 = input2;
    }

    @Parameterized.Parameters
    public static List provide() {     静态方法（提供参数）
        ArrayList<Object> list = new ArrayList<>();
        list.add(new Object[]{2, 1, 1});
        list.add(new Object[]{5, 3, 2});
        list.add(new Object[]{8, 5, 3});
        return list;
    }

    @Test
    public void test() {
        Assert.assertEquals(output, input1 + input2);
        System.out.printf("Pass: %d = %d + %d\n", output, input1, input2);
    }
}

----
输出：
Pass: 2 = 1 + 1
Pass: 5 = 3 + 2
Pass: 8 = 5 + 3
```
