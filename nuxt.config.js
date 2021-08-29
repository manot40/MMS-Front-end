export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "mr_management_system",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js', nomodule:'' },
      { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js', type: 'module' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //'~/plugins/litepie.js',
    '~/plugins/v-select.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    [
      "vue-toastification/nuxt",
      {
        timeout: 2500,
        draggable: false
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_HOST
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  router: {
    middleware: ["auth"]
  },

  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "accessToken",
          global: true,
          type: "Bearer",
          maxAge: 60 * 15
        },
        refreshToken: {
          property: false,
          data: "refreshToken",
          tokenRequired: true,
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: "data"
        },
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "accessToken"
          },
          refresh: { url: "/auth/refresh", method: "post" },
          user: { url: "/user/me", method: "get", propertyName: "data" },
          logout: { url: '/user/logout', method: 'delete' },
        },
        redirect: {
          login: "/login",
          logout: "/",
          callback: "/login",
          home: "/"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
