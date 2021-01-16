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
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          >
            <div class="text-h6">{{ content.category.join('/') }}</div>
          </v-img>
          <v-card-title class="mt-n2">
            {{ content.title }} {{ n }}</v-card-title
          >
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

@Component
export default class ContentList extends Vue {
  // TODO:そろそろ型づけをする
  @Prop({ type: Array, default: () => [] }) contents!: any[]

  rowContents(row: number) {
    return row === 1 ? this.contents.slice(0, 3) : this.contents.slice(3, 6)
  }

  onArticle(id: string) {
    this.$router.push(`/article/${id}`)
  }
}
</script>
