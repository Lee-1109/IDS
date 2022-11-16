import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import attack from './modules/attack'
import admin from './modules/admin'
import user from './modules/user'

Vue.use(Vuex)
//在这里注册store/modules文件夹下的组件
const store = new Vuex.Store({
  
  modules: {
    app,
    settings,
    user,
    attack,
    admin
  },
  getters
})

export default store
