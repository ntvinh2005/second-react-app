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
    })



    const getNewsData = async(topic) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
           setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            var options = {
                method: 'GET',
                url: 'https://free-news.p.rapidapi.com/v1/search',
                params: {q: topic, lang: 'en'},
                headers: {
                  'x-rapidapi-host': 'free-news.p.rapidapi.com',
                  'x-rapidapi-key': '6f56f8d050mshe2cdde2878d09e4p175016jsnd9b853c16ddf'
                }
              };
              const response1 = await axios.request(options)
            console.log(response1.data)
            dispatch({type: 'NEWS_DATA_LOADED_SUCCESS', payload: response1.data})

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