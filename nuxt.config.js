import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/core-ui.js"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  // whether you are in dev
  // dev: false

  // env vars to inject
  env: {
    BASE_URL: process.env.BASE_URL || 'https://learning-nuxt-f474e.firebaseio.com'
  },

  // source directory of nuxt files
  // srcDir: 'client-app/

  // allows overwriting of VueRouter
  // should mostly utilize out of the box router structure
  router: {
    // linkActiveClass: 'active',
    // extendRoutes(routes) {
    //   routes.push({
    //     path: "*",
    //     component: resolve(__dirname, 'pages/index.vue')
    //   })
    // },
    //   middleware:
  },

  // set where nuxt folders live
  // rootDir: '',

  // change the way nuxt generates pages
  // generate: {
  //
  // },

  // for setting page transitions
  // transition: 'page'
  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  // executed prior to nuxt rendering process
  // can register any express middleware we want to run
  // serverMiddleware: {
  //
  // }
}
