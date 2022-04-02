<template><h1 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h1>
<p>本节将介绍如何在全局环境安装 <code>@winner-fed/create-project</code> 和通过命令行快速的生成项目。</p>
<h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2>
<ul>
<li>需要在本地安装 <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js<ExternalLinkIcon/></a> 和 <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git<ExternalLinkIcon/></a>。</li>
<li>推荐使用 <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">vscode<ExternalLinkIcon/></a> 作为代码编辑器，安装以下插件可以更好的体验脚手架：
<ul>
<li><a href="https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar" target="_blank" rel="noopener noreferrer">Vue Language Features (Volar)<ExternalLinkIcon/></a>（Vue3 开发必备）</li>
<li><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank" rel="noopener noreferrer">ESLint<ExternalLinkIcon/></a>（Javascript 代码检查）</li>
<li><a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint" target="_blank" rel="noopener noreferrer">Stylelint<ExternalLinkIcon/></a>（CSS 代码检查）</li>
<li><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank" rel="noopener noreferrer">Prettier - Code formatter<ExternalLinkIcon/></a>（代码格式化）</li>
</ul>
</li>
</ul>
<h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2>
<h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3>
<p>通过以下指令创建一个新项目：</p>
<CodeGroup>
  <CodeGroupItem title="命令">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init @winner-fed/create-project@2 <span class="token punctuation">[</span>project-name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>版本号(@2)不能被省略，否则 npm 可能解析为包的缓存版本和过期版本。</p>
</div>
<h3 id="选择特性" tabindex="-1"><a class="header-anchor" href="#选择特性" aria-hidden="true">#</a> 选择特性</h3>
<p>使用创建命令会提示一系列问题，根据实际的项目需求做出选择：</p>
<h4 id="_1-select-a-framework-选择-framework" tabindex="-1"><a class="header-anchor" href="#_1-select-a-framework-选择-framework" aria-hidden="true">#</a> 1. Select a framework?（选择 Framework）</h4>
<ul>
<li>Vue 2</li>
<li>Vue 3</li>
<li>miniprogram</li>
</ul>
<h4 id="_2-choose-whether-your-app-is-a-pc-or-a-mobile-选择应用是基于-pc-端还是移动端" tabindex="-1"><a class="header-anchor" href="#_2-choose-whether-your-app-is-a-pc-or-a-mobile-选择应用是基于-pc-端还是移动端" aria-hidden="true">#</a> 2. Choose whether your app is a PC or a mobile?（选择应用是基于 PC 端还是移动端）</h4>
<ul>
<li>mobile</li>
<li>H5 离线包</li>
<li>PC</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>当选择 <code>H5 离线包</code> 的时候，会要求输入 <code>离线包 ID</code> 及 <code>离线包名称</code>。
其中，这两个值都是有校验规则的。</p>
<ul>
<li>离线包 ID：4-8 位的小写英文字母或数字，注意唯一性</li>
<li>离线包名称：1-10 位的中英文字符或数字</li>
</ul>
</div>
<h4 id="_3-add-typescript-是否需要使用-typescript" tabindex="-1"><a class="header-anchor" href="#_3-add-typescript-是否需要使用-typescript" aria-hidden="true">#</a> 3. Add TypeScript?（是否需要使用 TypeScript）</h4>
<h4 id="_4-choose-whether-your-build-tools-is-bundle-webpack-or-bundless-vite-选择构建工具" tabindex="-1"><a class="header-anchor" href="#_4-choose-whether-your-build-tools-is-bundle-webpack-or-bundless-vite-选择构建工具" aria-hidden="true">#</a> 4. Choose whether your build tools is bundle(webpack) or bundless(vite)?（选择构建工具）</h4>
<ul>
<li>bundle(webpack)</li>
<li>bundleless(vite)</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li>vue-cli 升级了最新的 5.x，其中 webpack 版本为 5.x</li>
<li>vite 使用 2.x</li>
</ul>
</div>
<h4 id="_5-select-a-ui-framework-选择-ui-组件库" tabindex="-1"><a class="header-anchor" href="#_5-select-a-ui-framework-选择-ui-组件库" aria-hidden="true">#</a> 5. Select a UI Framework（选择 UI 组件库）</h4>
<ul>
<li>Element UI</li>
<li>Ant Design Vue</li>
<li>Hui</li>
<li>WinUI</li>
<li>Vant</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li>
<p>WinUI（鲸腾自研） 和 Vant，适用于 移动端 H5，离线包</p>
<ul>
<li>Vue 2.x 使用 WinUI 1.x，Vue 3.x 使用 WinUI 2.x</li>
<li>Vue 2.x 使用 Vant 2.x，Vue 3.x 使用 Vant 3.x</li>
</ul>
</li>
<li>
<p>Hui（公司自研），element-ui，ant-design-vue，适用于 PC Web</p>
<ul>
<li>Hui 只适配 Vue 2.x</li>
<li>Vue 2.x 使用 element-ui，Vue 3.x 使用 element-plus</li>
<li>Vue 2.x 使用 ant-design-vue 1.x，Vue 3.x 使用 ant-design-vue 3.x</li>
</ul>
</li>
</ul>
</div>
<h4 id="_6-select-a-mobile-layout-adaptation-plan-选择移动端布局适配方案" tabindex="-1"><a class="header-anchor" href="#_6-select-a-mobile-layout-adaptation-plan-选择移动端布局适配方案" aria-hidden="true">#</a> 6. Select a mobile layout adaptation plan?（选择移动端布局适配方案）</h4>
<ul>
<li>rem</li>
<li>vw</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>可以自由地用 px 去开发。相关配置在 <code>postcss.config.js</code></p>
<ul>
<li>rem：引入 <code>postcss-pxtorem</code> 及 <code>amfe-flexible</code></li>
<li>vw：引入 <code>postcss-px-to-viewport</code></li>
</ul>
</div>
<h4 id="_7-select-a-version-control-tool-选择版本管理工具" tabindex="-1"><a class="header-anchor" href="#_7-select-a-version-control-tool-选择版本管理工具" aria-hidden="true">#</a> 7. Select a Version control tool?（选择版本管理工具）</h4>
<ul>
<li>Git</li>
<li>SVN</li>
</ul>
<h4 id="_8-add-mirror-source-support-是否使用公司镜像源" tabindex="-1"><a class="header-anchor" href="#_8-add-mirror-source-support-是否使用公司镜像源" aria-hidden="true">#</a> 8. Add Mirror Source Support?（是否使用公司镜像源）</h4>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>由于公司内使用了私服镜像源，因此会生成两个文件 <code>.npmrc</code>、<code>.yarnc</code>，用于指定项目所需要的指定镜像源地址。请务必要根据实际项目需求，动态调整文件里的地址。</p>
</div>
<h4 id="_9-add-see-package-support-是否支持-see-平台发布物及-docker-发布物" tabindex="-1"><a class="header-anchor" href="#_9-add-see-package-support-是否支持-see-平台发布物及-docker-发布物" aria-hidden="true">#</a> 9. Add See Package Support?（是否支持 SEE 平台发布物及 Docker 发布物）</h4>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>当选择了第8步骤为 <code>yes</code> 时，此选项才会出现。</p>
</div>
<h4 id="_10-add-subsystem-support-是否支持子系统" tabindex="-1"><a class="header-anchor" href="#_10-add-subsystem-support-是否支持子系统" aria-hidden="true">#</a> 10. Add Subsystem Support?（是否支持子系统）</h4>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li>当选择了第8步骤为 <code>yes</code> 时，此选项才会出现。</li>
<li>支持生成 Hui pro 1.x 的子系统，可以运行在以操作员中心或者财富中台作为外框架的主系统中
<ul>
<li>Vite 作为构建工具的时候，不支持生成 Hui pro 1.x 的子系统</li>
<li>Vue3 不支持 Hui pro 1.x</li>
<li>public/frame 相关的文件来源于财富中台外框架的样式文件，为了尽量还原业务子系统嵌入外框架运行时的样式</li>
</ul>
</li>
</ul>
</div>
<h3 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖" aria-hidden="true">#</a> 安装依赖</h3>
<ul>
<li>输入以上命令后，模板文件会自动创建名字为 [project-name] 的文件夹，并将模板文件复制到此文件夹内。</li>
<li>选择 Git 的时候，会自动初始化 Git 仓库。</li>
<li>选择安装包管理工具，推荐选择：</li>
</ul>
<p>优先级：yarn &gt; npm</p>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>建议通过重新指定 registry 来解决 npm 安装速度慢的问题。若还是不行，可使用 yarn 替代 npm。</p>
</div>
<h2 id="开发环境" tabindex="-1"><a class="header-anchor" href="#开发环境" aria-hidden="true">#</a> 开发环境</h2>
<p>根据安装后的相关提示，输入相关命令以继续：</p>
<CodeGroup>
  <CodeGroupItem title="安装依赖">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run bootstrap
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="开发环境">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run dev
<span class="token comment">#</span>
<span class="token function">npm</span> run serve
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="ESLint">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run lint
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Stylelint">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run lint:style
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="包分析工具">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run report
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>在 Git 仓库里，通常情况下 ESLint 与 Stylelint 没必要单独执行，husky 提供的 git commit 钩子会在提交代码时，对缓存区里的代码做校验，这也会节省很多时间。</p>
</div>
</template>
