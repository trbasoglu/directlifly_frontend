<template>
  <div class="flex flex-col min-h-screen">
    <Navbar @open-info="isModalOpen = false" />

    <main class="flex-grow w-full p-0 m-0 overflow-x-hidden">
  <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
const isModalOpen = ref(false)
</script>