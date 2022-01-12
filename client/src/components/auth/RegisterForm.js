import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { useContext, useState} from 'react'
import AlertMessage from '../layout/AlertMessage'
import FormLabel from 'react-bootstrap/FormLabel'

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
            <FormLabel className="text-white">Username:</FormLabel>
            <Form.Control type="text" placeholder="Username" name="username" required value={username} onChange={onChangeRegisterForm}></Form.Control>
        </Form.Group>
        <Form.Group>
            <FormLabel className="text-white">Password:</FormLabel>
            <Form.Control type="password" placeholder="Password" name="password" required value={password} onChange={onChangeRegisterForm}></Form.Control>
        </Form.Group>
        <Form.Group>
            <FormLabel className="text-white">Confirm Password:</FormLabel>
            <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" required value={confirmPassword} onChange={onChangeRegisterForm}></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" className="text-white mt-2">Register</Button>
    </Form>
    <hr className="text-white"></hr>
<p className="text-white">Already have an account?
    <Link to= '/login'>
    <Button variant="primary" size='sm' className="text-white ms-2">Login</Button>
    </Link>
</p>
    <Link className="me-2 text-decoration-none" variant = "secondary" to= '/assistant'>
        <h3>or visit us as a guest</h3>
    </Link>
</>
}

export default RegisterForm

