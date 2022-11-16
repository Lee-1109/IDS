import { getDangerAttackList,getAttackList,getAttackData,listAlterHistory} from '@/api/attack'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'




//设置
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ATTACK_LIST: (state, attackList) => {
    state.attack_list = attackList
  },
  SET_ATTACK_DATA: (state, attackData) => {
    state.attack_data = attackData
  }
}
// 用户系统操作
const actions = {

/**
 * 向后端获取攻击列表详情数据
 */
getAttackList({ commit, state },form) {
  return new Promise((resolve, reject) => {
    getAttackList(form).then(response => {
      //解析响应体中的数据信息
      //const { data } = response
      const {myData} = response

      if (!myData) {//没有data数据信息
        return reject('服务器未返回响应')
      }
      commit('SET_ATTACK_LIST', myData)//设置攻击列表
      resolve(myData)//返回攻击详情列表字符串
      
    }).catch(error => {
      reject(error)
    })
  })
},
/**
 * 向后端获取首页图表基础数据
 */
loadAttackData() {
return new Promise((resolve, reject) => {
  getAttackData().then(response => {
    //解析响应体中的数据信息
    const {attackData} = response
    for( var i in attackData){
      console.log(attackData[i])
    }
    if (!attackData) {//没有data数据信息
      return reject('服务器未返回攻击图表数据')
    }
    console.log('store层面获取攻击详情完毕attackData')
    //成功获取data信息 解析变量
    // const { name, avatar } = data
    //commit('SET_ATTACK_DATA', attackData)//设置攻击列表
    resolve(attackData)//返回攻击详情列表字符串
    
  }).catch(error => {
    reject(error)
  })
})
},
//获取权限更改记录
listAlterHistory(){
  return new Promise((resolve, reject) => {
    listAlterHistory().then(response => {
      //解析响应体中的数据信息
      const {data} = response
      for( var i in data){
        console.log(data[i])
      }
      if (!data) {//没有data数据信息
        return reject('服务器未返回权限更改列表数据')
      }
      resolve(data.alter_record_list)//返回攻击详情列表字符串
      
    }).catch(error => {
      reject(error)
    })
  })
},
//获取高危库更新记录
getDangerAttackList({ commit, state },form){
  return new Promise((resolve, reject) => {
    getDangerAttackList(form).then(response => {
      //解析响应体中的数据信息
      const {myData} = response
      if (!myData) {//没有data数据信息
        return reject('服务器未返回响应')
      }
      resolve(myData)//返回攻击详情列表字符串
    }).catch(error => {
      reject(error)
    })
  })
}

    



}//action

export default {
  namespaced: true,
  mutations,
  actions
}

