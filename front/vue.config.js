const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
<<<<<<< HEAD
        additionalData: `
          @import "@/sass/variables.scss";
=======
        prependData: `
          @import "@/styles/sass/variables.scss";
>>>>>>> ce77119 (Style : setting scss and apply global style)
        `,
      },
    },
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
