declare global {
  interface ImportMetaEnv extends ViteEnv {}

  type Nullable<T> = T | null

  interface ViteEnv {
    VITE_PUBLIC_PATH: string
    VITE_APP_NAME: string
    VITE_APP_BASE_URL: string
    VITE_API_BASE_URL: string
    VITE_STORAGE_PREFIX: string
  }
}

export {}
