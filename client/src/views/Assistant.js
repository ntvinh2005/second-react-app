import React from 'react'
import { AssistantContext } from '../Contexts/AssistantContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Button from 'react-bootstrap/esm/Button'
import { useContext, useEffect, useState} from 'react'

const Assistant = () => {
    const [city, setCity] = useState("Hanoi")
    const {weatherState: {weatherLoading, weatherData}, getWeatherData}= useContext(AssistantContext)
    useEffect(() => getWeatherData(city),[])
    let body = null

    const onChangeSearchBar = async (event) => {
        event.preventDefault()
        setCity(event.target.value)
        console.log(event.target.value)
    }
    

    const onSearch = async(city) => {
        await getWeatherData(city)
    }

    if (weatherLoading){
        body=(<div className='d-flex justify-content-center mt-2'>
			<Spinner animation='border' variant='info' />
		</div>)
    }

    else {
        
        body=(
            <>
            <div className="container">
            <input type="text" onChange={onChangeSearchBar}/>
            <Button onClick={onSearch.bind(this, city)}>Search</Button>
                <div className="cards">
                    <h1>{weatherData.name}</h1>
                    <h2>Coordination: Latitude: {weatherData.coord.lon}      Longitude: {weatherData.coord.lat}</h2>
                    <h5 className="py-4">
                        <i className='wi wi-day-sunny display-1'></i>
                    </h5>
                    <i className='wi wi-thermometer display-1'></i>
                    <h1>Temperature: {weatherData.main.temp}&deg;C</h1>
                    <h2>Minimum Temperature: {weatherData.main.temp_min}&deg;C</h2>
                    <h2>Maximum Temperature: {weatherData.main.temp_max}&deg;C</h2>
                    <i className='wi wi-barometer display-1'></i>
                    <h1>Pressure: {weatherData.main.pressure} hPa</h1>
                    <i className='wi wi-humidity display-1'></i>
                    <h2>Humidity: {weatherData.main.humidity}%</h2>
                </div>
            </div>
                
            <br/>
            <div className= "row mx-auto mt-5">
            
            {weatherData.weather.map(data=>(
                <div key={data.id}>
                <p>{data.main}</p>
                <p>Description: {data.description}</p>
                </div>
            ))}
            </div>
            </>)}


    return (
        <div>
            {body}
        </div>
    )
}

export default Assistant
