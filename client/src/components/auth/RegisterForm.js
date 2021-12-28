import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { useContext, useState} from 'react'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
    const navigate = useNavigate()

    //context
    const  {registerUser} = useContext(AuthContext)

    const [registerForm, setRegisterform] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const {username, password, confirmPassword} = registerForm

    const [alert, setAlert] = useState(null)

    const onChangeRegisterForm = event => setRegisterform({...registerForm, [event.target.name]: event.target.value})

    const register = async event => {
        event.preventDefault()

        if (password !== confirmPassword){
            setAlert({type: 'danger', message: 'Password do not match'})
            setTimeout(() => setAlert(null), 10000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (registerData.success) {
                navigate('/home')
            }
            else{
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(() => setAlert(null), 10000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }


    return <>
    <Form onSubmit={register}>
        <AlertMessage info={alert}></AlertMessage>
        <Form.Group>
            <Form.Control type="text" placeholder="Username" name="username" required value={username} onChange={onChangeRegisterForm}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Control type="password" placeholder="Password" name="password" required value={password} onChange={onChangeRegisterForm}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" required value={confirmPassword} onChange={onChangeRegisterForm}></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">Register</Button>
    </Form>
<p>Already have an account?
    <Link to= '/login'>
    <Button variant="primary" size='sm'>Login</Button>
    </Link>
</p>
</>
}

export default RegisterForm

