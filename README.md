## モノレポ環境の構築
参考記事：https://qiita.com/kyasbal_1994/items/e9c5a918f4d2ddf10a28
- kk-blog直下で以下を実行

```
npm init
npm install lerna --save-dev
```

- kk-blog直下で以下を実行
  - packagesフォルダの作成

```
npx lerna init
```

## ブログサイトのディレクトリ作成
- kk-blog/packages直下で以下を実行
```
create-nuxt-app apps 

create-nuxt-app v3.4.0
✨  Generating Nuxt.js project in apps
? Project name: kk-nuxt-blog
? Programming language: TypeScript
? Package manager: Npm
? UI framework: Vuetify.js
? Nuxt.js modules: Axios
? Linting tools: ESLint, Prettier, Lint staged files
? Testing framework: Jest
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Static (Static/JAMStack hosting)
? Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)
? Continuous integration: None
? Version control system: Git
```

- apps直下で起動を確認
```
npm run dev
```

※モノレポの作りにしているのでapps配下のgit管理は上位ディレクトリに合わせるよう修正

## appsディレクトリで
- nuxt-property-decoratorの導入
  - デコレータを利用してコンポーネントを記述する
```
npm install --save nuxt-property-decorator
```

## WF
- FigamaでWFを作成
https://www.figma.com/file/VCOPYhlLWG18MMXkbGgUiU/%E3%83%96%E3%83%AD%E3%82%B0%E3%82%B5%E3%82%A4%E3%83%88?node-id=6%3A2

## vuexにて vuex-module-decoratorsの導入
参考記事：https://qiita.com/suzukenz/items/0b5c0eb5196646599377