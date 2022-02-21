import ejs from 'ejs';

// 模板字符串中需要 ${} 原样输出，需要对 $ 进行转义处理
const vueConfig = `const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const { formatDate } = require('@winner-fed/cloud-utils');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
<%_ if (application !== 'pc') { _%>
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
<%_ } _%>
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
// https://github.com/antfu/unplugin-vue2-script-setup
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default;
<%_ if (needsTypeScript && uiFramework === 'vant') { _%>
const tsImportPluginFactory = require('ts-import-plugin');
const merge = require('webpack-merge');
<%_ } _%>
<%_ if (versionControl === 'svn') { _%>
const svnInfo = require('svn-info');
<%_ } _%>
const N = '\\n';
const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};
<%_ if (versionControl === 'svn') { _%>
  // 获取 svn 信息
const getSvnInfo = () => {
  const svnURL = '';
  if (svnURL) return svnInfo.sync(svnURL, 'HEAD').lastChangedRev;

  return 'unknown';
};
<%_ } _%>
const genPlugins = () => {
  const plugins = [
    new WebpackBar(),
    ScriptSetup({})<%_ if (application !== 'pc') { _%>,
    // 为静态资源文件添加 hash，防止缓存
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/console.js'),
        hash: true,
      }
    ])
  <%_ } _%>
  ];

  if (isProd()) {
    plugins.push(
      // bannerPlugin
      new webpack.BannerPlugin({
        banner:
          \`@author: Winner FED\${
  N}@version: \${pkg.version}\${
  N}@description: Build time \${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}<%_ if (versionControl === 'svn') { _%> and svn version \${getSvnInfo()}<%_ } _%>
          \`
      }),
      new WebpackManifestPlugin({
        fileName: path.resolve(
          __dirname,
          'dist',
          \`manifest.\${Date.now()}.json\`
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
      })<%_ if (application !== 'offline') { _%>,
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8,
        cache: true
      })
    <%_ } _%>
    );
  }

  return plugins;
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
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#publicPath
   *  publicPath: process.env.NODE_ENV === 'production' ? \`\${pkg.name}\` : './'
   */
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    port: 3000,
    https: false,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
    // 代理示例 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000', // 后端接口地址
    //     ws: true,
    //     changeOrigin: true, // 是否允许跨域
    //     pathRewrite: {
    //       '^/api': ''   // 直接用'api/接口名'进行请求.
    //     }
    //   }
    // }
  },
  <%_ if (needsTypeScript) { _%>
  pwa: {
    name: \`\${pkg.name}\`,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
    }
  },
  <%_ } _%>
  <%_ if (needsTypeScript && framework === 'v3') { _%>
  transpileDependencies: ['vue', 'vue-router', '@vue'],
  <%_ } _%>
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
        additionalData: \`@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";\`,
      }
    }
  },
  // disable thread-loader, which is not compactible with this plugin
  parallel: false,  
  configureWebpack: () => ({
    name: \`\${pkg.name}\`,
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
        <%_ if (application === 'offline') { _%>
        'native-bridge-methods': resolve('node_modules/@winner-fed/native-bridge-methods/dist/native-bridge-methods.esm')
        <%_ } _%>
      }
    },
    plugins: genPlugins(),
    // https://github.com/cklwblove/vue-cli3-template/issues/12
    optimization: getOptimization()
  }),
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
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
      .test(/\\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  <%_ if (needsTypeScript && uiFramework === 'vant') { _%>
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options;
      })
      .end();
    <%_ } _%>
    
    <%_ if (needsTypeScript) { _%>
    // disable type check and let \`vue-tsc\` handles it
    config.plugins.delete('fork-ts-checker');
    <%_ } _%>
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      );

    // plugin
    
    // preload
    // 移除 preload 插件
    config
      .plugins
      .delete('preload');

    // when there are many pages, it will cause too many meaningless requests
    config
      .plugins
      .delete('prefetch');

    // webpack-html-plugin
    config
      .plugin('html')
      .tap((args) => {
        args[0].minify = {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        };
        return args;
      });

  <%_ if (framework === 'v2') { _%>
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        options.compiler = require('vue-template-babel-compiler');
        return options;
      })
      .end();
    <%_ } _%>
    // optimization
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // \`runtime\` must same as runtimeChunk name. default is \`runtime\`
              inline: /runtime\\..*\\.js$/
            }])
            .end();

          config
            .optimization
            .splitChunks({
              chunks: 'all',
              cacheGroups: {
                vendors: {
                  name: 'chunk-vendors',
                  test: /[\\\\/]node_modules[\\\\/]/,
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
          config.cache({
            // 将缓存类型设置为文件系统,默认是memory
            type: 'filesystem',
            buildDependencies: {
              // 更改配置文件时，重新缓存
              config: [__filename]
            }
          });  
          config.optimization.runtimeChunk('single');
        }
      );
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
});
`;

export default function generateVueConfig({
  framework,
  application,
  versionControl,
  needsTypeScript,
  uiFramework
}) {
  return ejs.render(vueConfig, {
    framework,
    application,
    versionControl,
    needsTypeScript,
    uiFramework
  });
}
