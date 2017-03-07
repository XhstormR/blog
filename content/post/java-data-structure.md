+++
Categories = ["JAVA"]
date = "2016-10-15T10:24:45+08:00"
title = "Data Structure"

+++

<!--more-->

Updated on 2016-12-16

> https://zh.wikipedia.org/zh-cn/数据结构
>
> [https://zh.wikipedia.org/zh-cn/树_(数据结构)](https://zh.wikipedia.org/zh-cn/树_(数据结构))

## Trie 树（字典树）
```java
public class A {
    public static void main(String[] args) {
        final TrieNode root = new TrieNode();     根节点

        root.addStr("babaab");     添加字符串（字典）
        root.addStr("babbbaaaa");
        root.addStr("abba");
        root.addStr("aaaaabaa");
        root.addStr("babaababb");

        System.out.println(root.getStrCount("babb"));     返回以指定字符串开头的字典的个数
        System.out.println(root.getStrCount("baabaaa"));
        System.out.println(root.getStrCount("bab"));
        System.out.println(root.getStrCount("bb"));
        System.out.println(root.getStrCount("bbabbaab"));
    }
}

class TrieNode {
    public final Map<Character, TrieNode> nextNodes = new HashMap<>();     指向下一节点的引用
    public char aChar;     该节点所代表的值
    public int strCount;     该节点路径下所存在的单词个数
    public boolean isStr;     该节点是否代表一个单词

    public TrieNode() {     根节点构造方法
    }

    public TrieNode(char aChar) {     子节点构造方法
        this.aChar = aChar;
        this.strCount = 1;
    }

    public void addStr(String s) {     String ➜ Stack ➜ 调用 addNode
        this.addNode(toCharStack(s));
    }

    public int getStrCount(String s) {     String ➜ Stack ➜ 调用 getNode
        TrieNode node = this.getNode(toCharStack(s));
        return node.strCount;
    }

    private void addNode(Stack<Character> charStack) {
        if (charStack.empty()) {     空栈
            isStr = true;     字符串结尾
        } else {
            Character character = charStack.pop();
            TrieNode node = nextNodes.get(character);
            if (node == null) {
                node = new TrieNode(character);     不存在，创建并放入 Map 中
                nextNodes.put(node.aChar, node);
            } else {
                node.strCount++;     已存在，计数加一
            }
            node.addNode(charStack);     递归调用
        }
    }

    private TrieNode getNode(Stack<Character> charStack) {
        if (charStack.empty()) {     空栈
            return this;     存在以此为开头的节点
        } else {
            Character character = charStack.pop();
            TrieNode node = nextNodes.get(character);
            if (node == null) {
                return new TrieNode();     不存在以此为开头的节点，返回新建 TrieNode
            } else {
                return node.getNode(charStack);     递归调用
            }
        }
    }

    private Stack<Character> toCharStack(String s) {     将字符串转为字符栈（String ➜ Stack）
        Stack<Character> charStack = new Stack<>();
        char[] chars = s.toCharArray();
        for (int i = chars.length - 1; i >= 0; i--) {     注意反向压入栈，确保字符串的开头为栈顶（先出栈）
            charStack.push(chars[i]);
        }
        return charStack;
    }
}
----
输出：
1
0
3
0
0
```
