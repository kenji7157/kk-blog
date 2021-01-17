<template>
  <v-container>
    <v-row class="mt-n5">
      <h3>
        <nuxt-link :to="'/'">記事一覧</nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        {{ category }}
      </h3>
    </v-row>
    <client-only>
      <content-list :contents="contents"></content-list>
    </client-only>
    <the-pager
      :prop-page="page"
      :page-length="pageLength"
      :input-page="inputPage"
      @on-switch="setPage"
    ></the-pager>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { articleModule } from '@/store'
import ContentList from '@/components/ContentList.vue'
import ThePager from '@/components/ThePager.vue'
import { Article } from '@/types'

@Component({
  components: {
    ContentList,
    ThePager,
  },
})
export default class ArchiveCategory extends Vue {
  category = ''
  page = 1
  pageLength = 0
  contents: Article[] = []

  // NOTE:記事一覧ページはSSR不要とする(動的ページとする)
  created() {
    // カテゴリーごとの記事を抽出
    this.category = this.$route.params.category
    const allContents: Article[] = Object.values(articleModule.getArticleList)
    // カテゴリでフィルタをかける
    const filterContents = allContents.filter((content) =>
      content.category.includes(this.category)
    )
    // ページャーの長さ指定
    this.pageLength = Math.ceil(filterContents.length / 6)
    // TODO タイプガードを共通化したい
    this.page =
      typeof this.$route.query.page === 'string'
        ? parseInt(this.$route.query.page)
        : 1
    // 表示記事の抽出
    const startIndex = 6 * this.page - 6
    const endIndex = 6 * this.page
    this.contents = filterContents.slice(startIndex, endIndex)
  }

  inputPage(inputPage: number) {
    this.$router.push({
      path: `/archive/category/${this.category}`,
      query: { page: String(inputPage) },
    })
  }

  setPage(page: number) {
    this.page = page
  }
}
</script>
