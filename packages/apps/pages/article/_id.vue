<template>
  <v-container>
    <v-row class="mb-1">
      <h3>
        <nuxt-link :to="'/'">記事一覧</nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        <nuxt-link :to="`/archive/category/${article.categoryPath[0]}/page/1`"
          >{{ article.category[0] }}
        </nuxt-link>
        <v-icon class="mb-1">mdi-chevron-right</v-icon>
        {{ article.title }}
      </h3>
    </v-row>
    <v-row class="mt-1 justify-center">
      <v-col class="pa-1" :class="{'px-10': !$vuetify.breakpoint.xs}" cols="12" xl="10" lg="10" md="10" sm="10">
        <v-card flat class="d-flex flex-column px-4 py-2">
          <div class="ml-4 mt-4 text-subtitle-1">
            {{ article.createdDate }}
          </div>
          <v-card-title class="article-title mt-n3">
            {{ article.title }}
          </v-card-title>
          <v-btn
            class="ml-4 mt-n5 mb-4"
            width="160"
            color="#1DA1F2"
            @click="
              tweet(
                `https://twitter.com/intent/tweet?text=${article.title}&url=${url}&hashtags=${hashtags}&via=kenji7157&related=kenji7157`
              )
            "
          >
            <v-icon color="white">mdi-twitter</v-icon
            ><span class="white--text font-weight-bold ml-1"
              >ツイート</span
            ></v-btn
          >
          <hr>
          <v-card-text class="mt-4 article black--text">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="article.body" />
            <!-- TODO:サニタイズ処理を入れる -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Article } from '@/types';
import { articleModule } from '@/store';

@Component
export default class ArticleId extends Vue {
  top = 0
  left = 0
  width = 550
  height = 500

  head() {
    const article = articleModule.getArticles[this.$route.params.id];
    return {
      title: article.title,
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://nagano-engineer-life.netlify.app/article/${article.id}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${article.title} | 長野エンジニアライフ`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: article.abstract.slice(0, 80),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://placehold.jp/140/000000/ffffff/1000x672.png?text=${
            article.category[0].split(',')[0]
          }`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://placehold.jp/140/000000/ffffff/1000x672.png?text=${
            article.category[0].split(',')[0]
          }`,
        },
      ],
    };
  }

  asyncData({ payload }) {
    const article: Article = payload.article;
    const url = `https://nagano-engineer-life.netlify.app/article/${article.id}`;
    const hashtags = article.category.join(',');
    return { article, url, hashtags };
  }

  mounted() {
    this.top = (screen.availHeight - this.height) / 2;
    this.left = (screen.availWidth - this.width) / 2;
  }

  tweet(url: string) {
    window.open(
      encodeURI(decodeURI(url)),
      'tweetwindow',
      `top=${this.top}, left=${this.left}, width=${this.width}, height=${this.height}, personalbar=0, toolbar=0, scrollbars=1, sizable=1`
    );
    return false;
  }
}
</script>

<style scoped>
.article-title {
  font-size: 40px;
  font-weight: bold;
  font-feature-settings: 'palt';
  margin-bottom: 16px;
  line-height: 1.4;
}
.article {
  font-size: 16px;
  font-family: -apple-system, Segoe UI, Helvetica Neue,
    Hiragino Kaku Gothic ProN, 'メイリオ', meiryo, sans-serif !important;
}

.article >>> h1 {
  font-size: 1.8em;
  font-weight: bold;
  font-feature-settings: 'palt';
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
  margin-top: 2.2em;
  margin-bottom: 20px;
}

.article >>> h2 {
  font-size: 1.6em;
  font-weight: bold;
  font-feature-settings: 'palt';
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  margin-top: 2.2em;
  margin-bottom: 20px;
}

.article >>> h3 {
  font-size: 1.4em;
  font-weight: bold;
  font-feature-settings: 'palt';
  margin-top: 2.2em;
  margin-bottom: 20px;
}

.article >>> blockquote {
  border-left: 5px solid #ddd;
  color: #777;
  padding: 1em;
  padding-right: 0;
  margin: 1.5em 0;
}

.article >>> code {
  background-color: #EEEEEE;
  font-weight: bold;
}

.article >>> pre {
  background-color: #364549;
  color: #e3e3e3;
  margin: 16px -32px;
  padding: 16px 32px;
}

.article >>> pre > code {
  background-color: #364549;
  font-weight: bold;
}

.article >>> img {
  max-width: 100%;
}
</style>
