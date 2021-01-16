<template>
  <v-footer fixed app class="mb-11" color="rgba(0, 0, 0, 0.0)">
    <v-row>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="pageLength"
          circle
          @input="inputPage"
        ></v-pagination>
      </div>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ThePager extends Vue {
  @Prop({ type: Number, default: 1 }) page!: number
  @Prop({ type: Number, default: 1 }) pageLength!: number

  inputPage(inputPage: number) {
    this.$router.push({ path: '/archive', query: { page: String(inputPage) } })
  }
}
</script>
