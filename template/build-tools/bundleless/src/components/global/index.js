import Vue from 'vue';
// 这里放置需要全局注册的组件
// 自动加载 global 目录下的 .vue 结尾的文件
const componentsContext = import.meta.globEager('/src/components/global/**/*.vue');

for (const componentConfig in componentsContext) {
  if (componentsContext.hasOwnProperty(componentConfig)) {
    // 兼容 import export 和 require module.export 两种规范
    const ctrl = componentsContext[componentConfig].default || componentsContext[componentConfig];
    Vue.component(ctrl.name, ctrl);
  }
}
