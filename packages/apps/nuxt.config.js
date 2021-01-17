import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - apps',
    title: 'apps',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/node_modules/highlight.js/styles/a11y-dark.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        /* 以下追加 */
        light: {
          primary: '#000000',
          accent: '#FFFFFF',
          secondary: '#F8F8FD',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // ページの生成
  generate: {
    interval: 2000,
    // page/1でリロードしたさいにpage/1/でindex.htmlを参照しにいくためfalse -> HTMLファイルをルートパスに従って生成
    // https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#subfolders
    subFolders: false,
    async routes() {
      const res = await axios.get(
        // your-service-id部分は自分のサービスidに置き換えてください
        'https://kk-nuxt-blog.microcms.io/api/v1/article',
        {
          // your-api-key部分は自分のapi-keyに置き換えてください
          headers: { 'X-API-KEY': '63a41b21-d7d6-4bdb-a1f5-3f9e5865f71b' },
        }
      )
      const articles = res.data.contents
      const articleMap = {}
      articles.forEach((article) => {
        const dayInfo = dayjs.utc(article.createdDate).tz('Asia/Tokyo')
        article.createdTimestamp = {
          unix: dayInfo.unix(),
          year: dayInfo.year(),
          month: dayInfo.month(),
          day: dayInfo.date(),
        }
        // コードのシンタックスハイライトを設定する
        // https://microcms.io/blog/syntax-highlighting-on-server-side/
        const $ = cheerio.load(article.body)
        $('pre code').each((_, elm) => {
          const result = hljs.highlightAuto($(elm).text())
          $(elm).html(result.value)
          $(elm).addClass('hljs')
        })
        article.body = $.html()
        // 作成日をHumanFriendlyにする
        const date = new Date(article.createdDate)
        const year = date.getFullYear()
        const month = ('00' + date.getMonth() + 1).slice(-2)
        const day = date.getDate()
        article.createdDate = year + '年' + month + '月' + day + '日'
        articleMap[article.id] = article
      })
      const allContents = Object.values(articleMap)
      // 作成日が新しいのが先頭に来るようにソートをかける
      allContents.sort(function (a, b) {
        if (a.createdTimestamp.unix < b.createdTimestamp.unix) {
          return 1
        } else {
          return -1
        }
      })
      const pages = [
        {
          route: '/',
          payload: { allContents },
        },
        {
          route: '/archive',
          payload: { allContents },
        },
        {
          route: '/archive/page/1',
          payload: { allContents, page: 1 },
        },
        {
          route: '/archive/page/2',
          payload: { allContents, page: 2 },
        },
      ]
      return pages
    },
  },
}
