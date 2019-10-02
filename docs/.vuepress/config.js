module.exports = {
  title: '晓枫博客',
  description: '前端学习路上的记录、总结',
  themeConfig: {
    nav: [
      {
        text: '分类',
        items: [
          { text: 'element-ui源码解析', link: '/element/' },
          // { text: 'vue', link: '/article/vue.md' },
        ]
      }
    ],
    sidebar: {
      '/element/': getElementUI()
    }
  }
}

function getElementUI() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'explain',
        // 'components/init',
        // 'components/link'
      ]
    }
  ]
}


