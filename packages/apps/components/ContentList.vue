<template>
  <div>
    <v-row v-for="n in 2" :key="n" :class="n === 1 ? 'mt-3' : 'mt-4'">
      <v-col
        v-for="(content, index) in rowContents(n)"
        :key="index"
        class="pa-1"
        cols="12"
        xl="4"
        lg="4"
        md="4"
        sm="4"
      >
        <v-card
          :height="$vuetify.breakpoint.xl ? 390 : 300"
          class="d-flex flex-column"
          @click="onArticle(content.id)"
        >
          <v-img
            :max-height="$vuetify.breakpoint.xl ? 260 : 180"
            :src="require('@/assets/image/giraffe.jpg')"
          >
            <div class="text-h6">
              <v-chip
                v-for="(category, index_j) in content.category"
                :key="index_j"
                label
                class="mt-1 ml-1 mr-2 mb-2"
                color="rgba(32,33,3,0.2)"
                text-color="white"
              >
                {{ category }}</v-chip
              >
            </div>
          </v-img>
          <v-card-title class="mt-n2"> {{ content.title }}</v-card-title>
          <v-card-text class="mt-n3 pb-0">
            <div>{{ content.abstract.slice(0, 45) }}...</div>
          </v-card-text>
          <div class="mt-auto ml-4 mb-1 text-subtitle-2">
            {{ content.createdDate }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Article } from '@/types'

@Component
export default class ContentList extends Vue {
  @Prop({ type: Array, default: () => [] }) contents!: Article[]

  rowContents(row: number) {
    return row === 1 ? this.contents.slice(0, 3) : this.contents.slice(3, 6)
  }

  onArticle(id: string) {
    this.$router.push(`/article/${id}`)
  }
}
</script>
