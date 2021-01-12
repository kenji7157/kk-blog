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
                v-for="(monthObj, j) in archive.monthObjList"
                :key="j"
                class="ml-5"
                link
              >
                <v-list-item-content>
                  <span class="ml-8">{{
                    `${archive.year} / ${monthObj.month + 1} (${
                      monthObj.length
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
  // Articleを要素にもつ配列
  allContents = []
  // NOTE:配列を要素にもつ配列
  archiveList: {
    year: number
    length: number
    monthObjList: { month: number; length: number }[]
  }[] = []
  // NOTE: layout配下のコンポーネントはasyncDataメソッドが未定義
  // asyncData()

  created() {
    this.allContents = Object.values(articleModule.articles)
    // 本当はarticleModuleでgetter定義した方がいい
    // 作成日が新しいのが先頭に来るようにソートをかける
    this.allContents.sort(function (a, b) {
      if (a.createdTimestamp.unix < b.createdTimestamp.unix) {
        return 1
      } else {
        return -1
      }
    })
    let preYear = this.allContents[0].createdTimestamp.year
    let preMonth = this.allContents[0].createdTimestamp.month
    let archive: {
      year: number
      length: number
      monthObjList: { month: number; length: number }[]
    } = {
      year: preYear,
      length: 0,
      monthObjList: [],
    }
    let monthObj = {
      month: preMonth,
      length: 0,
    }
    this.allContents.forEach((content, index) => {
      const year = content.createdTimestamp.year
      const month = content.createdTimestamp.month
      if (preYear === year) {
        archive.length++
        if (preMonth === month) {
          monthObj.length++
        } else {
          archive.monthObjList.push(monthObj)
          preMonth = month
          monthObj = {
            month: preMonth,
            length: 1,
          }
        }
      } else {
        archive.monthObjList.push(monthObj)
        this.archiveList.push(archive)
        preYear = year
        preMonth = month
        archive = { year: preYear, length: 1, monthObjList: [] }
        monthObj = {
          month: preMonth,
          length: 1,
        }
      }

      if (index === this.allContents.length - 1) {
        archive.monthObjList.push(monthObj)
        this.archiveList.push(archive)
      }
    })
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
