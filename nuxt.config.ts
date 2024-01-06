// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@nuxtjs/color-mode"],
  supabase: {
    redirect: true,
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    },
  },
});
