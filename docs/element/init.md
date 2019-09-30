# 初始化项目

首先使用vue-cli初始化一个项目
``` bash
vue create element-ui
# 选择默认的default （babel, eslint）
```

## 创建对应的文件
1、在最外层目录创建`package/index.js`文件，`pacakge`包用来存放`element`相关组件代码。`index.js`用于将所有组件导出。
2、`src`目录下创建`plugins/element.js`，用于在项目中导入我们写的`element-ui`相关组件。代码如下：
```javascript
import Vue from 'vue';
import Element from '../../packages/index';

Vue.use(Element);
```
接着在`main.js`中引入
```javascript
import './plugins/element'
```

## 实现install方法  
`element-ui`是作为`Vue`的一个插件来使用的，关于vue插件，不了解的话，可以先去[官网](https://cn.vuejs.org/v2/guide/plugins.html)看一下。  
`Vue`插件需要暴露一个`install`。所以在根目录的`package/index.js`下添加如下代码。
```javascript
const install = function(Vue) {

}

export default {
  install
}
```
至此，前期准备工作就完成了。