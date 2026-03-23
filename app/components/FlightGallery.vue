<template>
  <div class="app-layout">
    <TimeSlider 
    v-model="currentStep" 
    :orientation="isVertical ? 'vertical' : 'horizontal'"  
    @user-update="isUserScrolling=true" 
    />
    <UScrollArea
    :items="flights" 
    :orientation="isVertical ? 'vertical' : 'horizontal'"  
    :virtualize="{
        gap: 16,
        lanes: 2, // Changed to 1 lane for a cleaner horizontal flight strip
        estimateSize: 640
    }"
    class="q-full h-150 p-4 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    ref="scrollArea" 
    @scroll="onScroll"
    
    >
    <template #default="{ item }">
        <FlightCard 
        v-bind="item" 
        :class="isVertical ? 'w-full mb-4' : 'w-[240px] snap-start'"
        />
    </template>
    </UScrollArea>
  </div>
</template>

<script lang="ts" setup>
import { watch, useTemplateRef, nextTick} from 'vue'
import flightData from '@/assets/json/example_flights.json'
import airportData from '@/assets/json/example_airports.json'
const isUserScrolling = ref(false)
const isVertical = ref(false)
const currentStep = ref(0) // Shared state (0 to 335)
const scrollArea = useTemplateRef('scrollArea')
const isProgrammaticScroll = ref(false);
let scrollTimeout = null;
const checkOrientation = () => {
  // Checks if height is greater than width
  isVertical.value = window.matchMedia("(orientation: portrait)").matches

}

onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
})

const airports = ref(airportData)
const flights = computed(() => {
  return flightData.map(flight => {
    // Look up the extra info using the airportCode from the JSON
    const details = airports.value[flight.airportCode] || {
      destination: "Unknown",
      country: "Unknown",
      tagline: "Adventure awaits!",
      imageUrl: "/placeholder-flight.jpg" // Fallback image
    }
    return {
      ...flight,   // Existing data: airportCode, departureTime, etc.
      ...details   // Injected data: destination, country, imageUrl, etc.
    }
  })
})

watch(currentStep, async (newStep) => {
  if (!isUserScrolling.value) return
  const targetIndex = flights.value.findIndex(f => f.flight_step >= newStep)
  if (targetIndex === -1) return

  await nextTick()
  isProgrammaticScroll.value = true
  isUserScrolling.value = false
  scrollArea.value?.virtualizer?.scrollToIndex(targetIndex, { align: 'start', behavior: 'smooth' })
  scrollTimeout = setTimeout(() => {
      isProgrammaticScroll.value = false;
    }, 600);
})

const onScroll = () => {
  if(isProgrammaticScroll.value){
    isProgrammaticScroll.value = false
    return
  }
  // Get the list of currently visible items in the virtual DOM
  const virtualItems = scrollArea.value?.virtualizer?.getVirtualItems()
  const virtualizer = scrollArea.value?.virtualizer;
  if (!virtualizer) return;
  const scrollOffset = virtualizer.scrollOffset;
  if (virtualItems && virtualItems.length > 0) {
    // Look at the very first item currently visible on the screen
   const trulyVisibleItem = virtualItems.find(item => {
      return item.start >= scrollOffset || (item.start + item.size) > scrollOffset;
    });

    if (trulyVisibleItem) {
      const maxIndex = flights.value.length - 1;
      const targetIndex = Math.min(trulyVisibleItem.index + 1, maxIndex);
      const visibleFlight = flights.value[targetIndex];
      if (visibleFlight && currentStep.value !== visibleFlight.flight_step) {
        currentStep.value = visibleFlight.flight_step;
      }
    }
  }
}
</script>

<style>
.app-layout {
  background: transparent;
  min-height: 100vh;
  padding: 50px;
}
</style>