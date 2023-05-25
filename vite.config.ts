import { defineConfig, loadEnv } from "vite";
import dayjs from "dayjs";
import { resolve } from "path";
import pkg from "./package.json";
import { warpperEnv } from "./build";
import { getPluginsList } from "./build/plugins";
import { include, exclude } from "./build/optimize";
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd();
/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build"),
  "@assets": pathResolve("src/assets"),
  "@components": pathResolve("src/components"),
  "@utils": pathResolve("src/utils"),
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYYMMDDHHmmss"),
};
// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const envConfig = loadEnv(mode, "./");
  const envConfig = loadEnv(mode, root);
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } = warpperEnv(loadEnv(mode, root));
  return defineConfig({
    base: VITE_PUBLIC_PATH,
    // plugins: [
    //   vue(),
    //   svgBuilder("./src/icons/svg/"), // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
    //   viteBuildInfo(),
    //   envConfig.VITE_CDN == 'true' ? cdn : null,
    //    // 打包分析
    //   lifecycle === "report"
    //     ? visualizer({ open: true, brotliSize: true, filename: "report.html" }) as unknown as PluginOption
    //     : null
    //   // AutoImport({
    //   //   resolvers: [ElementPlusResolver()],
    //   // }),
    //   // Components({
    //   //   resolvers: [ElementPlusResolver()],
    //   //   dts: true,
    //   //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    //   // })
    // ],
    resolve: {
      // 导入时忽略的拓展名列表
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".scss",
        ".css",
      ],
      alias,
    },
    plugins: getPluginsList(command, VITE_CDN, VITE_COMPRESSION),
    // 服务端渲染
    server: {
      host: '0.0.0.0',
      // 端口号
      port: VITE_PORT,
      // 是否自动在浏览器打开
      open: false,
      // 是否开启 https
      https: false,
      proxy: {
        "/api": {
          target: envConfig.VITE_API_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      devSourcemap: false,
      preprocessorOptions: {
        // 全局引入scss
        scss: {
          additionalData: '@use "./src/styles/variables.module.scss" as *;',
          javascriptEnabled: true
        },
      }
    },
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      //预构建
      include,
      exclude
    },
    build: {
      minify: "terser",
      outDir: envConfig.VITE_OUTPUT_DIR || "dist",
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 分包
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          assetFileNames: `css/[name].[hash].${version}.${__APP_INFO__.lastBuildTime}.css`,
          chunkFileNames: `js/[name].[hash].${version}.${__APP_INFO__.lastBuildTime}.js`,
          entryFileNames: `js/[name].[hash].${version}.${__APP_INFO__.lastBuildTime}.js`,
        },
      },
      terserOptions: {
        compress: {
          //生产环境时移除console debugger
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  });
};
