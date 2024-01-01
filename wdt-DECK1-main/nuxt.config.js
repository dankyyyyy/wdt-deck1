export default {
  ssr: true,
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          test: /\.json$/,
          loader: "json-loader",
          type: "javascript/auto",
          include: [path.resolve(__dirname, "static")],
        });
      }
    },
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGO_URI,
  },
  nitro: {
    plugins: ['@/server/db/index.ts'],
    vercel: {
      functions: {
        maxDuration: 100,
        memory: 2008
      }
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'leaflet/dist/leaflet.css',
        integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
        crossorigin: ''
      }
    ],
    script: [
      {
        src: 'leaflet/dist/leaflet.js',
        integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
        crossorigin: ''
      }
    ]
  }
};
