<template><h1 id="构建生产版本" tabindex="-1"><a class="header-anchor" href="#构建生产版本" aria-hidden="true">#</a> 构建生产版本</h1>
<h2 id="构建" tabindex="-1"><a class="header-anchor" href="#构建" aria-hidden="true">#</a> 构建</h2>
<CodeGroup>
  <CodeGroupItem title="生产环境">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<p>构建打包成功之后，会在项目根目录生成 <code>dist</code> 文件夹，里面是构建打包好的文件，同时生成含有 <code>.gz</code> 的文件。所以也需要服务器配置 <code>gzip</code> 的开启，这样用户访问时，会请求更小的 <code>.gz</code> 文件，加快页面的浏览访问。</p>
<h2 id="本地预览" tabindex="-1"><a class="header-anchor" href="#本地预览" aria-hidden="true">#</a> 本地预览</h2>
<p><code>dist</code> 目录需要启动一个 HTTP 服务器来访问 (除非你已经将 publicPath 配置为了一个相对的值)，所以以 file:// 协议直接打开 dist/index.html 是不会工作的。在本地预览生产环境构建最简单的方式就是使用一个 Node.js 静态文件服务器，例如 serve：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g serve
<span class="token comment"># -s 参数的意思是将其架设在 Single-Page Application 模式下</span>
<span class="token comment"># 这个模式会处理即将提到的路由问题</span>
serve -s dist
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>但当使用 <code>vite</code> 作为构建工具时，可以直接使用以下命令来进行本地预览：</p>
<CodeGroup>
  <CodeGroupItem title="本地预览">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run preview
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<h2 id="生成-zip-包" tabindex="-1"><a class="header-anchor" href="#生成-zip-包" aria-hidden="true">#</a> 生成 zip 包</h2>
<p>压缩 dist 文件夹，生成 zip 包</p>
<CodeGroup>
  <CodeGroupItem title="zip">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run <span class="token function">zip</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<h2 id="构建-see-包" tabindex="-1"><a class="header-anchor" href="#构建-see-包" aria-hidden="true">#</a> 构建 SEE 包</h2>
<CodeGroup>
  <CodeGroupItem title="测试包">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build:see 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
 <CodeGroupItem title="生产包">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build:see prod
<span class="token comment"># or（兼容财富中台前端构建的命令）</span>
<span class="token function">npm</span> run build:see <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>测试包及生产包的主要区别在于 <strong>包名</strong>。</p>
<ul>
<li>测试包：主要是提供给测试人员用的，包名是构建<strong>带时间串和gitcommitid</strong>的。如  <code>hscs-company-web-V202101-00-000-20211201092557.ea48d3ef.zip</code></li>
<li>生产包：主要是用于生产环境部署的，包名<strong>不带时间串和gitcommitid</strong>的。如 <code>hscs-company-web-V202101-00-000.zip</code></li>
</ul>
<p>其中 <code>V202101-00-000</code> 取自 <code>package.json</code> 的 &quot;buildVersion&quot;: &quot;V202101-00-000&quot;</p>
</div>
<h2 id="构建-docker-包" tabindex="-1"><a class="header-anchor" href="#构建-docker-包" aria-hidden="true">#</a> 构建 Docker 包</h2>
<p>构建支持容器化部署的 SEE 发布物。</p>
<CodeGroup>
  <CodeGroupItem title="测试包">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build:see -dockerSeePack<span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
 <CodeGroupItem title="生产包">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build:see prod -dockerSeePack<span class="token operator">=</span>true
<span class="token comment"># or（兼容财富中台前端构建的命令）</span>
<span class="token function">npm</span> run build:see <span class="token function">yes</span> -dockerSeePack<span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>测试包及生产包的主要区别在于 <strong>包名</strong>。</p>
<ul>
<li>测试包：主要是提供给测试人员用的，包名是构建<strong>带时间串和gitcommitid</strong>的。如  <code>hscs-company-web-docker-V202101-00-000-20211201092557.ea48d3ef.zip</code></li>
<li>生产包：主要是用于生产环境部署的，包名<strong>不带时间串和gitcommitid</strong>的。如 <code>hscs-company-web-docker-V202101-00-000.zip</code></li>
</ul>
<p>其中 <code>V202101-00-000</code> 取自 <code>package.json</code> 的 &quot;buildVersion&quot;: &quot;V202101-00-000&quot;</p>
</div>
<h2 id="构建子系统" tabindex="-1"><a class="header-anchor" href="#构建子系统" aria-hidden="true">#</a> 构建子系统</h2>
<p>构建适用于 Hui pro 1.x 的包，并可以运行在财富中台外框架及操作员中心外框架内。</p>
<CodeGroup>
  <CodeGroupItem title="子包">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run child
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
 <CodeGroupItem title="SEE 包">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build:see:child
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
 <CodeGroupItem title="Docker 包">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run build:see:child -dockerSeePack<span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>子系统的 SEE 包和 Docker 包，同样也是区分测试包和生产包的。构建命令后添加的参数，区分规则和上面保持一致。</p>
</div>
</template>
