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
        text: '源码分类',
        items: [
          { text: 'Element-ui源码解析', link: '/element/' },
          { text: 'Vue源码解析', link: '/vue/' }
          // { text: 'ts-axios', link: '/ts-axios/' },
        ]
      },
      {
        text: '文章',
        ariaLabel: '了解更多',
        items: [
          { 
            items: [
              // {
              //   text: '数据结构与算法',
              //   link: '/algorithm/', 
              // },
              {
                text: 'leetcode解题', 
                link: '/leetcode/' 
              },
              {
                text: '设计模式',
                link: '/design-patterns/'
              },
              {
                text: '数据结构与算法',
                link: '/dsa/'
              },
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
        text: 'GitHub',
        link: 'https://github.com/xiaofeng-bm/blog'
      }
    ],
    sidebar: {
      '/element/': getElementUI(),
      '/vue/': getVue('mini-vue'),
      '/algorithm/': getAlgorithm(),
      '/leetcode/': getLeetcode('简单', '中等', '困难', '面试真题'),
      '/design-patterns/': getDesignPatterns(),
      '/dsa/': getDSA('数据结构', '算法'),
      '/blog/': getBlog('JS', 'HTTP', 'CSS', 'HTML')
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
        'docs/form/base',
        'docs/BmTable'
      ]
    }
  ]
}

function getVue(A, B, C, D, E) {
  return [
    {
      title: A,
      collapsable: false,
      children: [
        'mini-vue/01-项目初始化',
        'mini-vue/02-observer',
        'mini-vue/03-proxy',
        'mini-vue/04-compiler',
        'mini-vue/05-reactivity',
      ]
    }
  ]
}

function getBlog(groupA, groupB, groupC, groupD) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'JS/face-object',
        'JS/new',
        'JS/number-precision',
        'JS/utils',
        'JS/scrollTo',
        'JS/RegExp',
        'JS/unique',
        'JS/arrayMethods',
        "JS/EventBus"
      ]
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
        'docs/1.设计模式',
        'docs/2.简单工厂模式',
        'docs/3.抽象工厂模式',
        'docs/4.单例模式',
        'docs/5.原型模式',
        'docs/10.观察者模式',
      ]
    }
  ]
}

// 数据结构与算法
function getDSA(A, b) {
  return [
    {
      title: A,
      collapsable: false,
      children: [
        'ds/LinkedList.md'
      ]
    }
  ]
}

// leetcode笔记
function getLeetcode(groupA, groupB, groupC, groupD) {
  return [
    {
      title: groupA,
      collapsable: true,
      children: [
        'docs/1.两数之和',
        'docs/7.整数反转',
        'docs/9.回文数',
        'docs/13.罗马数字转整数',
        'docs/14.最长公共前缀',
        'docs/20.有效的括号',
        'docs/21.合并两个有序链表',
        'docs/26.删除排序数组中的重复项',
        'docs/27.移除元素',
        'docs/28.实现strStr',
        'docs/38.外观数列',
        'docs/58.最后一个单词的长度',
        'docs/70.爬楼梯',
        'docs/83.删除排序链表中的重复元素',
        'docs/101.对称二叉树',
        'docs/155.最小栈',
        'docs/226.翻转二叉树',
        'docs/232.用栈实现队列',
        'docs/680.验证回文字符串Ⅱ',
        'docs/数组排序'
      ]
    },
    {
      title: groupB,
      collapsable: true,
      children: [
        'docs/2.两数相加',
        'docs/3.无重复字符的最长子串',
        'docs/8.字符串转换整数',
        'docs/11.盛最多水的容器',
        'docs/15.三数之和',
        'docs/17.电话号码的字母组合',
        'docs/46.全排列',
        'docs/47.全排列II',
        'docs/71.简化路径',
        'docs/82.删除排序链表中的重复元素II',
        'docs/94.二叉树的中序遍历',
        'docs/102.二叉树的层序遍历',
        'docs/144.二叉树的前序遍历',
        'docs/739.每日温度',
      ]
    },
    {
      title: groupC,
      collapsable: true,
      children: [
        'docs/145.二叉树的后序遍历'
      ]
    },
    {
      title: groupD,
      collapsable: true,
      children: [
        'interview/1.合并排序数组',
        'interview/剑指 Offer 59 - I. 滑动窗口的最大值',
      ]
    }
  ]
}