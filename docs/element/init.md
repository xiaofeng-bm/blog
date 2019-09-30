# 初始化项目
首先使用vue-cli初始化一个项目
``` bash
vue create element-ui
# 选择默认的default （babel, eslint）
```

## 目录结构

我们平常使用`element-ui`方式如下：
```javascript
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
```
需要引入`element-ui`及其`css`样式，当然，这是打包后的文件，`element-ui`的源码都放到了`package`文件中。  
此项目在`main.js`中使用方式如下：
```javascript
import Element from '../package/index'
import '../package/theme-chalk/index.css'

Vue.use(Element)
```
根据此，创建如下目录：
```bash
├── package                                 # 存放element-ui源码目录
│   ├── link                                # link文字链接组件
│   ├── theme-chalk                         # 存放element-ui样式文件
│   ├── index.js                            # 入口文件
├── public                                  # 存放静态文件
├── src                                     # main source code
│   ├── assets                              # module assets like fonts,images (processed by webpack)
│   ├── views                               # views(效果演示)
│   ├── App.vue                             # main app component
│   ├── main.js                             # app entry file
│   ├── router.js                           # 路由页面
├── .gitignore                              # gitignore
├── .babel.config.js                        # babel config
├── postcss.config.js                       # postcss config
└── package.json                            # package.json
```

## 实现install方法
以下一节的`link`组件为例，
首先，照猫画虎，先按照`element-ui`的目录结构，在`package`中添加文件
```bash
├── package
│   ├── link
│       ├── src
│           ├── main.vue
│       ├── index.js
```
在`index.js`中写入如下代码: 
```javascript
// 这部分用了下一节`link`组件的代码来举例
import ElLink from './src/main.vue'

export default ElLink
```
在`package/index.js`中引入并注册这个组件，代码如下：
```javascript
import ElLink from './link'

const components = [
  ElLink
]
```

### 注册为全局组件
> [vue插件](https://cn.vuejs.org/v2/guide/plugins.html)  
>
如果你不了解`vue插件`，先点击上面的链接去官网查看一下有关`vue插件`的介绍。  

还记得我在`前言`说过的，`element-ui`在使用的时候，之所以不用`导入`、`注册`就是因为在Vue.use(Element)的时候将其注册为了`全局组件`，而根据官网所述，[开发插件](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)需要暴露一个install方法，简单理解就是，当执行`Vue.use(Element)`这句代码时，其实就是在执行`element-ui`内部的`install`方法。  
所以我们应该在install方法里将所有的组件注册为`全局组件`。代码如下：
```javascript
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
```
最终`package/index.js`代码如下：
```javascript
import ElLink from './link'

const components = [
  ElLink
]
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
```
这部分代码对应在`elemnent`的[src/index.js](https://github.com/ElemeFE/element/blob/dev/src/index.js)中


至此，前期准备工作就完成了。