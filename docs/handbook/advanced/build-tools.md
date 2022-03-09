# 构建工具

`create-project` 创建的项目，在构建工具方面，支持以 `webpack` 为代表的 bundle 工具。同时也支持最近这两年比较流行的，基于 ES module 的 bundleless 工具，以 `vite` 为代表。

下面来介绍下，这两种构建工具在项目模板具体的一些使用特性。

## bundle

是基于官方提供的命令行工具 [vue-cli](https://cli.vuejs.org/zh/) 进行搭建的。参考了里面的一些配置，并在 `vue.config.js` 文件里扩展了一些常用的功能。

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
    axios.get("/api/getPetId").then(res => {
      console.log('getPetId:', res);
    });
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

### 支持 gzip 压缩

```javascript
const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const pkg = require('./package.json');
const { formatDate } = require('@winner-fed/cloud-utils');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const WebpackBar = require('webpackbar');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

const genPlugins = () => {
  const plugins = [
    new WebpackBar(),
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

### 生成 manifest.json

```javascript
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const pkg = require('./package.json');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

const genPlugins = () => {
  const plugins = [];

  if (isProd()) {
    plugins.push(
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

### Vue2 支持 composition-api/setup 写法

```javascript
const { defineConfig } = require('@vue/cli-service');
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default;

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

const genPlugins = () => {
  const plugins = [
    ScriptSetup({})
  ];

  return plugins;
};

module.exports = defineConfig({
  configureWebpack: () => ({
    plugins: genPlugins(),
  }) 
})
```
`package.json` 添加相关依赖

```json
{
  "dependencies": {
    "@vue/composition-api": "^1.4.6"
  },
  "devDependencies": {
    "@vue/runtime-dom": "^3.2.31",
    "unplugin-vue2-script-setup": "^0.9.3"
  }
}
```

::: warning 注意

[@vue/composition-api](https://github.com/vuejs/composition-api/blob/main/README.zh-CN.md) 是用于提供组合式 API 的 Vue 2 插件。支持所有现代浏览器以及IE11+。对于更低版本的 IE 浏览器你需要安装 WeakMap polyfill (例如使用 core-js库)

:::

## bundleless

### 配置路径别名 alias

`vite.config.js` 相关配置：

```javascript
import { defineConfig, loadEnv } from 'vite';
import { wrapperEnv } from './build/vite/utils';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;
  
  return {
    resolve: {
      alias: [
        {
          // @/xxxx  =>  src/xxx
          find: /^@\//,
          replacement: pathResolve('./src') + '/'
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('./types') + '/'
        },
        {
          find: /^utils/,
          replacement: pathResolve('node_modules/@winner-fed/cloud-utils/dist/cloud-utils.esm')
        }
      ]
    },
  }
});

```

### 配置代理 Proxy，本地解决跨域问题
`vite.config.js` 相关配置：

```javascript
import { defineConfig, loadEnv } from 'vite';
import { wrapperEnv } from './build/vite/utils';
import { createProxy } from './build/vite/proxy';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;
  
  return {
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true
      }
    },
  }
});
```

其中，`/build/vite/` 目录的 proxy.js 代码如下：

```javascript
// proxy.ts

const httpsRE = /^https:\/\//;

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list) {
  const ret = {};
  if (Array.isArray(list) && list.length) {
    for (const [prefix, target] of list) {
      const isHttps = httpsRE.test(target);

      // https://github.com/http-party/node-http-proxy#options
      ret[prefix] = {
        target: target,
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
        // https is require secure=false
        ...(isHttps ? { secure: false } : {})
      };
    }
  }

  return ret;
}
```
`VITE_PROXY` 是在根目录下的 `.env.development` 里定义的，如下： 

```bash 
# Cross-domain proxy, you can configure multiple
VITE_PROXY=[["/api","http://localhost:3000"],["/upload","http://localhost:3001/upload"]]
```
  
### 使用 JSX或TSX
[@vitejs/plugin-vue-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx) 通过 HMR 提供 Vue 3 JSX 和 TSX 支持。

`vite.config.js` 配置

```javascript
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/vite/utils';

function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;

  const isBuild = command === 'build';
  
  return {
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),
  }
})

```
其中，在使用 Vue3 时，`build/vite/plugin/` 目录的 index.js

```javascript
// build/vite/index.js

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [
    vue(),
    vueJsx(),
    svgLoader()
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY &&
  isBuild &&
  vitePlugins.push(
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  );
  
  return vitePlugins;
}

```

在使用 Vue2 时，`build/vite/plugin/` 目录的 index.js

```javascript
import legacy from '@vitejs/plugin-legacy';
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';
// @ts-ignore
import vueTemplateBabelCompiler from 'vue-template-babel-compiler';
import scriptSetup from 'unplugin-vue2-script-setup/vite';
import svgLoader from 'vite-svg-loader';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [
    vue2({
      jsx: true,
      vueTemplateOptions: {
        compiler: vueTemplateBabelCompiler
      }
    }),
    scriptSetup(),
    svgLoader()
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    );

  return vitePlugins;
}

```
 
### Less 全局注入变量及函数

`vite.config.js` 配置如下：

```javascript
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";`,
          modifyVars: {
            // Used for global import to avoid the need to import each style file separately
            // reference:  Avoid repeated references
          },
          javascriptEnabled: true
        }
      }
    }
  };
});

```

### 支持 gzip 压缩

使用 [vite-plugin-compression](https://github.com/vbenjs/vite-plugin-compression) 插件实现。       

`build/vite/plugin/index.js` 配置如下:

```javascript
import { configCompressPlugin } from './compress';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [];


  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }

  return vitePlugins;
}
```

`build/vite/plugin/compress.js` 如下：

```javascript
/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 */
import compressPlugin from 'vite-plugin-compression';

export function configCompressPlugin(
  // 'gzip' | 'brotli' | 'none'
  compress,
  deleteOriginFile = false
) {
  const compressList = compress.split(',');

  const plugins = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile
      })
    );
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile
      })
    );
  }
  return plugins;
}

```

### 构建包依赖分析

使用 [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) 插件实现。   

```javascript
import { configVisualizerConfig } from './visualizer';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [];
  
  // vite-plugin-svg-icons
  vitePlugins.push(configVisualizerConfig(isBuild));
  
  return vitePlugins;
}
```

`build/vite/plugin/visualizer.js` 如下：

```javascript
/**
 * Package file volume analysis
 */
import { visualizer } from 'rollup-plugin-visualizer';
import { isReportMode } from '../utils';

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true
    });
  }
  return [];
}

```

### SVG 雪碧图
使用 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) 插件实现。

```javascript
import { configSvgIconsPlugin } from './svgSprite';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [];
  
  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  
  return vitePlugins;
}
```

`build/vite/plugin/svgSprite.js` 如下：

```javascript
/**
 * Vite Plugin for fast creating SVG sprites.
 * https://github.com/vbenjs/vite-plugin-svg-icons
 */

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

```
