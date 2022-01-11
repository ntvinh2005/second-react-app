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
            const response1 = await axios.get('https://serene-coast-39786.herokuapp.com/https://gnews.io/api/v4/top-headlines?q='+topic+'&token=1edbbaa04816f09d9f2ed02e0576308b&lang=en', {
                headers: { 'Content-Type': 'application/json'}
            })
            const response2 = await axios.get('https://serene-coast-39786.herokuapp.com/https://gnews.io/api/v4/search?q='+topic+'&token=1edbbaa04816f09d9f2ed02e0576308b&lang=en', {
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