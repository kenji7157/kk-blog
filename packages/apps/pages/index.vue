<template>
  <v-container>
    <v-row>
      <v-col class="mt-n4 ml-n2"> トップページ </v-col>
    </v-row>
    <v-row class="mt-1">
      <v-col
        v-for="(content, index) in contents"
        :key="index"
        class="pa-1"
        cols="4"
      >
        <v-card height="300" class="d-flex flex-column">
          <v-img
            max-height="180"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          >
            <div class="text-h6">{{ content.category.join('/') }}</div>
          </v-img>
          <v-card-title> {{ content.title }} </v-card-title>
          <v-card-text class="mt-n3 pb-0">
            <div>{{ content.body.slice(0, 80) }}...</div>
          </v-card-text>
          <div class="mt-auto ml-4 mb-2 text-subtitle-2">
            {{ content.createdAt }}
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <div class="text-center">
        <v-pagination v-model="page" :length="20" circle></v-pagination>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { articleModule } from '@/store'

@Component
export default class PagesIndex extends Vue {
  page: 1
  asyncData() {
    const contents = articleModule.articles.slice(0, 6)
    return { contents }
  }
}
</script>
