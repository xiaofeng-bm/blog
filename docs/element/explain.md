# UI组件库整体设计
本章节介绍`element-ui`组件的设计思路，已经其样式`css`的一些设计思想。
## 组件设计
> 首先明确一点，像我们平常使用`element-ui`时，写的`el-button`、`el-input`等，其背后就是一个个的子组件，和你下面这么写原理是一模一样的。
>
以下节要实现的`el-link`组件为例：
```vue
<template>
  <el-link href="https://www.baidu.com/">百度一下</el-button>
</template>

<script>
import ElLink from 'xxx/el-link.vue'
  export default {
    components: {
      ElLink
    }
  }
</script>
```
`element-ui`的所有源码都放到了根目录的`package`下面，目录结构如下：
```bash
├── package                                 # 存放element-ui源码目录
│   ├── link                                 # 组件目录
│   ├── ├── src
│   ├── ├── ├── link.vue                     # 组件代码文件
│   ├── ├── index.js                        # 导出组件
│   ├── theme-chalk                         # 存放element-ui样式文件
│   ├── index.js                            # 入口文件
```
`package/xxx`用于存放单个组件，其中`package/xxx/index.js`用于将组件导出。  
`package/index.js`将所有的组件导入，并且通过`Vue.component(xxx.name, xxx)`将所有组件注册为全局组件。代码如下：
```javascript
import Link from './link/index';

const components = [
  Link
]
// install方法，参考：https://cn.vuejs.org/v2/guide/plugins.html
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
```
通过以上代码，在`Vue`中执行`Vue.use(Element)`的时候，就会将所有组件注册为[全局组件](https://cn.vuejs.org/v2/guide/components-registration.html)

### 样式(css)设计
> 说明：`element-ui`使用了`sass`库，在样式编写中，用到了`sass`的很多高级语法，比如`mixin`、`@each混合指令`等等，所以看到不懂的`sass语法`，需要去[sass官网](https://www.sass.hk/docs/)查看一下文档。
>

如果你看过`element-ui`最终渲染出来的dom元素，你会发现会有好多`el`开头的class类，比如`el-link`，如果你设置type="danger"，你审查元素还会发现一个`el-link--danger`的class类。 

`element-ui`就是通过给不同的class类，设置不同的css，通过`Vue`的[class与style绑定](https://cn.vuejs.org/v2/guide/class-and-style.html)来实现不同的效果。

看到这里不知道你是否注意过`el-link--danger`这个danger前面为啥是俩`--`，刚开始我也没注意，后来知道，这是前端领域的一种css命名规范，叫[BEM](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)命名规范，感兴趣可以看一下。




