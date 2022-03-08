# 构建工具

`create-project` 创建的项目，在构建工具方面，支持以 `webpack` 为代表的 bundle 工具。同时也支持最近这两年比较流行的，基于 ES module 的 bundleless 工具，以 `vite` 为代表。

下面来介绍下，这两种构建工具在项目模板具体的一些使用特性。

## bundle

是基于官方提供的命令行工具 [vue-cli](https://cli.vuejs.org/zh/) 进行搭建的。参考了里面的一些配置，并在 `vue.config.js` 文件里扩展了一些常用的功能。

### 多环境变量

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

### vue.config.js 基础配置

```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#publicPath
   *  publicPath: process.env.NODE_ENV === 'production' ? `${pkg.name}` : './'
   */
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  },
  // disable thread-loader, which is not compactible with this plugin
  parallel: false,
})

```
 
### proxy 解决接口跨域问题

```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // webpack-dev-server 相关配置
  devServer: {
    port: 3000,
    https: false,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    // 代理示例 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 后端接口地址
        ws: true,
        changeOrigin: true, // 是否允许跨域
        pathRewrite: {
          '^/api': ''   // 直接用'api/接口名'进行请求.
        }
      }
    }
  },
})
```
使用示例：

```javascript
<script>
import axios from "axios";
export default {
  created() {
    axios.get("/api/getPetId").then(res => {
      console.log('getPetId:', res);
    });
  }
};
</script>
```
 
### 添加别名 alias

```javascript
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const pkg = require('./package.json');
const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};

module.exports = defineConfig({
  configureWebpack: () => ({
    name: `${pkg.name}`,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@style': resolve('src/assets/style'),
        '@js': resolve('src/assets/js'),
        '@components': resolve('src/components'),
        '@mixins': resolve('src/mixins'),
        '@filters': resolve('src/filters'),
        '@store': resolve('src/store'),
        '@views': resolve('src/views'),

        // 文件别名
        services: resolve('src/services'),
        variable: resolve('src/assets/style/variable.less'),
        utils: resolve('node_modules/@winner-fed/cloud-utils/dist/cloud-utils.esm'),
        mixins: resolve('node_modules/@winner-fed/magicless/magicless.less'),
      }
    }
  }),
});
```

#### 支持 SVG 组件

```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
    // module

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
  },
})
```

### 使用 splitChunks 单独打包三方依赖模块
```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
  // optimization
  config
  .when(process.env.NODE_ENV === 'production',
    config => {
      config
        .optimization
        .splitChunks({
          chunks: 'all',
          cacheGroups: {
            defaultVendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // 只打包初始时依赖的第三方
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // 可自定义拓展你的规则
              minChunks: 3, // 最小公用次数
              priority: 5,
              reuseExistingChunk: true
            }
          }
        });
      config.optimization.runtimeChunk('single');
    });
  },
})
```

### CSS 相关配置及 Less 全局注入变量及函数

```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {
      less: {
        // 全局注入变量及mixins
        additionalData: `@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";`,
      }
    }
  },
})
```

### 生产环境移除 console.log

```javascript
const { defineConfig } = require('@vue/cli-service');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};
// 生产环境去掉 console.log
const getOptimization = () => {
  let optimization = {};
  if (isProd()) {
    optimization = {
      // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    };
  }
  return optimization;
};

module.exports = defineConfig({
  configureWebpack: () => ({
    // https://github.com/cklwblove/vue-cli3-template/issues/12
    optimization: getOptimization()
  })
})
```

### 支持 gzip，生成 manifest.json，setup 写法
```javascript
const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const pkg = require('./package.json');
const { formatDate } = require('@winner-fed/cloud-utils');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const WebpackBar = require('webpackbar');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
// https://github.com/antfu/unplugin-vue2-script-setup
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default;

const N = '\n';

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

const genPlugins = () => {
  const plugins = [
    new WebpackBar(),
    ScriptSetup({}),
    // 为静态资源文件添加 hash，防止缓存
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/console.js'),
        hash: true,
      }
    ])
  ];

  if (isProd()) {
    plugins.push(
      // bannerPlugin
      new webpack.BannerPlugin({
        banner:
          `@author: Whale FE${
            N}@version: ${pkg.version}${
            N}@description: Build time ${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}          `
      }),
      new WebpackManifestPlugin({
        fileName: path.resolve(
          __dirname,
          'dist',
          `manifest.${Date.now()}.json`
        ),
        filter: ({name, path}) => !name.includes('runtime'),
        generate (seed, files, entries) {
          return files.reduce((manifest, {name, path: manifestFilePath}) => {
            const {root, dir, base} = path.parse(manifestFilePath);
            return {
              ...manifest,
              [name + '-' + base]: {path: manifestFilePath, root, dir}
            };
          }, seed);
        }
      }),
      new CompressionWebpackPlugin({
        filename: '[path][base].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    );
  }

  return plugins;
};

module.exports = defineConfig({
  configureWebpack: () => ({
    plugins: genPlugins(),
  }) 
})
```

## bundleless
