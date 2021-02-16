function getBlog(groupA, groupB, groupC, groupD, groupE) {
  return [
    {
      title: groupA,
      collapsable: true,
      children: [
        {
          title: "JS基本功",
          collapsable: true,
          children: ["JS/JS/01-JS数据类型"],
        },
        {
          title: "ES6+以及ts",
          collapsable: true,
          children: [
            "JS/ES6+&TS/01-es新特性",
            "JS/ES6+&TS/02-ts基础",
            "JS/ES6+&TS/03-js性能优化",
          ],
        },
        {
          title: "函数式编程",
          collapsable: false,
          children: [
            "JS/FP/01-函数式编程一",
            "JS/FP/02-函数式编程二",
            "JS/FP/03-promise源码一",
            "JS/FP/04-promise源码二",
          ],
        },
      ],
    },
    {
      title: groupB,
      collapsable: false,
      children: ["HTTP/TCP"],
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        "CSS/selectors",
        "CSS/DOM树和CSSOM树",
        "CSS/重绘&重排",
        "CSS/移动端屏幕适配",
      ],
    },
    {
      title: groupE,
      collapsable: true,
      children: [
        {
          title: "Git",
          collapsable: true,
          children: [
            "other/git/01-git",
            "other/git/02-ignore",
            "other/git/03-commit",
          ],
        },
        {
          title: "零碎知识",
          collapsable: true,
          children: [
            "other/other/face-object",
            "other/other/new",
            "other/other/number-precision",
            "other/other/utils",
            "other/other/scrollTo",
            "other/other/RegExp",
            "other/other/unique",
            "other/other/arrayMethods",
            "other/other/EventBus",
            "other/other/防抖与节流",
          ],
        },
      ],
    },
  ];
}
module.exports = getBlog;
