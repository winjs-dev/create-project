import ejs from 'ejs';

const registerGlobalComponent = `// 这里放置需要全局注册的组件
<%_ if (buildTools === 'bundle') { _%>
<%_ if (framework === 'v2') { _%>
import Vue from 'vue';

// 自动加载 global 目录下的 .vue 结尾的文件
const componentsContext = require.context('./', true, /\\.vue$/);

componentsContext.keys().forEach((component) => {
  const componentConfig = componentsContext(component);
  // 兼容 import export 和 require module.export 两种规范
  const ctrl = componentConfig.default || componentConfig;
  Vue.component(ctrl.name, ctrl);
});
<%_ } else if (framework === 'v3') { _%>
export default function setupGlobalComponent(app) {
  // 自动加载 global 目录下的 .vue 结尾的文件
  const componentsContext = require.context('./', true, /\\.vue$/);

  componentsContext.keys().forEach((component) => {
    const componentConfig = componentsContext(component);
    // 兼容 import export 和 require module.export 两种规范
    const ctrl = componentConfig.default || componentConfig;
    app.component(ctrl.name, ctrl);
  });
}
<%_ } _%>
<%_ } else if (buildTools === 'bundleless') { _%>
<%_ if (framework === 'v2') { _%>
import Vue from 'vue';

// 自动加载 global 目录下的 .vue 结尾的文件
const componentsContext = import.meta.globEager('/src/components/global/**/*.vue');

for (const componentConfig in componentsContext) {
  if (componentsContext.hasOwnProperty(componentConfig)) {
    const ctrl = componentsContext[componentConfig].default || componentsContext[componentConfig];
    
    Vue.component(ctrl.name, ctrl);
  }
}
<%_ } else if (framework === 'v3') { _%>
export default function setupGlobalComponent(app) {
  // 自动加载 global 目录下的 .vue 结尾的文件
  const componentsContext = import.meta.globEager('/src/components/global/**/*.vue');

  for (const componentConfig in componentsContext) {
    if (componentsContext.hasOwnProperty(componentConfig)) {
      const ctrl = componentsContext[componentConfig].default || componentsContext[componentConfig];
     
      app.component(ctrl.name, ctrl);
    }
  }
}
<%_ } _%>
<%_ } _%>
`;

export default function generateRegisterGlobalComponent({ buildTools, framework }) {
  return ejs.render(registerGlobalComponent, {
    buildTools,
    framework
  });
}
