<template>
  <v-app>
    <the-tool-bar @on-switch="drawer = !drawer" />
    <the-navigation-drawer :prop-drawer="drawer" @on-switch="setDrawer" />
    <v-main class="main-background">
      <v-container>
        <!-- nuxt-child-key="$route.fullPath" の指定でクエリのサイレンダリングが実行される -->
        <nuxt v-cloak :nuxt-child-key="$route.fullPath" />
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    TheToolBar: () => import('@/components/TheToolBar.vue'),
    TheNavigationDrawer: () => import('@/components/TheNavigationDrawer.vue'),
    TheFooter: () => import('@/components/TheFooter.vue'),
  },
})
export default class DefaultLayout extends Vue {
  // NOTE: layout配下のコンポーネントはasyncDataメソッドが未定義
  // asyncData()
  drawer = true

  created() {
    this.drawer = !this.$vuetify.breakpoint.xs
  }

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
