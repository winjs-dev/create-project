const fs = require('fs-extra');
const path = require('path');

// 流程
// fs.unlink 删除文件
// fs.ensureDirSync 创建目录
// fs.writeFileSync 写文件

function deleteRemovedFiles(directory, newFiles, previousFiles) {
  // get all files that are not in the new filesystem and are still existing
  const filesToDelete = Object.keys(previousFiles).filter((filename) => !newFiles[filename]);

  // delete each of these files
  return Promise.all(
    filesToDelete.map((filename) => {
      return fs.unlink(path.join(directory, filename));
    })
  );
}

/**
 * 输出文件到硬盘
 * @param {string} dir
 * @param {Record<string,string|Buffer>} files
 * @param {Record<string,string|Buffer>} [previousFiles]
 * @param {Set<string>} [include]
 */
module.exports = async function writeFileTree(dir, files, previousFiles, include) {
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles);
  }
  Object.keys(files).forEach((name) => {
    if (include && !include.has(name)) return;
    const filePath = path.join(dir, name);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[name]);
  });
};
