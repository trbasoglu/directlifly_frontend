<template>
  <div class="flex flex-col min-h-screen">
    <Navbar @open-info="isModalOpen = false" />

    <main class="flex-grow w-full p-0 m-0 overflow-x-hidden">
  <slot />
    </main>

    <Footer />

    <!-- <UModal v-model="isModalOpen">
      <UCard>
        <div class="p-4 text-center text-gray-600 dark:text-gray-300">
          Platform hakkında detaylı bilgi burada yer alacak.
        </div>
      </UCard>
    </UModal> -->
  </div>
</template>

<script setup>
const isModalOpen = ref(false)
</script>