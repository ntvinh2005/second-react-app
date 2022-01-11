import React from 'react'
import { NewsContext } from '../Contexts/NewsContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Form from 'react-bootstrap/esm/Form'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Button from 'react-bootstrap/esm/Button'
import { useContext, useEffect, useState} from 'react'
import NavBar from '../components/layout/NavBar'

const Assistant = () => {
    const [topic, setTopic] = useState("Covid")
    const {newsState: {newsLoading, newsData, commonNewsData}, getNewsData}= useContext(NewsContext)
    

    useEffect(() => {
        getNewsData(topic)
    },[])
    let body = null

    
    const onChangeSearchBar = async (event) => {
        event.preventDefault()
        setTopic(event.target.value)
    }
    

    const onSearch = async(topic) => {
        await getNewsData(topic)
    }

    
    if (newsLoading){
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
                            <Form.Control type="text" placeholder="What topics are you looking for?" onChange={onChangeSearchBar}/>
                            <Button onClick={onSearch.bind(this, topic)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            </Button>
                        </InputGroup>
                    </div>
                    <h1 className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-pin-angle-fill me-3" viewBox="0 0 16 16">
                            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                        </svg>
                        Top Headlines
                    </h1>
                {newsData.articles.map(
                    (article, index) => (
                        <div key={index + '-' + Date.now()} className="Weather-card mb-3">
                            <a className="link" target="_blank" href={article.url}>
                            <div className="Modal-start-end p-3">
                                <h5>{index+1}</h5>
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill me-3" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                    {article.title}
                                </p>
                            </div>
                            <div className="Modal-body p-5">
                                <p>{article.summary}</p>
                                <p className='Card-body'>{article.publishedAt == undefined ? null : String(article.publishedAt.split("T")[0])}</p>
                            </div></a>
                        </div>
                    )
                )}<hr/>
                
                {/*<h1 className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-pin-angle-fill me-3" viewBox="0 0 16 16">
                    <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                </svg>
                    More News
                </h1>

                {commonNewsData.articles.map(
                    (article, index) => (
                        <div key={index + '-' + Date.now()} className="Weather-card mb-3">
                            <a className="link" target="_blank" href={article.url}>
                            <div className="Modal-start-end p-3">
                                <h5>{index+1}</h5>
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-fill me-2" viewBox="0 0 16 16">
                                    <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354z"/>
                                </svg>
                                    {article.title}
                                </p>
                            </div>
                            <div className="Modal-body p-5">
                                <p>{article.description}</p>
                                <p className='Card-body'>{article.publishedAt == undefined ? null : String(article.publishedAt.split("T")[0])}</p>
                            </div></a>
                        </div>
                    )
                    )}*/}
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
