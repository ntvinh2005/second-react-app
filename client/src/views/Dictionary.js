import React from 'react'
import { DictionaryContext } from '../Contexts/DictionaryContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Form from 'react-bootstrap/esm/Form'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import Button from 'react-bootstrap/esm/Button'
import { useContext, useEffect, useState} from 'react'
import NavBar from '../components/layout/NavBar'

const Dictionary = () => {
    const [word, setWord] = useState("Welcome")
    const {dictionaryState: {dictionaryLoading, dictionaryData}, getDictionaryData}= useContext(DictionaryContext)
    

    useEffect(() => {
        getDictionaryData(word)
    },[])
    let body = null
    
    const onChangeSearchBar = async (event) => {
        event.preventDefault()
        setWord(event.target.value)
    }
    

    const onSearch = async(topic) => {
        await getDictionaryData(topic)
    }

    const playsound = async(sound_link) => {
        var snd = new Audio(sound_link); 
        snd.play()
    }

    
    if (dictionaryLoading){
        console.log(327328738)
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
                            <Button onClick={onSearch.bind(this, word)}>
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
                        Definitions for {dictionaryData[0].word}
                    </h1>
                {dictionaryData.map(
                    (article, index) => (
                        <div key={index + '-' + Date.now()} className="Weather-card mb-3">
                            <a className="link" target="_blank" href={article.link}>
                            <div className="Modal-start-end p-3 rounded-top">
                                <h5>{index+1}</h5>
                                <p>
                                
                                    <h5>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill me-3" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {article.word}
                                    </h5>
                                </p> 
                                <div>{article.phonetics.map(
                                    (phonetic, index) => (
                                        <div key={index + '--' + Date.now()}>
                                            {phonetic.audio === undefined ? null:
                                            <button className="btn delete-btn" onClick={playsound.bind(this, phonetic.audio)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
                                                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                                                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                                                <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                                            </svg>
                                            </button>}
                                            {phonetic.text!==undefined ? "/"+phonetic.text+"/": null}
                                        </div>
                                    )
                                )}</div>
                            </div>
                            <div className="Modal-body p-5 rounded-bottom">
                                {article.meanings.map(
                                    (meaning, index) => (
                                        <div key={index + '---a' + Date.now()}>
                                            <h6>{meaning.partOfSpeech!==undefined?String(index+1)+".   "+meaning.partOfSpeech: null}</h6>
                                            <p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-right me-3" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                                                </svg>
                                                {meaning.definitions[0].definition}
                                            </p>
                                            <p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text-fill me-3" viewBox="0 0 16 16">
                                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                                                </svg>
                                                <b>For example: </b>{meaning.definitions[0].example}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div></a>
                        </div>
                    )
                )}<hr/>
                
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

export default Dictionary