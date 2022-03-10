# 通用功能

脚手架为开发者提供了一些方便的功能。基于构建工具 webpack 或者 vite，集成了一些常用的插件。

## Vue3

### setup name 增强

在使用 Vue3 作为基础框架的时候，非常推荐大家使用更为快捷的 `setup` 写法。只需要在 `script` 标签上加上 `setup` 属性，组件在编译的过程中代码运行的上下文是在 `setup()` 函数中，无需 `return`，`template` 可直接使用。
但在使用的时候，存在一个不方便的地方，即**无法自定义 name**。我们在使用 keep-alive 是需要 name 的。而解决这个问题通常是，需要通过写两个 script 标签来解决，一个使用 setup，一个使用 defineComponent，但这样不够优雅。如下：

```javascript 
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
})
</>

<script setup>
// ...
</script>
```

可以借助社区的 [vite-plugin-vue-setup-extend](https://github.com/vbenjs/vite-plugin-vue-setup-extend) 来实现。

```javascript
// vite.config.js
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
})
```

```vue
<template>
  <div>hello world {{ a }}</div>
</template>

<script lang="ts" setup name="App">
  const a = 1
</script>
```

### API（ref，reactive，toRefs 等） 自动导入

setup 语法让我们不用再一个一个的把变量和方法都 return 出去，就能在模板上使用，大大的解放了我们的双手。然而对于一些常用的组合式 API，比如 ref、toRefs、reactive、watch等，还是每次都需要我们在页面上手动进行import。
我们可以通过 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 实现自动导入，无需 import 即可在文件里使用。
 
```javascript
// vite.config.js
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({ /* options */ }),
  ],
})
```

```javascript
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({ /* options */ }),
    ],
  },
}
```

::: tip 注意

- 根目录下的 auto-imports.d.ts 文件是自动生成的。
- 在没有 import 的情况下使用会导致 eslint 提示报错，脚手架已经通过在 eslintrc.js 安装插件 [vue-global-api](https://github.com/antfu/vue-global-api) 解决了这个问题   

:::
