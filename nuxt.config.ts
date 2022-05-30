import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/css/main.scss"],
  modules: ["@formkit/nuxt"],
  buildModules: [
    '@pinia/nuxt',
  ],
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/components.scss";',
        },
      },
    },
  },
});
