
<template>
  <div class="relative group @container overflow-hidden rounded-2xl aspect-[240/320] max-h-full snap-start">
  <img
        :src="imageUrl"
        :alt="destination"
        class="absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-in-out 
                blur-[2px] brightness-90 group-hover:blur-[0px] group-hover:brightness-100 group-hover:scale-115"
        />

    <div class="absolute inset-0 bg-linear-to-t from-black/100 from-0% via-black/60_20% via-black/20_50% to-transparent opacity-100 transition-opacity" />
    <div class="absolute top-3 right-3 flex items-center gap-2">
      <div class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/40 backdrop-blur-md text-xs text-white border border-white/10">
        <UIcon name="i-heroicons-calendar" class="w-3.5 h-3.5" />
        {{ suggestedDays }} {{$t('day') }}
      </div>
      <UPopover v-if="imageAttribution" mode="hover">
        <UIcon name="i-heroicons-information-circle" class="text-white/70 hover:text-white w-5 h-5" />
        
        <template #content>
            <div class="p-2 text-xs">
            <a 
                v-if="attributionUrl" 
                :href="attributionUrl" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="hover:underline flex items-center gap-1"
            >
                {{ imageAttribution }}
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
            </a>
            <span v-else>{{ imageAttribution }}</span>
            </div>
        </template>
        </UPopover>
    </div>

    <div class="absolute bottom-0 left-0 right-0 content-wrapper text-white">
      
      <h2 class="card-title font-bold tracking-tight">
        {{ destination }}<span v-if="country" class="font-medium text-white/70">, {{ country }}</span>
      </h2>
            <div class="info-row flex items-end justify-between w-full">
            <div class="flex items-end gap-4">
                <div class="flex items-baseline gap-1.5">
                <span class="card-time font-bold tracking-tighter leading-none">
                    {{ departureTime }}
                </span>
                </div>
                
                <div class="flex flex-col gap-0.5 flight-stats-text font-bold leading-tight pb-1">
                <div class="flex items-center gap-2">
                    <UIcon name="icon-park-outline:in-flight" class="w-4 h-4 text-white/80" />
                    <span>{{ flightDuration }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <UIcon name="icon-park-outline:take-off-one" class="w-4 h-4  text-white/80" />
                    <span>{{ weeklyFlights }} / {{$t('week')}}</span>
                </div>
                </div>
            </div>

            <div class="hidden @[180px]:flex flex items-center h-full">
                <span class="text-1xl  @md:text-2xl  font-bold tracking-widest text-white/30 uppercase [writing-mode:vertical-rl] rotate-180">
                {{ airportCode }}
                </span>
            </div>
            </div>
      <p v-if="tagline" class="hidden @[200px]:block mt-2 @md:mt-4 text-[10px] @md:text-xs font-semibold text-white/80">
        {{ tagline }}
      </p>
    </div>
  </div>
</template>
her componentde dynamic olarak hespalanması yerine props ile bir kezde geç.

<script setup lang="ts">
defineProps<{
  destination: string
  country?: string
  airportCode: string 
  departureTime: string
  flightDuration: string
  weeklyFlights: number
  suggestedDays: string
  imageUrl: string
  imageAttribution?: string
  attributionUrl?: string
  tagline?: string
}>()

</script>

<style scoped>

.card-title {
  font-size: clamp(1.25rem, 8cqw, 2.25rem);
}

.card-time {
  font-size: clamp(1.8rem, 14cqw, 4rem);
}

.flight-stats-text {
  /* Scales perfectly between 10px and 13px */
  font-size: clamp(0.425rem, 3cqw, 0.8125rem);
}
.content-wrapper {
  /* Dynamic Padding */
  padding: clamp(0.75rem, 4cqw, 1.5rem);
}

.info-row {
  /* Dynamic Margin & Gap */
  margin-top: clamp(0.5rem, 3cqw, 1rem);
  gap: clamp(0.5rem, 3cqw, 1rem);
}
</style>