
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Revenue Computation System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Revenue Computation Generator' }
    ],
    script: [
      { src: "/include.js"},
      { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"},
      { src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"},
      { src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"},
      { src: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"},
      { src: "https://unpkg.com/aos@2.3.1/dist/aos.js"},
      { src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.1/Chart.min.js"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      // { href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", rel: "stylesheet"},
      { href:"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css", rel: "stylesheet"},
      { href:"https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css", rel: "stylesheet"},
      { href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css", rel: "stylesheet"},
      { href:"https://fonts.gstatic.com", rel: "preconnect"},
      { href:"https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap", rel: "stylesheet"},
      { href:"https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap", rel: "stylesheet"},
      { href:"https://unpkg.com/aos@2.3.1/dist/aos.css", rel: "stylesheet"},
      
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  serverMiddleware: [
    {
      path: '/api',
      handler: '~/api/auth.js'
    },
  ],
  router: {
    middleware: ["routes"]
  },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/bootstrap.css',
    '~assets/css/bootstrap-ext.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/HelperFunctions.js',
    '~/plugins/Firebase.js',
    '~/plugins/Validation.js',
    '~/plugins/LocalStorage.js',
    '~/plugins/Charts.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
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
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(zip|rar|bin|exe|loader?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })      
    }
  }
}
