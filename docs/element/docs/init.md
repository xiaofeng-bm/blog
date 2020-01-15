# 项目初始化
> [源码](https://github.com/xiaofeng-bm/learn-element-ui) tag:v0.1-init

首先在控制台执行下面命令生成`package.json`文件
```bash
npm init -y
```
## 目录创建
在根目录下创建
``` 
├── examples                        // 演示实例
├── package                         // element-ui组件放置位置
├── src                             // element-ui入口文件
├── .gitignore                      // git忽略
├── package.json
├── webpack.config.js               // webpack配置相关
```

## 安装相关库
我们需要安装`vue`，`vue-router`，以及`webpack`相关的包，执行以下命令安装：
```bash
# 更换国内镜像，以加快npm安装速度(可选，建议)
npm install --registry=https://registry.npm.taobao.org

# 安装vue vue-router
npm i vue vue-router --save

# 安装webpack相关插件 
npm i webpack webpack-cli webpack-dev-server --save-dev
# 安装相关loader
npm i vue-loader vue-template-compiler html-webpack-plugin --save-dev
```


## 配置webpack
在`webpack.config.js`中添加如下代码
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://vue-loader.vuejs.org/zh/guide/#vue-cli
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: [
      './examples/main.js'
    ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    open: true
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'learn element-ui examples',
      template: path.resolve(__dirname, './examples/index.html')
    }),
    new VueLoaderPlugin()
  ],
  // 别名配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
```

在examples目录下创建以下三个文件：
```
|—— examples
    |—— App.vue
    |—— index.html
    |—— main.js
```
`App.vue`
```vue
<template>
  <div id="app">
    hello world
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
```
`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
`main.js`
```js
import Vue from 'vue';
import App from './App.vue';


new Vue({
  render: h => h(App),
}).$mount('#app')
```

## 添加启动命令
在`package.json scripts`中添加启动命令：
```json
"scripts": {
  "dev": "webpack-dev-server"
},
```
执行`npm run dev`查看效果，如果页面显示hello world表示成功。

