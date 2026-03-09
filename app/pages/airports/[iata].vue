<template>

    <h1>{{iata}}</h1>
</template>
<script lang="ts" setup>
const iata = useRoute().params.iata;
</script>