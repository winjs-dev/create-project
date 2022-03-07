# 快速上手

本节将介绍如何在全局环境安装 `@winner-fed/create-project` 和通过命令行快速的生成项目。

## 环境搭建

- 需要在本地安装 [Node.js](https://nodejs.org/en/) 和 [Git](https://git-scm.com/)。
- 推荐使用 [vscode](https://code.visualstudio.com/) 作为代码编辑器，安装以下插件可以更好的体验脚手架：
  - [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)（Vue3 开发必备）
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)（Javascript 代码检查）
  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)（CSS 代码检查）
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)（代码格式化）

## 创建项目

### 命令

通过以下指令创建一个新项目：

<CodeGroup>
  <CodeGroupItem title="命令">

```bash:no-line-numbers
npm init @winner-fed/create-project@2 my-project
```

  </CodeGroupItem>
</CodeGroup>

### 选择特性

使用创建命令会提示一系列问题，根据实际的项目需求做出选择：

#### 选择 Framework

- Vue 2
- Vue 3
- miniprogram

#### 选择你的应用是基于 PC 端还是移动端

- mobile
- H5 离线包
- PC

::: tip 提示

当选择 `H5 离线包` 的时候，会要求输入 `离线包 ID` 及 `离线包名称`。
其中，这两个值都是有校验规则的。
- 离线包 ID：4-8 位的小写英文字母或数字，注意唯一性
- 离线包名称：1-10 位的中英文字符或数字

:::


#### 选择 UI 组件库

- Element Plus
- Ant Design Vue
- Naive UI
- Vant

### 安装依赖

- 输入命令后，模板文件会自动创建名字为 [name] 的文件夹，并将模板文件复制到此文件夹内。
- 自动初始化 Git。
- 依赖会自动安装，会跟你你所安装的包管理工具按优先级选择：

优先级：yarn > npm

::: warning 提示

强烈建议不要用直接使用 cnpm 安装，会有各种诡异的 bug，可以通过重新指定 registry 来解决 npm 安装速度慢的问题。若还是不行，可使用 yarn 替代 npm。

:::

## 开发环境

根据安装后的相关提示，输入相关命令以继续：

<CodeGroup>
  <CodeGroupItem title="开发环境">

```bash:no-line-numbers
npm run dev
```

  </CodeGroupItem>
  <CodeGroupItem title="包分析工具">

```bash:no-line-numbers
npm run analyzer
```

  </CodeGroupItem>
  <CodeGroupItem title="ESLint">

```bash:no-line-numbers
npm run lint
```

  </CodeGroupItem>
  <CodeGroupItem title="Stylelint">

```bash:no-line-numbers
npm run stylelint
```

  </CodeGroupItem>
</CodeGroup>

::: warning 提示
通常情况下 ESLint 与 Stylelint 没必要单独执行，husky 提供的 git commit 钩子会在你提交代码时对你缓存区里的代码做校验，这会节省你很多的时间。
:::
