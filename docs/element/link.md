# link文字链接
我们先来实现一个最简单的`link文字链接`组件

## 需求分析
查看`element`源码中`package/link/src/main.vue`会发现，`link`组件本质上就是我们`html`中的`a`链接，加了一个`slot`用于获取传入的内容。
### 可选属性如下

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| type           | 类型                   | string  | primary / success / warning / danger / info | default |
| underline      | 是否下划线                         | boolean | —                                    | true    |
| disabled       | 是否禁用状态                       | boolean | —                                    | false   |
| href           | 原生 href 属性                     | string  | —                                    | -       |
| icon           | 图标类名                       | string  | —                                    | -       |


## 实现
首先根据分析，在`package/link/src/main.vue`写出如下代码：
```vue
<template>
  <a href="#">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'ElLink'
  }
</script>
```
在`src/views`目录下，创建`link.vue`用于查看效果，代码如下：
```vue
<template>
  <div>
    <el-link>普通文字</el-link>
  </div>
</template>
```
同时在`src/router.js`中添加为`/link`路由，方便查看，代码如下:
```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes:[
    {
      path: '/link',
      component: () => import('@/views/link')
    }
  ]
})
```
运行`npm run dev`，打开`localhost:8080/#/link`，看到效果如下：
![link image](./img/link1.png)