import request from '@/utils/request'
/**
 * API文件
 *该文件管理所有的前端 向后端的请求接口
 */
/**
 * 用户登录
 * @param {} data 
 * @returns 
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
     //添加数据头为json
    headers: {
      'Content-Type':'application/json'
    }
  })
}
/**
 * 获取用户详情
 * @param {*} token 
 * @returns 
 */
export function getInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}

/**
 * 用户登出
 * @returns 
 */
export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}
