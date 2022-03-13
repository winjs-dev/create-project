# 样式和资源

## 使用 CSS 

### 全局样式
引入 [normalize.css](https://github.com/necolas/normalize.css/) 作为 CSS 样式重置的一个现代替代方案。除此之外，还有根据项目长期累积的 `reset.less`。 

```less
/*
  1. Use a more-intuitive box-sizing model.
*/
*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*:not(input, textarea) {
  // 非标准属性
  // 当你触摸并按住触摸目标时候，禁止或显示系统默认菜单。在iOS上，当你触摸并按住触摸的目标，比如一个链接，Safari浏览器将显示链接有关的系统默认菜单。这个属性可以让你禁用系统默认菜单。
  -webkit-touch-callout: none;
  // iOS 若设置为 none, 则 input,textarea 输入无法触发 onchange 或者 oninput 事件
  // 会出现输入不了值的问题
  -webkit-user-select: none;
  user-select: none;
}

html,
body {
  height: 100%;
  // https://www.zhangxinxu.com/wordpress/2018/10/scroll-behavior-scrollintoview-%E5%B9%B3%E6%BB%91%E6%BB%9A%E5%8A%A8/
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  font-size: @fontSizeH3;
  line-height: 1.4;
  color: @fontColor;
  background-color: @colorWhite;
  // Improve text rendering
  -webkit-font-smoothing: antialiased;
}

// Margin & Padding
html,
body,
h1,
h2,
h3,
h4,
p,
form,
button,
input,
select,
ul,
ol,
dl,
dd {
  padding: 0;
  margin: 0;
}

// Font
h1,
h2,
h3,
h4,
i,
em,
strong {
  font-weight: normal;
}

i,
em,
b {
  font-style: normal;
  font-weight: normal;
}

// Link
a {
  color: @colorBlueMain;
  text-decoration: none;
}

a:active {
  text-decoration: none;
  outline: 0;
}

// Forms
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  cursor: pointer;
}

button[disabled],
html input[disabled] {
  cursor: default;
}

button,
input {
  border: none;
  outline: none;
}

// Tables
table {
  border-collapse: collapse;
  border-spacing: 0;
}

ul,
li {
  list-style: none;
}

/*
  6. Improve media defaults
*/
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/*
  7. Remove built-in form typography styles
*/
input,
button,
textarea,
select {
  font: inherit;
}

/*
  8. Avoid text overflows
*/
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/*
  9. Create a root stacking context
*/
#root,
#__next {
  isolation: isolate;
}

// --- 项目级别添加
// 防止图像被拉伸或压缩
img {
  object-fit: cover;
}

```

项目中使用的通用样式，都存放于 `src/assets/style/...` 目录下。

### 预处理器

脚手架内置支持 less，不支持 sass 等其他预处理器语言。但是如果有需求，可以自行通过选择的构建工具插件支持。同时，提供了一些常用的 `mixins` 函数库 [magicless](https://github.com/cloud-templates/magicless)。并且，脚手架已经全局注入了常用的**变量和函数**，故可以在实际的页面开发中直接使用。

### Scoped

为 `<style>` 添加 `scoped` 属性，它的 CSS 只作用于当前组件中的元素，父组件的样式将不会渗透到子组件。可以避免造成全局污染。

```vue
<style scoped>
  .page-content {
    background-color: #fff;
  }
</style>
```

### 深度选择器

如果你希望 `scoped` 样式中的一个选择器能够作用得「更深」，例如影响子组件，你可以使用 `>>>` 操作符。有些像 `Sass` 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。

由于使用 `scoped` 后，父组件的样式将不会渗透到子组件中。我们可以使用以下方式解决：

```vue
<!-- 写法1 使用 ::v-deep -->
<style scoped>
  ::v-deep(.win-card) {
    background-color: #940000;
  }
</style>

<!-- 写法2 使用 >>> 操作符-->
<style scoped>
  >>>.win-card {
    background-color: #940000;
  }
</style>
<!-- 写法3 使用 /deep/ -->
<style scoped>
  /deep/.win-card {
    background-color: #940000;
  }
</style>
<!-- 写法4 使用 :deep(<inner-selector>) -->
<style lang="scss" scoped>
  :deep(.win-card){
    background-color: #940000;
  }
</style>
```
 
::: tip 提示

- 写法1和写法4，都支持 Sass 预处理器。但是在 Vue3.0 单文件规范中，如果你还是使用写法1，会碰到如下警告:

```text
[@vue/compiler-sfc] ::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.
```

- 写法1在 Vue3.0 中已经被弃用了，以后在开发 Vue3.0 项目的时候，推荐使用写法4。

- 关于写法1和写法3，主要是不支持 Sass 预处理器的解析，且 >>> 操作符存在浏览器兼容性问题

:::
 
## 图标
脚手架针对图标的处理方案，有两种，一种是传统的 `iconfont` 方式，另外一种是 `svg` 的方式。推荐使用 `svg` 的方式来处理图标。

### iconfont 的不足
- 浏览器将其视为文字进行抗锯齿优化，有时得到的效果并没有想象中那么锐利。尤其是在不同系统下对文字进行抗锯齿的算法不同，可能会导致显示效果有所差异。
- Icon Font 作为一种字体，Icon 显示的大小和位置可能要受到 font-size、line-height、word-spacing 等等 CSS 属性的影响。 Icon 所在容器的 CSS 样式可能对 Icon 的位置产生影响，调整起来很不方便。
- 使用上存在不便。加载一个包含数百图标的 Icon Font，却只使用其中几个图标，非常浪费加载时间。通过 iconfont 生成的图标，新增图标需要重新下载替换原有图标资源，不够灵活。
- 为了实现最大程度的浏览器支持，可能要提供至少四种（TTF、WOFF、EOT、SVG）不同类型的字体文件。
- 填充仅限于单色，无法支持包含多种颜色的图标。

### Svg 的优势
- 支持多色图标了，不再受单色限制。
- 支持像字体那样通过 font-size, color 来调整样式。
- 支持 ie9+。
- 可利用 CSS 实现动画。
- Svg 雪碧图可以减少 HTTP 请求。
- 矢量，缩放不失真，在高倍屏幕上更清晰，文件尺寸更小，能保证更快的加载时间以及更好的用户体验。
- 可以很精细的控制 SVG 图标的每一部分。

### 自动注册 Svg 图标

在 `src/icons` 文件夹下的 svg 图标会被自动注册，这是因为使用了构建工具的插件进行了相关设置，文件全部打包成 svg 雪碧图。

#### 内置组件

通过全局注册的组件 `<svg-icon />` 即可显示已经注册的 svg 图标。具体实现可参考模板的 `src/components/global/SvgIcon`。

```vue
<template>
  <svg :class="['svg-icon', className]" aria-hidden="true">
    <use :xlink:href="'#icon-' + iconName" />
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
    props: {
      iconName: {
        type: String,
        required: true
      },
      className: {
        type: [String, Array],
        default: ''
      }
    }
  };
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: -0.15em;
    overflow: hidden;
    position: relative;
  }
</style>
```

在项目中使用方式如下：
```vue
<svg-icon icon-name="dog"></svg-icon>
```

#### Vue CLI

通过 [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader) 实现。

```javascript
// vue-cli5
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
    // svg
    // exclude icons
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
})
```

#### Vite 配置
通过 [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) 实现。

```javascript
// build/vite/plugin/svgSprite.js
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin(isBuild) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]'
  });
  return svgIconsPlugin;
}

// vite.config.js
export default () => {
  return {
    plugins: [
      configSvgIconsPlugin()
    ]
  }
}
```

然后，在 `main.js` 或 `main.ts` 文件中注册以下脚本。

```javascript
import 'virtual:svg-icons-register';
```
