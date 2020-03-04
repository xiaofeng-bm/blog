# 组件库介绍
去[官网](https://github.com/ElemeFE/element)clone一份代码下来，在编辑器中打开，我用的是vscode。  

<!-- 话不多说，直接从入口文件来看，element-ui是如何工作的 -->

## 主要目录介绍
主要文件集中在在package和src目录下
```bash
|—— package                   // 组件源码都放在这个目录下
    |—— button                // button组件代码
        |—— src
            |—— button.vue    // button组件源码              
        |—— index.js          // 用于导出组件，以及按需引入的时候，单独注册组件
    |—— theme-chalk           // 存放所有css样式文件
|—— src 
    |—— mixins                // 存放一些公用的mixins
    |—— utils                 // 存放工具函数
    |—— index.js              // 入口文件，主要功能是将所有组件注册为vue全局组件      
```


## 入口文件分析
在看之前，最好先了解一下vue的[组件全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)和[插件机制](https://cn.vuejs.org/v2/guide/plugins.html)。  

入口文件唯一做了一件事，就是将所有组件注册为vue的全局组件。简化一下代码如下：
```js
import Button from '../packages/button/index.js';

const components = [
  Button
];
// Vue.use(Element)时会调用内部实现的install方法
const install = function(Vue) {
  // 循环将所有组件注册为vue全局组件
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install
}
```

## button组件分析

button组件源码位于`package/button`文件内，先看入口`index.js`文件：
``` js
import ElButton from './src/button';

/* 按需引入时，将button注册为vue全局组件 */
ElButton.install = function(Vue) {
  Vue.component(ElButton.name, ElButton);
};

export default ElButton;
```
很简单，一看就明白了，再去看`./src/button`，此时就看到了button组件的源码，我简写一下如下：
```vue
<template>
  <button>
    <span>
      <!-- 内部通过插槽来承接内容 --> 
      <slot></slot>
    </span>
  </button>
</template>
<script>
  export default {
    /**
     * 组件名：这个name不能少
     * src/index.js 中，Vue.components(component.name, component)注册为全局组件时，就是用的这个name
     */ 
    name: 'ElButton'    
</script>
```

### 样式文件介绍
element-ui中所有组件的样式文件都放到了`package/theme-chalk`文件中，css是用sass来写的，通过gulp编译为普通的css。  
button样式文件位于`package/theme-chalk/src/button.scss`中。你可以大致看一下，在下一节的button源码分析中，我会详细的介绍。

### 结语
看完上面的你应该大致了解element-ui的工作原理了，可以自己试着走一遍流程

[本节源码地址](https://github.com/xiaofeng-bm/learn-element-ui/tree/v1.0-init)
