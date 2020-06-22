import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminMenus: [],
    username: '',
    article: ''
  },
  mutations: {
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    login (state, user) {
      sessionStorage.setItem('username', user)
      state.username = user
    },
    article (state, article) {
      state.article = article
    },
    logout (state) {
      state.username = ''
      sessionStorage.removeItem('username')
    }
  },
  actions: {
  },
  modules: {
  }
})
