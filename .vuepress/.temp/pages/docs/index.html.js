export const data = {
  "key": "v-147825fb",
  "path": "/docs/",
  "title": "首页",
  "lang": "en-US",
  "frontmatter": {
    "home": true,
    "title": "首页",
    "heroImage": "/images/hero.png",
    "actions": [
      {
        "text": "快速上手",
        "link": "/handbook/guide/quickstart.html",
        "type": "primary"
      },
      {
        "text": "项目简介",
        "link": "/handbook/guide/",
        "type": "secondary"
      }
    ],
    "features": [
      {
        "title": "大道至简",
        "details": "以 Vue 为基础框架，纯净的空白模板，塑造更便捷的前端开发环境。"
      },
      {
        "title": "功能丰富",
        "details": "一键创建 Web、小程序、H5、离线包应用程序，快捷开发，开箱即用。"
      },
      {
        "title": "生态丰富",
        "details": "可以选择 JavaScript 作为开发语言，也支持 TypeScript，同时提供常用的 UI 组件库支持。"
      },
      {
        "title": "构建打包工具",
        "details": "默认的打包工具是 Vite ，也同样可以选择 Webpack。"
      },
      {
        "title": "开箱即用",
        "details": "内置了路由、请求、移动端适配等，仅需安装依赖即可上手开发。内含丰富的功能，可满足日常 80% 的开发需求。"
      },
      {
        "title": "面向未来",
        "details": "在满足需求的同时，我们也不会停止对新技术的探索。比如跨端、微前端、webpack@5、bundle less 等等。"
      }
    ],
    "footer": "MIT Licensed | Copyright © 2016-present WhaleFE"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "像数 1, 2, 3 一样容易",
      "slug": "像数-1-2-3-一样容易",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1647012153000,
    "contributors": [
      {
        "name": "cklwblove",
        "email": "lwbhtml@163.com",
        "commits": 14
      }
    ]
  },
  "filePathRelative": "docs/README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
