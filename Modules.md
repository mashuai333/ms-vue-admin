# 依赖安装使用

## 安装 path 配置 alias 路径

pnpm install --save-dev @types/node pnpm install path

## 安装 commit 校验 (<https://commitlint.js.org/#/>)

pnpm install -g @commitlint/cli @commitlint/config-conventional echo "module.exports = { extends: ['@commitlint/config-conventional'] };" commitlint.config.js

## 安装 husky (<https://typicode.github.io/husky/#/?id=install>)

pnpm install husky --save-dev npx husky add .husky/commit-msg 'pnpm commitlint --edit ${1}' npx husky add .husky/pre-commit "pnpm run lint:lint-staged"

配置 "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js" "prepare": "husky install",

## 安装 lint-staged(<https://github.com/okonet/lint-staged#readme>)

pnpm install --save-dev lint-staged

## 安装 svgo 压缩 svgo 文件

配置 "svgo": "svgo -f src/icons/svg -o src/icons/svg" npm -g install svgo

## 安装 eslint

npm install --save-dev eslint eslint-plugin-vue npm install eslint vite-plugin-eslint --save-dev

配置 "lint:eslint": "eslint --cache --max-warnings 0 \"{src,mock,build}/\*_/_.{vue,js,ts,tsx}\" --fix" 增加.eslintrc.js .eslintignore

## 安装 prettier

npm install --save-dev --save-exact prettier npm install --save-dev eslint-config-prettier npm install --save-dev eslint-plugin-prettier npm install --save-dev @/vue/eslint-config-prettier 添加 .prettierignore .prettierrc.js 配置 "lint:prettier": "prettier --write \"src/\*_/_.{js,ts,json,tsx,css,less,scss,vue,html,md}\""

## 安装 stylelint

npm i stylelint -D npm install --save-dev stylelint stylelint-config-standard npm install --save-dev stylelint stylelint-config-html npm install --save-dev stylelint stylelint-config-recommended 添加.stylelintignore stylelint.config.js 配置 "lint:stylelint": "stylelint --cache --fix \"\*_/_.{vue,css,scss,postcss,less}\" --cache --cache-location node_modules/.cache/stylelint/"

## 安装 typescrpit

npm install --save-dev typescript npm add --dev @vue/eslint-config-typescript npm install --save-dev @typescript-eslint/eslint-plugin npm install --save-dev @typescript-eslint/parser 添加 tsconfig.json

## 安装 postcss

npm install postcss –g npm i postcss-import -D npm i postcss-html -D npm i postcss-scss -D npm i cssnano -S npm i autoprefixer -g 添加 postcss.config.js

## 安装 vue-tsc

npm install vue-tsc -d 配置 "typecheck": "tsc --noEmit && vue-tsc --noEmit --skipLibCheck",
