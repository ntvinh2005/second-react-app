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
    })


    const getWeatherData = async() => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
           setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f154a0aeffa7fdc817bcf2dac6c1e6af')
            console.log(response.data)
            dispatch({type: 'WEATHER_DATA_LOADED_SUCCESS', payload: response.data.weather})
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
