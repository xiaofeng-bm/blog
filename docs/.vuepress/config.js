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
          { text: 'vue', link: '/vue/' },
          { text: 'ts-axios', link: '/ts-axios/' },
        ]
      },
      {
        text: '博客',
        link: '/blog/'
      }
    ],
    sidebar: {
      '/element/': getElementUI(),
      '/vue/': getVue(),
      '/blog/': getBlog(),
      // '/ts-axios/': getAxios()
    }
  }
}

function getElementUI() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'docs/init',
        // 'components/design',
        // 'components/input',
        // 'components/init',
        // 'components/link'
      ]
    }
  ]
}

function getVue() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'chapter1/essence-of-comp'
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

