<template>
  <v-container>
    <v-row class="mb-1">
      <h3>{{ year }}-{{ ('00' + month).slice(-2) }}-01から1ヶ月間の記事一覧</h3>
    </v-row>
    <v-row class="mt-2">
      <v-col
        v-for="(content, index) in contents"
        :key="index"
        class="pa-1"
        cols="4"
      >
        <v-card
          height="300"
          class="d-flex flex-column"
          @click="onArticle(content.id)"
        >
          <v-img
            max-height="180"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          >
            <div class="text-h6">{{ content.category.join('/') }}</div>
          </v-img>
          <v-card-title> {{ content.title }} </v-card-title>
          <v-card-text class="mt-n3 pb-0">
            <div>{{ content.abstract.slice(0, 45) }}...</div>
          </v-card-text>
          <div class="mt-auto ml-4 mb-2 text-subtitle-2">
            {{ content.createdAt }}
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="pageLength"
          circle
          @input="inputPage"
        ></v-pagination>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { articleModule } from '@/store'

@Component
export default class ArchiveYearMonth extends Vue {
  year: number
  month: number
  page = 1
  pageLength = 0
  contents = []

  // NOTE:記事一覧ページはSSR不要とする(動的ページとする)
  created() {
    // 年月ごとの記事を抽出
    this.year = parseInt(this.$route.params.year)
    this.month = parseInt(this.$route.params.month)
    const allContents = Object.values(articleModule.articles)
    // 作成日が新しいのが先頭に来るようにソートをかける
    allContents.sort(function (a, b) {
      if (a.createdTimestamp.unix < b.createdTimestamp.unix) {
        return 1
      } else {
        return -1
      }
    })
    // 年月でフィルタをかける
    const filterContents = allContents.filter(
      (content) =>
        content.createdTimestamp.year === this.year &&
        content.createdTimestamp.month + 1 === this.month
    )
    // ページャーの長さ指定
    this.pageLength = Math.ceil(filterContents.length / 6)
    // 表示ページ番号の指定
    this.page = parseInt(this.$route.query.page || 1)
    // 表示記事の抽出
    const startIndex = 6 * this.page - 6
    const endIndex = 6 * this.page
    this.contents = filterContents.slice(startIndex, endIndex)
  }

  onArticle(id: string) {
    this.$router.push(`/article/${id}`)
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
