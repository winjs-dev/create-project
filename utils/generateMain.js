export default function generateMain({ application, uiFramework, layoutAdapter, needsTypescript }) {
  let mainContent = `import 'core-js/stable';
import 'regenerator-runtime/runtime';
`

  if ((application === 'mobile' || application === 'offline') && layoutAdapter !== 'vw') {
    mainContent += `
import 'amfe-flexible';
    `
  }

  mainContent += `
import Vue from 'vue';
`

  needsTypescript &&
    (mainContent += `
import Component from 'vue-class-component';
import './bus';
import './pwa/register-service-worker';
    `)

  mainContent += `
import App from './App.vue';
import router from './router';
import './router/router.interceptor';
import './components/global';
import './icons';
import './filters';
import './services';
  `

  if (uiFramework === 'element-ui') {
    mainContent += `
import './vendor/element';
    `
  } else if (uiFramework === 'ant') {
    mainContent += `
import './vendor/ant';
    `
  } else if (uiFramework === 'hui') {
    mainContent += `
import './vendor/hui';
    `
  } else if (uiFramework === 'vant') {
    mainContent += `
import './vendor/vant';
    `
  } else if (uiFramework === 'wui') {
    mainContent += `
import './vendor/wui';
    `
  }

  mainContent += `
import './assets/style/app.less';
  `

  if (application === 'offline') {
    mainContent += `
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
   `
  }

  if (needsTypescript) {
    mainContent += `
// 注册钩子函数
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);
    `
  }

  mainContent += `
/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';
  `

  if (application === 'offline') {
    mainContent += `
if (isLightOS()) {
  nativeReady().then(() => {
    new Vue({
      el: '#app',
      router,
      // use Runtime-only
      // https://vuejs.org/v2/guide/installation.html
      render: (h) => h(App),
    });
  });
} else {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    // use Runtime-only
    // https://vuejs.org/v2/guide/installation.html
    render: (h) => h(App),
  });
}
    `
  } else {
    mainContent += `
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // use Runtime-only
  // https://vuejs.org/v2/guide/installation.html
  render: (h) => h(App)
});
    `
  }

  return mainContent
}
