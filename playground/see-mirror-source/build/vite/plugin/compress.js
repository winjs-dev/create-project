/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 */
import compressPlugin from 'vite-plugin-compression';

export function configCompressPlugin(
  // 'gzip' | 'brotli' | 'none'
  compress,
  deleteOriginFile = false
) {
  const compressList = compress.split(',');

  const plugins = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile
      })
    );
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile
      })
    );
  }
  return plugins;
}
