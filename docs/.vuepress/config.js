const { path } = require('@vuepress/utils');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  title: 'create-project',
  description: '鲸腾前端团队项目模板开发指引和规范说明',
  base: '/create-project/',
  head: [
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
    ],
    // only enable shiki plugin in production mode
    [
      '@vuepress/plugin-shiki',
      isProd
        ? {
          theme: 'dark-plus',
        }
        : false,
    ],
  ],
  themeConfig: {
    navbar: [
      {
        text: '指南',
        link: '/README.md'
      },
      { text: 'Github', link: 'https://github.com/cloud-templates' },
      { text: 'Gitee', link: 'https://gitee.com/cloud-templates' }
    ],
    editLinks: true,
    lastUpdated: true,
    smoothScroll: true,

    // page meta
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',

    tip: '提示',
    warning: '注意',
    danger: '警告',

    // 404 page
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',

    sidebar: {
      '/': [
        {
          text: '指南',
          children: [
            '/',
            '/handbook/guide/quickstart.md',
            '/handbook/guide/deploy.md',
            '/handbook/guide/structure.md',
          ]
        },
        {
          text: '进阶',
          children: [
            '/handbook/advanced/specification.md',
            '/handbook/advanced/build-tools.md',
          ]
        }
      ]
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
    },
  }
};
