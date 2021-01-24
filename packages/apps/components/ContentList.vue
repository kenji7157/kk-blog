<template>
  <v-row class="mt-1 justify-center">
    <v-col class="pa-1" cols="12" xl="10" lg="10" md="10" sm="10">
      <v-card flat class="pt-1 pb-6">
        <v-row v-for="n in rows" :key="n" class="mt-1 ml-2 mr-1">
          <v-col
            v-for="(content, index) in rowContents(n)"
            :key="index"
            class="mr-n1"
            cols="12"
            xl="6"
            lg="6"
            md="6"
            sm="6"
          >
            <v-card
              class="d-flex flex-column"
              height="350"
              hover
              @click="onArticle(content.id)"
            >
              <v-img max-height="170 " src="/image/giraffe.jpg">
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
              <v-card-title class="mt-n1 font-weight-bold">
                {{ content.title }}</v-card-title
              >
              <v-card-subtitle class="pt-1 mb-n2 font-weight-medium">
                <v-icon small class="mr-1">mdi-calendar-check</v-icon
                >{{ content.createdDate }}
              </v-card-subtitle>
              <v-card-text :style="'overflow: hidden'">
                <div>{{ content.abstract }}</div>
                <div class="bottom-box"></div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Article } from '@/types'

@Component
export default class ContentList extends Vue {
  @Prop({ type: Array, default: () => [] }) contents!: Article[]

  get rows() {
    // NOTE: 1件の場合も対応するため切り上げ
    return Math.ceil(this.contents.length / 2)
  }

  rowContents(row: number) {
    return this.contents.slice(0 + 2 * (row - 1), 2 + 2 * (row - 1))
  }

  onArticle(id: string) {
    this.$router.push(`/article/${id}`)
  }
}
</script>
<style>
.bottom-box {
  position: absolute;
  top: 305px;
  left: 0px;
  width: 100%;
  height: 45px;
  border-radius: 30px;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 1) 70%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
