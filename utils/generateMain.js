import ejs from 'ejs';

const mainV2 = `<%_ if (buildTools === 'bundle') { _%>import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ } _%>
<%_ if ((application === 'mobile' || application === 'offline') && layoutAdapter !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import Vue from 'vue';
<%_ if (needsTypeScript) { _%>
import Component from 'vue-class-component';
<%_ } _%>
import App from './App.vue';
import router from './router';
import './router/router.interceptor';
import './components/global';
<%_ if (buildTools === 'bundle') { _%>
import './icons';
<%_ } _%>
import './filters';
import './services';
<%_ if (uiFramework === 'element-ui') { _%>
import './vendor/element';
<%_ } else if (uiFramework === 'ant') { _%>
import './vendor/ant';
<%_ } else if (uiFramework === 'hui') { _%>
import './vendor/hui';
<%_ } else if (uiFramework === 'vant') { _%>
import './vendor/vant';
<%_ } else if (uiFramework === 'wui') { _%>
import './vendor/wui';
<%_ } _%>
import './composition.js';
<%_ if (buildTools === 'bundleless') { _%>
import 'virtual:svg-icons-register';
<%_ } _%>
<%_ if (application === 'offline') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>


import './assets/style/app.less';
<%_ if (needsTypeScript) { _%>
// 注册钩子函数
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);
<%_ } _%>

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

<%_ if (application === 'offline') { _%>
if (isLightOS()) {
  nativeReady().then(() => {
    new Vue({
      el: '#app',
      router,
      // use Runtime-only
      // https://vuejs.org/v2/guide/installation.html
      render: (h) => h(App)
    });
  });
} else {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    // use Runtime-only
    // https://vuejs.org/v2/guide/installation.html
    render: (h) => h(App)
  });
}
<%_ } else { _%>
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // use Runtime-only
  // https://vuejs.org/v2/guide/installation.html
  render: (h) => h(App)
});
<%_ } _%>
`;

const mainV3 = `<%_ if (buildTools === 'bundle') { _%>import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ } _%>
<%_ if ((application === 'mobile' || application === 'offline') && layoutAdapter !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import './router/router.interceptor';
import { setGlobalProperties } from '@/services';
<%_ if (buildTools === 'bundle') { _%>
import './icons';
<%_ } _%>
import setupGlobalComponent from '@/components/global';
import { setApp } from './useApp';
<%_ if (uiFramework === 'element-ui') { _%>
import setupVendor from './vendor/element';
<%_ } else if (uiFramework === 'ant') { _%>
import setupVendor from './vendor/ant';
<%_ } else if (uiFramework === 'vant') { _%>
import setupVendor from './vendor/vant';
<%_ } else if (uiFramework === 'wui') { _%>
import setupVendor from './vendor/wui';
<%_ } _%>
<%_ if (buildTools === 'bundleless') { _%>
import 'virtual:svg-icons-register';
<%_ } _%>
<%_ if (application === 'offline') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>
import './assets/style/app.less';

async function bootstrap() {
  const app = createApp(App);

  setupGlobalComponent(app);
  setGlobalProperties(app);
<%_ if (uiFramework === 'element-ui' || uiFramework === 'ant' || uiFramework === 'vant' || uiFramework === 'wui') { _%>
  setupVendor(app);
<%_ } _%>
  setupRouter(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();
<%_ if (application === 'offline') { _%>
  if (isLightOS()) {
    nativeReady().then(() => {
      app.mount('#app');
    });
  } else {
    app.mount('#app', true);
  }
<%_ } else { _%>
  app.mount('#app', true);
<%_ } _%>

  setApp(app);
}

bootstrap();

`;

export function generateMain({
  application,
  uiFramework,
  layoutAdapter,
  needsTypeScript,
  buildTools
}) {
  return ejs.render(mainV2, {
    application,
    layoutAdapter,
    uiFramework,
    needsTypeScript,
    buildTools
  });
}

export function generateMainV3({
  application,
  uiFramework,
  layoutAdapter,
  needsTypeScript,
  buildTools
}) {
  return ejs.render(mainV3, {
    application,
    layoutAdapter,
    uiFramework,
    needsTypeScript,
    buildTools
  });
}
