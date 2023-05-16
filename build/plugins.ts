import vue from '@vitejs/plugin-vue'
import { type PluginOption } from 'vite'
import { viteBuildInfo } from './info'
import svgLoader from 'vite-svg-loader'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { cdn } from './cdn'
import { viteMockServe } from 'vite-plugin-mock'
import { configCompressPlugin } from './compress'
import { visualizer } from 'rollup-plugin-visualizer'
import { svgBuilder } from '../src/plugins/svgBuilder'

export function getPluginsList(
  command: string,
  VITE_CDN: boolean,
  VITE_COMPRESSION: ViteCompression
) {
  const lifecycle = process.env.npm_lifecycle_event
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    viteBuildInfo(),
    svgBuilder('./src/icons/svg/'), // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
    // svg组件化支持
    svgLoader(),
    // mock支持
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve',
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    }),
    // 打包分析
    lifecycle === 'report'
      ? (visualizer({
          open: true,
          brotliSize: true,
          filename: 'report.html'
        }) as unknown as PluginOption)
      : null
  ]
}
