import {createContext, useReducer, useState} from 'react'
import NoteReducer from '../reducers/NoteReducer'
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from './constants'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'

export const NoteContext = createContext()

const NoteContextProvider = ({children})=>{
    //state
    const [noteState, dispatch] = useReducer(NoteReducer, {
        noteLoading: true,
        notes: [],
    })
    const [showAddNote, setShowAddNote] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false, 
        message: '',
        type: null
    })


    const getNotes = async() => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
           setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(apiUrl+'/note')
            dispatch({type: 'NOTE_LOADED_SUCCESS', payload: response.data.notes})
        } catch (error) {
            dispatch({type:'NOTE_LOADED_FAIL'})
        }
    }

    //add note
    const addNote = async newNote => {
        try {
            const response = await axios.post(apiUrl+'/note', newNote)
            console.log(response.data)
            if (response.data.success) {
                dispatch({type: 'ADD_NOTE', payload: response.data.note})
                return response.data
            }
        } catch (error) {
            console.log(error)
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //delete note
    const deleteNote = async noteId => {
        try {
            const response = await axios.delete(apiUrl+'/note/'+noteId)
            if (response.data.success)
                dispatch({type: 'DELETE_POST', payload: noteId})
        }
        catch (error){
            console.log(error)
        }
    }

    //update note
    const updateNote = async updatedNote => {
		try {
			const response = await axios.put(
				`${apiUrl}/note/${updatedNote._id}`,
				updatedNote
			)
            console.log(response.data)
			if (response.data.success) {
				dispatch({ type: 'UPDATE_NOTE', payload: response.data.note })
                console.log(response.data.note)
				return response.data
			}
		} catch (error) {
			//return error.response.data
				//? error.response.data
				//: { success: false, message: 'Server error' }
		}
	}
    

    //context data
    const noteContextData = {getNotes, addNote, deleteNote, updateNote, noteState, showAddNote, setShowAddNote, showToast, setShowToast}

    //return provider
    return (
        <NoteContext.Provider value={noteContextData}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteContextProvider