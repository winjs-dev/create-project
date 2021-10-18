import ejs from 'ejs'

const mainV3 = `
import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ if ((application === 'mobile' || application === 'offline') && options['layout-adapter'] !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import './router/router.interceptor';
<%_ if (needsTypeScript) { _%>
import './pwa/register-service-worker';
<%_ } _%>
import { setGlobalProperties } from '@/services';
import setupSvgIcon from './icons';
import { setApp } from './useApp';
<%_ if (uiFramework === 'element-ui') { _%>
import setupVendor from './vendor/element';
<%_ } else if (uiFramework === 'ant') { _%>
import setupVendor from './vendor/ant';
<%_ } else if (uiFramework === 'hui') { _%>
import './vendor/hui';
<%_ } else if (options['mobile-ui-framework'] === 'vant') { _%>
import setupVendor from './vendor/vant';
<%_ } _%>
<%_ if (application === 'offline') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>

import './assets/style/app.less';

const app = createApp(App);

setGlobalProperties(app);
<%_ if (uiFramework === 'element-ui' || uiFramework === 'ant' || uiFramework === 'vant') { _%>
setupVendor(app);
<%_ } _%>
setupSvgIcon(app);
setupRouter(app);

<%_ if (application === 'offline') { _%>
if (isLightOS()) {
  nativeReady().then(() => {
    app.mount('#app');
  });
} else {
  app.mount('#app');
}
<%_ } else { _%>
app.mount('#app');
<%_ } _%>

setApp(app);
`
export default function generateMainV3({
  application,
  uiFramework,
  layoutAdapter,
  needsTypeScript
}) {
  return ejs.render(mainV3, {
    application,
    layoutAdapter,
    uiFramework,
    needsTypeScript
  })
}
