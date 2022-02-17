import ejs from 'ejs';

const babelConfig = `<%_ if (uiFramework === 'vant') { _%>
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
];
<%_ } else if (uiFramework === 'wui') { _%>
const plugins = [
  [
    'import',
    {
      libraryName: '@winner-fed/win-ui',
      libraryDirectory: 'es',
      style: true
    },
    '@winner-fed/win-ui'
  ]
];
<%_ } else { _%>
const plugins = [];
<%_ } _%>
module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins
};
`;

export default function generateBabelConfig({ uiFramework }) {
  return ejs.render(babelConfig, {
    uiFramework
  });
}
