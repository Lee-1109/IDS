import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
/**
 * 
 * @returns 若有token则返回true 若没有token则返回false
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
