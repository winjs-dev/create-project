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

```bash
npm init @winner-fed/create-project@2 [project-name]
```

  </CodeGroupItem>
</CodeGroup>

### 选择特性

使用创建命令会提示一系列问题，根据实际的项目需求做出选择：

#### 1. Select a framework?（选择 Framework）

- Vue 2
- Vue 3
- miniprogram

#### 2. Choose whether your app is a PC or a mobile?（选择应用是基于 PC 端还是移动端）

- mobile
- H5 离线包
- PC

::: tip 提示

当选择 `H5 离线包` 的时候，会要求输入 `离线包 ID` 及 `离线包名称`。
其中，这两个值都是有校验规则的。
- 离线包 ID：4-8 位的小写英文字母或数字，注意唯一性
- 离线包名称：1-10 位的中英文字符或数字

:::

#### 3. Add TypeScript?（是否需要使用 TypeScript）

#### 4. Choose whether your build tools is bundle(webpack) or bundless(vite)?（选择构建工具）

- bundle(webpack)
- bundleless(vite)

::: tip 提示

- vue-cli 升级了最新的 5.x，其中 webpack 版本为 5.x
- vite 使用 2.x

:::


#### 5. Select a UI Framework（选择 UI 组件库）

- Element UI
- Ant Design Vue
- Hui
- WinUI  
- Vant

::: tip 提示

- WinUI（鲸腾自研） 和 Vant，适用于 移动端 H5，离线包
    - Vue 2.x 使用 WinUI 1.x，Vue 3.x 使用 WinUI 2.x
    - Vue 2.x 使用 Vant 2.x，Vue 3.x 使用 Vant 3.x
    
- Hui（公司自研），element-ui，ant-design-vue，适用于 PC Web
    - Hui 只适配 Vue 2.x
    - Vue 2.x 使用 element-ui，Vue 3.x 使用 element-plus
    - Vue 2.x 使用 ant-design-vue 1.x，Vue 3.x 使用 ant-design-vue 3.x
    
:::

#### 6. Select a mobile layout adaptation plan?（选择移动端布局适配方案）

- rem
- vw
  
::: tip 提示

可以自由地用 px 去开发。相关配置在 `postcss.config.js` 

- rem：引入 `postcss-pxtorem` 及 `amfe-flexible`
- vw：引入 `postcss-px-to-viewport`

:::

#### 7. Select a Version control tool?（选择版本管理工具）

- Git
- SVN

#### 8. Add Mirror Source Support?（是否使用公司镜像源）

::: tip 提示

由于公司内使用了私服镜像源，因此会生成两个文件 `.npmrc`、`.yarnc`，用于指定项目所需要的指定镜像源地址。请务必要根据实际项目需求，动态调整文件里的地址。

:::

#### 9. Add See Package Support?（是否支持 SEE 平台发布物及 Docker 发布物）

::: tip 提示

当选择了第8步骤为 `yes` 时，此选项才会出现。

:::

#### 10. Add Subsystem Support?（是否支持子系统）

::: tip 提示

- 当选择了第8步骤为 `yes` 时，此选项才会出现。
- 支持生成 Hui pro 1.x 的子系统，可以运行在以操作员中心或者财富中台作为外框架的主系统中 
  - Vite 作为构建工具的时候，不支持生成 Hui pro 1.x 的子系统
  - Vue3 不支持 Hui pro 1.x
  - public/frame 相关的文件来源于财富中台外框架的样式文件，为了尽量还原业务子系统嵌入外框架运行时的样式
    
:::

### 安装依赖

- 输入以上命令后，模板文件会自动创建名字为 [project-name] 的文件夹，并将模板文件复制到此文件夹内。
- 选择 Git 的时候，会自动初始化 Git 仓库。
- 选择安装包管理工具，推荐选择：

优先级：yarn > npm

::: warning 提示

建议通过重新指定 registry 来解决 npm 安装速度慢的问题。若还是不行，可使用 yarn 替代 npm。

:::

## 开发环境

根据安装后的相关提示，输入相关命令以继续：

<CodeGroup>
  <CodeGroupItem title="安装依赖">

```bash
npm run bootstrap
```

  </CodeGroupItem>

  <CodeGroupItem title="开发环境">

```bash
npm run dev
#
npm run serve
```

  </CodeGroupItem>

  <CodeGroupItem title="ESLint">

```bash
npm run lint
```

  </CodeGroupItem>
  <CodeGroupItem title="Stylelint">

```bash
npm run stylelint
```

  </CodeGroupItem>

  <CodeGroupItem title="包分析工具">

```bash
npm run report
```

  </CodeGroupItem>
</CodeGroup>

::: warning 提示
在 Git 仓库里，通常情况下 ESLint 与 Stylelint 没必要单独执行，husky 提供的 git commit 钩子会在提交代码时，对缓存区里的代码做校验，这也会节省很多时间。
:::
