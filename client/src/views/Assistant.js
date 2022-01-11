import React from 'react'
import { AssistantContext } from '../Contexts/AssistantContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import { useContext, useEffect, useState} from 'react'
import NavBar from '../components/layout/NavBar'

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
                <br/>
                <div className="container mt-5">
                    <div className="searchArea shadow-sm p-3 mb-5 rounded mt-3">
                        <InputGroup>
                            <Form.Control type="text" placeholder="Which city would you like to search for its weather" onChange={onChangeSearchBar}/>
                            <Button onClick={onSearch.bind(this, city)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            </Button>
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
                            <br/>
                        </div>
                    </div>
                </div>
                <br/>
            </div>)}


    return (
        <div>
            <NavBar></NavBar>
            {body}
        </div>
    )
}

export default Assistant
