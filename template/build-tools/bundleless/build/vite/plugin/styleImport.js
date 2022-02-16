/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  // 以 @winner-fed/win-ui 为例
  const styleImportPlugin = createStyleImportPlugin({
    libs: [
      {
        libraryName: '@winner-fed/win-ui',
        esModule: true,
        resolveStyle: (name) => {
          return `@winner-fed/win-ui/es/${name}/style`;
        }
      }
    ]
  });
  return styleImportPlugin;
}
