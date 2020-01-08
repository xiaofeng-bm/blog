# 组件的本质
现在前端都是组件化开发，像`Vue`和`React`这类前端框架，都是组件化的开发方式，类似搭积木一样，通过一个个组件搭成一个完整的项目，好处我认为有以下两点
> 1、可以对一个大的项目进行拆分，拆分为多个模块。  
  2、重用，一些相同的模块可以重用，不用重复的写。
>
另外，经常看播客会看到有人说组件的产出就是`Virtual DOM(虚拟DOM)`，但是关于组件的发展，产出的`Virtual DOM`都没有在深入的了解过，最近不忙，准备仔细学习学习`Vue`。

## 组件的产出是什么
`Jquery`时代盛行一个叫做`模板引擎`的概念。以`lodash.template`为例说明：

```js
import { template } from 'lodash'

const compiler = template(`<h1><%= title %></h1>`)
const html = compiler({ title: 'hello world' })

document.getElementById('app').innerHTML = html;
```
通过看字面意思猜也大概知道，通过修改compiler中的title值，就可以改变h1标签的内容。  

我们在进一步将其封装为一个函数：
```js
const MyComponent = props => {
  const compiler = template('<h1><%= title %></h1>')
  return compiler(props)
}
// 使用
document.getElementById('app').innerHTML = MyComponent({ title: 'hello world' })
```
这样就写出了一个`h1`组件，我们可以通过传入不用的内容，来使其渲染不同的内容。

结论：组件的本质就是一个函数，传入什么样的数据，返回对应的html内容。像我们现在用的`Vue`,`React`本质还是一个函数，
只是这个函数产出的不再是html内容，而是`Virtual DOM`。


## Vue中的render函数
用`vue`的或多或少都听说过`render`函数，而且日常在`template`中书写的代码，最终也会通过`render`函数转换为`Virtual DOM`。  

vue中的Virtual DOM是借鉴了开源库[snabbdom](https://github.com/snabbdom/snabbdom)，借助snabbdom的api实现代码如下：
```js
import { h, init } from 'snabbdom'

// init 方法用来创建 patch 函数
const patch = init([])

const MyComponent = (props) => {
  return h('h1', props.title)
}

// 组件的产出是VNode
const prevVNode = MyComponent({ title: 'hello world' })
// 渲染
patch(document.getElementById('app'), prevVNode)

// 数据变更
const nextVNode = MyComponent({ title: '你好，世界' })
// 新旧VNode对比
patch(prevVNode, nextVNode)
```
