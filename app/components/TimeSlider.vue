<template>
  <div v-if="orientation !== 'vertical'"  class="time-slider-container">
    <div class="day-selector-relative">
      <div class="day-buttons">
        <button 
          v-for="(day, index) in days" 
          :key="day" 
          ref="dayRefs"
          @click="selectDay(index)"
          :class="['day-btn', { 'is-active': index === currentDayIndex }]"
        >
          {{ day }}
        </button>
      </div>
      
      <div class="active-glider" :style="gliderStyle">
<p class="absolute  whitespace-nowrap text-[10px] font-medium">{{ currentTime }}</p>
      </div>
    </div>

    <div class="slider-track-wrapper" ref="sliderTrack" @mousedown="startDrag">
      <div class="track-line"></div>
      
      <div 
        class="custom-thumb" 
        :class="{ 'is-animating': !isDragging }"
        :style="{ left: `${progress}%` }"
      >
        <div class="red-rect"></div>
        <div class="time-label">{{ currentTime }}</div>
      </div>
    </div>
  </div>
  <div v-else>
    <select 
              :value="currentDayIndex" 
              @change="e => selectDay(parseInt(e.target.value))"
              class="day-select"
            >
              <option v-for="(day, index) in days" :key="day" :value="index">
                {{ day }}
              </option>
            </select>
      </div>
</template>

<script setup>
import { computed, ref, onUnmounted, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  orientation: { type: String, default: 'horizontal' }
})
const emit = defineEmits(['update:modelValue','user-update'])

const days = [$t('Monday'), $t('Tuesday'), $t('Wednesday'), $t('Thursday'), $t('Friday'), $t('Saturday'), $t('Sunday')]
const sliderTrack = ref(null)
const dayRefs = ref([])
const isDragging = ref(false)

const currentDayIndex = computed(() => Math.floor(props.modelValue / 48))
const progress = computed(() => (props.modelValue / 335) * 100)

// --- Glider Animation Logic ---
const gliderStyle = ref({ width: '0px', left: '0px', opacity: 0 })

const updateGlider = () => {
  const activeEl = dayRefs.value[currentDayIndex.value]
  if (activeEl) {
    gliderStyle.value = {
      width: `${activeEl.offsetWidth * 0.8}px`,
      left: `${activeEl.offsetLeft + (activeEl.offsetWidth * 0.1)}px`,
      opacity: 1
    }
  }
}

watch(currentDayIndex, () => {
  nextTick(updateGlider)
})

onMounted(() => {
  updateGlider()
  window.addEventListener('resize', updateGlider)
})

const currentTime = computed(() => {
  const timeSlot = props.modelValue % 48
  const h = Math.floor(timeSlot / 2)
  const m = timeSlot % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})

const selectDay = (index) => {
  emit("user-update")
  emit('update:modelValue', index * 48)
}

const updateValue = (e) => {
  emit("user-update")
  if (!sliderTrack.value) return
  const rect = sliderTrack.value.getBoundingClientRect()
  let pos = (e.clientX - rect.left) / rect.width
  pos = Math.max(0, Math.min(1, pos))
  emit('update:modelValue', Math.round(pos * 335))
}

const startDrag = (e) => {
  isDragging.value = true
  updateValue(e)
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}
const onDrag = (e) => isDragging.value && updateValue(e)
const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

onUnmounted(() => {
  window.removeEventListener('resize', updateGlider)
  stopDrag()
})
</script>
<style scoped>
/* 1. Define Base Variables (Light Mode Default) */
.time-slider-container { 
  --text-muted: #888888;       /* Default resting day color */
  --text-active: #111111;      /* Active day / Hover color */
  --track-bg: #e0e0e0;         /* Light gray track line */
  --label-text: #333333;       /* Time label color */
  --glider-glow: rgba(255, 59, 48, 0.3); /* Softer shadow for light mode */
  
  width: 100%; 
  padding: 20px; 
  user-select: none; 
}

/* 2. Define Dark Mode Overrides */
@media (prefers-color-scheme: dark) {
  .time-slider-container {
    --text-muted: #888888;     /* Can keep the same or tweak to #9ca3af */
    --text-active: #fff;    /* White for dark mode */
    --track-bg: #333333;       /* Dark gray track line */
    --label-text: #115;     /* White time label */
    --glider-glow: rgba(255, 59, 48, 0.4); /* Slightly stronger shadow */
  }
}

/* If your app uses a manual toggle (like a `.dark` class on the <body> or <html>), 
   you can uncomment and use this block instead of the media query above:

   :global(.dark) .time-slider-container {
    --text-muted: #888888;
    --text-active: #ffffff;
    --track-bg: #333333;
    --label-text: #ffffff;
    --glider-glow: rgba(255, 59, 48, 0.4);
} 
*/

.day-selector-relative {
  position: relative;
  margin-bottom: 30px;
}

.day-buttons { 
  display: flex; 
  justify-content: space-between; 
}

.day-btn { 
  background: none; 
  border: none; 
  color: var(--text-muted); 
  cursor: pointer; 
  font-size: 14px;
  padding: 10px 0;
  transition: color 0.6s ease;
  position: relative;
  z-index: 2;
}

.day-btn:hover { 
  color: var(--text-active); 
}

.day-btn.is-active { 
  color: var(--text-active) !important; 
  font-weight: 500; 
}

/* The Gliding Animation Element */
.active-glider {
  position: absolute;
  bottom: 0;
  height: 5px;
  background: linear-gradient(90deg, transparent, #ff3b30aa, transparent);
  box-shadow: 0 4px 12px var(--glider-glow);
  border-radius: 10px;
  /* Pleasant, slow resting transition */
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active-glider p {
  position: absolute;
  margin: 0;
  font-size: 9px;
  font-weight: bold;
  color: white; /* Contrast against the red/glow */
  text-shadow: 0 0 4px rgba(0,0,0,0.5);
  white-space: nowrap;
}

.slider-track-wrapper { 
  position: relative; 
  height: 40px; 
  cursor: pointer; 
}

.track-line { 
  position: relative; 
  top: -40%; 
  width: 100%; 
  height: 4px; 
  background: var(--track-bg); 
  transition: background 0.3s ease; /* Smooth fade when switching themes */
}

.custom-thumb {
  position: absolute;
  top: -60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
  width: 40px;        /* Large horizontal hit area */
  height: 60px;       /* Large vertical hit area */
  margin-left: -20px; /* Center the 40px width over the point */
  background: transparent; /* Invisible but clickable */
  z-index: 10;
  touch-action: none;
}
.custom-thumb:active {
  cursor: grabbing;
}

/* Animate the thumb when it jumps (selectDay), but not when dragging */
.custom-thumb.is-animating {
  transition: left 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.red-rect {
  width: 4px;
  height: 20px;
  background: #ff3b30;
  border-radius: 2px;
}
.custom-thumb:hover .red-rect {
  transform: scaleY(1.2);
  box-shadow: 0 0 8px rgba(255, 59, 48, 0.6);
}
/* Unified Time Label */
.time-label {
  margin-top: 8px;
  font-size: 12px;
  color: var(--label-text);
  white-space: nowrap;
  transition: color 0.3s ease; /* Smooth fade when switching themes */
}
</style>