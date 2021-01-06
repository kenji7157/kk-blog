<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <div v-for="(content, index) in contents" :key="index" class="origin">
            <hr />
            作成日：{{ content.createdAt }} <br />
            タイトル：{{ content.title }} <br />
            本文：{{ content.body }} <br />
            カテゴリ：{{ content.category.join('/') }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import { articleModule } from '~/store'

@Component({
  components: {
    Logo,
  },
})
export default class PagesIndex extends Vue {
  async asyncData() {
    await articleModule.loadArticles()
    const contents = articleModule.articles
    return { contents }
  }
}
</script>
