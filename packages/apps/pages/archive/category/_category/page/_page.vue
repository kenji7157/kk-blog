<template>
  <v-container>
    <v-row class="mb-1">
      <h3>
        <nuxt-link :to="'/'">記事一覧</nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        {{ category }}
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
  head() {
    return {
      // TODO: パスでなく、カテゴリ名をheadタグに指定したい
      title: `${this.$route.params.category}`,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://giraffe-engineer-life.netlify.app/archive/category/${this.$route.params.category}/page/${this.$route.params.page}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `カテゴリ - ${this.$route.params.category} | Giraffe footprints`,
        },
      ],
    }
  }

  asyncData({ payload }) {
    // カテゴリーごとの記事を抽出
    const category = payload.category
    // 表示ページの指定
    const page = payload.page
    const allContents: Article[] = payload.allContents
    // カテゴリでフィルタをかける
    const filterContents = allContents.filter((content) =>
      content.category.includes(category)
    )
    // ページャーの長さ指定
    const pageLength = Math.ceil(filterContents.length / 10)
    // 表示記事の抽出
    const startIndex = 6 * page - 6
    const endIndex = 6 * page
    const contents = filterContents.slice(startIndex, endIndex)
    return { category, contents, pageLength, page }
  }

  inputPage(inputPage: number) {
    const category = this.$route.params.category
    this.$router.push({
      path: `/archive/category/${category}/page/${inputPage}`,
    })
  }
}
</script>
