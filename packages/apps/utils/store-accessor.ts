import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/articleModule';

// eslint-disable-next-line import/no-mutable-exports
let articleModule: ArticleModule;
function initialiseStores(store: Store<any>): void {
  articleModule = getModule(ArticleModule, store);
}

export { initialiseStores, articleModule };
