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