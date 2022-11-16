import request from '@/utils/request'
/**
 * 获取攻击列表API管理
 * @param {*} data 
 * @returns 
 */
export function getAttackList(data) {
  return request({
    //url: '/vue-admin-template/table/list',
    url: '/list/attack',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}
/**
 * 获取管理员列表API管理
 * @param {} data 
 * @returns 
 */
export function getAdminList(data) {
  return request({
    url: '/list/admin',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}
