<template>
  <v-footer color="primary" class="justify-center" style="z-index: 4">
    <v-card flat color="primary" class="white--text text-center">
      <v-card-text class="white--text font-weight-bold pt-0">
        ©Copyright2021 NAGANO ENGINEER LIFE.All Rights Reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheFooter extends Vue {
  openGithubTab() {
    window.open('https://github.com/kenji7157', '_blank')
  }

  openTwitterTab() {
    window.open('https://twitter.com/kenji7157', '_blank')
  }

  openLinkedinTab() {
    window.open('https://www.linkedin.com/in/kenji7157', '_blank')
  }
}
</script>
