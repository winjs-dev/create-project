#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 拷贝目录和文件
cp -r ../../../.github ./

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:cloud-templates/create-project.git master:gh-pages

cd -
