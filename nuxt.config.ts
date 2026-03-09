// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', "@nuxtjs/i18n",'@nuxtjs/supabase'],
  colorMode: {
    preference: 'system', // 'system', 'light' veya 'dark'
    fallback: 'dark',    // Sistem modu bulunamazsa ne olsun?
    classSuffix: ''       // Nuxt UI v3 için genellikle boş bırakılır
  },
  i18n: {
    locales: [
      { code: 'tr', name: 'Türkçe', iso: 'tr-TR', file: 'tr.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'es', name: 'Español', iso: 'es-ES', file: 'es.json' }
    ],
    strategy: 'no_prefix', // Dili URL'e ekler: /es/about gibi
    detectBrowserLanguage: {
  // 1. Kullanıcının seçimini bir çerezde sakla
    useCookie: true,
    cookieKey: 'i18n_redirected',
    // 2. Sadece kök dizinde değil, her yerde kontrol et
    redirectOn: 'all',
    // 3. Kullanıcı manuel seçim yaptıysa tarayıcı dilini her seferinde zorlama
    alwaysRedirect: false,
    // 4. Çerezi uzun süreli tut (opsiyonel)
    cookieCrossOrigin: false,
    cookieSecure: false // Yerel geliştirmede false, production'da true olmalı
    },
    defaultLocale: 'en',
    langDir: 'locales/',
  },
   css: ['~/assets/css/main.css'],
  app:{
    pageTransition:{name:"page", mode:"out-in"}
  },
  supabase: {
      redirectOptions: {
      login: '/login',
      callback: '/confirm',
      // Admin dışındaki sayfaların (anasayfa gibi) herkese açık kalması için:
      include: ['/panel'], 
    }
  },

})