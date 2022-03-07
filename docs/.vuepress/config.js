const { path } = require('@vuepress/utils');

module.exports = {
  title: '前端项目开发指引与规范',
  description: '鲸腾前端团队项目模板开发指引和规范说明',
  base: '/',
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'VuePress' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'VuePress' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  theme: '@vuepress/theme-default',
  repo: 'vuepress/vuepress-next',
  docsDir: 'docs',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components')
      }
    ],
    [
      '@vuepress/plugin-nprogress'
    ],
    [
      '@vuepress/plugin-search'
    ]
  ],
  themeConfig: {
    // subSidebar: 'auto',
    navbar: [
      {
        text: '指南',
        link: '/README.md'
      },
      { text: 'Github', link: 'https://github.com/cloud-templates' },
      { text: 'Gitee', link: 'https://gitee.com/cloud-templates' }
    ],
    lastUpdated: '上次更新',
    smoothScroll: true,
    sidebar: {
      '/': [
        {
          text: '指南',
          children: [
            '/',
            '/handbook/quickstart.md'
          ]
        }
      ]
    }
  }
};
