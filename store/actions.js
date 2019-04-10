import axios from 'axios'
import Cookie from 'js-cookie'

export default {
  nuxtServerInit (vuexContext, context) {
    return axios.get(`${process.env.BASE_URL}/posts.json`)
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
  addPost (vuexContext, data) {
    const createdPost = {
      ...data,
      updatedDate: new Date()
    }
    return axios
      .post(`https://learning-nuxt-f474e.firebaseio.com/posts.json?auth=${vuexContext.state.token}`, createdPost)
      .then(res => {
        vuexContext.commit('addPost', { ...createdPost, id: res.data.name })
      })
      .catch(e => console.log(e))
  },
  editPost (vuexContext, post) {
    return axios.put(`https://learning-nuxt-f474e.firebaseio.com/posts/${post.id}.json?auth=${vuexContext.state.token}`, post)
      .then(res => {
        vuexContext.commit('editPost', post)
      })
      .catch(e => context.error(e))
  },
  setPosts (context, posts) {
    context.commit('setPosts', posts)
  },
  authenticateUser (vuexContext, authData) {
    let authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FB_API_KEY}`

    if (!authData.isLogin) {
      authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.FB_API_KEY}`
    }

    return axios.post(authUrl, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }).then(({ data }) => {
      vuexContext.commit('setToken', data.idToken)
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('expirationDate', new Date().getTime() + Number.parseInt(data.expiresIn) * 1000)
      Cookie.set('jwt', data.idToken)
      Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(data.expiresIn) * 1000)
    })
  },
  initAuth (vuexContext, req) {
    let token, expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return
      }

      const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))

      if (!jwtCookie) {
        return
      }

      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expirationDate=')).split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('expirationDate')
    }

    if (new Date().getTime() > +expirationDate || !token) {
      vuexContext.dispatch('logout')
      return
    }

    vuexContext.commit('setToken', token)
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken')
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')

    if (process.clientData) {
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
    }
  }
}
