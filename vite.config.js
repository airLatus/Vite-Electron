import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";
import electron from "vite-plugin-electron";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const resolvePath = (dir) => join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": resolvePath("./src"),
    },
  },
  plugins: [
    vue(),
    electron({
      main: {
        entry: "electron/main/index.js",
        vite: {
          build: {
            outDir: "dist/electron/main",
          },
        },
      },
      preload: {
        input: {
          // Must be use absolute path, this is the restrict of Rollup
          index: join(__dirname, "electron/preload/index.js"),
        },
        vite: {
          build: {
            sourcemap: "inline",
            outDir: "dist/electron/preload",
          },
        },
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()], imports: ["vue"],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
