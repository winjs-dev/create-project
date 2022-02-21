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
