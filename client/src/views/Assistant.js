import React from 'react'
import { AssistantContext } from '../Contexts/AssistantContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useContext, useEffect } from 'react'

const Assistant = () => {
    const {weatherState: {weatherLoading, weatherData}, getWeatherData}= useContext(AssistantContext)
    useEffect(() => getWeatherData(),[])
    let body = null
    if (weatherLoading){
        body=(<div className='d-flex justify-content-center mt-2'>
			<Spinner animation='border' variant='info' />
		</div>)
    }
    else {
        console.log(weatherData)
        body=(
            <>
            <br/>
            <div className= "row mx-auto mt-5 NoteCollections-container">
            {weatherData.map(data=>(
                <div key={data.id}>
                {data.main}
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
