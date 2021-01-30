import Vue from 'vue'

import Vuetify, {
  VApp,
  VAppBar,
  VBtn,
  VCard,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VChip,
  VCol,
  VContainer,
  VDivider,
  VFooter,
  VIcon,
  VImg,
  VLazy,
  VList,
  VListGroup,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VMain,
  VNavigationDrawer,
  VRow,
  VTextField,
  VToolbarTitle,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VBtn,
    VCard,
    VCardSubtitle,
    VCardText,
    VCardTitle,
    VChip,
    VCol,
    VContainer,
    VDivider,
    VFooter,
    VIcon,
    VImg,
    VLazy,
    VList,
    VListGroup,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VMain,
    VNavigationDrawer,
    VRow,
    VTextField,
    VToolbarTitle,
  },
})

const lightThemeSettings = {
  primary: '#000000',
  accent: '#FFFFFF',
  secondary: '#F8F8FD',
  info: '#000000',
  warning: '#000000',
  error: '#000000',
  success: '#000000',
}

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: lightThemeSettings,
    },
  },
  icons: {
    iconfont: 'mdi',
  },
})
