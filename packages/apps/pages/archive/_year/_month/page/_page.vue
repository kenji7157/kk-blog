<template>
  <v-container>
    <v-row class="mt-n5 mb-1">
      <h3>{{ year }}-{{ ('00' + month).slice(-2) }}-01から1ヶ月間の記事一覧</h3>
    </v-row>
    <content-list :contents="contents"></content-list>
    <the-pager
      :prop-page="page"
      :page-length="pageLength"
      :input-page="inputPage"
    ></the-pager>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ContentList from '@/components/ContentList.vue'
import ThePager from '@/components/ThePager.vue'
import { Article } from '@/types'

@Component({
  components: {
    ContentList,
    ThePager,
  },
})
export default class ArchiveYearMonth extends Vue {
  asyncData({ payload }) {
    // 年月ごとの記事を抽出
    const year = payload.year
    const month = payload.month
    // 表示ページの指定
    const page = payload.page
    const allContents: Article[] = payload.allContents
    // 年月でフィルタをかける
    const filterContents = allContents.filter(
      (content) =>
        content.createdTimestamp.year === year &&
        content.createdTimestamp.month === month
    )
    // ページャーの長さ指定
    const pageLength = Math.ceil(filterContents.length / 10)

    // 表示記事の抽出
    const startIndex = 10 * page - 10
    const endIndex = 10 * page
    const contents = filterContents.slice(startIndex, endIndex)
    return { year, month: month + 1, contents, pageLength, page }
  }

  // TODO: 年月別のページャーは未実装
  inputPage(inputPage: number) {
    const year = this.$route.params.year
    const month = this.$route.params.month
    this.$router.push({
      path: `/archive/${year}/${month}/page/${inputPage}`,
    })
  }
}
</script>
