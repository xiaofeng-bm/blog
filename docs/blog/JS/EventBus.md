---
title: Event-Bus/Event-Emitter
date: 2020-08-04
---
面试题：手动实现一个Event Bus/Event Emitter

Vue用久的人一般都知道Bus总线这个东西，如果你的项目比较小，并且需要相对较少的跨组件通信的话，就会考虑用一个bus总线来实现，当然如果大项目的话，还是用Vuex比较好。

昨天面试让实现一个EventEmitter，我就写出了on和emit，off和once写的不太对，今天总结一下，手动写一下。


```js
class EventEmitter {
  constructor() {
    // handler是一个对象，key是事件名称，value是数组，存贮所有的回调函数
    this.handler = {};
  }
  // on方法用于安装事件监听器，它接收目标事件名和回调函数
  on(eventName, cb) {
    // 先检车目标事件名有没有对应的监听函数队列
    if (!this.handler[eventName]) {
      // 没有则初始化一个函数监听队列
      this.handler[eventName] = [];
    }
    // 将当前回调函数推入相应的队列
    this.handler[eventName].push(cb);
  }
  // emit方法用于触发目标事件，它接受事件名和参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handler[eventName]) {
      // 取出队列，循环执行回调函数
      this.handler[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }
  // off移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handler[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb.apply(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
```