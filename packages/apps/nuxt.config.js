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
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    titleTemplate: '%s | Giraffe footprints',
    title: 'Giraffe footprints',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Giraffe footprints🦒',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://giraffe-engineer-life.netlify.app/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Giraffe footprints',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Webエンジニア生活の備忘録🦒',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        // TODO: デフォルトの画像は用意しておく
        content: 'https://giraffe-engineer-life.netlify.app/image/giraffe.jpg',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // vuetifyの反映が遅いので最初のcss読み込みに追加
    'vuetify/dist/vuetify.min.css',
    '~/node_modules/highlight.js/styles/a11y-dark.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/vuetify.ts' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // webpackのbundleを分割するように設定
  splitChunks: {
    layouts: true,
    pages: true,
    commons: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendor',
      chunks: 'initial',
    },
  },

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

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // ページの生成
  generate: {
    interval: 2000,
    // page/1でリロードしたさいにpage/1/でindex.htmlを参照しにいくためfalse -> HTMLファイルをルートパスに従って生成
    // https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#subfolders
    subFolders: false,
    async routes() {
      // TODO: メソッドに切り出して整理したい
      const res = await axios.get(
        // your-service-id部分は自分のサービスidに置き換えてください
        'https://kk-nuxt-blog.microcms.io/api/v1/article?limit=100',
        {
          // your-api-key部分は自分のapi-keyに置き換えてください
          headers: { 'X-API-KEY': '63a41b21-d7d6-4bdb-a1f5-3f9e5865f71b' },
        }
      )
      const articles = res.data.contents
      const articleMap = {}
      // カテゴリパスをキーにとる
      const categoryMap = {}
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
        const month = ('00' + (date.getMonth() + 1)).slice(-2)
        const day = date.getDate()
        article.createdDate = year + '年' + month + '月' + day + '日'
        // カテゴリーのプロパティは変換してアプリ側は管理する
        article.category.forEach((elm) => {
          const list = elm.split(',')
          const key = list[0]
          categoryMap[key] = list[list.length - 1]
        })
        article.categoryPath = article.category.map((elm) => elm.split(',')[0])
        article.category = article.category.map((elm) => {
          const list = elm.split(',')
          return list[list.length - 1]
        })
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
      const page = Math.ceil(allContents.length / 10)
      const pages = [
        {
          route: '/',
          payload: { allContents },
        },
        {
          route: '/archive',
          payload: { allContents },
        },
      ]
      // STEP1 アーカイブ記事一覧の生成
      for (let i = 1; i <= page; i++) {
        pages.push({
          route: `/archive/page/${i}`,
          payload: { allContents, page: i },
        })
      }

      // STEP2 年月別記事一覧の生成
      let preYear = allContents[0].createdTimestamp.year
      let preMonth = allContents[0].createdTimestamp.month
      let count = 0
      allContents.forEach((content, index) => {
        const year = content.createdTimestamp.year
        const month = content.createdTimestamp.month
        if (preYear === year && preMonth === month) {
          count++
        } else {
          const page = Math.ceil(count / 10)
          for (let i = 1; i <= page; i++) {
            pages.push({
              route: `/archive/${preYear}/${preMonth + 1}/page/${i}`,
              payload: {
                year: preYear,
                month: preMonth,
                allContents,
                page: i,
              },
            })
          }
          preYear = year
          preMonth = month
          count = 1
        }

        // 最終要素の場合はページ生成する
        if (index === allContents.length - 1) {
          const page = Math.ceil(count / 10)
          for (let i = 1; i <= page; i++) {
            pages.push({
              route: `/archive/${preYear}/${preMonth + 1}/page/${i}`,
              payload: {
                year: preYear,
                month: preMonth,
                allContents,
                page: i,
              },
            })
          }
        }
      })
      // STEP3 カテゴリ別記事一覧の生成
      const categoryObj = {}
      allContents.forEach((content) => {
        content.categoryPath.forEach((key) => {
          categoryObj[key] = categoryObj[key]
            ? {
                category: categoryMap[key],
                count: categoryObj[key].count + 1,
              }
            : {
                category: key,
                count: 1,
              }
        })
      })
      Object.keys(categoryObj).forEach((key) => {
        const page = Math.ceil(categoryObj[key].count / 10)
        const categoryPath = key
        const category = categoryObj[key].category
        for (let i = 1; i <= page; i++) {
          pages.push({
            route: `/archive/category/${categoryPath}/page/${i}`,
            payload: {
              category,
              allContents,
              page: i,
            },
          })
        }
      })

      // STEP4 記事ページの生成
      allContents.forEach((content) => {
        const id = content.id
        pages.push({
          route: `/article/${id}`,
          payload: {
            article: content,
          },
        })
      })

      return pages
    },
  },
}
