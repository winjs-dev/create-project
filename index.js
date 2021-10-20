#!/usr/bin/env node
// @ts-check

import fs from 'fs';
import path from 'path';

import minimist from 'minimist';
import prompts from 'prompts';
import { red, yellow, cyan, magenta, green, bold, blue } from 'kolorist';

import renderTemplate from './utils/renderTemplate.js';
import {
  postOrderDirectoryTraverse,
  preOrderDirectoryTraverse
} from './utils/directoryTraverse.js';
import generateMain from './utils/generateMain.js';
import generateMainV3 from './utils/generateMainV3.js';
import generateVueConfig from './utils/generateVueConfig.js';
import getCommand from './utils/getCommand.js';
import generateOfflinePackage from './utils/generateOfflinePackage';
import generateRouterInterceptor from './utils/generateRouterInterceptor';

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');
}

function canSafelyOverwrite(dir) {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0;
}

function emptyDir(dir) {
  postOrderDirectoryTraverse(
    dir,
    (dir) => fs.rmdirSync(dir),
    (file) => fs.unlinkSync(file)
  );
}

// 步骤
// 1. 选择 使用框架 framework
// 2. 选择 应用类型 application
// 3. 是否支持使用 Typescript
// 4. 选择 UI组件库 ui-framework
// 5. 选择 布局适配方案 layout-adapter
// 5. 选择 版本控制工具 version-control
// 6. 是否使用公司镜像源 mirror-source
// 7. 是否使用 see 命令输出包
async function init() {
  const cwd = process.cwd();
  // possible options:
  // --typescript / --ts
  // --mirror-source / --ms
  // --see / --see
  // --force (for force overwriting)
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
      'mirror-source': ['ms'],
      see: ['see']
    },
    // all arguments are treated as booleans
    boolean: true
  });

  // if any of the feature flags is set, we would skip the feature prompts
  // use `??` instead of `||` once we drop Node.js 12 support
  const isFeatureFlagsUsed = typeof (argv.default || argv.ts || argv.see || argv.ms) === 'boolean';

  let targetDir = argv._[0];
  const defaultProjectName = !targetDir ? 'winner-project' : targetDir;

  const forceOverwrite = argv.force;

  let result = {};

  const pcUI = [
    {
      title: cyan('Element UI'),
      value: 'element-ui'
    },
    {
      title: magenta('ant-design-vue'),
      value: 'ant'
    }
  ];

  // 没有用vue3实现
  const pcUI2 = [
    {
      title: yellow('h_ui'),
      value: 'hui'
    },
    ...pcUI
  ];

  try {
    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json
    // - Framework: default(vue2) / vue3 / miniprogram
    // - Application: default(mobile) / pc / offline
    // - Add Typescript Support? no
    // - UI Framework: default(wui) / vant / hui / element-ui / ant-design-vue ...
    // - Layout Adapter: default(rem) / vw
    // - Version Control: default(git) / svn
    // - Add Mirror Source Support? no
    // - Add See package Support?  no
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSafelyOverwrite(targetDir) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`;

            return `${dirForPrompt} is not empty. Remove existing files and continue?`;
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values = {}) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          }
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          name: 'framework',
          type: () => (isFeatureFlagsUsed ? null : 'select'),
          message: 'Select a framework?',
          choices: [
            {
              title: yellow('Vue 2'),
              value: 'v2'
            },
            {
              title: cyan('Vue 3'),
              value: 'v3'
            },
            {
              title: magenta('miniprogram'),
              value: 'mini'
            }
          ],
          initial: 0
        },
        {
          name: 'needsTypeScript',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add TypeScript?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'application',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'select' : null;
          },
          message: 'Choose whether your app is a PC or a mobile?',
          choices: [
            {
              title: yellow('mobile'),
              value: 'mobile'
            },
            {
              title: cyan('H5离线包'),
              value: 'offline'
            },
            {
              title: magenta('PC'),
              value: 'pc'
            }
          ],
          initial: 0
        },
        {
          name: 'offlineId',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.application === 'offline' ? 'text' : null;
          },
          message: 'Fill in the offline package ID',
          validate: function (val) {
            return /^[0-9a-z]{4,8}$/.test(val)
              ? true
              : '请输入4-8位的小写英文字母或数字，注意唯一性';
          },
          initial: '离线包 ID'
        },
        {
          name: 'offlineName',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.application === 'offline' ? 'text' : null;
          },
          message: 'Fill in the offline package name',
          validate: function (val) {
            return /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/.test(val)
              ? true
              : '请输入1-10位的中英文字符或数字';
          }
        },
        {
          name: 'uiFramework',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'select' : null;
          },
          message: 'Select a UI Framework',
          choices: (answers) => {
            if (answers.framework === 'mini') {
              return;
            }
            if (answers.application === 'pc') {
              return answers.framework === 'v2' ? pcUI2 : pcUI;
            }
            // mobile or offline
            return [
              {
                title: yellow('WinUI'),
                value: 'wui'
              },
              {
                title: blue('Vant'),
                value: 'vant'
              }
            ];
          },
          initial: 0
        },
        {
          name: 'versionControl',
          type: () => (isFeatureFlagsUsed ? null : 'select'),
          message: 'Select a Version control tool?',
          choices: [
            {
              title: yellow('Git'),
              value: 'git'
            },
            {
              title: blue('SVN'),
              value: 'svn'
            }
          ],
          initial: 0
        },
        {
          name: 'needsMirrorSource',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'toggle' : null;
          },
          message: 'Add Mirror Source Support?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsSeePackage',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.needsMirrorSource === true
              ? 'toggle'
              : null;
          },
          message: 'Add See Package Support?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        }
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }
  // `initial` won't take effect if the prompt type is null
  // so we still have to assign the default values here
  const {
    packageName = toValidPackageName(defaultProjectName),
    shouldOverwrite,
    framework = argv.framework,
    needsTypeScript = argv.typescript,
    application = argv.application,
    offlineId = argv.offlineId,
    offlineName = argv.offlineName,
    uiFramework = argv.uiFramework,
    layoutAdapter = argv.layoutAdapter,
    versionControl = argv.versionControl,
    needsMirrorSource = argv.ms,
    needsSeePackage = argv.see
  } = result;

  const root = path.join(cwd, targetDir);

  if (shouldOverwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  console.log(`\nScaffolding project in ${root}...`);

  const pkg = { name: packageName, version: '0.0.0' };
  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2));

  // todo:
  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, 'template');
  const options = {
    packageName,
    framework,
    application,
    offlineId,
    offlineName,
    uiFramework,
    layoutAdapter,
    versionControl
  };
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root, options);
  };

  // Render base template
  render('base');

  // Add framework.
  if (framework === 'mini') {
    render('framework/miniprogram');
  } else if (framework === 'v3') {
    render('framework/vue3');
  } else {
    render('framework/default');
  }

  // typescript support
  if (needsTypeScript) {
    if (framework === 'v3') {
      render('language/typescript/v3');
    } else {
      render('language/typescript/v2');
    }
  } else {
    if (framework === 'v3') {
      render('language/default/v3');
    } else {
      render('language/default/v2');
    }
  }

  if (application === 'pc') {
    render('application/pc');
  } else {
    render('application/default');
  }

  if (uiFramework === 'vant') {
    if (framework === 'v2') {
      render('ui-framework/vant/v2');
    } else {
      render('ui-framework/vant/v3');
    }
  } else if (uiFramework === 'hui') {
    render('ui-framework/hui');
  } else if (uiFramework === 'ant') {
    if (framework === 'v2') {
      render('ui-framework/ant-design-vue/v2');
    } else {
      render('ui-framework/ant-design-vue/v3');
    }
  } else if (uiFramework === 'element-ui') {
    if (framework === 'v2') {
      render('ui-framework/element-ui/v2');
    } else {
      render('ui-framework/element-ui/v3');
    }
  } else {
    // default
    render('ui-framework/default');
  }

  if (layoutAdapter === 'vw') {
    render('layout-adapter/viewpoint');
  } else {
    render('layout-adapter/default');
  }

  if (needsMirrorSource) {
    render('mirror-source');
  }

  if (needsSeePackage) {
    render('see-package');
  }

  // Main generation
  let mainContent = generateMain({
    application,
    uiFramework,
    layoutAdapter
  });

  if (framework === 'v3') {
    generateMainV3({
      application,
      uiFramework,
      layoutAdapter,
      needsTypeScript
    });
  }
  fs.writeFileSync(path.resolve(root, 'src/main.js'), mainContent);

  // vue.config.js
  fs.writeFileSync(
    path.resolve(root, 'vue.config.js'),
    generateVueConfig({
      application,
      uiFramework,
      layoutAdapter,
      needsTypeScript,
      versionControl
    })
  );

  // router.interceptor.js
  fs.writeFileSync(
    path.resolve(root, 'src/router/router.interceptor.js'),
    generateRouterInterceptor({
      application
    })
  );

  // 离线包
  if (application === 'offline') {
    fs.writeFileSync(
      path.resolve(root, 'offlinePackage.json'),
      generateOfflinePackage({
        offlineId,
        offlineName
      })
    );
  }

  // Cleanup.

  if (needsTypeScript) {
    // rename all `.js` files to `.ts`
    // rename jsconfig.json to tsconfig.json
    preOrderDirectoryTraverse(
      root,
      () => {},
      (filepath) => {
        if (filepath.endsWith('.js')) {
          fs.renameSync(filepath, filepath.replace(/\.js$/, '.ts'));
        } else if (path.basename(filepath) === 'jsconfig.json') {
          fs.renameSync(filepath, filepath.replace(/jsconfig\.json$/, 'tsconfig.json'));
        }
      }
    );

    // Rename entry in `index.html`
    const indexHtmlPath = path.resolve(root, 'public/index.html');
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
    fs.writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'));
  }

  // Instructions:
  // Supported package managers: pnpm > yarn > npm
  // Note: until <https://github.com/pnpm/pnpm/issues/3505> is resolved,
  // it is not possible to tell if the command is called by `pnpm init`.
  const packageManager = /pnpm/.test(process.env.npm_execpath)
    ? 'pnpm'
    : /yarn/.test(process.env.npm_execpath)
    ? 'yarn'
    : 'npm';

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`);
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`);
  console.log();
}

init().catch((e) => {
  console.error(e);
});
