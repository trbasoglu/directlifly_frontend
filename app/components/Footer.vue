<template>
  <footer class="py-8 border-t border-gray-200 dark:border-gray-800 ">
    <div class=" w-full container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <span class="text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }}
      </span>

      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <ULink to="/about" active-class="text-primary" class="text-sm hover:text-red-500 transition-colors">{{ $t('about') }}</ULink>
        <ULink to="/blogs" active-class="text-primary" class="text-sm hover:text-primary-500 transition-colors">{{ $t('blogs') }}</ULink>
        <ULink to="/privacy" active-class="text-primary" class="text-sm hover:text-primary-500 transition-colors">{{ $t('privacy') }}</ULink>
        <ULink to="/terms" active-class="text-primary" class="text-sm hover:text-primary-500 transition-colors">{{ $t('terms') }}</ULink>
        <ULink to="/contact" active-class="text-primary" class="text-sm hover:text-primary-500 transition-colors">{{ $t('contact') }}</ULink>
      </div>
    </div>
  </footer>
</template>
<script  lang="ts" setup>
const { t } = useI18n()

// Bir fonksiyon içinde kullanımı
const showAlert = () => {
  alert(t('error_message'))
}

// Computed veya değişken içinde kullanımı
const pageTitle = computed(() => t('home_page_title'))
</script>