<template>
  <v-container>
    <v-row class="mb-1">
      <h3>記事一覧</h3>
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

@Component({
  components: {
    ContentList,
    ThePager,
  },
})
export default class PagesIndex extends Vue {
  asyncData({ payload }) {
    const allContents = payload.allContents
    // ページャーの長さ指定
    const pageLength = Math.ceil(allContents.length / 10)
    // 表示ページの指定
    const page = parseInt(payload.page)
    // 表示記事の抽出
    const startIndex = 10 * page - 10
    const endIndex = 10 * page
    const contents = allContents.slice(startIndex, endIndex)
    return { contents, pageLength, page }
  }

  inputPage(inputPage: number) {
    this.$router.push({ path: `/archive/page/${String(inputPage)}` })
  }
}
</script>
