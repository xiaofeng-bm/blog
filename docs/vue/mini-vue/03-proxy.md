---
title: proxy代理
date: 2020-08-05
---
[源码](https://github.com/xiaofeng-bm/mini-vue)


上节中我们访问响应式数据的时候，需要通过vm._data.xxx来访问到，我们日常开发中一般都是`this.xxx`来直接获取或者修改`data`中的数据，其实如果你去尝试，通过`this._data.xxx`也是能达到同样的效果，只是vue为了简化你的操作，做了一层代理，下面我们就来实现一下这个代理方法`proxy`。

## proxy
创建`proxy.js`文件，代码如下：
```js
/**
 * @description:
 * @param {class}: Vue中的this
 * @return {type}
 */
export function proxy(vm) {
  let data = vm._data;
  Object.keys(data).forEach((key) => {
    // 将key注入到当前this对象中
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        // 注意这里要用data[key]来获取value，要和上面defineReactive方法中的get区分开了
        // 为什么是data[key]：这里有人可能会乱，怎么一会用value，一会用data[key]，原因是我们这里只是做一层代理，你通过vm.xxx获取其实内部就是去将this._data中的数据取出来给你，往引用上想一想就明白了。
        return data[key];
      },
      set: function (newVal) {
        if (newVal === data[key]) {
          return;
        }
        data[key] = newVal;
      },
    });
  });
}
```
上面利用了`Object.defineProperty`可以在对象上定义一个新属性的特点，将`_data`中的数据都挂到当前实例（this）下，这样用的时候就能直接通过`vm.xxx`访问到了。

在`vue.js`文件中引入：
```js
import { proxy } from "./proxy";
import { observer } from "./observer";

class Vue {
  constructor(options) {
    // 1、通过属性保存选项的数据
    this.$el = options.el ? document.querySelector(options.el) : "";
    this._data = options.data;
    observer(this._data);
    proxy(this);
  }
}

export default Vue;
```
## 测试
按照上面分完组件后，整体代码功能就比之前清晰多了，现在来测试一下功能。在浏览器打开index.html。

![](https://shiluyue.oss-cn-beijing.aliyuncs.com/proxy1.png)
![](https://shiluyue.oss-cn-beijing.aliyuncs.com/proxy2.png)

## 总结
这里我们已经实现了基本的两步，代理和数据响应式，下一节就该对html的模板进行解析。