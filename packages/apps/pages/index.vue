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
    ></the-pager>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { articleModule } from '@/store'
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
    // const allContents = Object.values(articleModule.getArticleList)
    const allContents = payload.allContents
    const pageLength = Math.ceil(allContents.length / 6)
    const contents = allContents.slice(0, 6)
    const page = 1

    return { contents, pageLength, page }
  }

  inputPage(inputPage: number) {
    this.$router.push({ path: `/archive/page/${String(inputPage)}` })
  }
}
</script>
