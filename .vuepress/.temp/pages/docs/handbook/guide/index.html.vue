<template><h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1>
<NpmBadge package="@winner-fed/create-project" />
<a class="npm-badge" href="https://www.npmjs.com/package/@winner-fed/create-project" target="blank" rel="noopener noreferrer">
    <img src="https://badgen.net/npm/dw/@winner-fed/create-project" />
</a>
<a class="npm-badge" href="http://nodejs.org/download/" target="blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/node.js->=_14.13.1-green.svg?style=flat" />
</a>
<a class="npm-badge" href="https://www.npmjs.com/package/@winner-fed/create-project" target="blank" rel="noopener noreferrer">
    <img src="https://badgen.net/npm/license/@winner-fed/create-project" />
</a>
<p>鲸腾前端团队快速从&quot;零&quot;搭建 Web、小程序、H5、离线包应用程序的前端项目脚手架。</p>
<h2 id="功能概览图" tabindex="-1"><a class="header-anchor" href="#功能概览图" aria-hidden="true">#</a> 功能概览图</h2>
<img src="/images/create-project.png"/>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p><strong>create-project</strong> 基于 <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer"><code>vue</code><ExternalLinkIcon/></a>，使用 <code>vite</code> 或者 <code>webpack</code> 构建项目，支持众多的开箱即用的功能和针对项目进行了不同程度的优化。它的宗旨是快速创建一套<strong>纯净</strong>却具备强大基础功能的模板，协助开发者自由发挥快速搭建任何类型的项目。</p>
<div class="custom-container tip"><p class="custom-container-title">基础</p>
<p>在使用此脚手架前，请确保你对以下的技术有足够的知识储备：</p>
<ul>
<li><a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue<ExternalLinkIcon/></a></li>
<li><a href="https://router.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">VueRouter<ExternalLinkIcon/></a></li>
<li><a href="https://pinia.esm.dev/" target="_blank" rel="noopener noreferrer">Pinia<ExternalLinkIcon/></a></li>
<li><a href="https://vuex.vuejs.org/" target="_blank" rel="noopener noreferrer">Vuex<ExternalLinkIcon/></a></li>
<li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript<ExternalLinkIcon/></a></li>
<li><a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite<ExternalLinkIcon/></a></li>
<li><a href="https://cli.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue CLI<ExternalLinkIcon/></a></li>
<li><a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer">Webpack<ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h2>
<p>脚手架可以快速帮你创建一份空白模板，提供了许多通用的功能：</p>
<h3 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h3>
<ul>
<li>使用 CSS 预编译语言 <a href="http://lesscss.org/" target="_blank" rel="noopener noreferrer">Less<ExternalLinkIcon/></a>，并内置了部分变量，以及常用混合方法，使得可以轻松开启样式编写、复用、修改等</li>
<li>移动 web 的适配方案：目前提供了两种方案，<code>rem</code> 及 <code>vw</code>。分别引入了 <code>postcss-pxtorem</code> 及 <code>amfe-flexible</code> 和 <code>postcss-px-to-viewport</code>，可以自由地用 px 去开发</li>
<li>常用的 js 工具类： <a href="https://cloud-templates.github.io/cloud-utils/" target="_blank" rel="noopener noreferrer">cloud-utils<ExternalLinkIcon/></a></li>
<li>常用的 Less 的 mixins 集合：<a href="https://github.com/cloud-templates/magicless" target="_blank" rel="noopener noreferrer">magicless<ExternalLinkIcon/></a></li>
<li>提供<code>环境变量</code>：开发环境、预生产环境、生产环境</li>
<li>基于 <code>axios</code> 异步请求封装，让处理数据请求变得更为优雅</li>
<li>自动加载 <code>SVG</code> 的图标组件，雪碧图打包</li>
<li>页面缓存（基于 <code>keep-alive</code> 实现）</li>
<li>支持 <code>gzip</code></li>
<li>框架选择 Vue2，支持 <code>composition-api</code> 写法</li>
</ul>
<h2 id="浏览器支持" tabindex="-1"><a class="header-anchor" href="#浏览器支持" aria-hidden="true">#</a> 浏览器支持</h2>
<p>本地开发：推荐使用 <Badge text="Chrome" vertical="middle" /> 最新版浏览器。</p>
<p>生产环境： Web 及 H5 支持现代浏览器，
其中 <code>Vue3</code> <strong>不支持 <Badge type="danger" text="IE" vertical="middle" /></strong>。</p>
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<p>使用 Vue 3.x 需要考虑更多的兼容性</p>
<ol>
<li>bundle(webpack) + Vue3.x 不支持 ie11</li>
<li>bundleless(vite) 不支持 ie11</li>
<li>Vue3.x 不兼容安卓6以下 webview 的 Chrome 版本</li>
</ol>
</div>
<p>具体如下：</p>
<ul>
<li>
<p>Vue3</p>
<ul>
<li>Web 端</li>
</ul>
<table>
<thead>
<tr>
<th>IE</th>
<th>Edge</th>
<th>Firefox</th>
<th>Chrome</th>
<th>Safari</th>
</tr>
</thead>
<tbody>
<tr>
<td>not support</td>
<td>last 2 versions</td>
<td>last 2 versions</td>
<td>last 2 versions、&gt;=51</td>
<td>last 2 versions</td>
</tr>
</tbody>
</table>
<ul>
<li>移动端 H5</li>
</ul>
<table>
<thead>
<tr>
<th>Android</th>
<th>iOS</th>
</tr>
</thead>
<tbody>
<tr>
<td>&gt;= 6.0</td>
<td>&gt;= 10.0</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>Vue2</p>
<ul>
<li>Web 端</li>
</ul>
<table>
<thead>
<tr>
<th>IE</th>
<th>Edge</th>
<th>Firefox</th>
<th>Chrome</th>
<th>Safari</th>
</tr>
</thead>
<tbody>
<tr>
<td>&gt;= 11</td>
<td>last 2 versions</td>
<td>last 2 versions、&gt;= 34</td>
<td>last 2 versions、&gt;=51</td>
<td>last 2 versions</td>
</tr>
</tbody>
</table>
<ul>
<li>移动端 H5</li>
</ul>
<table>
<thead>
<tr>
<th>Android</th>
<th>iOS</th>
</tr>
</thead>
<tbody>
<tr>
<td>&gt;= 5.0</td>
<td>&gt;= 9.0</td>
</tr>
</tbody>
</table>
</li>
</ul>
</template>
