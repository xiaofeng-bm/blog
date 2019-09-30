# 前言
作为一个前端开发，经常用`Vue`、 `element-ui`等库。用了块一年了吧，也仅仅是停留在会用的基础上，最近随着业务越来越多，渐渐的发现有时候`ui`库提供的一些方法不能满足开发需求，于是时不时的就去看看`element-ui`的源码。这样，当产品在提某些过分的需求的时候，就能理直气壮的说，源码不支持，做不了。  

[该项目源码地址](https://github.com/xiaofeng-bm/element-ui)  
[element-ui](https://github.com/ElemeFE/element) 看之前，先把`element-ui`clone一份下来，方便查看。


## 当前版本
vue-cli (3.9.3)  
element-ui (2.12.0)  
node (10.16.0)  
nmp (6.9.0)

## 整体设计思想
<!-- 如果你去看一下`element-ui`的源码，就会发现，和我们日常开发组件是差不多的，像`el-input`、`el-button`等，都是对`html`元素`input`、`button`的一些封装。然后使用`vue`的插件机制，通过Vue.component()将其注册为全局组件。
> 总之，在看的时候就把它当成 -->
> 首先明确一点，像我们平常使用`element-ui`时，写的`el-button`、`el-input`等，其背后就是一个个的组件，和你下面这么写原理是一模一样的。  
```vue
<template>
  <el-button>默认</el-button>
</template>

<script>
import ElButton from 'xxx/el-button.vue'
  export default {
    components: {
      ElButton
    }
  }
</script>
```
之所以我们不用引入，不用注册，是因为在`Vue.use(Element)`的时候，通过`Vue.component()`将这些组件注册为了`全局组件`。

所以说`element-ui`就是一个组件库，它将一些经常会用到的功能，封装成一个个的组件，我们在用的时候，通过传入`属性`、`方法`来获得不同的效果




