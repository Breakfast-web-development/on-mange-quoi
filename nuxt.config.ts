// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/register", "/login", "/confirm"],
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
});
