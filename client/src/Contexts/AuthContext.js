import {createContext, useReducer, useEffect} from 'react'
import { authReducer } from '../reducers/AuthReducer'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';

export const AuthContext = createContext();



const AuthContextProvider = ({children})=>{
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    console.log('Here is AuthContextProvider')
    //Authenticate user
    const loadUser = async () => {
        console.log(123123)
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        console.log('232123c')
        try {
            const response = await axios.get(apiUrl+'/auth')
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user}
                })
            }
        } catch (error) {
            console.log('1')
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null}
            })
        }
    }

    useEffect(() => loadUser(), [])
    console.log('After useEffect')
    //login
    const loginUser = async userform => {
        try {
            const response = await axios.post(apiUrl+'/auth/login', userform)
            if (response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const registerUser = async userform => {
        try {
            const response = await axios.post(apiUrl+'/auth/register', userform)
            if (response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //update password
    const updatePassword = async (userform, userID) => {
        try {
            const response = await axios.put(apiUrl+'/auth/'+userID, userform)
            if (response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //log out
    const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}

    //context data
    const authContextData = {loginUser, registerUser, updatePassword, logoutUser, authState}

    //return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider