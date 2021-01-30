<template>
  <v-container>
    <no-ssr>
      <v-row class="mb-1">
        <h3>
          <nuxt-link :to="'/'">記事一覧</nuxt-link>
          <v-icon class="mb-1">mdi-chevron-right</v-icon>
          検索結果：{{ words.join(',') }}
        </h3>
      </v-row>
      <content-list :contents="contents"></content-list>
      <the-pager
        :prop-page="page"
        :page-length="pageLength"
        :input-page="inputPage"
      ></the-pager>
    </no-ssr>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ContentList from '@/components/ContentList.vue'
import ThePager from '@/components/ThePager.vue'
import { articleModule } from '@/store'
import { Article } from '@/types'
import { isString } from '@/types/TypeGuard'

@Component({
  components: {
    ContentList,
    ThePager,
  },
})
export default class PagesIndex extends Vue {
  words: string[] = []
  contents: Article[] = []
  pageLength = 1
  page = 1

  head() {
    return { title: '検索記事一覧' }
  }

  created() {
    // 全角 半角の指定
    const target = this.$route.query.target
    const queryPage = this.$route.query.page
    this.words = isString(target) ? target.split(/[\u{20}\u{3000}]/u) : []
    this.page = isString(queryPage) ? parseInt(queryPage) : 1
    const allContents: Article[] = Object.values(articleModule.getArticleList)
    allContents.forEach((content) => {
      content.category = content.category.map((x) => x.split(',')[0])
    })
    // 抽出処理
    let filteredContents: Article[] = []
    this.words.forEach((word) => {
      filteredContents = filteredContents.concat(
        allContents.filter(
          (content) =>
            (content.title.includes(word) ||
              content.abstract.includes(word) ||
              content.body.includes(word)) &&
            !filteredContents.map((x) => x.id).includes(content.id)
        )
      )
    })

    this.pageLength = Math.ceil(filteredContents.length / 10)
    this.contents = filteredContents.slice(
      0 + 10 * (this.page - 1),
      10 + 10 * (this.page - 1)
    )
  }

  inputPage(inputPage: number) {
    if (this.page === inputPage) return
    this.page = inputPage
    this.$router.push({
      path: '/search',
      query: { target: this.$route.query.target, page: String(inputPage) },
    })
  }
}
</script>
