const { path } = require('@vuepress/utils');
const { copyCode } = require('vuepress-plugin-copy-code2');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  title: 'create-project',
  description: '🛠️ 鲸腾FE工程开发的标准工具',
  base: '/create-project/',
  head: [
    ['meta', { name: 'keywords', content: '鲸腾FE工程开发的标准工具' }],
    [
      'script',
      {
        type: 'text/javascript',
        src: '/create-project/analytics.js'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/create-project/images/icons/favicon-16x16.png`
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/create-project/images/icons/favicon-32x32.png`
      }
    ],
    ['link', { rel: 'manifest', href: '/create-project/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'create-project' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'create-project' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/create-project/images/icons/apple-touch-icon.png` }
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/create-project/images/icons/safari-pinned-tab.svg',
        color: '#3eaf7c'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
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
    copyCode({}),
    [
      '@vuepress/plugin-search'
    ],
    // only enable shiki plugin in production mode
    [
      '@vuepress/plugin-shiki',
      isProd
        ? {
          theme: 'dark-plus'
        }
        : false
    ]
  ],
  themeConfig: {
    logo: '/images/hero.png',
    docsDir: 'docs',

    navbar: [
      {
        text: '指南',
        link: '/handbook/guide/README.md'
      },
      { text: 'Github', link: 'https://github.com/cloud-templates/create-project' },
      { text: 'Gitee', link: 'https://gitee.com/cloud-templates/create-project' }
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
      '看起来我们进入了错误的链接'
    ],
    backToHome: '返回首页',

    sidebar: {
      '/': [
        {
          text: '指南',
          children: [
            '/handbook/guide/README.md',
            '/handbook/guide/quickstart.md',
            '/handbook/guide/environment.md',
            '/handbook/guide/deploy.md',
            '/handbook/guide/structure.md'
          ]
        },
        {
          text: '进阶',
          children: [
            '/handbook/advanced/general.md',
            '/handbook/advanced/build-tools.md',
            '/handbook/advanced/env-and-mode.md',
            '/handbook/advanced/assets.md',
            '/handbook/advanced/request.md',
            '/handbook/advanced/specification.md'
          ]
        }
      ]
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd
    }
  }
};
