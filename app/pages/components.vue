<template>
  <div>
    <h1>Project Components</h1>
    <section class="h-auto md:h-[1200px] w-full border border-gray-700">
        <div class="grid 
            /* Vertical (Mobile/Portrait) Settings */
            grid-cols-2 gap-4 overflow-y-auto h-auto 
            
            /* Horizontal (Desktop/Landscape) Settings */
            md:grid-flow-col md:grid-rows-2 md:gap-6 md:overflow-x-auto md:h-1/2 
            
            p-4 snap-x items-start content-start"
        >
            <FlightCard 
            v-for="flight in flights" 
            :key="flight.id" 
            v-bind="flight" 
            class="w-full md:w-[240px] snap-start" 
            />
        </div>
    </section>
    </div>
</template>


<script setup lang="ts">
const flights = [
  {
    id: 1,
    destination: "Prague",
    country: "Czechia",
    airportCode: "PRG",
    departureTime: "10:45",
    flightDuration: "2:15",
    weeklyFlights: 4,
    suggestedDays: "3-4",
    imageUrl: "https://images.pexels.com/photos/7909043/pexels-photo-7909043.jpeg",
    imageAttribution: "Nur Kosif",
    attributionUrl: "https://www.pexels.com/photo/brown-concrete-clock-tower-with-spires-in-praque-czechia-7909043/",
    tagline: "Best for Romantic Weekends 💖"
  },
  {
    id: 2,
    destination: "Barcelona",
    country: "Spain",
    airportCode: "BCN",
    departureTime: "08:20",
    flightDuration: "3:40",
    weeklyFlights: 7,
    suggestedDays: "4-5",
    imageUrl: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
    imageAttribution: "Aleksandar Pasaric",
    attributionUrl: "https://www.pexels.com/photo/aerial-photography-of-city-1388030/",
    tagline: "Sun, Architecture, and Tapas 🥘"
  },
  {
    id: 3,
    destination: "Lisbon",
    country: "Portugal",
    airportCode: "LIS",
    departureTime: "14:15",
    flightDuration: "4:10",
    weeklyFlights: 3,
    suggestedDays: "3-5",
    imageUrl: "https://images.pexels.com/photos/31630079/pexels-photo-31630079.jpeg",
    imageAttribution: "Riccardo Toso",
    attributionUrl: "https://www.pexels.com/photo/iconic-yellow-tram-in-lisbon-s-historic-streets-31630079/",
    tagline: "Explore the Seven Hills 🚋"
  },
  {
    id: 4,
    destination: "Amsterdam",
    country: "Netherlands",
    airportCode: "AMS",
    departureTime: "11:30",
    flightDuration: "3:25",
    weeklyFlights: 12,
    suggestedDays: "2-3",
    imageUrl: "https://images.pexels.com/photos/17080606/pexels-photo-17080606.jpeg",
    imageAttribution: "Mattia Sacco",
    attributionUrl: "https://www.pexels.com/photo/canal-in-amsterdam-17080606/",
    tagline: "Canals and Cozy Cafes 🌷"
  },
  {
    id: 5,
    destination: "Athens",
    country: "Greece",
    airportCode: "ATH",
    departureTime: "09:00",
    flightDuration: "1:20",
    weeklyFlights: 5,
    suggestedDays: "3-4",
    imageUrl: "https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg",
    imageAttribution: "Pixabay",
    attributionUrl: "https://www.pexels.com/photo/low-angle-photograph-of-the-parthenon-during-daytime-164336/",
    tagline: "History at every corner 🏛️"
  },
  {
    id: 6,
    destination: "Berlin",
    country: "Germany",
    airportCode: "BER",
    departureTime: "21:50",
    flightDuration: "3:05",
    weeklyFlights: 6,
    suggestedDays: "4",
    imageUrl: "https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg",
    imageAttribution: "Stefan Widua",
    attributionUrl: "https://www.pexels.com/photo/concrete-structure-2570063/",
    tagline: "The heartbeat of Europe 🎶"
  }
];
</script>