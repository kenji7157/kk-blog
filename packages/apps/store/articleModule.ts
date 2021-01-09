import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios from 'axios'

type Article = {
  // idはkeyとなっているのでフィールドとしては不要かも
  id: number
  title: string
  body: string
  categroy: string[]
}

@Module({ stateFactory: true, namespaced: true, name: 'articleModule' })
export default class ArticleModule extends VuexModule {
  articles: { [id: string]: Article } = {}

  @Mutation
  addPost(article: Article) {
    // this.articles = [...this.articles, article]
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
