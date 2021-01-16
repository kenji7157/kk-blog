import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
dayjs.extend(utc)
dayjs.extend(timezone)

// TODO: 型定義したファイルを用意する
type Article = {
  // idはkeyとなっているのでフィールドとしては不要かも
  id: number
  title: string
  abstract: string
  body: string
  category: string[]
  createdDate: string
  createdTimestamp: {
    unix: number
    year: number
    // 0~11 表示する場合は+1する
    month: number
    day: number
  }
}

@Module({ stateFactory: true, namespaced: true, name: 'articleModule' })
export default class ArticleModule extends VuexModule {
  private articles: { [id: string]: Article } = {}

  // 記事一覧用のゲッター
  public get getArticleList() {
    const allContents = Object.values(this.articles)
    // 作成日が新しいのが先頭に来るようにソートをかける
    allContents.sort(function (a, b) {
      if (a.createdTimestamp.unix < b.createdTimestamp.unix) {
        return 1
      } else {
        return -1
      }
    })
    return allContents
  }

  // アーカイブ用のリストゲッター
  public get getArchiveArticleList() {
    const allContents = Object.values(this.articles)
    // 作成日が新しいのが先頭に来るようにソートをかける
    allContents.sort(function (a, b) {
      if (a.createdTimestamp.unix < b.createdTimestamp.unix) {
        return 1
      } else {
        return -1
      }
    })
    // 初期変数の準備
    let preYear = allContents[0].createdTimestamp.year
    let preMonth = allContents[0].createdTimestamp.month
    let archive: {
      year: number
      length: number
      perMonthList: { month: number; length: number }[]
    } = {
      year: preYear,
      length: 0,
      perMonthList: [],
    }
    let perMonth = {
      month: preMonth,
      length: 0,
    }
    // NOTE:配列を要素にもつ配列
    const archiveList: {
      year: number
      length: number
      perMonthList: {
        month: number
        length: number
      }[]
    }[] = []

    allContents.forEach((content, index) => {
      const year = content.createdTimestamp.year
      const month = content.createdTimestamp.month
      if (preYear === year) {
        // 年が等しい場合 -> 年単位記事数をインクリメント
        archive.length++
        if (preMonth === month) {
          // 月が等しい場合 -> 年月単位記事数をインクリメント
          perMonth.length++
        } else {
          // 年が等しい かつ 月が等しくない 場合 ->
          // perMonthListに代入する
          archive.perMonthList.push(perMonth)
          // perMonthの初期化
          preMonth = month
          perMonth = {
            month: preMonth,
            length: 1,
          }
        }
      } else {
        // 年が等しくない場合
        // perMonthListに代入する
        archive.perMonthList.push(perMonth)
        // 続けてarchiveListに代入する
        archiveList.push(archive)
        // archive/perMonthの初期化
        preYear = year
        preMonth = month
        archive = { year: preYear, length: 1, perMonthList: [] }
        perMonth = {
          month: preMonth,
          length: 1,
        }
      }
      // 最終要素の場合
      if (index === allContents.length - 1) {
        // perMonthListに代入する
        archive.perMonthList.push(perMonth)
        // 続けてarchiveListに代入する
        archiveList.push(archive)
      }
    })
    return archiveList
  }

  // カテゴリ用のリストゲッター
  public get getCategoryArticleList() {
    const allContents = Object.values(this.articles)
    const categoryObj: { [key: string]: number } = {}
    allContents.forEach((content) => {
      content.category.forEach((key) => {
        categoryObj[key] = categoryObj[key] ? categoryObj[key] + 1 : 1
      })
    })

    const categoryList: { category: string; length: number }[] = []
    Object.keys(categoryObj).forEach((key) => {
      categoryList.push({ category: key, length: categoryObj[key] })
    })

    // カテゴリー名で昇順ソートをかける
    categoryList.sort(function (a, b) {
      if (a.category < b.category) {
        return -1
      } else {
        return 1
      }
    })
    return categoryList
  }

  @Mutation
  addPost(article: Article) {
    // this.articles = [...this.articles, article]
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
    article.createdDate = article.createdDate.slice(0, 10)
    this.articles[article.id] = article
  }

  @Action
  async loadArticles() {
    const res = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      'https://kk-nuxt-blog.microcms.io/api/v1/article',
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: { 'X-API-KEY': '63a41b21-d7d6-4bdb-a1f5-3f9e5865f71b' },
      }
    )
    const articles: Article[] = res.data.contents
    articles.forEach((article) => {
      this.addPost(article)
    })
  }
}
