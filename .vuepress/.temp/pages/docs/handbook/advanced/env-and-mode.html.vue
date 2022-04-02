<template><h1 id="环境变量与模式" tabindex="-1"><a class="header-anchor" href="#环境变量与模式" aria-hidden="true">#</a> 环境变量与模式</h1>
<h2 id="vue-cli" tabindex="-1"><a class="header-anchor" href="#vue-cli" aria-hidden="true">#</a> vue-cli</h2>
<p>可以通过在 <code>package.json</code> 的 <code>scripts</code> 命令后，添加 <code>--mode xx</code> 来指定程序运行时的不同环境模式，默认为 production。例如，你想在g构建命令中指使用开发环境变量：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vue-cli-service build --mode development
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>所有的环境变量都会从对应的<a href="https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F" target="_blank" rel="noopener noreferrer">环境文件<ExternalLinkIcon/></a>中载入。并且在这些环境文件中，只有以 <code>VUE_APP_*</code>
开头的变量会被 <a href="https://webpack.docschina.org/plugins/define-plugin/" target="_blank" rel="noopener noreferrer">webpack.DefinePlugin<ExternalLinkIcon/></a>（允许在<strong>编译时</strong>将你代码中的变量替换为其他值或表达式） 静态嵌入到开发侧的包中。然后，在代码中可以通过 <code>process.env.VUE_APP_PAGE_TITLE</code> 访问到。例如，</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pages<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pages-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!-- template中使用环境变量 --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{ pageTitle }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">pageTitle</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VUE_APP_PAGE_TITLE</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// js 代码中使用环境变量</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'BASE_URL: '</span><span class="token punctuation">,</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BASE_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'NODE_ENV: '</span><span class="token punctuation">,</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>在构建过程中，<code>process.env.VUE_APP_PAGE_TITLE</code> 将会被相应的值所取代。在 <code>VUE_APP_PAGE_TITLE=hello</code> 的情况下，它会被替换为 &quot;hello&quot;。</p>
<p>除了 <code>VUE_APP_*</code> 变量之外，在你的应用代码中始终可用的还有两个特殊的变量:</p>
<ul>
<li><code>NODE_ENV</code> - 会是 &quot;development&quot;、&quot;production&quot; 或 &quot;test&quot; 中的一个。具体的值取决于应用运行的模式。</li>
<li><code>BASE_URL</code> - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。</li>
</ul>
<p>具体配置，可以参考项目根目录下的 <code>.env</code>、<code>.env.development</code>、<code>.env.production</code>。</p>
<h2 id="vite" tabindex="-1"><a class="header-anchor" href="#vite" aria-hidden="true">#</a> vite</h2>
<h3 id="使用-define-定义全局变量" tabindex="-1"><a class="header-anchor" href="#使用-define-定义全局变量" aria-hidden="true">#</a> 使用 define 定义全局变量</h3>
<p>在页面中会用到一些常量，这些常量在项目中后期不会发生变更，可以再构建的时候生成全局变量。可以在 <code>vite.config.js</code> 添加</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig<span class="token punctuation">,</span> loadEnv <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">define</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token constant">PAGE_COUNT</span><span class="token operator">:</span> <span class="token number">15</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在业务代码中使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token constant">PAGE_COUNT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="使用-env-文件定义变量和模式" tabindex="-1"><a class="header-anchor" href="#使用-env-文件定义变量和模式" aria-hidden="true">#</a> 使用 env 文件定义变量和模式</h3>
<p>使用 Vite 同样是可以使用 <a href="https://github.com/motdotla/dotenv" target="_blank" rel="noopener noreferrer">dotenv<ExternalLinkIcon/></a> 加载环境变量和指定模式的。</p>
<h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>.env                <span class="token comment"># 所有情况下都会加载</span>
.env.local          <span class="token comment"># 所有情况下都会加载，但会被 git 忽略</span>
.env.<span class="token punctuation">[</span>mode<span class="token punctuation">]</span>         <span class="token comment"># 只在指定模式下加载</span>
.env.<span class="token punctuation">[</span>mode<span class="token punctuation">]</span>.local   <span class="token comment"># 只在指定模式下加载，但会被 git 忽略</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">注意</p>
<p>环境加载优先级</p>
<p>一份用于指定模式的文件（例如 .env.production）会比通用形式的优先级更高（例如 .env）。</p>
<p>另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 .env 类文件覆盖。</p>
<p>.env 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。</p>
</div>
<p>加载的环境变量也会通过 <code>import.meta.env</code> 暴露给客户端源码。</p>
<p>为了防止意外地将一些环境变量泄漏到客户端，只有以 <code>VITE_*</code> 为前缀的变量才会暴露给经过 vite 处理的代码。例如，<code>.env</code> 文件中：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">DB_PASSWORD</span><span class="token operator">=</span>foobar

<span class="token comment"># spa-title</span>
VITE_GLOB_APP_TITLE <span class="token operator">=</span> vite vue template
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>只有 VITE_GLOB_APP_TITLE 会被暴露为 import.meta.env.VITE_GLOB_APP_TITLE 提供给客户端源码，而 DB_PASSWORD 则不会。</p>
<p>模板提供的具体配置，可以参考项目根目录下的 .env、.env.development、.env.production。</p>
<h5 id="模式" tabindex="-1"><a class="header-anchor" href="#模式" aria-hidden="true">#</a> 模式</h5>
<p>Vite 的 <code>--mode</code> 选项，会读取指定的值匹配的环境变量，用于覆盖命令使用的默认模式。</p>
<p>例如，如果你想为我们假设的 staging 模式构建应用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>vite build --mode staging
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>为了使应用实现预期行为，我们还需要一个 .env.staging 文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># .env.staging</span>
<span class="token assign-left variable">NODE_ENV</span><span class="token operator">=</span>production
<span class="token assign-left variable">VITE_GLOB_APP_TITLE</span><span class="token operator">=</span>vite vue template <span class="token punctuation">(</span>staging<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>此时，.env 和 .env.staging 两个环境变量文件将被加载，staging 应用具有类似于生产的行为，但显示的标题与生产环境不同。</p>
<p><code>vite.config.js</code> 相关配置：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig<span class="token punctuation">,</span> loadEnv <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vite'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> wrapperEnv <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./build/vite/utils'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> resolve <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'path'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> command<span class="token punctuation">,</span> mode <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> root <span class="token operator">=</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> env <span class="token operator">=</span> <span class="token function">loadEnv</span><span class="token punctuation">(</span>mode<span class="token punctuation">,</span> root<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// The boolean type read by loadEnv is a string. This function can be converted to boolean type</span>
  <span class="token keyword">const</span> viteEnv <span class="token operator">=</span> <span class="token function">wrapperEnv</span><span class="token punctuation">(</span>env<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token constant">VITE_PORT</span><span class="token punctuation">,</span> <span class="token constant">VITE_PUBLIC_PATH</span><span class="token punctuation">,</span> <span class="token constant">VITE_PROXY</span><span class="token punctuation">,</span> <span class="token constant">VITE_DROP_CONSOLE</span><span class="token punctuation">,</span> <span class="token constant">VITE_LEGACY</span> <span class="token punctuation">}</span> <span class="token operator">=</span> viteEnv<span class="token punctuation">;</span>
  
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></template>
