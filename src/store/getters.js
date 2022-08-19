const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  hrsaasTime: state => state.user.hrsaasTime
}
export default getters
