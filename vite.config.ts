import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { name } from "./package.json";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name,
    },
    rollupOptions: {
      external: ["vue", "vue-demi"],
      output: {
        globals: {
          vue: "Vue",
          "vue-demi": "VueDemi",
        },
      },
    },
  },
});
