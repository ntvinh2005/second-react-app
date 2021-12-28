import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../Contexts/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({authRoute}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body
    if (authLoading){
        console.log(authLoading)
        body=(
        <div className='d-flex justify-content-center mt-2'>
			<Spinner animation='border' variant='info' />
		</div>
        )}
    else if (isAuthenticated) {
        return <Navigate to='/home'></Navigate>
    }
    else
        body = (
        <>
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterForm />}
        </>
        )
    return (
        <>
        <h1>Welcome to our website</h1>
        {body}
        </>
    )
}
export default Auth

