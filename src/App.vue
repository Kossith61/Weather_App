  <script setup>
    import axios from 'axios'
    import {ref} from 'vue';

    
  
    

    const city = ref("city");
    const error =ref("");
    const info = ref("");
  
    

    function getWeather() {
      if(city.value.trim().length<2){
        error.value ="City name should be more than one symbol";
        return false;
      }

      error.value ="";

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=52b7acdfa9291e3dafc2aee5575e1680`)
          .then(result=>{
            info.value= result.data;
            })
          .catch(err => {
          error.value = "Failed to fetch weather data";
        });
    }


   function saveFavouriteCity() {
    if (info.value) {
      localStorage.setItem('favouriteCityName', city.value);
      localStorage.setItem('favouriteCityTemp', info.value.main.temp);
      localStorage.setItem('favouriteCityFeelsLike', info.value.main.feels_like);
      localStorage.setItem('favouriteCityHumidity', info.value.main.humidity);
      localStorage.setItem('favouriteCityWindSpeed', info.value.wind.speed);
      alert('Favourite city saved!');
    } else {
      alert('No weather data to save');
    }
}



  </script>

<style scoped>
  .wrapper{
  width:  360px;
  height: 800px;
  border-radius: 50px;
  background: #FFF8DC;
  padding: 20px;
  text-align: center;
  color: black;
  }

  .wrapper h1{
    font-size: 24px;
    margin-top: 80px;
    
  }

  .wrapper h2{
    margin-top:50px;

  }

  .wrapper input{
    margin-top: 30px;
    background: wheat;  
    border-bottom: 2px sold #110813;  
    font-size: 14px;
    padding: 5px 8px;
    outline:none;}

  .wrapper button{
  background: #e3bc4b;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #b99935;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
}

  .information{
    margin-top:50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 30px;   
  }

  .information .info__item{
    margin-top: 15px;
  }

  .nav {
  background-color: #e3bc4b; 
  display: flex; 
  justify-content: space-around; 
  padding: 1rem; 
  border-radius: 8px; 
  margin-top: 20px;
}

.nav-link {
  color: white; 
  text-decoration: none; 
  font-size: 1.2rem; 
  font-weight: bold; 
  padding: 0.5rem 1rem; 
  transition: background-color 0.3s, color 0.3s; 
}

.nav-link:hover {
  background-color: #b99935; 
  color: #ffffff; 
  border-radius: 4px; 
}

.button_style{
  margin-top: 15px;
}

  
</style>

<template>
    <div class="wrapper">
      <h1>MY WEATHER APP</h1>
      <h2>Weather in {{city}}</h2>
      <input type="text" name="" id="" v-model="city" placeholder="Enter your city">
      <button class="button_style" @click="getWeather()">Submit</button>
      <button  class="button_style" @click="saveFavouriteCity()">Save as Favourite</button>
      <p>{{error}}</p>


    <div v-if="info" class="information">
      <p class="info__item"><b>Temperature:</b> {{ info.main.temp }} °C</p>
      <p class="info__item"><b>Feels like:</b> {{info.main.feels_like}}</p>
      <p class="info__item"><b>Humidity:</b> {{ info.main.humidity }}%</p>
      <p class="info__item"><b>Wind speed:</b> {{ info.wind.speed }} m/s</p>
    </div>
     

    <nav class="nav">
      <RouterLink to="/week" class="nav-link">Weekly Forecast</RouterLink>
      <RouterLink to="/favcity" class="nav-link">Favourite City</RouterLink>
    </nav>
    <div>
      <RouterView
       :city="city" 
       />
    </div>
  </div>


</template>


