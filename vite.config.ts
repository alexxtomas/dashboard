// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@router': path.resolve(__dirname, './src/router'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@views': path.resolve(__dirname, './src/views'),
      '@validations': path.resolve(__dirname, './src/validations'),
      '@store': path.resolve(__dirname, './src/store')
    }
  }
})
