/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/vbenjs/vite-plugin-html/
 */
import { createHtmlPlugin } from 'vite-plugin-html';

export function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE } = env;
  console.log('VITE_GLOB_APP_TITLE', VITE_GLOB_APP_TITLE);
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    entry: 'src/main.js',
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
        injectScript: `<script src="./console.js?_t=${Date.now()}"></script>`
      }
    }
  });
  return htmlPlugin;
}
