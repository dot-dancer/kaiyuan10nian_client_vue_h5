import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import postCssPxToRem from 'postcss-pxtorem'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'], 
  },
  // vite 中使用 less/scss/sass/stylus 等 css 预处理器, 直接进行安装，不用像 webpack 那样安装 loader 和配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/global-scss-var.scss" as *;`,
      },
    },
    // vite 中已集成了 postcss
    // https://vitejs.cn/config/#css-postcss
    postcss: {
      plugins: [require('autoprefixer')({
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8',
          '> 1%',
        ],
        grid: true,
      }), {
        // 去除警告: [WARNING] "@charset" must be the first rule in the file
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === 'charset') {
              atRule.remove();
            }
          }
        }
      }, postCssPxToRem({
          rootValue: 100, // (设计稿/10）1rem的大小 (详见: global.scss中 html{font-size: 26.6666666vw;})
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ['.norem'], // 过滤掉.norem-开头的class，不进行rem转换
          exclude: /node_modules/i,
      })],
    },
  }
})
