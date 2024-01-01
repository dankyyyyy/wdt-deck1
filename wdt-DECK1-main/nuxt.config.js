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
  }
};
