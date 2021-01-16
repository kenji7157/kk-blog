<template>
  <v-container>
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

@Component({
  components: {
    ContentList,
    ThePager,
  },
})
export default class ArchiveId extends Vue {
  page = 1
  pageLength = 0
  contents = []

  // NOTE:記事一覧ページはSSR不要とする(動的ページとする)
  created() {
    const allContents = Object.values(articleModule.getArticleList)
    // ページャーの長さ指定
    this.pageLength = Math.ceil(allContents.length / 6)
    // 表示ページ番号の指定
    this.page = parseInt(this.$route.query?.page)
    // 表示記事の抽出
    const startIndex = 6 * this.page - 6
    const endIndex = 6 * this.page
    this.contents = allContents.slice(startIndex, endIndex)
  }

  inputPage(inputPage: number) {
    this.$router.push({ path: '/archive', query: { page: String(inputPage) } })
  }
}
</script>
