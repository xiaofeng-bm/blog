---
title: vue3.0的变化
date: 2020-08-28
---
:::tip
声明：这篇博客参考黄轶大神在拉钩的一元课[Vuejs3.0核心源码解析](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=326#/sale)<br/>
以及珠峰架构学院[彻底搞定Vue3.0核心源码【3天特训营】](https://ke.qq.com/course/2771923)<br/>

ps: 我买的时候都是一块钱，现在涨价了。
:::

## Vue3.0带来哪些变化

`vue3.0`在github上叫[vue-next](https://github.com/vuejs/vue-next)，后面都叫`vue-next`，相比`vue2`，主要带来了如下变化。
- 1、typescript支持：vue2对ts的支持比较差，需要加一些第三方库之类的，我用的时候挺头疼，vue-next全部代码采用ts书写，原生支持就很好。
- 2、响应式原理优化：vue2采用的是`Object.defineProperty`，vue-next用了ES6新出的Proxy。具体好处在后面响应式原理章节介绍。
- 3、编译优化：vue2数据改变触发组件更新的粒度是组件级别的，数据改变前后会生产两个vnode，更新时就需要对这两个新旧vnode进行比对，所以一个组件的节点越多，比对速度就越慢。vue-next组件更新的时候，只会去比对`动态节点`，举例如下：
```vue
<template>
  <div id="content">
    <p class="text">static text</p>
    <p class="text">static text</p>
    <p class="text">{{message}}</p>
    <p class="text">static text</p>
    <p class="text">static text</p>
  </div>
</template>
```
上面代码，当数据message更新的时候，其实只有第三个`p标签`会改变，其它标签都不用动。在vue2中的策略是完整比对，vue-next就只会比对`<p class="text">{{message}}</p>`节点前后生成vnode的差别。
- 4、Composition API：这个API最大的好处我认为就是可以将相关逻辑的代码放一块，vue2你在写某个功能的时候，需要在`data`、`methods`、`computed`中跳来跳去。vue-next的Composition API出来后，你的变量声明，使用等等都可以放在一块了，具体可以去看看官网图[组合式API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api)
- 5、还有一些改动，比如取消mixin等等的，可以去看[v3迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)。


