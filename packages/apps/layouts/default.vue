<template>
  <v-app>
    <the-tool-bar @on-switch="drawer = !drawer" />
    <the-navigation-drawer :prop-drawer="drawer" @on-switch="setDrawer" />
    <v-main class="main-background">
      <v-container>
        <!-- nuxt-child-key="$route.fullPath" の指定でクエリのサイレンダリングが実行される -->
        <nuxt :nuxt-child-key="$route.fullPath" />
      </v-container>
    </v-main>
    <v-footer fixed app color="primary" class="justify-center">
      <span class="white--text font-weight-bold">
        エンジニア覚書 🦒 © kenji kawanobe 2021
      </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TheToolBar from '@/components/TheToolBar.vue'
import TheNavigationDrawer from '@/components/TheNavigationDrawer.vue'

@Component({
  components: {
    TheToolBar,
    TheNavigationDrawer,
  },
})
export default class DefaultLayout extends Vue {
  // NOTE: layout配下のコンポーネントはasyncDataメソッドが未定義
  // asyncData()
  drawer = true

  setDrawer(drawer: boolean) {
    this.drawer = drawer
  }
}
</script>
<style scoped>
.main-background {
  background-color: #f1f1f2;
}
</style>
