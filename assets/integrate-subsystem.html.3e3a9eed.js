import{_ as s,g as n}from"./app.6f6cde24.js";const a={},l=n(`<h1 id="\u96C6\u6210\u5B50\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#\u96C6\u6210\u5B50\u7CFB\u7EDF" aria-hidden="true">#</a> \u96C6\u6210\u5B50\u7CFB\u7EDF</h1><h2 id="hui-pro-1-0" tabindex="-1"><a class="header-anchor" href="#hui-pro-1-0" aria-hidden="true">#</a> hui pro 1.0</h2><p>hui pro 1.0 \u662F<strong>\u8D22\u5BCC\u4E2D\u53F0</strong>\u6216<strong>\u64CD\u4F5C\u5458\u4E2D\u5FC3</strong>\u4F5C\u4E3A\u7EDF\u4E00\u5916\u6846\u67B6\uFF0C\u9879\u76EE\u6839\u636E\u5176\u6253\u5305\u89C4\u8303\u96C6\u6210\u81F3\u7EDF\u4E00\u5916\u6846\u67B6\u4E2D\u8FD0\u884C\uFF0C\u901A\u5E38\u662F\u901A\u8FC7 see \u5E73\u53F0\u8FDB\u884C\u90E8\u7F72\uFF0C\u6545\u800C\u6846\u67B6\u4E2D\u9ED8\u8BA4\u96C6\u6210 see \u53D1\u5E03\u7269\u6253\u5305\u683C\u5F0F\uFF0C\u5E76\u63D0\u4F9B\u4E24\u79CD\u6253\u5305\u547D\u4EE4</p><div class="language-bash ext-sh line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#CE9178;">&quot;child&quot;</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">&quot;node --max_old_space_size=4096 build/child/build.child.js&quot;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#CE9178;">&quot;build:see:child&quot;</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">&quot;npm run child &amp;&amp; node build/package/see.child.js&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><code>npm run child</code> \u547D\u4EE4\u53EF\u6784\u5EFA\u7528\u4E8E\u8D22\u5BCC\u4E2D\u53F0\u5916\u6846\u67B6\u6267\u884C\u7684\u5B50\u7CFB\u7EDF\u5305\uFF0C\u9700\u624B\u52A8\u4E0A\u4F20\u81F3\u670D\u52A1\u5668\u3002</li><li><code>npm run build:see:child</code> \u547D\u4EE4\u53EF\u6784\u5EFA\u7528\u4E8E see \u5E73\u53F0\u53D1\u5E03\u7684\u5B50\u7CFB\u7EDF\u5305\u3002</li></ul><p>\u540C\u65F6\uFF0C\u4E3A\u9632\u6B62\u6837\u5F0F\u51B2\u7A81\uFF0C\u9879\u76EE\u4F1A\u9ED8\u8BA4\u5F15\u5165 <code>public/frame</code> \u6587\u4EF6\u5939\u3002\u8BE5\u6587\u4EF6\u5939\u5BF9\u5E94\u5B50\u7CFB\u7EDF\u8FD0\u884C\u6240\u5728\u4E3B\u7CFB\u7EDF\u7684\u6837\u5F0F\u6587\u4EF6\uFF0C\u5F00\u53D1\u65F6\uFF0C\u53EF\u6839\u636E\u4E3B\u6846\u67B6\u7684\u4E0D\u540C\uFF0C\u81EA\u884C\u4FEE\u6539\u5176\u6587\u4EF6\u5185\u5BB9\u3002</p><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><ul><li>hui pro 1.0 \u6253\u5305\u5165\u53E3\u4E3A <code>index.pro.js</code>\uFF0C\u672C\u5730\u73AF\u5883\u8FD0\u884C\u5165\u53E3\u4E3A <code>main.js</code>\uFF0C\u5728\u4FEE\u6539 <code>main.js</code> \u65F6\uFF0C\u9700\u68C0\u67E5\u662F\u5426\u5728 <code>index.pro.js</code> \u8FDB\u884C\u4FEE\u6539\uFF0C\u9632\u6B62\u672C\u5730\u548C\u90E8\u7F72\u73AF\u5883\u51FA\u73B0\u529F\u80FD\u4E0D\u4E00\u81F4\u7684\u73B0\u8C61\u3002</li></ul></div><h2 id="qiankun-\u4E7E\u5764" tabindex="-1"><a class="header-anchor" href="#qiankun-\u4E7E\u5764" aria-hidden="true">#</a> qiankun\uFF08\u4E7E\u5764\uFF09</h2><p>qiankun \u4E3A\u5E02\u9762\u4E0A\u5E94\u7528\u8F83\u4E3A\u5E7F\u6CDB\u7684\u5FAE\u524D\u7AEF\u67B6\u6784\uFF0C\u57FA\u4E8E <code>single-spa</code> \u7684\u5B9E\u73B0\u5E93\u3002</p><p>\u4F7F\u7528\u5FAE\u524D\u7AEF\u7684\u4F18\u52BF\u5728\u4E8E\uFF1A</p><ul><li>\u6280\u672F\u6808\u65E0\u5173</li></ul><p>\u4E3B\u6846\u67B6\u4E0D\u9650\u5236\u63A5\u5165\u5E94\u7528\u7684\u6280\u672F\u6808\uFF0C\u5FAE\u5E94\u7528\u5177\u5907\u5B8C\u5168\u81EA\u4E3B\u6743</p><ul><li>\u72EC\u7ACB\u5F00\u53D1\u3001\u72EC\u7ACB\u90E8\u7F72</li></ul><p>\u5FAE\u5E94\u7528\u4ED3\u5E93\u72EC\u7ACB\uFF0C\u524D\u540E\u7AEF\u53EF\u72EC\u7ACB\u5F00\u53D1\uFF0C\u90E8\u7F72\u5B8C\u6210\u540E\u4E3B\u6846\u67B6\u81EA\u52A8\u5B8C\u6210\u540C\u6B65\u66F4\u65B0</p><ul><li>\u589E\u91CF\u5347\u7EA7</li></ul><p>\u5728\u9762\u5BF9\u5404\u79CD\u590D\u6742\u573A\u666F\u65F6\uFF0C\u6211\u4EEC\u901A\u5E38\u5F88\u96BE\u5BF9\u4E00\u4E2A\u5DF2\u7ECF\u5B58\u5728\u7684\u7CFB\u7EDF\u505A\u5168\u91CF\u7684\u6280\u672F\u6808\u5347\u7EA7\u6216\u91CD\u6784\uFF0C\u800C\u5FAE\u524D\u7AEF\u662F\u4E00\u79CD\u975E\u5E38\u597D\u7684\u5B9E\u65BD\u6E10\u8FDB\u5F0F\u91CD\u6784\u7684\u624B\u6BB5\u548C\u7B56\u7565</p><ul><li>\u72EC\u7ACB\u8FD0\u884C\u65F6</li></ul><p>\u6BCF\u4E2A\u5FAE\u5E94\u7528\u4E4B\u95F4\u72B6\u6001\u9694\u79BB\uFF0C\u8FD0\u884C\u65F6\u72B6\u6001\u4E0D\u5171\u4EAB</p><h3 id="\u5FAE\u5E94\u7528\u5165\u53E3\u6587\u4EF6\u4FEE\u6539" tabindex="-1"><a class="header-anchor" href="#\u5FAE\u5E94\u7528\u5165\u53E3\u6587\u4EF6\u4FEE\u6539" aria-hidden="true">#</a> \u5FAE\u5E94\u7528\u5165\u53E3\u6587\u4EF6\u4FEE\u6539</h3><ul><li>\u5728 <code>src</code> \u76EE\u5F55\u65B0\u589E <code>publicPath.js</code> \u6587\u4EF6</li><li><code>webpack</code> \u9ED8\u8BA4\u7684 <code>publicPath</code> \u4E3A\u7A7A\u5B57\u7B26\u4E32\uFF0C\u4F1A\u57FA\u4E8E\u5F53\u524D\u8DEF\u5F84\u6765\u52A0\u8F7D\u8D44\u6E90\uFF0C\u5728\u4E3B\u5E94\u7528\u4E2D\u52A0\u8F7D\u5FAE\u5E94\u7528\u8D44\u6E90\u65F6\u4F1A\u5BFC\u81F4\u8D44\u6E90\u7F3A\u5931\uFF0C\u9700\u91CD\u65B0\u8BBE\u8BA1 <code>__webpack_public_path__</code> \u7684\u503C\u3002</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">/* eslint-disable */</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">checkIsQiankunMicroService</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@/utils&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> (</span><span style="color:#DCDCAA;">checkIsQiankunMicroService</span><span style="color:#D4D4D4;">()) {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">__webpack_public_path__</span><span style="color:#D4D4D4;"> = </span><span style="color:#9CDCFE;">window</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">__INJECTED_PUBLIC_PATH_BY_QIANKUN__</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="webpack-\u65B0\u589E\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#webpack-\u65B0\u589E\u914D\u7F6E" aria-hidden="true">#</a> webpack \u65B0\u589E\u914D\u7F6E</h3><ul><li>webpack \u9700\u5C06\u6A21\u5757\u6253\u5305\u6210 <code>umd</code> \u6A21\u5F0F\uFF0C\u9700\u4FEE\u6539 <code>vue.config.js</code> \u6587\u4EF6\u914D\u7F6E\uFF0C\u5C06 webpack \u6253\u5305\u6A21\u5757\u8BBE\u7F6E\u4E3A <code>umd</code> \u683C\u5F0F</li><li>qiankun \u4E3B\u6846\u67B6\u901A\u8FC7 <code>fetch</code> \u8BF7\u6C42\u5B50\u5E94\u7528\u9759\u6001\u8D44\u6E90\u3002\u5728\u672C\u5730\u5F00\u53D1\u65F6\uFF0C\u9700\u5141\u8BB8\u4E3B\u5E94\u7528\u8DE8\u57DF\u8BF7\u6C42\u672C\u5730\u73AF\u5883\uFF0C\u9700\u4FEE\u6539 webpack <code>devServer</code> \u9009\u9879\u5141\u8BB8\u8DE8\u57DF\u8BBF\u95EE\u8D44\u6E90</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> </span><span style="color:#4FC1FF;">pkg</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">require</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;./package.json&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">//  ...code here</span></span>
<span class="line"><span style="color:#4EC9B0;">module</span><span style="color:#D4D4D4;">.</span><span style="color:#4EC9B0;">exports</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">defineConfig</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#6A9955;">//  ...code here</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">devServer:</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">headers:</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#CE9178;">&#39;Access-Control-Allow-Origin&#39;</span><span style="color:#9CDCFE;">:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;*&#39;</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">//  ...code here</span></span>
<span class="line"><span style="color:#D4D4D4;">  },</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#6A9955;">//  ...code here</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">configureWebpack</span><span style="color:#9CDCFE;">:</span><span style="color:#D4D4D4;"> () </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> ({</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">//  ... code here</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">output:</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#9CDCFE;">library:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">\`</span><span style="color:#569CD6;">\${</span><span style="color:#9CDCFE;">pkg</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">name</span><span style="color:#569CD6;">}</span><span style="color:#CE9178;">\`</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#6A9955;">// \u628A\u5FAE\u5E94\u7528\u6253\u5305\u6210 umd \u5E93\u683C\u5F0F</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#9CDCFE;">libraryTarget:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;umd&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">      </span><span style="color:#9CDCFE;">chunkLoadingGlobal:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">\`webpackJsonp_</span><span style="color:#569CD6;">\${</span><span style="color:#9CDCFE;">pkg</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">name</span><span style="color:#569CD6;">}</span><span style="color:#CE9178;">\`</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">  })</span></span>
<span class="line"><span style="color:#D4D4D4;">})</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="\u5FAE\u5E94\u7528\u6DFB\u52A0\u751F\u547D\u5468\u671F" tabindex="-1"><a class="header-anchor" href="#\u5FAE\u5E94\u7528\u6DFB\u52A0\u751F\u547D\u5468\u671F" aria-hidden="true">#</a> \u5FAE\u5E94\u7528\u6DFB\u52A0\u751F\u547D\u5468\u671F</h3><p>\u5FAE\u5E94\u7528\u9700\u8981\u5728\u81EA\u5DF1\u7684\u5165\u53E3\u6587\u4EF6\uFF0C\u6DFB\u52A0 <code>bootstrap</code>, <code>mount</code>, <code>unmount</code> \u4E09\u4E2A\u751F\u547D\u5468\u671F\u51FD\u6570\uFF0C\u4F9B\u4E3B\u5E94\u7528\u5728\u9002\u5F53\u65F6\u673A\u8C03\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">//  src/main.js</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;./publicPath&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> { </span><span style="color:#9CDCFE;">checkIsQiankunMicroService</span><span style="color:#D4D4D4;"> } </span><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;@/utils&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#6A9955;">//  code here...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">let</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">instance</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">null</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">/* eslint-disable no-new */</span></span>
<span class="line"><span style="color:#569CD6;">function</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">render</span><span style="color:#D4D4D4;"> (</span><span style="color:#9CDCFE;">props</span><span style="color:#D4D4D4;"> = {}) {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#569CD6;">const</span><span style="color:#D4D4D4;"> { </span><span style="color:#4FC1FF;">container</span><span style="color:#D4D4D4;"> } = </span><span style="color:#9CDCFE;">props</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">instance</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">new</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">Vue</span><span style="color:#D4D4D4;">({</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">router</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// use Runtime-only</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// https://vuejs.org/v2/guide/installation.html</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#DCDCAA;">render</span><span style="color:#9CDCFE;">:</span><span style="color:#D4D4D4;"> (</span><span style="color:#9CDCFE;">h</span><span style="color:#D4D4D4;">) </span><span style="color:#569CD6;">=&gt;</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">h</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">App</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#6A9955;">// \u5BB9\u5668\u9009\u62E9\u5668\uFF0Capp \u4EC5\u4E3A\u793A\u4F8B</span></span>
<span class="line"><span style="color:#D4D4D4;">  }).</span><span style="color:#DCDCAA;">$mount</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">container</span><span style="color:#D4D4D4;"> ? </span><span style="color:#9CDCFE;">container</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">querySelector</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;#app&#39;</span><span style="color:#D4D4D4;">) : </span><span style="color:#CE9178;">&#39;#app&#39;</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> (!</span><span style="color:#DCDCAA;">checkIsQiankunMicroService</span><span style="color:#D4D4D4;">()) {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">render</span><span style="color:#D4D4D4;">();</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">//  qiankun \u5BFC\u51FA\u76F8\u5173\u751F\u547D\u5468\u671F\u51FD\u6570</span></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">function</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">bootstrap</span><span style="color:#D4D4D4;"> () {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">console</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">log</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;[vue] vue app bootstraped&#39;</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">function</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">mount</span><span style="color:#D4D4D4;"> (</span><span style="color:#9CDCFE;">props</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">console</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">log</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;[vue] props from main framework&#39;</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">props</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#DCDCAA;">render</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">props</span><span style="color:#D4D4D4;">);</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">export</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">function</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">unmount</span><span style="color:#D4D4D4;"> () {</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">instance</span><span style="color:#D4D4D4;">.</span><span style="color:#DCDCAA;">$destroy</span><span style="color:#D4D4D4;">();</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">instance</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">$el</span><span style="color:#D4D4D4;">.</span><span style="color:#9CDCFE;">innerHTML</span><span style="color:#D4D4D4;"> = </span><span style="color:#CE9178;">&#39;&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">  </span><span style="color:#9CDCFE;">instance</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">null</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">\u6CE8\u610F</p><ul><li>\u4E3A\u4FDD\u8BC1\u5BB9\u5668 id \u552F\u4E00\u6027\uFF0C\u73B0\u5728\u6846\u67B6\u4E2D Vue \u6302\u8F7D\u8282\u70B9\u6839\u636E\u9879\u76EE\u540D\u79F0\u52A8\u6001\u751F\u6210\uFF0C\u800C\u975E\u56FA\u5B9A\u751F\u6210\u7684 <code>app</code>\u3002</li><li>\u5728 <code>src/util/index.js</code> \u6587\u4EF6\u4E2D\uFF0C\u63D0\u4F9B\u662F\u5426\u8FD0\u884C\u4E8E qiankun \u73AF\u5883\u4E2D\u7684\u5224\u65AD\u65B9\u6CD5</li><li>\u65B0\u589E scripts \u547D\u4EE4 <code>npm run dev:microFront</code>\uFF0C\u5176\u73AF\u5883\u53D8\u91CF\u5B58\u5728\u4E8E <code>env.microFront</code> \u6587\u4EF6\uFF0C\u5F00\u53D1\u73AF\u5883\u8BF7\u4F7F\u7528\u8BE5\u547D\u4EE4\u8FDB\u884C\u5F00\u53D1\u3002</li></ul></div>`,28);function p(e,o){return l}var r=s(a,[["render",p],["__file","integrate-subsystem.html.vue"]]);export{r as default};