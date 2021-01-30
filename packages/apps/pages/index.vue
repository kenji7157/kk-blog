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
  head() {
    return {
      title: '記事一覧',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: '記事一覧 | Giraffe footprints',
        },
      ],
    }
  }

  asyncData({ payload }) {
    const allContents = payload.allContents
    const pageLength = Math.ceil(allContents.length / 10)
    const contents = allContents.slice(0, 10)
    const page = 1
    return { contents, pageLength, page }
  }

  inputPage(inputPage: number) {
    this.$router.push({ path: `/archive/page/${String(inputPage)}` })
  }
}
</script>
