<template>
  <v-container>
    <v-row class="mt-n5">
      <h3>{{ year }}-{{ ('00' + month).slice(-2) }}-01から1ヶ月間の記事一覧</h3>
    </v-row>
    <content-list :contents="contents"></content-list>
    <the-pager
      :page="page"
      :page-length="pageLength"
      :input-page="inputPage"
    ></the-pager>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { articleModule } from '@/store'
import ContentList from '@/components/ContentList.vue'
import ThePager from '@/components/ThePager.vue'
import { Article } from 'kk-blog-types'
import { isString } from 'kk-blog-types/TypeGuard'

@Component({
  components: {
    ContentList,
    ThePager,
  },
})
export default class ArchiveYearMonth extends Vue {
  year = 0
  month = 0
  page = 1
  pageLength = 0
  contents: Article[] = []

  // NOTE:記事一覧ページはSSR不要とする(動的ページとする)
  created() {
    // 年月ごとの記事を抽出
    this.year = parseInt(this.$route.params.year)
    this.month = parseInt(this.$route.params.month)
    const allContents: Article[] = Object.values(articleModule.getArticleList)
    // 年月でフィルタをかける
    const filterContents = allContents.filter(
      (content) =>
        content.createdTimestamp.year === this.year &&
        content.createdTimestamp.month + 1 === this.month
    )
    // ページャーの長さ指定
    this.pageLength = Math.ceil(filterContents.length / 6)
    // 表示ページ番号の指定
    this.page = isString(this.$route.query.page)
      ? parseInt(this.$route.query.page)
      : 1
    // 表示記事の抽出
    const startIndex = 6 * this.page - 6
    const endIndex = 6 * this.page
    this.contents = filterContents.slice(startIndex, endIndex)
  }

  // TODO: 年月別のページャーは未実装
  inputPage(inputPage: number) {
    this.$router.push({
      path: `/archive/${this.year}/${this.month}`,
      query: { page: String(inputPage) },
    })
  }
}
</script>
