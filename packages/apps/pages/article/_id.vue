<template>
  <v-container>
    <v-row class="mb-1">
      <h3>
        <nuxt-link :to="'/'">記事一覧</nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        <!-- カテゴリーをクリックするとカテゴリーで抽出された一覧ページを表示したい -->
        <nuxt-link :to="`/archive/category/${article.category[0]}`"
          >{{ article.category[0] }}
        </nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        {{ article.title }}
      </h3>
    </v-row>
    <v-row class="mt-1 justify-center">
      <v-col class="pa-1" cols="10">
        <v-card class="d-flex flex-column">
          <div class="ml-4 mt-4 text-subtitle-1">
            {{ article.createdDate }}
          </div>
          <v-card-title class="article-title">
            {{ article.title }}
          </v-card-title>
          <div class="ml-4">{{ article.category.join(',') }}</div>
          <v-card-text class="article">
            <div v-html="article.body" />
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
  category: string[]
}

@Component({
  layout: 'article',
})
export default class ArticleId extends Vue {
  asyncData({ route }) {
    const id = route.params.id
    const article: Article = articleModule.articles[id]
    return { article }
  }
}
</script>

<style scoped>
.article-title {
  font-size: 40px;
  font-weight: bold;
  font-feature-settings: 'palt';
  margin-bottom: 16px;
  line-height: 1.4;
}
.article {
  font-size: 16px;
}

.article >>> h1 {
  font-size: 1.8em;
  font-weight: bold;
  font-feature-settings: 'palt';
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.1em;
  margin-top: 2.2em;
  margin-bottom: 2.4rem;
}

.article >>> h2 {
  font-size: 1.6em;
  font-weight: bold;
  font-feature-settings: 'palt';
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.1em;
  margin-top: 2.2em;
  margin-bottom: 2.4rem;
}

.article >>> h3 {
  font-size: 1.4em;
  font-weight: bold;
  font-feature-settings: 'palt';
  margin-top: 2.2em;
  margin-bottom: 2.4rem;
}

.article >>> blockquote {
  border-left: 5px solid #ddd;
  color: #777;
  padding: 1em;
  padding-right: 0;
  margin: 1.5em 0;
}
</style>
