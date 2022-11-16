//此文件用于前端store.dispatch调用执行
//将信息存储在本地
import { addAdmin,deleteAdmin,upAuthority, updatePassword, getAdminList,getLoginRecordList} from '@/api/admin'

//设置
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //将axios获取的管理员列表设置在store中
  SET_ADMIN_LIST: (state, admin_list) => {
    state.admin_list = admin_list
  },
  SET_UPDATE_ADMIN_ID:(state,updateAdminId)=>{
    state.updateAdminId = updateAdminId
  }
}
// 用户系统操作
const actions = {

  /**
   * 向后端获取管理员数据
   */
  getAdminList({ commit },query) {
    return new Promise((resolve, reject) => { //使用axios与后端沟通
      //调用api/admin/js中同名函数
      getAdminList(query).then(response => {//成功时执行
        var data = response.myData //获取响应体
        resolve(data) //返回数据
      }).catch(error => {
        reject(error)//调用失败时执行reject
      })
    })//
  },
  /**
   * 向后端获取管理员登录的历史数据
   */
   getAdminLoginRecordList({ commit },query) {
   
    return new Promise((resolve, reject) => { //使用axios与后端沟通
      //调用api/admin/js中同名函数
      getLoginRecordList(query).then(response => {//成功时执行
        var data = response.myData//这里不用json解析，可以直接使用.访问
        resolve(data) //返回数据
      }).catch(error => {
        reject(error)//调用失败时执行reject
      })
    })//
    
  },


  //提升权限
   upAuthority({commit},data){//记得参数对应  ===========卧槽   ！！！！！！！！！！！！！！！！！大坑===========================
    return new Promise((resolve, reject) => { //使用axios与后端沟通
      upAuthority(data).then(response => {//
        resolve(response) //向前端返回数据
      }).catch(error => {
        reject(error)//调用失败时执行reject
      })
    })//
   },
   //异步更新密码
   updatePassword({commit},data){
    return new Promise((resolve, reject) => { 
      updatePassword(data).then(response => {//
        resolve(response) //向前端返回数据
      }).catch(error => {
        reject(error)//调用失败时执行reject
      })
    })//
   },
   deleteAdmin({commit},data){
    return new Promise((resolve, reject) => { 
      deleteAdmin(data).then(response => {//
        resolve(response) //向前端返回数据
      }).catch(error => {
        reject(error)//调用失败时执行reject
      })
    })//
   },
//添加管理员
   addAdmin({commit},form){
    const{username,password,is_super_admin} = form
    return new Promise((resolve, reject) => { 

      addAdmin({username:username.trim(),password:password,is_super_admin:is_super_admin}).then(response => {

        resolve(response) //向前端返回数据
      }).catch(error => {
        reject(error)//调用失败时执行reject
      })
    })//

   }

}//action

export default {
  namespaced: true,
  mutations,
  actions
}

