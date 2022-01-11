import {createContext, useReducer} from 'react'
import NewsReducer from '../reducers/NewsReducer'
import {LOCAL_STORAGE_TOKEN_NAME} from './constants'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'

export const NewsContext = createContext()

const NewsContextProvider = ({children})=>{
    //state
    const [newsState, dispatch] = useReducer(NewsReducer, {
        newsLoading: true,
        newsData: [],
        commonNewsData: []
    })



    const getNewsData = async(topic) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
           setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response1 = await axios.get('https://serene-coast-39786.herokuapp.com/https://newsapi.org/v2/top-headlines?q='+topic+'&from=2021-12-11&sortBy=publishedAt&apiKey=1f8c3e472c1c4909bdb87065ce2e74de&language=en', {
                headers: { 'Content-Type': 'application/json'}
            })
            const response2 = await axios.get('https://serene-coast-39786.herokuapp.com/https://newsapi.org/v2/everything?q='+topic+'&from=2021-12-11&sortBy=publishedAt&apiKey=1f8c3e472c1c4909bdb87065ce2e74de&language=en', {
                headers: { 'Content-Type': 'application/json'}
            })
            console.log(response1.data, response2.data)
            dispatch({type: 'NEWS_DATA_LOADED_SUCCESS', payload: [response1.data, response2.data]})

        } catch (error) {
            dispatch({type:'NEWS_DATA_LOADED_FAIL'})
        }
    }

    //context data
    const newsContextData = {getNewsData, newsState}

    //return provider
    return (
        <NewsContext.Provider value={newsContextData}>
            {children}
        </NewsContext.Provider>
    )
}

export default NewsContextProvider