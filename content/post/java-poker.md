---
Categories:
- JAVA
date: 2016-08-02T09:41:40+08:00
title: 通过 Java 实现扑克牌游戏
---

<!--more-->

Updated on 2016-08-02

> {{< image "/uploads/java-poker.svg" "Java" "1" "1" >}}
>
> 分别创建了四个类：牌类(Card)、玩家类(Player)、方法类(Method)、入口类(Initial)

## Card.java
```java
class Card implements Comparable<Card> {
    String point;
    String suit;
    Integer pointWeight;
    Integer suitWeight;

    Card(String point, String suit, int pointWeight, int suitWeight) {
        this.point = point;
        this.suit = suit;
        this.pointWeight = pointWeight;
        this.suitWeight = suitWeight;
    }

    @Override
    public String toString() {
        return suit + point;
    }

    @Override
    public int compareTo(Card o) {
        int i = this.pointWeight.compareTo(o.pointWeight);
        switch (i) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return this.suitWeight.compareTo(o.suitWeight);
            default:
                return 0;
        }
    }
}
```

## Player.java
```java
import java.util.ArrayList;
import java.util.List;

class Player {
    int id;
    String name;
    List<Card> cards;

    Player(int id, String name) {
        this.id = id;
        this.name = name;
        cards = new ArrayList<>();
    }

    @Override
    public String toString() {
        return name + "：[" + cards.get(0) + "," + cards.get(1) + "]";
    }
}
```

## Method.java
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

class Method {
    static List<Card> generateCards() {
        System.out.println("---------开始洗牌-----------");
        List<Card> cards = new ArrayList<>();
        String[] suit = {"方片", "梅花", "红桃", "黑桃",};
        String[] point = {"3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"};
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 13; j++) {
                cards.add(new Card(point[j], suit[i], j, i));
            }
        }
        Collections.shuffle(cards);
        getList(cards);
        System.out.println("---------洗牌结束-----------");
        return cards;
    }

    static List<Player> generatePlayer() {
        System.out.println("---------玩家录入-----------");
        List<Player> players = new ArrayList<>();
        for (int i = 1; i < 3; i++) {
            System.out.println("请输入第" + i + "位玩家的ID和姓名：");
            while (true) {
                try {
                    players.add(getPlayer());
                    break;
                } catch (Exception e) {
                    System.out.println("请输入整数类型的ID!");
                }
            }
        }
        for (Player player : players) {
            System.out.println("欢迎玩家：" + player.name);
        }
        System.out.println("---------录入结束-----------");
        return players;
    }

    static void startDeal(List<Card> cards, List<Player> players) {
        System.out.println("---------开始发牌-----------");
        for (int i = 0, j = 0; i < 2; i++) {
            for (Player player : players) {
                System.out.println("玩家" + player.name + "拿牌");
                player.cards.add(cards.get(j));
                j++;
            }
        }
        System.out.println("---------发牌结束-----------");
    }

    static void startGame(List<Player> players) {
        System.out.println("---------开始游戏-----------");
        System.out.println("玩家各自的手牌为：");
        int cardNum = players.get(0).cards.size();
        for (Player player : players) {
            Collections.sort(player.cards);
            System.out.println(player + "；最大手牌为：" + player.cards.get(cardNum - 1));
        }
        int i = players.get(0).cards.get(cardNum - 1).compareTo(players.get(1).cards.get(cardNum - 1));
        switch (i) {
            case 1:
                System.out.println(">>>>>>>>>玩家" + players.get(0).name + "获胜<<<<<<<<<<");
                break;
            case -1:
                System.out.println(">>>>>>>>>玩家" + players.get(1).name + "获胜<<<<<<<<<<");
                break;
            case 0:
                System.out.println(">>>>>>>>>平局<<<<<<<<<");
                break;
        }
        System.out.println("---------游戏结束-----------");
    }

    private static Player getPlayer() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("ID：");
        int id = scanner.nextInt();
        System.out.print("姓名：");
        String name = scanner.next();
        return new Player(id, name);
    }

    private static void getList(List<Card> cards) {
        System.out.println("共" + cards.size() + "张：");
        int i = 0;
        for (Card card : cards) {
            System.out.print(card + "\t");
            i++;
            if (i % 13 == 0) {
                System.out.println();
            }
        }
    }
}
```

## Initial.java
```java
import java.util.List;

class Initial {
    public static void main(String[] args) {
        List<Card> cards = Method.generateCards();
        List<Player> players = Method.generatePlayer();
        Method.startDeal(cards, players);
        Method.startGame(players);
    }
}
```

## 实现效果

{{< image "/uploads/java-poker.png" "Java" "0" "1" >}}