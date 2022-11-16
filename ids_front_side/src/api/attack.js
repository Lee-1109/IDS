import request from '@/utils/request'
/**
 * 获取攻击列表API管理
 * @param {*} data 
 * @returns 
 */
export function getAttackList(data) {
  return request({
    url: '/list/attack',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}



export function getAttackData(param) {
  return request({
    url: '/list/loadAttackData',
    method: 'get',
    param,
    headers: {
      'Content-Type':'application/json'
    }
  })
}

export function listAlterHistory(data) {
  return request({
    url: '/list/loadAlterHistory',
    method: 'get',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}

export function getDangerAttackList(data) {
  return request({
    url: 'list/attackDanger',
    method: 'post',
    data,
    headers: {
      'Content-Type':'application/json'
    }
  })
}





