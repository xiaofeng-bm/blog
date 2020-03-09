module.exports = {
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
        text: '博客',
        items: [
          { text: '数据结构与算法', link: '/algorithm/' },
          { text: 'leetcode解题', link: '/leetcode/' }
        ]
      }
    ],
    sidebar: {
      '/element/': getElementUI(),
      '/algorithm/': getAlgorithm(),
      '/leetcode/': getLeetcode()
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
        // 'components/design',
        // 'components/input',
        // 'components/init',
        // 'components/link'
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
        'utils',
        'proxy'
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
        'docs/1.两数之和'
      ]
    }
  ]
}