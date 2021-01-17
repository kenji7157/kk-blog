<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
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
            <img class="mr-auto" src="/image/giraffe_profile.jpg" />
          </v-avatar>
          <v-list-item-subtitle> 紹介文 🦒 </v-list-item-subtitle>
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
                  `${archive.year} / ${perMonth.month + 1} (${perMonth.length})`
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
          <v-text-field
            class="mt-2"
            append-icon="mdi-magnify"
            label="記事を検索"
            single-line
            clearable
            flat
            outlined
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

  // NOTE:fetchとasyncDataで記事かけそう
  async fetch({ store }) {
    await store.getters['vuexModuleDecorators/articleModule'].loadArticles()
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
}
</script>
