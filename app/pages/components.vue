<template>
  <div>
    <h1>Project Components</h1>
    <section class="h-auto md:h-[1200px] w-full border border-gray-700">
        <div>
        <button 
            @click="isScheduleOpen = true"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
            {{$t('flight_calendar')}}
            </button>

            <WeeklyScheduleModal 
            :is-open="isScheduleOpen" 
            :schedule-data="mockSchedule"
            @close="isScheduleOpen = false" 
            />
        </div>
        <div>
          <FlightGallery/>
        </div>
    </section>
    </div>

    
</template>


<script setup lang="ts">
import flightData from '@/assets/json/example_flights.json'
import airportData from '@/assets/json/example_airports.json'


const isScheduleOpen = ref(false)

// Mock data based on your screenshot
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const castToLowerHalfHour = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  // If minutes are 0-29, snap to 00. If 30-59, snap to 30.
  const snappedMinutes = minutes < 30 ? '00' : '30';
  const paddedHours = String(hours).padStart(2, '0');
  
  return `${paddedHours}:${snappedMinutes}`;
};

const transformSchedule = (flightData, airportData)=> {
  return flightData.map(flight => {
    // 1. Determine Day: Each day has 48 slots (24 hours * 2 slots per hour)
    const dayIndex = Math.floor(flight.flight_step / 48);
    
    return {
      day: dayNames[dayIndex] || 'Unknown',
      time: castToLowerHalfHour(flight.departureTime),
      location: (airportData[flight.airportCode]?.destination || 'Unknown') +" (" +flight.airportCode +")"
    };
  });
};

// Usage:
const mockSchedule = ref(transformSchedule(flightData, airportData));
</script>