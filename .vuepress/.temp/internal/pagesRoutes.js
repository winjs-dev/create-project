import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"create-project"},["/index.html","/README.md"]],
  ["v-147825fb","/docs/",{"title":"首页"},["/docs/index.html","/docs/README.md"]],
  ["v-d704b2f6","/docs/handbook/advanced/assets.html",{"title":"样式和资源"},["/docs/handbook/advanced/assets","/docs/handbook/advanced/assets.md"]],
  ["v-c81b12a4","/docs/handbook/advanced/build-tools.html",{"title":"构建工具"},["/docs/handbook/advanced/build-tools","/docs/handbook/advanced/build-tools.md"]],
  ["v-58f56062","/docs/handbook/advanced/env-and-mode.html",{"title":"环境变量与模式"},["/docs/handbook/advanced/env-and-mode","/docs/handbook/advanced/env-and-mode.md"]],
  ["v-1e135382","/docs/handbook/advanced/general.html",{"title":"内置功能"},["/docs/handbook/advanced/general","/docs/handbook/advanced/general.md"]],
  ["v-13405a3b","/docs/handbook/advanced/request.html",{"title":"接口请求"},["/docs/handbook/advanced/request","/docs/handbook/advanced/request.md"]],
  ["v-15e00387","/docs/handbook/advanced/specification.html",{"title":"规范"},["/docs/handbook/advanced/specification","/docs/handbook/advanced/specification.md"]],
  ["v-4c541b6f","/docs/handbook/guide/",{"title":"介绍"},["/docs/handbook/guide/index.html","/docs/handbook/guide/README.md"]],
  ["v-f42bfcfa","/docs/handbook/guide/deploy.html",{"title":"构建生产版本"},["/docs/handbook/guide/deploy","/docs/handbook/guide/deploy.md"]],
  ["v-2798c015","/docs/handbook/guide/environment.html",{"title":"环境配置"},["/docs/handbook/guide/environment","/docs/handbook/guide/environment.md"]],
  ["v-82d7f7d6","/docs/handbook/guide/quickstart.html",{"title":"快速上手"},["/docs/handbook/guide/quickstart","/docs/handbook/guide/quickstart.md"]],
  ["v-b38d1f16","/docs/handbook/guide/structure.html",{"title":"目录及约定"},["/docs/handbook/guide/structure","/docs/handbook/guide/structure.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
