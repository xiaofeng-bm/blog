---
title: CSS-BEM规范
date: 2020-09-03
---

写class类名的时候，是不是经常会有中不知道起个啥名的感觉，随便起一个吧，感觉没语义，起个有语义的吧，有时候class太多，容易重复，就感觉非常蛋疼。

当我查看`element-ui`的样式文件时，发现一堆诸如`__`、`--`这种连接符，仔细看吧，感觉人家这名起的真好，看类名就差不多知道啥意思了，网上寻摸了一通发现这种命名是遵循一个叫做`BEM`的命名规则，

## BEM
BEM代表三个英文单词`块(block)`、`元素(element)`、`修饰符(modifier)`。举个例子`el-button--primary`

BEM能解决如下问题：
- 1、语义化
- 2、命名冲突问题

分析下图，如果是你，你会怎么写它的html:
![1](../images/css/bem1.png)<br/>

我会写出如下的html结构：
```html
<div class="dashboard">
  <!-- 面板模块：panel -->
  <div class="db-panel">
    <div class="db-panel--user">用户数量：102,400</div>
    <div class="db-panel--message">消息：81,212</div>
    <div class="db-panel--money">收入：9288</div>
    <div class="db-paenl--shoppings">商品数量：13,600</div>
  </div>
  <!-- 趋势图：trend -->
  <div class="db-trend">
    <div class="db-trend-line">xxx</div>
  </div>

  <!-- 图表:echarts -->
  <div class="db-echarts">
    <!-- 雷达图 -->
    <div class="db-echarts--radar"></div>
    <!-- 饼图 -->
    <div class="db-echarts--pie"></div>
    <!-- 柱图 -->
    <div class="db-echarts--line"></div>
  </div>
</div>
```
拿`db-echarts--line`举例，`db`代表整个大的模考，`echarts`代表图标块，



<!-- 看下图：
![1](../images/css/bem1.png)<br/>

上图对应的html结构如下:
```html
<div class="app">
  <div class="nva">xxx</div>
  <div class="main">
    <header class="header"></header>
    <main class="context"></main>
  </div>
</div>
```
上面这样写没啥问题。但是容易造成命名冲突，就拿`header`这个类名来说，将来用的地方简直不要太多，好多模块都有`header`，如果我们按照BEM的规范来改写上面的代码看看是不是会好些，代码如下：
```html
<div class="app">
  <div class="app-nva">xxx</div>
  <div class="app-main">
    <header class="main-header"></header>
    <main class="main-context"></main>
  </div>
</div>
```
通过上面的命名，关看名字就明白层级关系了。

## element-ui中的BEM规范 -->

