# 接口请求

## 接口请求封装

推荐使用 `src/services/request.js` 发送服务端接口的相关请求。`request.js` 是基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。具体可以参看 request.js. 它封装了全局 request 拦截器、response 拦截器、统一的错误处理、baseURL 设置等。

### 接口定义

- 所有的接口名应定义在 `src/services/RESTFULURL.js` 文件里。后续会结合使用**数据服务层的解决方案** [hep](https://www.npmjs.com/package/@winner-fed/hep-engine)，自动化生成请求的代码。

### 配置接口地址

默认基础的请求地址在根目录下的 `config.local.js` 里，字段名为 `API_HOME`。当然也可以根据不同的服务接口地址进行拓展字段，比如下面的 `API_UPLOAD`： 

```javascript
window.LOCAL_CONFIG = {
  API_HOME: 'https://api.github.com/',
  API_UPLOAD: 'https://api.github.com/upload',
};
```
### 请求拦截
```javascript
export const requestInstance = axios.create({});
/**
 * requestInstance 实例全局请求扩展配置
 * 添加一个请求拦截器 （于transformRequest之前处理）
 */
const axiosRequest = {
  success: (config) => {
    // 以下代码，鉴权token,可根据具体业务增删。
    // demo示例:
    if (config['url'].indexOf('operatorQry') !== -1) {
      config.headers['accessToken'] = 'de4738c67e1bb450be71b660f0716aa4675860cec1ff9bc23d800efb40519cf3';
    }
    return config;
  },
  error: (error) => Promise.reject(error)
};

requestInstance.interceptors.request.use(axiosRequest.success, axiosRequest.error);

```

### 响应拦截

```javascript
export const requestInstance = axios.create({});

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

function responseLog(response) {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )})`;
    console.log('%c┍------------------------------------------------------------------┑', `color:${randomColor};`);
    console.log('| 请求地址：', response.config.url);
    console.log('| 请求参数：', Qs.parse(response.config.data));
    console.log('| 返回数据：', response.data);
    console.log('%c┕------------------------------------------------------------------┙', `color:${randomColor};`);
  } else {
    console.log('| 请求地址：', response.config.url);
    console.log('| 请求参数：', Qs.parse(response.config.data));
    console.log('| 返回数据：', response.data);
  }
}

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    const { status, statusText } = response;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    }
    return {
      status,
      msg: codeMessage[status] || statusText
    };
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

/**
 * requestInstance 实例全局请求响应处理
 * 添加一个返回拦截器 （于transformResponse之后处理）
 * 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
 */
const axiosResponse = {
  success: (response) => {
    responseLog(response);
    return checkStatus(response);
  },
  error: (error) => {
    const { response, code } = error;
    // 接口请求异常统一处理
    if (code === 'ECONNABORTED') {
      // Timeout error
      console.log('Timeout error', code);
    }
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // 对返回的错误进行一些处理
      return Promise.reject(checkStatus(response));
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      console.log('断网了~');
    }
  }
};

requestInstance.interceptors.response.use(axiosResponse.success, axiosResponse.error);

```
 
## Mock 数据
Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，从而不会被服务端的开发所阻塞。

[Mock.js](http://mockjs.com/) 是常用的辅助生成模拟数据的三方库，借助他可以提升我们的 mock 数据能力。

比如：

```javascript
import mockjs from 'mockjs';

export default {
// 使用 mockjs 等三方库
'GET /api/getPet': mockjs.mock({
'list|100': [{ name: '@id', 'value|1-100': 50, 'type|0-2': 1 }],
}),
};
```
