module.exports = {
  theme: 'reco',
  title: '晓枫博客',
  description: '前端学习路上的记录、总结',
  port: 3001,
  themeConfig: {
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
            items: [
              {
                text: '数据结构与算法',
                link: '/algorithm/', 
              },
              {
                text: 'js设计模式',
                link: '/design-patterns/'
              },
              {
                text: 'leetcode解题', 
                link: '/leetcode/' 
              }
            ]
          },
          {
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
      '/design-patterns/': getDesignPatterns(),
      '/leetcode/': getLeetcode(),
      '/blog/': getBlog()
    }
  },
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
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
        'docs/button',
        'docs/layout'
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
        'docs/20.有效的括号'
      ]
    }
  ]
}