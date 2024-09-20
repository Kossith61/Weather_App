// useWeather.js
import { ref } from 'vue';
import axios from 'axios';

export function useWeather() {
  const info = ref(null);
  const error = ref(null);

  async function fetchWeather(city) {
    if (city.trim().length < 2) {
      error.value = "City name should be more than one symbol";
      return false;
    }

    error.value = "";

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=52b7acdfa9291e3dafc2aee5575e1680`);
      info.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch weather data";
    }
  }

  return {
    info,
    error,
    fetchWeather,
  };
}