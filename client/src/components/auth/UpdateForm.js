import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import {AuthContext} from '../../Contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
import FormLabel from 'react-bootstrap/FormLabel'

const UpdateForm = () =>{
    const navigate = useNavigate()

    //context
    const  {updatePassword, authState: {user}} = useContext(AuthContext)

    const [updateForm, setUpdateform] = useState({
        username: '',
        password: '',
        newpassword: '',
    })

    const {username, password, newpassword} = updateForm

    const [alert, setAlert] = useState(null)

    const onChangeUpdateForm = event => setUpdateform({...updateForm, [event.target.name]: event.target.value})

    const update = async event => {
        event.preventDefault()

        try {
            const updateData = await updatePassword(updateForm, user._id)
            if (updateData.success) {
                navigate('/home')
            }
            else{
                setAlert({type: 'danger', message: updateData.message})
                setTimeout(() => setAlert(null), 10000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return <div className="loginPage">
            <div className="p-5 loginForm">
                <h1 className="text-center text-white">Welcome to our website</h1>
                <hr className="text-white"></hr>
                <div className="text-center">
            <Form onSubmit={update}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <FormLabel className="text-white">Username:</FormLabel>
                    <Form.Control type="text" placeholder="Username" name="username" required value={username} onChange={onChangeUpdateForm}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <FormLabel className="text-white">Password:</FormLabel>
                    <Form.Control type="password" placeholder="Password" name="password" required value={password}  onChange={onChangeUpdateForm}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <FormLabel className="text-white">New Password:</FormLabel>
                    <Form.Control type="password" placeholder="New Password" name="newpassword" required value={newpassword}  onChange={onChangeUpdateForm}></Form.Control>
                </Form.Group>
                <Button variant="success" type="submit" className="mt-2">Update</Button>
            </Form>
            </div>
                
            </div>
        </div>
    
}

export default UpdateForm