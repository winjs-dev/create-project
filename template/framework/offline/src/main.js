import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './router/router.interceptor';
import './components/global';
import './icons';
import './filters';
import './services';
import { isLightOS, nativeReady } from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;

import './assets/style/app.less';

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

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
