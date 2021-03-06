# js浮点数运算
众所周知js浮点数运算是比较坑的，之前一直也不在意，直到最近遇到两次浮点数运算的坑，才决定好好研究研究。

## 例子
先看如下例子：
```js
console.log(0.1 + 0.2)  // 0.30000000000000004
console.log(0.01 + 0.05)  // 0.060000000000000005
console.log(11 * 22.9)  // 251.89999999999998
console.log(-194.2111 * 10000)  // -1942110.9999999998
```
## 原因
拿0.1 + 0.2 = 0.30000000000000004这个例子来说，js会将`0.1`,`0.2`转换为二进制进行计算，最终导致了结果不准确。
```js
0.1 => 0.00011001100110011001100110011001100110011001100110011010...(1100循环)
0.2 => 0.0011001100110011001100110011001100110011001100110011010...(1100循环)
0.1 + 0.2 = 0.00011001100110011001100110011001100110011001100110011010 
            + 0.0011001100110011001100110011001100110011001100110011010
            = 0.0100110011001100110011001100110011001100110011001100111
            转10进制 = 0.30000000000000004
```

## 解决思路
解决的思路就是先将小数转换为整数，再进行运算，运算完成后再转回小数，大致如下：
```js
let a = 0.1;
let b = 0.2;
let result = ((a*10) + (b*10)) / 10       // 0.3 注：这里乘有时候也会有问题，后面会说
```

## 精确加法
思路：  
1、获取小数位数<br/>
2、确定放大倍数<br />
3、运算<br />
```js
let a = 0.01;
let b = 0.05;
console.log(a + b)        // 0.060000000000000005  错误
function add(num1, num2) {
  // 获取小数位数
  const num1Digits = (num1.toString().split('.')[1] || '').length;  // 2
  const num2Digits = (num2.toString().split('.')[1] || '').length;  // 2
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));   // 100
  // 注：这里的乘法也需要优化，后面会讲到
  return (num1 * baseNum + num2 * baseNum) / baseNum; 
} 
add(a, b)                 // 0.6                    正确
```
减法同理

## 精确乘法
思路和加法差不多，也是转为整数后进行运算，运算完在转成小数。思路如下：
- 1、以0.1*0.2=0.02为例，先将0.1 0.2转成整数1，2；
- 2、整数运算1*2=2；
- 3、2怎么转回到0.02，答案是2 / 10的((0.1小数位数+0.2小数位数))次方 = 0.02

代码实现如下：
```js
let a = 0.1;
let b = 0.2;
console.log(a * b);           // 0.020000000000000004
// 获取小数位数
function digitLength(num) {
  return num.toString().split(".")[1].length;
}
function multiply(num1, num2) {
  // num1，num2转成整数
  const num1Change = Number(num1.toString().replace(".", ""));
  const num2Change = Number(num2.toString().replace(".", ""));
  // 小数位数相加,将来还原为小数的时候用
  const baseNum = digitLength(num1) + digitLength(num2);
  // 整数相乘运算
  const value = num1Change * num2Change;
  
  return value / Math.pow(10, baseNum);
}
console.log(multiply(a, b));    // 0.02
```

解决js中小数计算精度问题的思路就是转换为整数进行计算。<br/>

注意哈，我上面的写法没处理边界条件等，只是说明思路，生产环境中推荐使用下面的`number-precision`库，代码量很少，如果不想安装的可以拷贝出来放到自己的项目中用。
推荐阅读：
[JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)
[number-precision](https://github.com/nefe/number-precision)
