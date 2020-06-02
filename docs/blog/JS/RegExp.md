# 正则表达式

:::tip
mdn: 正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript中，正则表达式也是对象。这些模式被用于 RegExp 的 exec 和 test 方法, 以及 String 的 match、matchAll、replace、search 和 split 方法。<br/>
维基百科：正规表达式使用单个字符串来描述、匹配一系列符合某个句法规则的字符串。在很多文本编辑器里，正规表达式通常被用来检索、替换那些符合某个模式的文本。
:::
我更喜欢维基百科的描述。

## 创建一个正则表达式
可以使用以下两种方式创建：
```js
// 字面量形式（比较常用）
var rep = /ab+c/;
// 对象形式
var rep = new RegExp("ab+c");
```

## 基本语法
<style>
table tbody tr td:first-of-type,
table tbody tr td:nth-of-type(3) {
  color: #c90b33;
  background-color: rgba(27,31,35,0.05);
}
table tbody tr:nth-child(2n) {
  background-color: transparent;
}
</style>

| 参数 |  说明 | 参数 | 说明 |
| ---- | -----| ---- | ---- |
| [xyz]	 | 	一个字符集，匹配任意一个包含的字符 | [^xyz] | 一个否定字符集，匹配任何未包含的字符 |
| \w | 	匹配字母或数字或者下划线的字符 | [^xyz] | 匹配不是字母，数字，下划线的字符 |
| \s | 	匹配任意空白符 | [^xyz] | 匹配不是空白符的字符 |
| \d | 	匹配数字  | [^xyz] | 匹配非数字的字符 |
| \b | 	匹配单词的开始或结束的位置 | [^xyz] | 匹配不是单词开头或结束的位置 |
| $	| 	匹配字符串的开始 | [^xyz] | 匹配字符串的结束 |


使用正则表达式的方法
| 方法 | 说明 |
| ---- | ---- |
| exec |	一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回 null）。
| test |	一个在字符串中测试是否匹配的RegExp方法，它返回 true 或 false。
| match |	一个在字符串中执行查找匹配的String方法，它返回一个数组，在未匹配到时会返回 null。
| matchAll |	一个在字符串中执行查找所有匹配的String方法，它返回一个迭代器（iterator）。
| search |	一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。
| replace |	一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。
| split |	一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 String 方法。

当你想要知道在一个字符串中的一个匹配是否被找到，你可以使用 test 或 search 方法；想得到更多的信息（但是比较慢）则可以使用 exec 或 match 方法。