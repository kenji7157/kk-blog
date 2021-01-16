<template>
  <v-app>
    <v-app-bar :clipped-right="clipped" fixed app color="primary">
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="white--text text-h5 font-weight-bold"
        v-text="title"
      />
      <v-spacer />
      <v-app-bar-nav-icon color="accent" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      right
      color="secondary"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>プロフィール</v-list-item-title>
            <hr />
            <v-avatar class="my-2" size="86px" style="overflow: unset">
              <img class="mr-auto" src="https://placehold.jp/150x150.png" />
            </v-avatar>
            <v-list-item-subtitle> 雑食エンジニア。🦒 </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>アーカイブ</v-list-item-title>
            <hr />
            <v-list-group
              v-for="(archive, i) in archiveArticleList"
              :key="i"
              sub-group
              class="ml-n8"
            >
              <template v-slot:activator>
                <v-list-item-title>
                  {{ `${archive.year} ( ${archive.length} )` }}
                </v-list-item-title>
              </template>
              <v-list-item
                v-for="(perMonth, j) in archive.perMonthList"
                :key="j"
                class="ml-5"
                link
                :to="`/archive/${archive.year}/${perMonth.month + 1}`"
              >
                <v-list-item-content>
                  <span class="ml-8">{{
                    `${archive.year} / ${perMonth.month + 1} (${
                      perMonth.length
                    })`
                  }}</span>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>カテゴリー</v-list-item-title>
            <hr />
            <v-list-item
              v-for="(archive, i) in categoryArticleList"
              :key="i"
              link
              :to="`/archive/category/${archive.category}`"
            >
              <v-list-item-content>
                <span>{{ `${archive.category} ( ${archive.length} )` }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>検索</v-list-item-title>
            <hr />
            <!-- TODO:検索機能は後半に実施する -->
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
import { articleModule } from '@/store'

@Component
export default class DefaultLayout extends Vue {
  // NOTE: layout配下のコンポーネントはasyncDataメソッドが未定義
  // asyncData()
  get archiveArticleList() {
    return articleModule.getArchiveArticleList
  }

  get categoryArticleList() {
    return articleModule.getCategoryArticleList
  }

  clipped = true
  drawer = false
  fixed = false
  miniVariant = false
  right = true
  title = 'エンジニア覚書 🦒'
}
</script>
<style scoped>
.main-background {
  background-color: #f1f1f2;
}
</style>
