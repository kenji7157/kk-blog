<template>
  <v-container>
    <v-row class="mb-1">
      <h3>
        <nuxt-link :to="'/'">トップページ</nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        {{ article.title }}
      </h3>
    </v-row>
    <v-row class="mt-1">
      <v-col class="pa-1" cols="4">
        <v-card class="d-flex flex-column">
          <v-card-title> {{ article.title }} </v-card-title>
          <div class="ml-4 mb-2 text-subtitle-2">
            {{ article.createdAt }}
          </div>
          <div class="text-h6">{{ article.category }}</div>
          <v-card-text class="mt-n3 pb-0">
            <div>{{ article.body }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { articleModule } from '@/store'

// TODO: 型定義を共通化してArticleを指定する
type Article = {
  id: number
  title: string
  body: string
  categroy: string[]
}

@Component
export default class ArticleId extends Vue {
  article: Partial<Article> = {}

  mounted() {
    const id = this.$route.params.id
    this.article = articleModule.articles[id]
  }
}
</script>
