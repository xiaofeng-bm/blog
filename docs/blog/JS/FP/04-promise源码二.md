---
title: Promise源码二
date: 2020-10-15
---

## 链式调用

看下面一个例子，思考如何改造我们的`MyPromise`构造函数：

```js
new Promise((resolve, reject) => {
  resolve("成功");
})
  .then((res) => {
    console.log("res1=", res); // res1= 成功
    return "first then";
  })
  .then((res) => {
    // 这里的res是上一个then函数return的值
    console.log("res2=", res); // res2= first then
  });
```

:::tip
在阮一峰的`ECMAScript6入门`中说道：`then`方法返回的是一个新的`Promise`实例（注意：不是原来的那个`Promise`实例），因此可以采用链式写法，即`then`方法后面在调用另一个`then`方法。

采用链式的`then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该`Promise`对象的状态发生变化，才会被调用。
:::

上面的话总结两点就是：

- 1、then 方法返回的是一个新`Promise`实例，因此可以通过`.then`继续调用
- 2、then 方法有可能返回的还是一个`Promise`对象，此时下一个`then`就会等这个`Promise`有结果后在执行里面的回调函数

代码如下，我会详细添加注释：

```js
/**
 * 处理then方法回调函数中的返回值
 * @param {*} val
 * @param {*} resolve
 * @param {*} reject
 */
const resolvePromise = (val, resolve, reject) => {
  // 因为then方法返回的还可能是一个Promise实例。
  // 所以这里要判断一下，如果是Promise实例，进一步处理一下。
  if (val instanceof MyPromise) {
    // val.then((res) => resolve(res), (err) => reject(err))
    // 等价于
    val.then(resolve, reject);
  } else {
    resolve(val);
  }
};

class MyPromise {
  then(onFulfilled, onRejected) {
    // then方法返回一个新的Promise实例
    return new MyPromise((resolve, reject) => {
      const { value, status } = this;
      // 判断状态status，不同的状态调用不同的回调
      if (status === FULFILLED) {
        // 获取return的返回值
        let res = onFulfilled(value);
        resolvePromise(res, resolve, reject);
      } else if (status === REJECTED) {
        let res = onRejected(value);
        resolvePromise(res, resolve, reject);
      } else {
        // 当status状态为pedding时，说明还未获取到promise的值，此时将成功，失败回调存储起来
        // 处理return还是一个Promise对象的情况
        this.fulfilledCallback.push(() => {
          let res = onFulfilled(this.value);
          resolvePromise(res, resolve, reject);
        });
        this.rejectedCallback.push(() => {
          let res = onRejected(this.value);
          resolvePromise(res, resolve, reject);
        });
      }
    });
  }
}

// 测试代码
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 500);
})
  .then((res) => {
    return new MyPromise((resolve, reject) => {
      resolve("first then resolve");
    });
  })
  .then((res) => {
    console.log("res=", res); // first then resolve
  });
```

## catch
catch方法很简单，其实就是`then`方法第二个回调函数的语法糖。
```js
class MyPromise {
  ...
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}
```

## 错误捕获
我们前面留了个小问题，就是加入`Promise`中那个`handle`回调执行的时候，有错误的话，我们是无法捕获到的，下面来处理一下这个问题
```js
new MyPromise((resolve, reject) => {
  // 这个错误如果我们不处理，是无法在then第二个回调中捕获到的
  throw new Error('promise is error')
  resolve('成功')
}).then(res => {
  console.log('res=', res)
}, err => {
  // 这里无法捕获到上面throw的错误
  console.log('err=', err)
})

// 处理这种情况
class MyPromise {
  constructor(handle) {
    // 通过try catch捕获错误，并将promise设置为reject，将错误返回
    try {
      handle(this.resolve, this.reject);
    } catch (error) {
      this.reject(error)
    }
  }
}
```

## 完整代码
至此，一个功能相对完善的`promise`就写完了，我感觉学习的话，到这里就差不多了，剩下一些all、finally方法就不细说了，感兴趣的可以看完整代码：
```js
// 状态常量
const PENDING = "pending"; // 等待
const FULFILLED = "fulfilled"; // 成功
const REJECTED = "rejected"; // 失败
// 入参判断
const isFunction = (variable) => typeof variable === "function";

/**
 * 处理then方法回调函数中的返回值
 * @param {*} val
 * @param {*} resolve
 * @param {*} reject
 */
const resolvePromise = (val, resolve, reject) => {
  // 判断返回值是否为MyPromise的示例，如果是，则需要等待异步的结果，获取到结果在进行处理
  if (val instanceof MyPromise) {
    // val.then((res) => resolve(res), (err) => reject(err))
    // 等价于
    val.then(resolve, reject);
  } else {
    resolve(val);
  }
};

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    // 初始化状态
    this.status = PENDING;
    // 初始化value
    this.value = undefined;

    // 成功回调队列：这里之所以是队列，
    // 原因是一个promise函数可以被多次then调用，每次调用传入的回调都要存起来
    // 当status改变的时候去依次执行
    this.fulfilledCallback = [];
    // 失败回调
    this.rejectedCallback = [];

    // 执行入参函数
    try {
      handle(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  // 注意这里用箭头函数绑定this，不然this就丢了
  resolve = (val) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    // 保存成功传入的参数
    this.value = val;
    // 循环执行成功队列，直到队列为空
    while (this.fulfilledCallback.length) {
      // 取出队列第一个回调函数并执行
      this.fulfilledCallback.shift()(this.value);
    }
  };
  reject = (err) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    // 保存失败传入的参数
    this.value = err;
    // 循环执行失败队列，直到队列为空
    while (this.rejectedCallback.length) {
      // 取出队列第一个回调函数并执行
      this.rejectedCallback.shift()(this.value);
    }
  };

  then(onFulfilled, onRejected) {
    const { value, status } = this;
    // then方法返回一个新的Promise实例
    return new MyPromise((resolve, reject) => {
      // 判断状态status，不同的状态调用不同的回调
      if (status === FULFILLED) {
        // 获取return的返回值
        let res = onFulfilled(value);
        resolvePromise(res, resolve, reject);
      } else if (status === REJECTED) {
        let res = onRejected(value);
        resolvePromise(res, resolve, reject);
      } else {
        // 当status状态为pedding时，说明还未获取到promise的值，此时将成功，失败回调存储起来
        // 处理return还是一个Promise对象的情况
        this.fulfilledCallback.push(() => {
          let res = onFulfilled(this.value);
          resolvePromise(res, resolve, reject);
        });
        this.rejectedCallback.push(() => {
          let res = onRejected(this.value);
          resolvePromise(res, resolve, reject);
        });
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(callbcak) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callbcak().then(() => value));
      },
      (err) => {
        return MyPromise.resolve(
          callbcak().then(() => {
            throw err;
          })
        );
      }
    );
  }

  static all(array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(
            (value) => addData(i, value),
            (reason) => reject(reason)
          );
        } else {
          // 普通值
          addData(i, array[i]);
        }
      }
    });
  }
}
```
