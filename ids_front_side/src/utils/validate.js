/**
 * 验证器
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str 验证用户名
 * @returns {Boolean} 用户名不能小于8位 
 * 正确返回True 错误返回False
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  const user_name = str.trim()
  return !(user_name.length<8)
}
