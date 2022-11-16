//归mapSetter调配使用
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  admin_list: state => state.admin.admin_list,
  role : state => state.user.role,
  attackData : state => state.attack.attack_data
}
export default getters
