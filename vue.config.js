const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // Change it to your path
  publicPath: '/projects/wavelets/release',
  outputDir: 'release',
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      // Note: this option is named as "prependData" in sass-loader v8
      sass: {
        additionalData: `@import "~@/assets/styles/app.sass"`
      }
    }
  },
})
