import ejs from 'ejs';

// 模板字符串中需要 ${} 原样输出，需要对 $ 进行转义处理
const vueConfig = `import router from './index';
<%_ if (application === 'offline') { _%>
import { isLightOS, navigateTo } from '@winner-fed/native-bridge-methods';
<%_ } _%>

router.beforeEach((to, from, next) => {
<%_ if (application === 'offline') { _%>
  if (from.name && isLightOS()) {
    navigateTo({ url: \`\${window.location.href.split('#')[0]}#\${to.fullPath}\` });
  } else {
    next();
  }
<%_ } else { _%>
  next();
<%_ } _%>
});
`;

export default function generateRouterInterceptor({ application }) {
  return ejs.render(vueConfig, {
    application
  });
}
