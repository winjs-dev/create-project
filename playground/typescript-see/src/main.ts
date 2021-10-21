import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import Component from 'vue-class-component';
import App from './App.vue';
import router from './router';
import './router/router.interceptor';
import './icons';
import './filters';
import './services';
import './assets/style/app.less';
// 注册钩子函数
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // use Runtime-only
  // https://vuejs.org/v2/guide/installation.html
  render: (h) => h(App)
});
