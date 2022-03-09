# 环境变量与模式

## vue-cli

可以通过在 `package.json` 的 `scripts` 命令后，添加 `--mode xx` 来指定程序运行时的不同环境模式，默认为 production。例如，你想在g构建命令中指使用开发环境变量：

```bash
vue-cli-service build --mode development
```

所有的环境变量都会从对应的[环境文件](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)中载入。并且在这些环境文件中，只有以 `VUE_APP_*`
开头的变量会被 [webpack.DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)（允许在**编译时**将你代码中的变量替换为其他值或表达式） 静态嵌入到开发侧的包中。然后，在代码中可以通过 `process.env.VUE_APP_PAGE_TITLE` 访问到。例如，

```vue

<template>
  <div class="pages">
    <div class="pages-content">
      <!-- template中使用环境变量 -->
      <div>{{ pageTitle }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageTitle: process.env.VUE_APP_PAGE_TITLE
      };
    },
    created () {
      // js 代码中使用环境变量
      console.log('BASE_URL: ', process.env.BASE_URL);
      console.log('NODE_ENV: ', process.env.NODE_ENV);
    }
  };
</script>
```

在构建过程中，`process.env.VUE_APP_PAGE_TITLE` 将会被相应的值所取代。在 `VUE_APP_PAGE_TITLE=hello` 的情况下，它会被替换为 "hello"。

除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量:

- `NODE_ENV` - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。
- `BASE_URL` - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。

具体配置，可以参考项目根目录下的 `.env`、`.env.development`、`.env.production`。
   

## vite

### 使用 define 定义全局变量
在页面中会用到一些常量，这些常量在项目中后期不会发生变更，可以再构建的时候生成全局变量。可以在 `vite.config.js` 添加

```javascript
import { defineConfig, loadEnv } from 'vite';

export default defineConfig({
  define: {
    PAGE_COUNT: 15
  },
})
```
在业务代码中使用

```javascript
const count = ref(PAGE_COUNT);
```

### 使用 env 文件定义变量和模式
使用 Vite 同样是可以使用 [dotenv](https://github.com/motdotla/dotenv) 加载环境变量和指定模式的。

#### 环境变量

```bash
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

::: tip 注意

环境加载优先级

一份用于指定模式的文件（例如 .env.production）会比通用形式的优先级更高（例如 .env）。

另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 .env 类文件覆盖。

.env 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。

:::

加载的环境变量也会通过 `import.meta.env` 暴露给客户端源码。

为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_*` 为前缀的变量才会暴露给经过 vite 处理的代码。例如，`.env` 文件中：

```bash
DB_PASSWORD=foobar

# spa-title
VITE_GLOB_APP_TITLE = vite vue template
```
只有 VITE_GLOB_APP_TITLE 会被暴露为 import.meta.env.VITE_GLOB_APP_TITLE 提供给客户端源码，而 DB_PASSWORD 则不会。

模板提供的具体配置，可以参考项目根目录下的 .env、.env.development、.env.production。

##### 模式
Vite 的 `--mode` 选项，会读取指定的值匹配的环境变量，用于覆盖命令使用的默认模式。

例如，如果你想为我们假设的 staging 模式构建应用：

```bash 
vite build --mode staging
```

为了使应用实现预期行为，我们还需要一个 .env.staging 文件：

```bash 
# .env.staging
NODE_ENV=production
VITE_GLOB_APP_TITLE=vite vue template (staging)
```

此时，.env 和 .env.staging 两个环境变量文件将被加载，staging 应用具有类似于生产的行为，但显示的标题与生产环境不同。

`vite.config.js` 相关配置：

```javascript
import { defineConfig, loadEnv } from 'vite';
import { wrapperEnv } from './build/vite/utils';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;
  
});

```
