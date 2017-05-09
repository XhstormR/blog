---
Categories:
- JAVA
date: 2016-07-01T16:17:53+08:00
title: 通过 Java 实现租车系统
---

<!--more-->

Updated on 2016-07-02

> {{< image "/uploads/java-rent.svg" "Java" "1" "1" >}}
>
> 分别创建了三个类：车类(Car)、方法类(Method)、入口类(Initial)

## Car.java
```java
class Car {
    private String name;
    private int rent;
    private int mannedNum;
    private int goodsNum;

    Car(String name, int rent, int mannedNum, int goodsNum) {
        this.name = name;
        this.rent = rent;
        this.mannedNum = mannedNum;
        this.goodsNum = goodsNum;
    }

    String getName() {
        return name;
    }

    int getRent() {
        return rent;
    }

    int getMannedNum() {
        return mannedNum;
    }

    int getGoodsNum() {
        return goodsNum;
    }

    @Override
    public String toString() {
        String str1 = mannedNum != 0 ? "载人:" + mannedNum + "人" + "\t" : "";
        String str2 = goodsNum != 0 ? "载货:" + goodsNum + "吨" : "";
        return name + "\t\t" + rent + "元/天\t\t" + str1 + str2;
    }
}
```

## Method.java
```java
import java.util.Scanner;

class Method {
    private static Scanner scan = new Scanner(System.in);

    static Car[] generateCars() {
        Car[] cars = new Car[3];
        cars[0] = new Car("奥迪A4", 500, 4, 0);
        cars[1] = new Car("皮卡雪", 700, 4, 2);
        cars[2] = new Car("松花江", 900, 0, 10);
        return cars;
    }

    static void displayList(Car[] cars) {
        System.out.println("欢迎使用,你可租车的类型及其价目表:");
        System.out.println("序号\t名称\t\t\t租金\t\t\t\t容量");
        for (int i = 0; i < cars.length; i++) {
            System.out.println((i + 1) + "\t\t" + cars[i]);
        }
    }

    static int getCarNum() {
        int carNum = 0;
        for (; carNum <= 0 || carNum >= 11; ) {
            System.out.println("请输入你要租车的数量(1-10):");
            carNum = scan.nextInt();
        }
        return carNum;
    }

    static int getCarDay() {
        int carDay = 0;
        for (; carDay <= 0 || carDay >= 11; ) {
            System.out.println("请输入你要租车的天数(1-10):");
            carDay = scan.nextInt();
        }
        return carDay;
    }

    static int[] getCarList(int carNum, Car[] cars) {
        int[] carList = new int[carNum];
        for (int i = 0; i < carList.length; i++) {
            int j = -1;
            for (; j < 0 || j > cars.length; ) {
                System.out.println("请输入第" + (i + 1) + "辆车的序号:");
                j = scan.nextInt();
            }
            carList[i] = j - 1;
        }
        return carList;
    }

    static void generateBill(Car[] cars, int[] carList, int carDay) {
        int sum = 0;
        int mannedNum = 0;
        int goodsNum = 0;
        String car = "";
        String truck = "";

        for (int i : carList) {
            sum += cars[i].getRent();
            if (cars[i].getMannedNum() != 0) {
                mannedNum += cars[i].getMannedNum();
                car += cars[i].getName() + "\t\t";
            }
            if (cars[i].getGoodsNum() != 0) {
                goodsNum += cars[i].getGoodsNum();
                truck += cars[i].getName() + "\t\t";
            }
        }
        sum *= carDay;

        System.out.println("———————————————————————————\n你的账单:");
        System.out.println("***可载人的车有:");
        System.out.println(car + "可载人数:" + mannedNum + "人");
        System.out.println("***可载货的车有:");
        System.out.println(truck + "可载货物:" + goodsNum + "吨");
        System.out.println("***共租了" + carList.length + "辆车,租期为" + carDay + "天,总租车价格:" + sum + "元\n———————————————————————————");
    }
}
```

## Initial.java
```java
import java.util.Scanner;

class Initial {
    private static Scanner scan = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("你是否要租车:1是 0否" + "\n请输入:");
        int num = scan.nextInt();
        for (; num != 1 && num != 0; ) {
            System.out.println("输入有误,请重新输入:");
            num = scan.nextInt();
        }
        if (num == 0) {
            System.out.println("再见!");
        } else {
            Car[] cars = Method.generateCars();
            Method.displayList(cars);
            int carNum = Method.getCarNum();
            int carDay = Method.getCarDay();
            int[] carList = Method.getCarList(carNum, cars);
            Method.generateBill(cars, carList, carDay);
            System.out.println("完成租车！");
        }
        scan.close();
    }
}
```

## 实现效果

![](/uploads/java-rent.png "Java")