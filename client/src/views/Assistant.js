import React from 'react'
import { AssistantContext } from '../Contexts/AssistantContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import { useContext, useEffect, useState} from 'react'

const Assistant = () => {
    const [city, setCity] = useState("Hanoi")
    const {weatherState: {weatherLoading, weatherData, weatherIcon}, getWeatherData}= useContext(AssistantContext)
    

    useEffect(() => {
        getWeatherData(city)
    },[])
    let body = null
    

    const onChangeSearchBar = async (event) => {
        event.preventDefault()
        setCity(event.target.value)
    }
    

    const onSearch = async(city) => {
        await getWeatherData(city)
    }


    
    if (weatherLoading){
        body=(<div className='d-flex justify-content-center mt-2'>
			<Spinner animation='border' variant='info' />
		</div>)
    }   else {
        body=(
            <div className="body">
                <div className="container">
                    <div className="searchArea shadow-sm p-3 mb-5 rounded mt-3">
                        <InputGroup>
                            <Form.Control type="text" onChange={onChangeSearchBar}/>
                            <Button onClick={onSearch.bind(this, city)}>Search</Button>
                        </InputGroup>
                    </div>
                
                    <div className="Weather-card text-center shadow-lg">
                        <div className="Modal-start-end rounded-top">
                        <h1>{weatherData.name}</h1>
                        <i className={'wi '+weatherIcon+' display-1'}></i>
                        <div className="">
                            {weatherData.weather.map(data=>(
                                <div key={data.id}>
                                <h2>Description: {data.description}</h2>
                                <br/>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className="Modal-body rounded-bottom">
                            <i className='wi wi-thermometer display-1 mt-5'></i>
                            <h1>Temperature: {weatherData.main.temp}&deg;C</h1>
                            <h2>Minimum Temperature: {weatherData.main.temp_min}&deg;C</h2>
                            <h2>Maximum Temperature: {weatherData.main.temp_max}&deg;C</h2>
                            <i className='wi wi-barometer display-1'></i>
                            <h1>Pressure: {weatherData.main.pressure} hPa</h1>
                            <i className='wi wi-humidity display-1'></i>
                            <h2 className='mb-5'>Humidity: {weatherData.main.humidity}%</h2>
                        </div>
                    </div>
                </div>
                <br/>
            </div>)}


    return (
        <div>
            {body}
        </div>
    )
}

export default Assistant
