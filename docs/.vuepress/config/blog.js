
function getBlog(groupA, groupB, groupC, groupD, groupE) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        {
          title: '函数式编程',
          collapsable: false,
          children: [
            'JS/FP/01-什么是函数式编程'
          ]
        }
      ],
    },
    // {
    //   title: groupB,
    //   collapsable: false,
    //   children: [
    //     'HTTP/TCP',
    //   ]
    // },
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
          title: '零碎知识',
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

