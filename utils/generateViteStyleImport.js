import ejs from 'ejs';

const babelConfig = `/**
 * Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
<%_ if (uiFramework === 'wui') { _%> 
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    libs: [
      {
        libraryName: '@winner-fed/win-ui',
        esModule: true,
        resolveStyle: (name) => {
          return '@winner-fed/win-ui/es/' + name + '/style';
        }
      }
    ]
  });
  return styleImportPlugin;
}
<%_ } else if (uiFramework === 'vant') { _%>
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    resolves: [VantResolve()]
  });
  return styleImportPlugin;
}
<%_ } _%>
`;

export default function generateViteStyleImport({ uiFramework }) {
  return ejs.render(babelConfig, {
    uiFramework
  });
}
