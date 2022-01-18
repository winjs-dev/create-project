module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 5.0', 'iOS 9.0', 'Chrome > 43', 'ff > 34', 'ie >= 11']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 2,
      propList: [
        'height',
        'line-height',
        'width',
        'padding',
        'margin',
        'top',
        'left',
        'right',
        'bottom',
        'font-size'
      ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1
    }
  }
};
