# 目录及约定

在文件和目录的组织上，更倾向于选择约定的方式。

一个应用的基本目录结构如下：

```bash
.
├── build
├── docs
├── public
└── src
    ├── assets
    │   ├── fonts
    │   ├── img
    │   └── style
    ├── components
    │   ├── NetworkBroken
    │   ├── SendCode
    │   └── global
    ├── filters
    ├── icons
    │   └── svg
    ├── models
    ├── router
    ├── services
    ├── vendor
    └── views
        └── hello
```

## build

构建工具（webpack/vite） 及 node 命令行工具相关配置
- index.js - 利用 tasksfile 插件，自定义打包构建之后的异常，便于捕获。
- zip.js - 将构建的 dist 包压缩成 zip 格式。

## public
该目录下的文件不会被构建工具（webpack/vite）处理，构建的包最终是原样输出。而其他的静态资源都会被构建工具（webpack/vite）当做模块处理。
- 前端配置文件，`config.local.js`，一般用于配置动态的后端接口路径等
- 移动端调试工具，如腾讯的 [vconsole.min.js](https://github.com/Tencent/vConsole)。考虑到此文件并不是开发时必须引入的，因此 `console.js` 主要用来实现动态加载此文件的。

## src
约定 `src` 为源码目录。

## src/assets
用于静态资源文件，作用于全局
  - fonts - font 字体图标，默认是 [iconfont.cn](https://www.iconfont.cn/) 生成的全部文件
  - img - 图片资源文件
  - style - CSS 相关样式文件，`reset` 样式文件及全局定义的 `less` 变量文件，自定义的 `mixins` 函数库，换肤文件等
  - js - 不经过 npm 或 Yarn 下载的第三方依赖包。（扩展出来的文件）

## src/components    
组件目录，统一采用大驼峰拼接，如 SendCode

## src/filters
过滤器，过滤器是 vue2 的叫法，在 Vue3 是不存在的。Vue3 可以理解成是函数库

## src/icons
放置 svg 相关的图标。可以作为 iconfont 的替代品，因为 iconfont 只支持单色。项目里推荐使用这种方式。

## src/models
数据生产者。可以按照前端领域模型来组织。项目中的数据来源，主要是后端接口（HTTP 协议的接口），及混合式开发时，壳子这边提供的桥接接口。或者是接入的第三方插件提供的数据。
- 复用，解耦，使用方便。
- 注释清晰，遵循 jsdoc 的注释规范，利用 `npm scripts`里的 `gen:docs`生成可视化的前端接口文档。
- 纯前端的 BFF 层，视图和业务逻辑的胶水层。

## src/router
路由及路由拦截器

## src/services
网络请求库的封装。对 HTTP 协议接口做的封装。
- autoMatchBaseUrl.js - 项目中若存在多个服务端接口的对接，则需要在 config.local.js 里定义多个接口请求路径，此文件就是针对配置不同的 prefix，做自动适配的。可参考下面一段示例： _autoMatchBaseUrl 与 config.local.js 配合使用_
- request.js - 针对 axios 的封装，主要函数是 URL, URL, formData)
- RESTFULURL.js - 所有服务端接口的映射表，对应的 value 值不建议添加接口具体的 path，可参考下面一段示例： _RESTFULURL.js_ 示例， 如标准的 URL `http://xx.com/v1/func_get_user_info`
    - HTTP 协议路径 [http://xx.com/](http://xx.com/)
    - path 路径：v1/
    - 接口名：`[func_get_user_info](http://xx.com/v1/func_get_user_info)`
    - 因为有时候开发环境和生产环境接口对应 path 会有修改，所以在配置 API_HOME 的时候，尽量是 HTTP 协议路径 + path 路径。

```javascript
// autoMatchBaseUrl与config.local.js配合使用
// config.local.js
window.LOCAL_CONFIG = {
  API_HOME: 'http://api.github.com/',
  CLINET_API_HOME: 'http://client.github.com/',
  MALL_API_HOME: 'http://mall.github.com/'
};

// constant.js
const QUOTE_PREFIX = 'v1/';
const CLIENT_PREFIX = 'client/';
const MALL_PREFIX = 'shop/';
export { QUOTE_PREFIX, CLIENT_PREFIX, MALL_PREFIX };

// autoMatchBaseUrl.js
export default function autoMatchBaseUrl(prefix) {
  const options = {};
  switch (prefix) {
    case QUOTE_PREFIX:
      options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      options.baseUrl = window.LOCAL_CONFIG.QUOTE_HOME + QUOTE_PREFIX;
      break;
    case CLIENT_PREFIX:
      options.data = {
        user_token: store.getters.clientToken
      };
      options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      options.baseUrl = window.LOCAL_CONFIG.IFS_API_HOME + CLIENT_PREFIX;
      break;
    case MALL_PREFIX:
      options.data = {
        fansToken: encrypt.encrypt(store.getters.userInfo.fundAccount)
      };
      options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      options.baseUrl = window.LOCAL_CONFIG.MALL_API_HOME + MALL_PREFIX;
      break;
    default:
      // 默认
      options.data = {
        user_token: store.getters.apiToken
      };
      options.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      };
      options.baseUrl = window.LOCAL_CONFIG.API_HOME + HOME_PREFIX;
  }

  return options;
}
```

```javascript
// RESTFULURL.js
export default {
  ...
  getUserInfo: 'func_get_user_info'
  ...
}
```

## src/views
视图层，数据的消费者。尽可能的让视图层更“轻”。
- 统一采用小驼峰（切记），如 helloWorld

## src/constant.js
定义常量（大驼峰，单词之间以下划线连接）。编写业务程序时，会有一些所需要的常量值，比如订单状态，1,2,3...。一般情况下，这些值都是固定不变的。如果直接将这些值硬编码到代码里，就可以理解成“魔法值”。魔法值的存在，从语法上来说是合理的，但是从业务上却让人无法理解其中 0，1，2，3 的含义。对于这些魔法值，我们往往需要通过上下文推断出来逻辑，如果是非常复杂的业务或者 10 年前的代码那就更惨了，搞不好连文档注释也没有。为了可读性，所以我们要尽量避免出现魔法值。
  举个例子，如下

```vue
<!-- 服务期限 -->
<div class="card-subscription viability-info">
  <div class="header">
    <span>服务期限</span>
  </div>
  <div class="content">
    <div v-if="+combinePrice.farePerMonth !== 999999999"
         class="viability-box"
         :class="{active: viability === '1' }"
         @click="viability = '1'">
      <p>1个月</p>
      <p class="price"><b>￥</b>{{combinePrice.farePerMonth}}</p>
    </div>
    <div v-if="+combinePrice.farePerQuarter !== 999999999"
         class="viability-box"
         :class="{active: viability === '3' }"
         @click="viability = '3'">
      <p>3个月</p>
      <p class="price"><b>￥</b>{{combinePrice.farePerQuarter}}</p>
    </div>
    <div v-if="+combinePrice.farePerHalfyear !== 999999999"
         class="viability-box"
         :class="{active: viability === '6' }"
         @click="viability = '6'">
      <p>6个月</p>
      <p class="price"><b>￥</b>{{combinePrice.farePerHalfyear}}</p>
    </div>
</div>
```
  
`999999999` 是什么玩意。。。
```javascript
// constant.js
...
// 中台与前端做的协定
// 特殊 999999999 价格，不做界面展示
const SPECIAL_PRICE = 999999999;

export {
  ...
  SPECIAL_PRICE
};
```

## index.html
遵循于 [EJS](https://ejs.co/) 嵌入式 JavaScript 模板引擎语法，比如 `<%% EJS %%>`。可以动态设置并解析所定义的变量。

- 配置文件 config.local.js 的引用方式这里做下说明，由于之前生产环境上遇到过，更改配置文件并上传服务器更新后，有缓存的问题，因此用了 `document.write` 方式实现，用于清除此文件的缓存

```javascript
<script>
  document.write(unescape('%3Cscript src=\'./config.local.js?_t=' + Math.random() + '\'
  type=\'text/javascript\'%3E%3C/script%3E'));
</script>
```

### src/public/index.html
遵循 `vue-cli` 放置的目录规范。借助于 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 来实现 EJS 的模板引擎语法。

### src/index.html
遵循 `vite` 放置的目录规范。借助于 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) 来实现 EJS 的模板引擎语法。

## .env
环境变量配置文件，会在所有的环境中被载入。

## .env.development
定义**开发模式**下的环境变量，只在**开发模式**下才被引入。

## .env.production
定义**生产模式**下的环境变量，只在**生产模式**下才被引入。
 
## .browserslistrc
用于在不同的前端工具之间共用目标浏览器和 node 版本的配置文件。主要用于 [Autoprefixer](https://github.com/postcss/autoprefixer)、 [Babel](https://babeljs.io/) 等，详细可参考 [Browserslist](https://juejin.cn/post/6844903669524086797)。移动端 H5 及 PC Web 的配置各有不同。

一个在线工具，用于查看 browserlist 配置文件匹配到哪些浏览器：[https://browserl.ist/?q=defaults](https://browserl.ist/?q=defaults)
注意：并不是项目中所有依赖都支持低版本浏览器，例如 vue 本身不支持低于 IE9 的浏览器；

## .editorconfig 
该文件是一套用于统一代码格式的解决方案，可以帮助开发者在不同的编辑器和 IDE 之间定义和维护一致的代码风格。常见的 IDE 如 WebStorm 都可以配置。可以参考 [editor-config](http://www.alloyteam.com/2014/12/editor-config/)  

## .escheckrc 
使用简单的 shell 命令检查 JavaScript 文件中使用的 ES 版本。构建的前端包（dist 包）需要支持安卓 5.0 及 iOS9.0 机型，所以为了避免包里出现 ES6 语法，增加了新的 npm scripts 命令: escheck。执行完 npm run build 之后，可以使用 npm run escheck 进行检测。

```json
{
  "ecmaVersion": "es5",
  "module": false,
  "files": "./dist/**/*.js",
  "not": []
}
```  

## postcss.config.js 
postcss 配置文件，集成了 autoprefixer ，px2rem 等插件

```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 2,
      propList: [
        'height',
        'line-height',
        'width',
        'padding',
        'margin',
        'top',
        'left',
        'right',
        'bottom',
        'font-size'
      ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1
    }
  }
};
``` 

## prettier.config.js 
prettier 配置文件，用于代码格式化，如 .vue，.js，.ts，.css，.less 等文件

```javascript
module.exports = {
  // 行尾需要有分号
  semi: true,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 一行最多 120 字符
  printWidth: 120,
  // 使用单引号
  singleQuote: true,
  // 末尾无逗号
  trailingComma: 'none',
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 大括号内的首尾需要空格
  bracketSameLine: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // vue 文件中的 script 和 style 内需要缩进
  vueIndentScriptAndStyle: true,
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 格式化内嵌代码
  embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      files: ['*.less', '*.css'],
      options: {
        singleQuote: false
      }
    }
  ]
};
```

检测命令：
```bash
prettier --write \"src/**/*.{js,jsx,json,ts,tsx,css,less,scss,vue,html,md}\"
```

## stylelint.config.js 
样式编码规范的配置文件，用于检测 .less，.css 等样式文件
```javascript
module.exports = {
  extends: '@winner-fed/stylelint-config-win'
};
```

## .eslintrc.js
JavaScript 编码规范，用于检测 .vue，.js，.ts 等文件
```javascript
module.exports = {
  extends: ['@winner-fed/win', '@winner-fed/win/vue']
};
```

## f2elint.config.js
[F2ELint](https://www.npmjs.com/package/@winner-fed/f2elint) 是《恒生前端规约》的配套 Lint 工具，可以为项目一键接入规约、一键扫描和修复规约问题，保障项目的编码规范和代码质量。

```javascript
 module.exports = {
  enableStylelint: true,
  enableMarkdownlint: true,
  enablePrettier: true
};
```

## .markdownlint.json
配套的 markdownlint 可共享配置。可参考 [@winner-fed/markdownlint-config-win](https://www.npmjs.com/package/@winner-fed/markdownlint-config-win)

```json
 {
  "extends": "@winner-fed/markdownlint-config-win"
}
```

## commitlint.config.js
commitlint 配置文件，用于对 git commit message 进行校验。继承 [@winner-fed/commitlint-config-win](https://www.npmjs.com/package/@winner-fed/commitlint-config-win)

```javascript
 module.exports = {
  extends: ['@winner-fed/commitlint-config-win']
};
```

