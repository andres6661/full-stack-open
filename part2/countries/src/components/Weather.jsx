import axios from "axios"
import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const Weather = ({capital, lat, lon}) =>{
    const [weather, setWeather] = useState(null)
    
    useEffect(()=> {
        weatherService.weatherInfo(lat, lon)
        .then(response => setWeather(response.data))
    },[lat, lon])
    
    return(
        <div>
            <h2>Weather in {capital}</h2>
            {weather === null ? <p>loading weather</p> : 
            <div>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={ `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
            <p>wind {weather.wind.speed} m/s</p>
            </div>
            }
        </div>
    )
}

export default Weather