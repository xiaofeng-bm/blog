---
title: Promise源码一
date: 2020-10-13
---

JS 为了好操作 DOM，设计成了单线程模式，也就是说干啥都得排队，前一个干完了后一个才能开始。  
但是这样带来一个问题就是`慢`，而且某些非常耗时的东西没执行完，后面的都得等着，比如定时器，网络请求等等。为了解决这个问题，JS 引擎吧一些耗时的操作设计成了异步。

一开始我对异步这个概念有点懵，心想既然 JS 是单线程的，单线程不是得等吗，那这个异步是怎么搞的，后来查询资料知道，当浏览器遇到异步的时候，浏览器是多线程的，会重新开辟一个线程去执行异步代码，JS 主线程继续向下执行，当异步执行有结果后，通过回调函数将结果返还给 JS 主线程。

JS 中我们熟悉的异步有 setTimeout、setInterval、promise、generator、async 等。

setTimeout 先不说，我们最熟悉的应该就是 promise 了，几乎天天用，这一节就探讨一下 promise 内部实现机制。

## promise 基本结构

promise 必须接收一个函数作为参数，该函数包含两个函数参数 resolve 和 reject。

```js
new Promise((resolve, reject) => {
  // 注意，他俩只能调用一个，如果俩都写，只会以第一个为主，这里只是为了演示一下
  resolve("成功");
  reject("失败");
});
```

### promise 类

```js
// 入参判断
const isFunction = (variable) => typeof variable === "function";
class MyPromise {
  constructor(handle) {
    // 入参必须是一个函数
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    // 执行入参
    handle(this.resolve, this.reject);
  }
  // 注意这里用箭头函数绑定this，不然后面调用resolve的时候，因为所处环境变了，this就丢了
  resolve = (val) => {
    // todo
  };
  reject = (err) => {
    // todo
  };
}
```

### 状态

:::tip
Promise 对象存在三种状态，分别是进行中（pending）、成功（fulilled）、失败（rejected），并且状态只能由 pedding 转变为 fulilled 或 rejected，并且改变完成后，这个状态是不可逆的，也就说改变完成后，这个状态就固定了，不能在变了。
:::

```js
// 状态常量
const PENDING = "pending"; // 等待
const FULFILLED = "fulfilled"; // 成功
const REJECTED = "rejected"; // 失败

class MyPromise {
  constructor(handle) {
    ...
    // 初始化状态
    this.status = PENDING;
  }
  resolve = (val) => {
    // 如果状态改变了，阻止程序向下执行
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
  }
  reject = (err) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
  }
}
```

## then 方法

Promise 有一个`then`方法，接收两个回调函数作为参数，第一个为成功的回调，第二个为失败的回调

```js
class MyPromise {
  ...
  then(onFulfilled, onRejected) {
    // 判断状态status，不同的状态调用不同的回调
    if(this.status === FULFILLED) {
      onFulfilled();
    } else {
      onRejected();
    }
  }
}
```

在调用成功或者失败回调的时候，应该吧对应的 value 传递过去，我们进一步完成这个功能

```js
class MyPromise {
  constructor(handle) {
    ...
    // 初始化value
    this.value = undefined;
  }

  resolve = (val) => {
    ...
    // 保存成功传入的参数
    this.value = val;
  }
  reject = (err) => {
    ...
    // 保存失败传入的参数
    this.value = err;
  }

  then(onFulfilled, onRejected) {
    const { value, status } = this
    // 判断状态status，不同的状态调用不同的回调
    if (status === FULFILLED) {
      onFulfilled(value);
    } else if (status === REJECTED) {
      onRejected(value);
    }
  }
}
```

当前完整代码如下：

```js
// 状态常量
const PENDING = "pending"; // 等待
const FULFILLED = "fulfilled"; // 成功
const REJECTED = "rejected"; // 失败
// 入参判断
const isFunction = (variable) => typeof variable === "function";
class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    // 初始化状态
    this.status = PENDING;
    // 初始化value
    this.value = undefined;
    // 执行入参函数
    handle(this.resolve, this.reject);
  }
  // 注意这里用箭头函数绑定this，不然this就丢了
  resolve = (val) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    // 保存成功传入的参数
    this.value = val;
  };
  reject = (err) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    // 保存失败传入的参数
    this.value = err;
  };

  then(onFulfilled, onRejected) {
    const { value, status } = this;
    // 判断状态status，不同的状态调用不同的回调
    if (status === FULFILLED) {
      onFulfilled(this.value);
    } else if (status === REJECTED) {
      onRejected(value);
    }
  }
}
// 测试
new MyPromise((resolve, reject) => {
  resolve("成功");
}).then((res) => {
  console.log("res=", res); // res= 成功
});
new MyPromise((resolve, reject) => {
  reject("失败");
}).then(
  (res) => {
    // 因为promise失败了，所有不会走这个回调
  },
  (err) => {
    console.log("err=", err); // err= 失败
  }
);
```

## 异步逻辑

上面我们实现了一个最基础的 promise，但是还存在很多问题，我们一一来解决。

上面我们写的代码遇到异步逻辑的时候，就无法正常处理了，比如下面的测试代码：

```js
new MyPromise((resolve, reject) => {
  // 这里用setTimeout模拟请求
  setTimeout(() => {
    resolve('成功')
  }, 2000)
}).then(res => {
  console.log('res=', res)
})

// 2秒后控制台打印是空，并不符合我们的预期。我们预期是2秒后打印res=成功

// 在看下面代码
class MyPromise {
  ...
  then(onFulfilled, onRejected) {
    const { value, status } = this;
    // 上面代码当我们调用then方法的时候status还处于pendding状态，所以成功和失败的回调都没有被调用。
    // 此时执行then方法，相当于啥也没干。
    if (status === FULFILLED) {
      onFulfilled(this.value);
    } else if (status === REJECTED) {
      onRejected(value);
    }
  }
}
```

为了解决上面异步的问题，我们需要把成功或者失败的回调放到调用`resolve`或者`reject`这两个函数中去执行。  
因为我们要在`.then`中拿到`promise`执行的返回值，而这个值只有在执行了`resolve`或者`reject`的时候才会有。

```js
class MyPromise {
  constructor(handle) {
    ...
    // 成功回调队列：这里之所以是队列，
    // 原因是一个promise函数可以被多次then调用，每次调用传入的回调都要存起来
    // 当status改变的时候去依次执行
    this.fulfilledCallback = [];
    // 失败回调队列
    this.rejectedCallback = [];
    ...
  }
  // 注意这里用箭头函数绑定this，不然this就丢了
  resolve = (val) => {
    ...
    // 循环执行成功队列，直到队列为空
    while(this.fulfilledCallback.length) {
      // 取出队列第一个回调函数并执行
      this.fulfilledCallback.shift()(this.value)
    }
  };
  reject = (err) => {
    ...
    // 循环执行失败队列，直到队列为空
    while(this.rejectedCallback.length) {
      // 取出队列第一个回调函数并执行
      this.rejectedCallback.shift()(this.value)
    }
  };

  then(onFulfilled, onRejected) {
    const { value, status } = this;
    // 判断状态status，不同的状态调用不同的回调
    if (status === FULFILLED) {
      onFulfilled(this.value);
    } else if (status === REJECTED) {
      onRejected(value);
    } else {
      // 当status状态为pedding时，说明还未获取到promise的值，此时将成功，失败回调存储起来
      this.fulfilledCallback.push(onFulfilled);
      this.rejectedCallback.push(onRejected);
    }
  }
}

let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 1000)
})

promise.then(res => {
  console.log('res1=', res) // res1=成功
})
promise.then(res => {
  console.log('res2=', res) // res2=成功
})
promise.then(res => {
  console.log('res3=', res) // res3=成功
})
```

