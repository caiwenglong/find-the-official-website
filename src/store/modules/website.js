import { getWbCategories, getWebsite } from '@/api/add-website'

const state = {
  wbCategories: []
}

const mutations = {
  SET_CATEGORY: (state, categories) => {
    state.categories = categories
  }
}

const actions = {
  getWbCategories({ commit }) {
    return new Promise((resolve, reject) => {
      getWbCategories().then(res => {
        if (res.code === 'OW20000') {
          commit('SET_CATEGORY', res.data.wbCategoryList)
        }
        resolve(res.data.wbCategoryList)
      })
    })
  },

  getWebsite({ commit }) {
    return new Promise((resolve, reject) => {
      getWebsite().then(res => {
        console.log(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
