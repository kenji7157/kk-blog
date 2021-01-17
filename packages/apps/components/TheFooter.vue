<template>
  <v-footer
    :fixed="isDefaultLayout"
    :app="isDefaultLayout"
    color="primary"
    class="justify-center"
    style="z-index: 4"
  >
    <span class="white--text font-weight-bold">
      ブログタイトル 🦒 © kenji7157 2021
    </span>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class TheFooter extends Vue {
  @Prop({ type: Boolean, default: true }) isDefaultLayout!: boolean
}
</script>
