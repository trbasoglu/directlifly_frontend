<style scoped>

</style>

<template>
  <UContainer mode="fluid" :ui="{  }">

    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </UContainer>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Directlifly - Hızlı Uçuş Keşif Aracı',
  ogTitle: 'Directlifly - Hızlı Uçuş Keşif Aracı',
  description: 'Dünya genelindeki doğrudan uçuşları saniyeler içinde keşfedin.',
  ogDescription: 'Dünya genelindeki doğrudan uçuşları saniyeler içinde keşfedin.',
})
</script>

<style>
.page-enter-active,
.page-leave-active{
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to{
  opacity:0;
  filter: blur(1rem)
}

</style>