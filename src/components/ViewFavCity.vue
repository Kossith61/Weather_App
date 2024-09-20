<script setup>
import { ref, onMounted } from 'vue';

const favouriteCityName = ref(null);
const favouriteCityTemp = ref(null);
const favouriteCityFeelsLike = ref(null);
const favouriteCityHumidity = ref(null);
const favouriteCityWindSpeed = ref(null);

onMounted(() => {
  favouriteCityName.value = localStorage.getItem('favouriteCityName');
  favouriteCityTemp.value = localStorage.getItem('favouriteCityTemp');
  favouriteCityFeelsLike.value = localStorage.getItem('favouriteCityFeelsLike');
  favouriteCityHumidity.value = localStorage.getItem('favouriteCityHumidity');
  favouriteCityWindSpeed.value = localStorage.getItem('favouriteCityWindSpeed');
});
</script>

<template>
  <div class="favourite-city">
    <h1>Favourite City Weather</h1>
    <div v-if="favouriteCityName">
      <h2>{{ favouriteCityName }}</h2>
      <p><b>Temperature:</b> {{ favouriteCityTemp }} °C</p>
      <p><b>Feels like:</b> {{ favouriteCityFeelsLike }}</p>
      <p><b>Humidity:</b> {{ favouriteCityHumidity }}%</p>
      <p><b>Wind speed:</b> {{ favouriteCityWindSpeed }} m/s</p>
    </div>
    <div v-else>
      <p>No favourite city saved.</p>
    </div>
  </div>
</template>

<style scoped>
  /* Your styles here */
</style>
