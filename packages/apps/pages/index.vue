<template>
  <v-container>
    <v-row class="mt-n5">
      <h3>記事一覧</h3>
    </v-row>
    <content-list :contents="contents"></content-list>
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

@Component({
  components: {
    ContentList,
    ThePager,
  },
})
export default class PagesIndex extends Vue {
  page = 1
  asyncData() {
    const allContents = Object.values(articleModule.getArticleList)
    const contents = allContents.slice(0, 6)
    const pageLength = Math.ceil(allContents.length / 6)
    return { contents, pageLength }
  }

  inputPage(inputPage: number) {
    this.$router.push({ path: '/archive', query: { page: String(inputPage) } })
  }

  setPage(page: number) {
    this.page = page
  }
}
</script>
