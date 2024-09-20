<template>
  <div>
    <h1>Weekly Forecast for {{ city }}</h1>
    <ul v-if="weeklyForecast">
      <li v-for="day in dailyTemperatures" :key="day.date">
        <b>{{ day.date }}</b>: {{ day.temp }}°C
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const props = defineProps({
  city: {
    type: String,
    required: true
  }
})

const weeklyForecast = ref(null)
const dailyTemperatures = ref([])

const fetchWeeklyForecast = async () => {
  try {

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&units=metric&appid=52b7acdfa9291e3dafc2aee5575e1680`)
    weeklyForecast.value = response.data


    processForecastData(response.data)
  } catch (error) {

    console.error('Error fetching the weather data:', error)
  }
}

const processForecastData = (data) => {

  const dailyData = {}


  data.list.forEach(item => {

    const date = item.dt_txt.split(' ')[0]


    if (!dailyData[date]) {
      dailyData[date] = []
    }

    dailyData[date].push(item.main.temp)
  })


  dailyTemperatures.value = Object.keys(dailyData).map(date => {
    const temps = dailyData[date]
    const averageTemp = (temps.reduce((sum, temp) => sum + temp, 0) / temps.length).toFixed(2)
    return {
      date,
      temp: averageTemp
    }
  })
}

onMounted(fetchWeeklyForecast)

</script>

<style scoped>
    h1{
        margin-top: 20px;
        margin-bottom: 20px;
    }


</style>