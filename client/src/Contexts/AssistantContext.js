import {createContext, useReducer} from 'react'
import AssistantReducer from '../reducers/AssistantReducer'
import {LOCAL_STORAGE_TOKEN_NAME} from './constants'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'

export const AssistantContext = createContext()

const AssistantContextProvider = ({children})=>{
    //state
    const [weatherState, dispatch] = useReducer(AssistantReducer, {
        weatherLoading: true,
        weatherData: [],
        weatherIcon: ''
    })

    const chooseWeather = (weatherData) => {
        let weatherIcon = ''
        let main_weather = ''
        console.log(weatherData)
        if (weatherData.weather !== undefined)
            main_weather = weatherData.weather[0].main
        switch(main_weather){
            case 'Clear':
                weatherIcon = 'wi-night-clear'
                break
            case 'Clouds':
                weatherIcon = 'wi-cloudy'
                break
            case 'Thunderstorm':
                weatherIcon = 'wi-thunderstorm'
                break
            case 'Drizzle':
                weatherIcon = 'wi-showers'
                break
            case 'Rain':
                weatherIcon = 'wi-rain'
                break
            case 'Snow':
                weatherIcon = 'wi-snowflake-cold'
                break
            case 'Mist':
                weatherIcon = 'wi-fog'
                break
            case 'Fog':
                weatherIcon = 'wi-fog'
                break
            case 'Dust':
                weatherIcon = 'wi-dust'
                break
            default: weatherIcon = ''
        }
        return weatherIcon
    }

    const getWeatherData = async(city) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
           setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get('https://serene-coast-39786.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=f154a0aeffa7fdc817bcf2dac6c1e6af&units=metric', {
                headers: { 'Content-Type': 'application/json'}
            })
            console.log(response.data)
            let weatherIcon = chooseWeather(response.data)
            dispatch({type: 'WEATHER_DATA_LOADED_SUCCESS', payload: [response.data, weatherIcon]})

        } catch (error) {
            dispatch({type:'WEATHER_DATA_LOADED_FAIL'})
        }
    }

    //context data
    const assistantContextData = {getWeatherData, weatherState}

    //return provider
    return (
        <AssistantContext.Provider value={assistantContextData}>
            {children}
        </AssistantContext.Provider>
    )
}

export default AssistantContextProvider
