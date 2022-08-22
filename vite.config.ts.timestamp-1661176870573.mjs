// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postCssPxToRem from "postcss-pxtorem";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\yayadu\\Learn\\GO\\kaiyuan10nian_client\\fend\\mobile\\vue_h5";
var vite_config_default = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/global-scss-var.scss" as *;`
      }
    },
    postcss: {
      plugins: [autoprefixer({
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8",
          "> 1%"
        ],
        grid: true
      }), {
        postcssPlugin: "internal:charset-removal",
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === "charset") {
              atRule.remove();
            }
          }
        }
      }, postCssPxToRem({
        rootValue: 100,
        propList: ["*"],
        selectorBlackList: [".norem"],
        exclude: /node_modules/i
      })]
    }
  },
  server: {
    port: 9999
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx5YXlhZHVcXFxcTGVhcm5cXFxcR09cXFxca2FpeXVhbjEwbmlhbl9jbGllbnRcXFxcZmVuZFxcXFxtb2JpbGVcXFxcdnVlX2g1XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx5YXlhZHVcXFxcTGVhcm5cXFxcR09cXFxca2FpeXVhbjEwbmlhbl9jbGllbnRcXFxcZmVuZFxcXFxtb2JpbGVcXFxcdnVlX2g1XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi95YXlhZHUvTGVhcm4vR08va2FpeXVhbjEwbmlhbl9jbGllbnQvZmVuZC9tb2JpbGUvdnVlX2g1L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCBwb3N0Q3NzUHhUb1JlbSBmcm9tICdwb3N0Y3NzLXB4dG9yZW0nXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgIH0sXG4gICAgZXh0ZW5zaW9uczogWycuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcudnVlJywgJy5tanMnXSwgXG4gIH0sXG4gIC8vIHZpdGUgXHU0RTJEXHU0RjdGXHU3NTI4IGxlc3Mvc2Nzcy9zYXNzL3N0eWx1cyBcdTdCNDkgY3NzIFx1OTg4NFx1NTkwNFx1NzQwNlx1NTY2OCwgXHU3NkY0XHU2M0E1XHU4RkRCXHU4ODRDXHU1Qjg5XHU4OEM1XHVGRjBDXHU0RTBEXHU3NTI4XHU1MENGIHdlYnBhY2sgXHU5MEEzXHU2ODM3XHU1Qjg5XHU4OEM1IGxvYWRlciBcdTU0OENcdTkxNERcdTdGNkVcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL2Fzc2V0cy9zdHlsZXMvZ2xvYmFsLXNjc3MtdmFyLnNjc3NcIiBhcyAqO2AsXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gdml0ZSBcdTRFMkRcdTVERjJcdTk2QzZcdTYyMTBcdTRFODYgcG9zdGNzc1xuICAgIC8vIGh0dHBzOi8vdml0ZWpzLmNuL2NvbmZpZy8jY3NzLXBvc3Rjc3NcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbYXV0b3ByZWZpeGVyKHtcbiAgICAgICAgb3ZlcnJpZGVCcm93c2Vyc2xpc3Q6IFtcbiAgICAgICAgICAnQW5kcm9pZCA0LjEnLFxuICAgICAgICAgICdpT1MgNy4xJyxcbiAgICAgICAgICAnQ2hyb21lID4gMzEnLFxuICAgICAgICAgICdmZiA+IDMxJyxcbiAgICAgICAgICAnaWUgPj0gOCcsXG4gICAgICAgICAgJz4gMSUnLFxuICAgICAgICBdLFxuICAgICAgICBncmlkOiB0cnVlLFxuICAgICAgfSksIHtcbiAgICAgICAgLy8gXHU1M0JCXHU5NjY0XHU4QjY2XHU1NDRBOiBbV0FSTklOR10gXCJAY2hhcnNldFwiIG11c3QgYmUgdGhlIGZpcnN0IHJ1bGUgaW4gdGhlIGZpbGVcbiAgICAgICAgcG9zdGNzc1BsdWdpbjogJ2ludGVybmFsOmNoYXJzZXQtcmVtb3ZhbCcsXG4gICAgICAgIEF0UnVsZToge1xuICAgICAgICAgIGNoYXJzZXQ6IChhdFJ1bGUpID0+IHtcbiAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gJ2NoYXJzZXQnKSB7XG4gICAgICAgICAgICAgIGF0UnVsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHBvc3RDc3NQeFRvUmVtKHtcbiAgICAgICAgICByb290VmFsdWU6IDEwMCwgLy8gKFx1OEJCRVx1OEJBMVx1N0EzRi8xMFx1RkYwOTFyZW1cdTc2ODRcdTU5MjdcdTVDMEYgKFx1OEJFNlx1ODlDMTogZ2xvYmFsLnNjc3NcdTRFMkQgaHRtbHtmb250LXNpemU6IDI2LjY2NjY2NjZ2dzt9KVxuICAgICAgICAgIHByb3BMaXN0OiBbJyonXSwgLy8gXHU5NzAwXHU4OTgxXHU4RjZDXHU2MzYyXHU3Njg0XHU1QzVFXHU2MDI3XHVGRjBDXHU4RkQ5XHU5MUNDXHU5MDA5XHU2MkU5XHU1MTY4XHU5MEU4XHU5MEZEXHU4RkRCXHU4ODRDXHU4RjZDXHU2MzYyXG4gICAgICAgICAgc2VsZWN0b3JCbGFja0xpc3Q6IFsnLm5vcmVtJ10sIC8vXHUwMEEwXHU4RkM3XHU2RUU0XHU2Mzg5Lm5vcmVtLVx1NUYwMFx1NTkzNFx1NzY4NGNsYXNzXHVGRjBDXHU0RTBEXHU4RkRCXHU4ODRDcmVtXHU4RjZDXHU2MzYyXG4gICAgICAgICAgZXhjbHVkZTogL25vZGVfbW9kdWxlcy9pLFxuICAgICAgfSldLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDk5OTlcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1gsU0FBUyxvQkFBb0I7QUFDN1ksT0FBTyxTQUFTO0FBRWhCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sb0JBQW9CO0FBQzNCLFNBQVMsZUFBZTtBQUx4QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsSUFDQSxZQUFZLENBQUMsT0FBTyxPQUFPLFFBQVEsUUFBUSxTQUFTLFFBQVEsTUFBTTtBQUFBLEVBQ3BFO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUdBLFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxhQUFhO0FBQUEsUUFDckIsc0JBQXNCO0FBQUEsVUFDcEI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQU07QUFBQSxNQUNSLENBQUMsR0FBRztBQUFBLFFBRUYsZUFBZTtBQUFBLFFBQ2YsUUFBUTtBQUFBLFVBQ04sU0FBUyxDQUFDLFdBQVc7QUFDbkIsZ0JBQUksT0FBTyxTQUFTLFdBQVc7QUFDN0IscUJBQU8sT0FBTztBQUFBLFlBQ2hCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLEdBQUcsZUFBZTtBQUFBLFFBQ2QsV0FBVztBQUFBLFFBQ1gsVUFBVSxDQUFDLEdBQUc7QUFBQSxRQUNkLG1CQUFtQixDQUFDLFFBQVE7QUFBQSxRQUM1QixTQUFTO0FBQUEsTUFDYixDQUFDLENBQUM7QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=