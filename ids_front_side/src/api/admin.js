//该文件统一管理前端向后端请求的URL路径

import request from '@/utils/request'
/**
 * 获取管理员列表API管理
 * @param {} data 
 * @returns 
 */
 export function getAdminList(data) {
    return request({
      url: '/list/admin',//最终向后端的请求URL
      method: 'post',
      data,
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  export function getLoginRecordList(data) {
    return request({
      url: '/list/loginRecord',//最终向后端的请求URL
      method: 'post',
      data,
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  /**
   * 提升管理员权限
   * @param {} data 
   * @returns 
   */
  export function upAuthority(data) {
    return request({
      url: '/admin/upAuthority',//给相关的管理员提权
      method: 'post',
      data,
      headers: {
        'Content-Type':'application/json'
      }
    })
  }
/**
   * 更新管理员密码
   * @param {} 用户参数列表 
   * @returns 
   */
export function updatePassword(data) {
  return request({
    url: '/admin/updatePassword',//给相关的管理员提权
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}

/**
   * 更新管理员密码
   * @param {} 用户参数列表 
   * @returns 
   */
export function deleteAdmin(data) {
  return request({
    url: '/admin/deleteAdmin',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}
/**
 * 添加管理员
 * @param {管理员信息} data 
 * @returns 
 */
export function addAdmin(data) {
  return request({
    url: '/admin/addAdmin',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}

addAdmin

  
  