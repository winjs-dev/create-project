import ejs from 'ejs';

// 模板字符串中需要 ${} 原样输出，需要对 $ 进行转义处理
const viteConfig = `import legacy from '@vitejs/plugin-legacy';
<%_ if (framework === 'v2') { _%>
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';
import scriptSetup from 'unplugin-vue2-script-setup/vite';
<%_ } _%>
<%_ if (framework === 'v3') { _%>
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
<%_ } _%>
import svgLoader from 'vite-svg-loader';

import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';
import { configSvgIconsPlugin } from './svgSprite';

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [
    <%_ if (framework === 'v2') { _%>
    vue2({
      jsx: true
    }),
    scriptSetup(),
    <%_ } _%>
    <%_ if (framework === 'v3') { _%>
    vue(),
    vueJsx(),
    <%_ } _%>
    svgLoader()
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    );

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }

  return vitePlugins;
}
`;

export default function generateVitePlugin({ framework }) {
  return ejs.render(viteConfig, {
    framework
  });
}
