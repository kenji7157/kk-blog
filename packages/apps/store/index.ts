import { ActionTree, Store } from 'vuex';
import { ActionContext } from 'vuex/types';
import { Context } from '@nuxt/types';
import { initialiseStores } from '~/utils/store-accessor';

// RootStateを追加
export const state = () => ({});
export type RootState = ReturnType<typeof state>

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];

// Rootのactionsを追加
export const actions: ActionTree<any, any> = {
  nuxtServerInit: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ActionContext<RootState, RootState>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server: Context
  ) => {
    // NOTE:SSGの場合は静的ページの取得枚に実行している
    // articleの初期化
    await server.store.getters[
      'vuexModuleDecorators/articleModule'
    ].loadArticles();
  },
};

export * from '~/utils/store-accessor';
