const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys();

// 提供页面使用
requireAll(req).map(req);

const re = /\.\/(.*)\.svg/;

const icons = requireAll(req).map((i) => {
  return i.match(re)[1];
});

export default icons;
