/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_BACK_URL: string;
}

interface ImportMeta{
    env: ImportMetaEnv
}