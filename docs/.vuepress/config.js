module.exports = {
  base: '/blog/',
  theme: 'reco',
  title: '晓枫博客',
  description: '前端学习路上的记录、总结',
  port: 3001,
  themeConfig: {
    valineConfig: {
      appId: 'dB2GgqbmVNSdxBwgmEF0M8uo-gzGzoHsz',// your appId
      appKey: 'oTWmYn4vcYcbCHwUF73sSMXA', // your appKey
    },
    nav: [
      {
        text: '文章',
        ariaLabel: '了解更多',
        items: [
          { 
            items: [
              {
                text: '数据结构与算法',
                link: '/algorithm/', 
              },
              // {
              //   text: 'js设计模式',
              //   link: '/design-patterns/'
              // },
              {
                text: 'leetcode解题', 
                link: '/leetcode/' 
              }
            ]
          },
          {
            items: [
              {
                text: '博客',
                link: '/blog/'
              }
            ]
          }
        ]
      },
      {
        text: '源码分类',
        items: [
          { text: 'element-ui源码解析', link: '/element/' },
          // { text: 'ts-axios', link: '/ts-axios/' },
        ]
      }
    ],
    sidebar: {
      '/element/': getElementUI(),
      '/algorithm/': getAlgorithm(),
      '/design-patterns/': getDesignPatterns(),
      '/leetcode/': getLeetcode(),
      '/blog/': getBlog('JS', 'CSS', 'HTML')
    }
  },
}

function getElementUI() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'docs/description',
        'docs/button',
        'docs/layout',
        // 'docs/input',
        'docs/notification',
        // 'docs/form/base',
        'docs/BmTable'
      ]
    }
  ]
}

function getBlog(groupA, groupB, groupC) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'JS/face-object',
        'JS/number-precision',
        'JS/utils',
        'JS/scrollTo',
        'JS/RegExp',
        'JS/unique'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'CSS/selectors',
        'CSS/DOM树和CSSOM树',
        'CSS/重绘&重排',
        'CSS/移动端屏幕适配'
      ]
    }
  ]
}

function getAxios() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'base/axios'
      ]
    }
  ]
}

// 数据结构与算法笔记
function getAlgorithm() {
  return [
    {
      collapsable: false,
      children: [
        '',
        // 'docs/复杂度分析',
        'docs/栈和队列'
      ]
    }
  ]
}
// js数据结构与算法
function getDesignPatterns() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'docs/面对对象',
        'docs/工厂模式'
      ]
    }
  ]
}

// leetcode笔记
function getLeetcode() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'docs/1.两数之和',
        'docs/7.整数反转',
        'docs/20.有效的括号',
        'docs/26.删除排序数组中的重复项',
        'docs/数组排序'
      ]
    }
  ]
}