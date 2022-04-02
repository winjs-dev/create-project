<template><h1 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h1>
<p>要开始使用脚手架创建项目，只需要电脑环境装有 <a href="https://nodejs.org/zh-cn/" target="_blank" rel="noopener noreferrer">Node &amp; Npm<ExternalLinkIcon/></a></p>
<p>当然你还需要一个开发 IDE，推荐使用 <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">VS Code<ExternalLinkIcon/></a></p>
<h2 id="终端应用程序" tabindex="-1"><a class="header-anchor" href="#终端应用程序" aria-hidden="true">#</a> 终端应用程序</h2>
<blockquote>
<p>命令行工具已经是现代前端开发者必需的了。</p>
</blockquote>
<p>通常，我们建议使用内置终端。</p>
<ul>
<li>对于 Windows， 支持 <strong>Command Prompt</strong> 和 <strong>PowerShell</strong></li>
<li>对于 macOS，支持内置的终端应用程序 <strong>Terminal</strong></li>
</ul>
<h2 id="node-npm" tabindex="-1"><a class="header-anchor" href="#node-npm" aria-hidden="true">#</a> Node &amp; npm</h2>
<p>目前，几乎所有用于现代 JavaScript 项目的工具都基于 <a href="https://nodejs.org/zh-cn/" target="_blank" rel="noopener noreferrer">Node.js<ExternalLinkIcon/></a> ，已经是前端开发不可或缺的组成部分。该<a href="https://nodejs.org/en/download/" target="_blank" rel="noopener noreferrer">下载页面<ExternalLinkIcon/></a>已预构建的安装包适用于所有平台。我们建议选择 LTS 版本以确保最佳兼容性。</p>
<p><code>npm</code> 则是 Node.js 默认的，以 JavaScript 编写的软件包管理系统。</p>
<p>要验证安装成功，请打开一个新的终端窗口并运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">node</span> --version
$ <span class="token function">npm</span> --version
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote>
<p>在 macOS 上使用 npm 安装全局模块时，经常会遇到权限问题，如果你遇到了 <code>EACCES</code> 错误，请查阅<a href="https://segmentfault.com/a/1190000018660227" target="_blank" rel="noopener noreferrer">解决权限错误<ExternalLinkIcon/></a>。</p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">注意</p>
<p>node 需要版本在 12+。如果你使用低版本的 node ，可能会遇到一些预料之外的问题。</p>
</div>
<h2 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h2>
<p>在使用脚手架开发项目时，Git 不是必须的，但是我们强烈建议你安装和使用它。<a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git<ExternalLinkIcon/></a> 是一个很高效流行的版本控制软件。</p>
<p>Git 通常伴随有 Git 主机，例如 GitHub，在这种情况下，需要进行其他设置。按照 Git 主机文档中的教程设置 Git：</p>
<ul>
<li>GitHub: <a href="https://help.github.com/en/articles/set-up-git" target="_blank" rel="noopener noreferrer">Set up Git<ExternalLinkIcon/></a></li>
<li>GitLab: <a href="https://docs.gitlab.com/ee/topics/git/how_to_install_git" target="_blank" rel="noopener noreferrer">Installing Git<ExternalLinkIcon/></a></li>
<li>Bitbucket: <a href="https://www.atlassian.com/git/tutorials/install-git" target="_blank" rel="noopener noreferrer">Install Git<ExternalLinkIcon/></a></li>
</ul>
<p>否则，请遵循<a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank" rel="noopener noreferrer">官方安装说明<ExternalLinkIcon/></a>。可以从<a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">下载页面<ExternalLinkIcon/></a>下载命令行实用程序。</p>
<p>要验证安装成功，请打开一个新的终端窗口并运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> --version
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="git-gui" tabindex="-1"><a class="header-anchor" href="#git-gui" aria-hidden="true">#</a> Git GUI</h3>
<p>Git 是一个命令行实用程序，但是有许多 <a href="https://git-scm.com/downloads/guis/" target="_blank" rel="noopener noreferrer">GUI 客户端<ExternalLinkIcon/></a>可用。使用 GitHub 的时候，推荐使用<a href="https://desktop.github.com/" target="_blank" rel="noopener noreferrer">GitHub Desktop<ExternalLinkIcon/></a>。其他 Git 主机，建议安装 <a href="https://www.sourcetreeapp.com/" target="_blank" rel="noopener noreferrer">Sourcetree<ExternalLinkIcon/></a>。</p>
</template>
