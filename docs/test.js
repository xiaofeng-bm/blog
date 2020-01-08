function deepClone(source) {
  // 递归终止条件
  if (source && typeof source !== 'object') {
    return
  }
  // let targetObj = {};
  let targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    // 判断是source[keys]是否为对象
    if (source[keys] && typeof source[keys] === 'object') {
      // 递归克隆
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
let obj = {
  role: '大区经理',
  children: {
    role: '地区经理1',
    children: {
      role: '代表1'
    }
  }
}
let result = deepClone(obj);
obj.children.role = 'xxxx'
console.log('result=',result)
console.log('obj=',obj)