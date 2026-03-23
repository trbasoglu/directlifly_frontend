<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/20 dark:bg-black/20"
    :style="{ 
      '--glass-opacity': glassOpacity,
      '--header-opacity': headerOpacity 
    }"
  >
    <div class="w-full max-w-7xl h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border backdrop-blur-2xl
                bg-white/[var(--glass-opacity)] border-white/20 
                dark:bg-black/[var(--glass-opacity)] dark:border-white/10 text-gray-900 dark:text-white  bg-white/40 dark:bg-black/40">
      
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200/20 dark:border-white/10">
        <h2 class="text-2xl font-light">{{$t('flight_calendar') }}</h2>
        <div class="lg:hidden mt-2">
            <select 
              v-model="selectedDay" 
              class="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm focus:outline-none backdrop-blur-md"
            >
              <option v-for="day in days" :key="day" :value="day" class="bg-gray-900">{{ $t(day) }}</option>
            </select>
          </div>
        <button @click="$emit('close')" class="p-2 hover:bg-white/10 rounded-full">✕</button>
      </div>
      
        <table class="w-full border-collapse ">
          <thead>
            <tr>
              <th class="w-24 sticky left-0 z-30 py-4 px-2 text-center border-r border-b border-gray-200/20 dark:border-white/10 backdrop-blur-xl
                         bg-white/[var(--header-opacity)] dark:bg-black/[var(--header-opacity)] font-medium">{{$t('time') }}</th>
              
              <th v-for="day in filteredDays" :key="day"
                  class=" sticky top-0 z-30 px-4 py-5 border-b border-gray-200/20 dark:border-white/10 backdrop-blur-xl
                         bg-white/[var(--header-opacity)] dark:bg-black/[var(--header-opacity)] font-semibold ">
                {{ $t(day) }}
              </th>
            </tr>
          </thead>
        </table>
      <div class="flex-1 overflow-auto custom-scrollbar">
        <table class="w-full border-collapse">
          <tbody>
            <tr v-for="time in timeSlots" :key="time">
              <td class="w-24 sticky left-0 z-30 py-4 px-2 text-center border-r border-b border-gray-200/20 dark:border-white/10 backdrop-blur-xl
                         bg-white/[var(--header-opacity)] dark:bg-black/[var(--header-opacity)] font-medium">
                {{ time }}
              </td>
              
              <td v-for="day in filteredDays" :key="day+time"
                  class="border-b border-gray-200/10 dark:border-white/5 p-4 text-center">
                <div v-if="hasSchedule(day, time)" class="text-xs font-medium">
                   <div v-for="city in getSchedule(day, time)" :key="city" class="block">
                    {{ city }}
                    </div>
                </div>
                <div v-else class="opacity-10">-</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  scheduleData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const selectedDay = ref('')
const prevDay = ref('')
const nextDay = ref('')


const isMobile = ref(false)

const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 1024
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  
  if (days?.length) {
    selectedDay.value = days[4]
    prevDay.value = days[3]
    nextDay.value = days[5]
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const filteredDays = computed(() => {
  if (isMobile.value && selectedDay.value) {
    const dayIndex = days.indexOf(selectedDay.value)

    prevDay.value = days[dayIndex===0?6:dayIndex-1]
    nextDay.value = days[dayIndex===6?0:dayIndex+1]
    return [prevDay.value, selectedDay.value, nextDay.value]
  }
  return days
})

const timeSlots = computed(() => {
  const slots = []
  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, '0')
    slots.push(`${hour}:00`)
    slots.push(`${hour}:30`)
  }
  return slots
})

const scheduleMap = computed(() => {
  const map = {}
  days.forEach(day => { map[day] = {} })
  
  props.scheduleData.forEach(item => {
    if (!map[item.day]) return
    if (!map[item.day][item.time]) {
      map[item.day][item.time] = []
    }
    map[item.day][item.time].push(item.location)
  })
  return map
})

const hasSchedule = (day, time) => {
  return scheduleMap.value[day][time] && scheduleMap.value[day][time].length > 0
}

const getSchedule = (day, time) => {
  return scheduleMap.value[day][time] || []
}

const glassOpacity = 0.7;
const headerOpacity = computed(() => Math.min(glassOpacity + 0.6, 0.95))
</script>

<style scoped>
/* Scrollbar that adapts slightly to light/dark themes */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5); /* Tailwind gray-400 */
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.8); /* Tailwind gray-500 */
}
table{
    table-layout:auto
}
</style>