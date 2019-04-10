export default {
  posts (state) {
    return state.posts
  },

  isAuthenticated (state) {
    return state.token !== null
  }
}
