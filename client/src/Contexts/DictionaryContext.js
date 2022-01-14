import {createContext, useReducer} from 'react'
import DictionaryReducer from '../reducers/DictionaryReducer'
import {LOCAL_STORAGE_TOKEN_NAME} from './constants'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'

export const DictionaryContext = createContext()

const DictionaryContextProvider = ({children})=>{
    //state
    const [dictionaryState, dispatch] = useReducer(DictionaryReducer, {
        dictionaryLoading: true,
        dictionaryData: [],
    })



    const getDictionaryData = async(word) => {
        try {
            if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
             }
            const response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+word, {
                headers: { 'Content-Type': 'application/json'}
            })
            console.log(response.data)
            dispatch({type: 'DICTIONARY_DATA_LOADED_SUCCESS', payload: response.data})

        } catch (error) {
            dispatch({type:'DICTIONARY_DATA_LOADED_FAIL'})
        }
    }

    //context data
    const dictionaryContextData = {getDictionaryData, dictionaryState}

    //return provider
    return (
        <DictionaryContext.Provider value={dictionaryContextData}>
            {children}
        </DictionaryContext.Provider>
    )
}

export default DictionaryContextProvider