import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.posts = posts
      },
      addPost(state, post) {
        state.posts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.posts.findIndex(post => post.id === editedPost.id)
        state.posts[postIndex] = editedPost
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        // if (!process.client) {
        //   console.log(context.req)
        // }
        return axios.get('https://learning-nuxt-f474e.firebaseio.com/posts.json')
          .then(res => {
            const posts = []
            for (const key in res.data) {
              posts.push({
                ...res.data[key],
                id: key
              })
            }
            vuexContext.commit('setPosts', posts)
          })
          .catch(e => context.error(e))
      },
      addPost(vuexContext, data) {
        const createdPost = {
          ...data,
          updatedDate: new Date()
        }
        return axios
          .post("https://learning-nuxt-f474e.firebaseio.com/posts.json", createdPost)
          .then(res => {
            vuexContext.commit('addPost', {...createdPost, id: res.data.name})
          })
          .catch(e => console.log(e));
      },
      editPost(vuexContext, post) {
        return axios.put(`https://learning-nuxt-f474e.firebaseio.com/posts/${post.id}.json`, post)
          .then(res => {
            vuexContext.commit('editPost', post)
          })
          .catch(e => context.error(e))
      },
      setPosts(context, posts) {
        context.commit('setPosts', posts)
      }
    },
    getters: {
      posts(state) {
        return state.posts
      }
    }
  })
}

export default createStore;
