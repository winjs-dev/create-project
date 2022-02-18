const vendorLibs = [
  // {
  //   match: ['xlsx'],
  //   output: 'xlsx',
  // },
];

// @ts-ignore
export const configManualChunk = (id) => {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
};
