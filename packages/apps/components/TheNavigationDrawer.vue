<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    fixed
    app
    right
    color="secondary"
  >
    <v-list class="mb-5 pb-16">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>プロフィール</v-list-item-title>
          <hr />
          <v-avatar class="my-2" size="86px" style="overflow: unset">
            <img class="mr-auto" src="/image/giraffe_profile.jpg" />
          </v-avatar>
          <p class="mt-1 text-body-2">Webエンジニア生活の備忘録</p>
          <div>
            <v-btn icon @click="openGithubTab">
              <v-icon size="24px"> mdi-github </v-icon>
            </v-btn>
            <v-btn icon @click="openTwitterTab">
              <v-icon size="24px"> mdi-twitter </v-icon>
            </v-btn>
            <v-btn icon @click="openLinkedinTab">
              <v-icon size="24px"> mdi-linkedin </v-icon>
            </v-btn>
          </div>
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
              :to="`/archive/${archive.year}/${perMonth.month + 1}/page/1`"
            >
              <v-list-item-content>
                <span class="ml-8">{{
                  `${archive.year} / ${perMonth.month + 1} ( 
                    ${perMonth.length} )`
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
            :to="`/archive/category/${archive.categoryPath}/page/1`"
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
          <v-text-field
            v-model="target"
            class="mt-2"
            append-icon="mdi-magnify"
            label="記事を検索"
            single-line
            clearable
            flat
            outlined
            @click:append="search(target)"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { articleModule } from '@/store'

@Component
export default class TheNavigationDrawer extends Vue {
  @Prop({ type: Boolean, default: true }) propDrawer!: boolean

  target = ''

  // NOTE:fetchとasyncDataで記事かけそう
  async fetch() {
    // SSGによりページ生成枚にストアの初期化を行うので以下の処理は不要
    // await store.getters['vuexModuleDecorators/articleModule'].loadArticles()
  }

  get drawer(): boolean {
    return this.propDrawer
  }

  set drawer(val: boolean) {
    this.$emit('on-switch', val)
  }

  get archiveArticleList() {
    return articleModule.getArchiveArticleList
  }

  get categoryArticleList() {
    return articleModule.getCategoryArticleList
  }

  openGithubTab() {
    window.open('https://github.com/kenji7157', '_blank')
  }

  openTwitterTab() {
    window.open('https://twitter.com/kenji7157', '_blank')
  }

  openLinkedinTab() {
    window.open('https://www.linkedin.com/in/kenji7157', '_blank')
  }

  search(text: string) {
    if (!text) {
      return
    }
    this.$router.push({ path: '/search', query: { target: text } })
  }
}
</script>
