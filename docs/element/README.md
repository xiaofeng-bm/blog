# 前言
作为一个前端开发，经常用`Vue`、 `element-ui`等库。用了块一年了吧，也仅仅是停留在会用的基础上，最近随着业务越来越多，渐渐的发现有时候`ui`库提供的一些方法不能满足开发需求，于是时不时的就去看看`element-ui`的源码。这样，当产品在提某些过分的需求的时候，就能理直气壮的说，源码不支持，做不了。  

[该项目源码地址](https://github.com/xiaofeng-bm/element-ui)

## 目录结构
在此之前，我们需要先去`element-ui`的github[地址](https://github.com/ElemeFE/element)上clone一份源码下来，方便查看。  

有关`element-ui`的代码都放到了最外层的`package`目录下。  
`src/views`目录是我们用来演示查看的。  
`src/plugins`目录是引入我们自己写的`element-ui`组件，写法和你日常使用是一样的。

## 当前对应版本
vue-cli (3.9.3)  
element-ui (2.12.0)
node (10.16.0)
nmp (6.9.0)