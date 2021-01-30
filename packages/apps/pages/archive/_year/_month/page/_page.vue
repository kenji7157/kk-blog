<template>
  <v-container>
    <v-row class="mb-1">
      <h3>
        <nuxt-link :to="'/'">記事一覧</nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        {{ year }}年{{ ('00' + month).slice(-2) }}月
      </h3>
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
import { Article } from '@/types'

@Component({
  components: {
    ContentList: () => import('@/components/ContentList.vue'),
    ThePager: () => import('@/components/ThePager.vue'),
  },
})
export default class ArchiveYearMonth extends Vue {
  head() {
    const month = ('00' + this.$route.params.month).slice(-2)
    return {
      title: `${this.$route.params.year}年${month}月`,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://giraffe-engineer-life.netlify.app/archive/${this.$route.params.year}/${month}/page/${this.$route.params.page}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `アーカイブ - ${this.$route.params.year}年${month}月 | Giraffe footprints`,
        },
      ],
    }
  }

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
