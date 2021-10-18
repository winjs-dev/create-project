import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

import deepMerge from './deepMerge.js';
import sortDependencies from './sortDependencies.js';

const replaceBlockRE = /<%# REPLACE %>([^]*?)<%# END_REPLACE %>/g;

// ejs render file
function renderFile (name, data, ejsOptions = {}) {
  const template = fs.readFileSync(name, 'utf-8');
  console.log('renderFile', template)
  console.log('renderFile', data)
  // custom template inheritance via yaml front matter.
  // ---
  // extend: 'source-file'
  // replace: !!js/regexp /some-regex/
  // OR
  // replace:
  //   - !!js/regexp /foo/
  //   - !!js/regexp /bar/
  // ---
  const yaml = require('yaml-front-matter');
  const parsed = yaml.loadFront(template);
  const content = parsed.__content;
  let finalTemplate = content.trim() + `\n`;

  if (parsed.when) {
    finalTemplate = (
      `<%_ if (${parsed.when}) { _%>` +
      finalTemplate +
      `<%_ } _%>`
    );

    // use ejs.render to test the conditional expression
    // if evaluated to falsy value, return early to avoid extra cost for extend expression
    const result = ejs.render(finalTemplate, data, ejsOptions);
    if (!result) {
      return '';
    }
  }

  if (parsed.extend) {
    const extendPath = path.isAbsolute(parsed.extend)
      ? parsed.extend
      : resolve.sync(parsed.extend, {basedir: path.dirname(name)});
    finalTemplate = fs.readFileSync(extendPath, 'utf-8');
    if (parsed.replace) {
      if (Array.isArray(parsed.replace)) {
        const replaceMatch = content.match(replaceBlockRE);
        if (replaceMatch) {
          const replaces = replaceMatch.map(m => {
            return m.replace(replaceBlockRE, '$1').trim();
          });
          parsed.replace.forEach((r, i) => {
            finalTemplate = finalTemplate.replace(r, replaces[i]);
          });
        }
      } else {
        finalTemplate = finalTemplate.replace(parsed.replace, content.trim());
      }
    }
  }

  return ejs.render(finalTemplate, data, ejsOptions);
}

/**
 * Renders a template folder/file to the file system,
 * by recursively copying all files under the `src` directory,
 * with the following exception:
 *   - `_filename` should be renamed to `.filename`
 *   - Fields in `package.json` should be recursively merged
 * @param {string} src source filename to copy
 * @param {string} dest destination filename of the copy operation
 * @param {object} options data for ejs parse
 */
function renderTemplate (src, dest, options = {}) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    // if it's a directory, render its subdirectories and files recusively
    fs.mkdirSync(dest, {recursive: true});
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file), options);
    }
    return;
  }

  const filename = path.basename(src);

  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest));
    const newPackage = JSON.parse(fs.readFileSync(src));
    const pkg = sortDependencies(deepMerge(existing, newPackage));
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n');
    return;
  }

  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'));
  }

  fs.copyFileSync(src, dest);
}

export default renderTemplate;
