<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
    <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
        <NuxtLink to='/' class="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <img 
            src="~/assets/img/logo-light.webp" 
            alt="Directly Logo" 
            class="block dark:hidden"
          >
          
          <img 
            src="~/assets/img/logo-dark.webp" 
            alt="Directly Logo" 
            class="hidden dark:block"
          >
        </NuxtLink>
    


      <div class="flex items-center gap-2">
        <UDropdownMenu :items="languageItems" :popper="{ placement: 'bottom-end' }">
          <UButton
            color="gray"
            variant="ghost"
            class="text-lg"
            :label="currentEmoji"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdownMenu>
      <UButton
        color="gray"
        variant="ghost"
        aria-label="Theme Toggle"
        @click="isDark = !isDark"
      >
        <UIcon 
          name="i-heroicons-sun-20-solid" 
          class="w-5 h-5 dark:hidden" 
        />
        
        <UIcon 
          name="i-heroicons-moon-20-solid" 
          class="hidden dark:block w-5 h-5" 
        />
      </UButton>
        <UButton
          icon="i-heroicons-question-mark-circle"
          size="lg"
          color="gray"
          variant="ghost"
          class="rounded-full"
          @click="$emit('open-info')"
        />
        <div v-if="user" class="flex items-center gap-4">
          <NuxtLink to="/panel" class="text-sm font-medium">Panel</NuxtLink>
          <UButton color="red" variant="ghost" size="xs" @click="logout">Çıkış</UButton>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()

const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
const logoSrc = computed(() => {
  return colorMode.value === 'dark' 
    ? '/_nuxt/assets/img/logo-dark.webp' 
    : '/_nuxt/assets/img/logo-light.webp'
})

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}

const currentEmoji = computed(() => {
  const map = { tr: '🇹🇷', en: '🇺🇸', es: '🇪🇸' }
  return map[locale.value] || '🌐'
})

const languageItems = computed(() => [
  locales.value.map((l) => ({
    label: (l.code === 'tr' ? '🇹🇷 ' : l.code === 'es' ? '🇪🇸 ' : '🇺🇸 ' )+l.name,
    
    onSelect: () => {
      setLocale(l.code) 
    }
  }))
])




const user = useSupabaseUser()
const supabase = useSupabaseClient()
</script>