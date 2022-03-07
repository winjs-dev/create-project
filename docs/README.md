# 介绍
 <a href="https://www.npmjs.com/package/@winner-fed/create-project" target="blank">
  <img src="https://img.shields.io/npm/v/@winner-fed/create-project" />
</a>

鲸腾前端团队快速从"零"搭建 Web、小程序、H5、离线包应用程序的前端项目脚手架。

## 功能概览图
<img src="https://gitee.com/cklwblove/win-ui-resource/raw/master/img/create-project.png"/>

## 简介
**create-project** 基于 [`vue`](https://vuejs.org/)，使用 `vite` 或者 `webpack` 构建项目，支持众多的开箱即用的功能和针对项目进行了不同程度的优化。它的宗旨是快速创建一套**纯净**却具备强大基础功能的模板，协助开发者自由发挥快速搭建任何类型的项目。

::: tip 基础
在使用此脚手架前，请确保你对以下的技术有足够的知识储备：

- [Vue](https://vuejs.org/)
- [VueRouter](https://router.vuejs.org/zh/)
- [Pinia](https://pinia.esm.dev/)
- [Vuex](https://vuex.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vue CLI](https://cli.vuejs.org/)
- [Webpack](https://webpack.js.org/)
  :::
  
## 特性
脚手架可以快速帮你创建一份空白模板，提供了许多通用的功能：

### 应用

- 使用 CSS 预编译语言 [Less](http://lesscss.org/)
- 移动 web 的适配方案：目前提供了两种方案，`rem` 及 `vw`。分别引入了 `postcss-pxtorem` 及 `amfe-flexible` 和 `postcss-px-to-viewport`，可以自由地用 px 去开发
- 常用的 js 工具类： [cloud-utils](https://cloud-templates.github.io/cloud-utils/)
- 常用的 Less 的 mixins 集合：[magicless](https://github.com/cloud-templates/magicless)
- 提供`环境变量`：开发环境、预生产环境、生产环境
- 基于 `axios` 异步请求封装
- 基于环境变量的静态资源组件
- 自动加载 `SVG` 的图标组件，雪碧图打包
- 页面缓存（基于 `keep-alive` 实现）
- 支持 `gzip`

## 浏览器支持

本地开发：推荐使用 <Badge text="Chrome" vertical="middle" /> 最新版浏览器。

生产环境： Web 及 H5 支持现代浏览器，
其中 `Vue3` **不支持 <Badge type="danger" text="IE" vertical="middle" />**。

::: tip 注意
使用 Vue 3.x 需要考虑更多的兼容性
1. bundle(webpack) + Vue3.x 不支持 ie11
2. bundleless(vite) 不支持 ie11
3. Vue3.x 不兼容安卓6以下 webview 的 Chrome 版本
:::
   
具体如下：
- Vue3
    - Web
    
    | IE          | Edge            | Firefox         | Chrome          | Safari          |
    | ----------- | --------------- | --------------- | --------------- | --------------- |
    | not support | last 2 versions | last 2 versions | last 2 versions、>=51 | last 2 versions |

    - 移动端 H5
    
    | Android          | iOS            |
    | ----------- | --------------- |
    | >= 6.0 | >= 10.0 |

- Vue2
    - Web 端
    
    | IE          | Edge            | Firefox         | Chrome          | Safari          |
    | ----------- | --------------- | --------------- | --------------- | --------------- |
    | >= 11 | last 2 versions | last 2 versions、>= 34 | last 2 versions、>=51 | last 2 versions |
    
    - 移动端 H5
    
    | Android          | iOS            |
    | ----------- | --------------- | 
    | >= 5.0 | >= 9.0 |

