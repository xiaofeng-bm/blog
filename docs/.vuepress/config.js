module.exports = {
  theme: 'reco',
  title: '晓枫博客',
  description: '前端学习路上的记录、总结',
  port: 3001,
  themeConfig: {
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      }
    },
    nav: [
      {
        text: '分类',
        items: [
          { text: 'element-ui源码解析', link: '/element/' },
          // { text: 'ts-axios', link: '/ts-axios/' },
        ]
      },
      {
        text: '文章',
        ariaLabel: '了解更多',
        items: [
          { 
            text: '', 
            items: [
              {
                text: '数据结构与算法',
                link: '/algorithm/', 
              },
              {
                text: 'leetcode解题', 
                link: '/leetcode/' 
              }
            ]
          },
          {
            text: '',
            items: [
              {
                text: '零碎',
                link: '/blog/'
              }
            ]
          }
        ]
      }
    ],
    sidebar: {
      '/element/': getElementUI(),
      '/algorithm/': getAlgorithm(),
      '/leetcode/': getLeetcode(),
      '/blog/': getBlog()
    }
  }
}

function getElementUI() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'docs/description',
        'docs/button'
      ]
    }
  ]
}

function getBlog() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'number-precision',
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
        'docs/复杂度分析'
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
        'docs/20.有效的括号'
      ]
    }
  ]
}