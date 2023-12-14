import { resolve } from 'path'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import fs from 'fs'
// @ts-ignore
import lessToJS from 'less-vars-to-js'

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './src/config/variables.less'), 'utf8'))

export default ({ mode }: { mode: string }) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd())
  return defineConfig({
    base: VITE_PUBLIC_PATH,
    root: process.cwd(),
    server: {
      host: '0.0.0.0',
      port: 6001,
      hmr: {
        port: 6001
      },
      proxy: {
      }
    },
    resolve: {
      // 别名
      alias: {
        '@': resolve(__dirname, './src'),
        '#': resolve(__dirname, './types')
      }
    },
    plugins: [
      vue(),
      WindiCSS(),
      // viteCompression(),
      AutoImport({
        imports: [
          'vue',
          {
            'vue-router': ['useRoute', 'useRouter', 'RouterLink', 'onBeforeRouteLeave', 'onBeforeRouteUpdate'],
            '@vueuse/core': ['useTitle', 'tryOnMounted'],
            axios: [['default', 'axios']]
          }
        ],
        resolvers: [
          (name: string) => {
            if (name === 'dayjs') {
              return {
                name: 'default',
                module: 'dayjs'
              }
            }
          }
        ]
      }),
      Components({
        dts: true,
        // relative paths to the directory to search for components.
        dirs: ['src/components'],
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          }),
          (name: string) => {
            if (name === 'IconFont' || name === 'icon-font') {
              return {
                importName: 'IconFont',
                path: '@/config'
              }
            }
          }
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
          modifyVars: themeVariables
        }
      }
    }
  })
}
