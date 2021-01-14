<template>
  <v-app dark>
    <v-app-bar :clipped-right="clipped" fixed app>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      right
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
              v-for="(archive, i) in archiveList"
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
            <v-list-item link>
              <v-list-item-content>
                <span>長野 (1)</span>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <span>プログラミング (1)</span>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>検索</v-list-item-title>
            <hr />
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <!-- nuxt-child-key="$route.fullPath" の指定でクエリのサイレンダリングが実行される -->
        <nuxt :nuxt-child-key="$route.fullPath" />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer fixed app>
      <span>NAGANO ENGINEER LIFE © kenji kawanobe 2021</span>
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

  created() {}

  get archiveList() {
    return articleModule.getArchiveList
  }

  clipped = true
  drawer = false
  fixed = false
  // items = [
  //   {
  //     icon: 'mdi-apps',
  //     title: 'Welcome',
  //     to: '/',
  //   },
  //   {
  //     icon: 'mdi-chart-bubble',
  //     title: 'Inspire',
  //     to: '/inspire',
  //   },
  // ]

  miniVariant = false
  right = true
  // rightDrawer: false,
  title = 'prcatice site'
}
</script>
