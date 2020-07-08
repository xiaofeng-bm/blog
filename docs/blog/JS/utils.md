# 工具函数
记录一些常用的工具函数的实现

## 深拷贝
由于js的对象类型一般都是按引用传递的，最终都是指向一个内存地址，如果不注意的话，有时候改一个就可能导致很多地方改变。所以有时候我们需要对`Object`类型的数据进行深拷贝。

### 方法一JSON.parse(JSON.stringify(obj))
```js
let obj = {
  val: "11",
  next: {
    val: "22",
    next: {
      val: "33",
    },
  },
};
let newObj = JSON.parse(JSON.stringify(obj));
obj.next.val = "44";
console.log("旧对象=", obj); // 旧对象= { val: '11', next: { val: '44', next: { val: '33' } } }
console.log("新对象=", newObj); // 新对象= { val: '11', next: { val: '22', next: { val: '33' } } }
```
上面可以看出，引用类型的数据也能成功克隆，新旧对象不会互相影响，适用于大部分情况。<br/>
但是，上面这种方法无法处理`函数`、`正则`、`循环引用`、`undefined`等等。上面方法只适用于对象是一个严格的JSON对象时，可以用。

面试中经常会问到怎么实现一个深拷贝，大部分情况下，面试官想让你说的是`递归`方法实现深拷贝，一般答出`递归`的方法就够了。
```js
// 深拷贝
function deepClone(source) {
  // 递归终止条件
  if(source && typeof source !== 'object') {
    return
  }
  // let targetObj = {};
  let targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    // 判断是source[keys]是否为对象类型
    if(source[keys] && typeof source[keys] === 'object') {
      // 递归clone
      source[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
```

## 数据类型判断
js数据类型判断，稍微有点前端经验的都知道`typeof`或者`instanceof`这两种，但是这两种或多或少都有些问题。经验丰富一些的可能会知道`Object.prototype.toString.call(value) === [object type]`这种方式来进行精确的类型判断，下面说一下这种方式的用法以及原理
```js
let a = "hello world";
let b = [1, 2, 3];
let c = /\d/;
let d = {};
// 示例
console.log(Object.prototype.toString.call(a))  // [object String]
console.log(Object.prototype.toString.call(b))  // [object Array]
console.log(Object.prototype.toString.call(c))  // [object RegExp]
console.log(Object.prototype.toString.call(d))  // [object Object]

// 用法
console.log(Object.prototype.toString.call(a) === '[object String]')  // true
console.log(Object.prototype.toString.call(b) === '[object Array]')  // true
console.log(Object.prototype.toString.call(c) === '[object RegExp]')  // true
console.log(Object.prototype.toString.call(d) === '[object Object]')  // true
```
`Object.prototype.toString.call(value)`这方法你可以在各大前端开源库中看到。

### 实战用法
一般这种都会放到utils文件下，用于准确判断数据类型
```js
// 判断对象类型(这个用的最多)
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
// 判断数组类型(用的少)
export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}
// 数组一般用Array自带的isArray判断了，更加简单
export function isArray(value) {
  return Array.isArray(value)
}
// 这里省略一些其它的类型判断
// ...
```

### 原理
在网上搜了一下`Object.prototype.toString()`原理，看到的解释如下：<br/>
在ECMAScript3中，`Object.prototype.toString()`方法规范如下：
:::tip
在toString方法被调用时，会执行下面的操作步骤：<br/>
- 1、获取this对象的[[class]]属性的值
- 2、计算出三个字符串"[object ", 第一步的操作结果Result(1), 以及 "]"连接后的新字符串.
- 3、返回第二步的操作结果Result(2).<br/>
[[Class]]是一个内部属性,所有的对象(原生对象和宿主对象)都拥有该属性.在规范中,[[Class]]是这么定义的。


| 内部属性 |  描述 |
| ---- | -----| 
| [[Class]] | 一个字符串值,表明了该对象的类型. |
:::

如果上面的你看不懂，你就知道，这个方法会获取`this`对象的类型。<br/>

那我手动改一下`this`岂不是就能判断类型了。于是就出现了`Object.prototype.toString.call(value)`这种判断类型的写法，这种方法可以判断js中的所有数据类型，具体如下：
```js
let a = 123;
let b = "123";
let c = true;
let d = undefined;
let e = null;
let f = [1, 2, 3];
let g = function () {};
let h = new RegExp();
let j = {};
let k = Symbol();
let l = new Set();
let m = new Map();

let types = Object.prototype.toString;
console.log(types.call(a) === "[object Number]"); // true
console.log(types.call(b) === "[object String]"); // true
console.log(types.call(c) === "[object Boolean]"); // true
console.log(types.call(d) === "[object Undefined]"); // true
console.log(types.call(e) === "[object Null]"); // true
console.log(types.call(f) === "[object Array]"); // true
console.log(types.call(g) === "[object Function]"); // true
console.log(types.call(h) === "[object RegExp]"); // true
console.log(types.call(j) === "[object Object]"); // true
console.log(types.call(k) === "[object Symbol]"); // true
console.log(types.call(l) === "[object Set]"); // true
console.log(types.call(m) === "[object Map]"); // true
```