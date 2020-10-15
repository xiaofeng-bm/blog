---
title: Promise源码二
date: 2020-10-15
---

## 链式调用
看下面一个例子，思考如何改造我们的`MyPromise`构造函数：
```js
new Promise((resolve, reject) => {
  resolve('成功')
}).then(res => {
  console.log('res1=', res) // res1= 成功
  return 'first then'
}).then(res => {
  // 这里的res是上一个then函数return的值
  console.log('res2=', res) // res2= first then
})
```
:::tip
在阮一峰的`ECMAScript6入门`中说道：`then`方法返回的是一个新的`Promise`实例（注意：不是原来的那个`Promise`实例），因此可以采用链式写法，即`then`方法后面在调用另一个`then`方法
:::