import ejs from 'ejs';

const mainV3 = `import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ if ((application === 'mobile' || application === 'offline') && layoutAdapter !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import './router/router.interceptor';
import { setGlobalProperties } from '@/services';
import setupSvgIcon from './icons';
import { setApp } from './useApp';
<%_ if (uiFramework === 'element-ui') { _%>
import setupVendor from './vendor/element';
<%_ } else if (uiFramework === 'ant') { _%>
import setupVendor from './vendor/ant';
<%_ } else if (uiFramework === 'vant') { _%>
import setupVendor from './vendor/vant';
<%_ } _%>
<%_ if (application === 'offline') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>
import './assets/style/app.less';

async function bootstrap() {
  const app = createApp(App);

  setGlobalProperties(app);
<%_ if (uiFramework === 'element-ui' || uiFramework === 'ant' || uiFramework === 'vant') { _%>
  setupVendor(app);
<%_ } _%>
  setupSvgIcon(app);
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
  });
}
