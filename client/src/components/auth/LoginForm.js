import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import {AuthContext} from '../../Contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
import FormLabel from 'react-bootstrap/FormLabel'

const LoginForm = () =>{
    const navigate = useNavigate()

    //context
    const  {loginUser} = useContext(AuthContext)

    const [loginForm, setLoginform] = useState({
        username: '',
        password: ''
    })

    const {username, password} = loginForm

    const [alert, setAlert] = useState(null)

    const onChangeLoginForm = event => setLoginform({...loginForm, [event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                navigate('/home')
            }
            else{
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 10000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return <div className="text-center">
    <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
            <FormLabel className="text-white">Username:</FormLabel>
            <Form.Control type="text" placeholder="Username" name="username" required value={username} onChange={onChangeLoginForm}></Form.Control>
        </Form.Group>
        <Form.Group>
            <FormLabel className="text-white">Password:</FormLabel>
            <Form.Control type="password" placeholder="Password" name="password" required value={password}  onChange={onChangeLoginForm}></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" className="mt-2">Login</Button>
    </Form>
    <hr className="text-white"></hr>
<p className="text-white me-2">Don't have an account?
    <Link to= '/register'>
    <Button variant="primary" size='sm' className="ms-2">Register</Button>
    </Link>
</p>
</div>
}

export default LoginForm