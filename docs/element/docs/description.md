# 组件库的设计实现
这节了解一下element-ui源码的一些目录结构，以及弄懂element-ui是在我们的代码中是如何起作用的。

在往下看之前先[element-ui](https://github.com/ElemeFE/element)clone一份代码下来对照

## 主体目录结构
```bash
|—— build                       
|—— examples                             // 示例
|—— packages                             // 组件目录（所有组件都存放这个下面）
    |—— theme-chalk                      // css存放目录
|—— src                                  // src不用说，存放入口文件，mixins，utils等
|—— test                                 // 测试代码
|—— types                                // typescript类型
```

## Vue.use(Elemenet)背后做了什么
我们在使用element-ui的时候。都少不了以下两步：
```js
import Element from 'element-ui';
Vue.use(Element)
```
了解之前，我们需要先去vue官网了解一下vue[插件](https://cn.vuejs.org/v2/guide/plugins.html)以及vue的[全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)  

在我们执行`Vue.use(Element)`的时候，element-ui就是利用了以上两个特性，将组件注册为vue的全局组件。

实现代码如下（简写）：  
`element/src/index.js`
```js
import Button from '../packages/button/index.js';

const components = [
  Button
]
const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install
}
```

`element/packages/button/index.js`
```js
import ElButton from './src/button';
export default ElButton
```

`element/packages/button/src/button.vue`
```vue
<template>
  <button class="el-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  // 注意：name必须提供
  name: 'ElButton'
}
</script>
```




