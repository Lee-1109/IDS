//此文件用于前端store.dispatch调用执行

import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: ''
  }
}

const state = getDefaultState()
//设置
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
// 用户系统操作
const actions = {

  /**
   * 登录
   */
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => { //使用axios与后端沟通
      //Promise里面执行的是api.js中的login()函数
      login({ username: username.trim(), password: password }).then(response => {
        const { token } = response
        //setToken(data.token)
        commit('SET_TOKEN', response.token)
        commit('SET_ROLE', response.role) //设置用户角色
        commit('SET_NAME', response.name)//设置用户名
        commit('SET_AVATAR',response.avatar)//设置头像图片链接
        setToken(response.token)
        resolve(token)//   resolve表示传递给前端的数据
      }).catch(error => {
        console.log("打印错误信息:"+error)
        reject(error)
      })
    })
  },

  /**
   * 获取用户详情
   */
  getInfo({ commit, state }) {

    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        //解析响应体中的数据信息
        //const { data } = response
        const data = response
        if (!data) {//没有data数据信息
          return reject('服务器错误')
        }
        //成功获取data信息 解析变量
        const { role, name, avatar } = data
        commit('SET_ROLE', role) //设置用户角色
        commit('SET_NAME', name)//设置用户名
        commit('SET_AVATAR', avatar)//设置头像图片链接
        resolve(data)//返回数据
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      //将用户名传入 用于注销
      logout({username:state.name}).then(() => {
        removeToken() // 必须先移除Token
        resetRouter() //重定向至登录界面
        commit('RESET_STATE')

        resolve()
      }).catch(error => {
        reject(error)
      })
    })//Promise
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {

      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}//action

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

