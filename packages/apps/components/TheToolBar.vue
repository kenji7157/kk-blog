<template>
  <v-app-bar clipped-right fixed app color="primary">
    <v-spacer></v-spacer>
    <v-toolbar-title
      class="white--text text-h5 font-weight-bold"
      v-text="'エンジニア覚書 🦒'"
    />
    <v-spacer />
    <v-app-bar-nav-icon color="accent" @click.stop="$emit('on-switch')" />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheToolBar extends Vue {}
</script>
