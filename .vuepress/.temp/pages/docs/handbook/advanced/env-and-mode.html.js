export const data = {
  "key": "v-58f56062",
  "path": "/docs/handbook/advanced/env-and-mode.html",
  "title": "环境变量与模式",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "vue-cli",
      "slug": "vue-cli",
      "children": []
    },
    {
      "level": 2,
      "title": "vite",
      "slug": "vite",
      "children": [
        {
          "level": 3,
          "title": "使用 define 定义全局变量",
          "slug": "使用-define-定义全局变量",
          "children": []
        },
        {
          "level": 3,
          "title": "使用 env 文件定义变量和模式",
          "slug": "使用-env-文件定义变量和模式",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1646816578000,
    "contributors": [
      {
        "name": "cklwblove",
        "email": "lwbhtml@163.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "docs/handbook/advanced/env-and-mode.md"
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
