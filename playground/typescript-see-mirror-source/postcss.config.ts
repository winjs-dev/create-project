module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.4', 'iOS 9.0', 'Chrome > 43', 'ff > 34', 'ie >= 10']
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
