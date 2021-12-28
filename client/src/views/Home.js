import React from 'react'
import {Navigate} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Navbar from '../components/layout/NavBar'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import { NoteContext } from '../Contexts/NoteContext'
import AddPost from '../components/notes/AddPost'
import ActionButton from '../components/notes/ActionButton'


const Home = () => {
    const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext)
    const {noteState: {notes, noteLoading}, getNotes, setShowAddNote, showToast, setShowToast}= useContext(NoteContext)
    useEffect(() => getNotes(),[])
    let body=null
    let username=null
    console.log(typeof(user))
    if (user!==null) username=user.username
    if (noteLoading){
        body=(<div className='d-flex justify-content-center mt-2'>
			<Spinner animation='border' variant='info' />
		</div>)
    }
    else  if (notes.length===0){
        body=(
            <>
            <Card>
                <Card.Header as='h1'>Hi {username}</Card.Header>
                <Card.Title>Welcome to Vinh's app</Card.Title>
                <Card.Text>If you haven't have any note, try to add one now!</Card.Text>            
            </Card>
            <Button className="btn btn-primary position-absolute top-50 start-50 translate-middle rounded-pill" onClick={setShowAddNote.bind(this, true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </Button>
            </>
        )
    }
    else {
        console.log(notes)
        body=(
            <>
            <Row>
            {notes.map(note=>(
                <Col key={note._id}>
                    <Card className='shadow-lg ms-0 me-0 mb-3 rounded'> 
                        <Card.Header className='bg-dark text-white text-center'>
                            {note.title}
                        </Card.Header>
                        <Card.Body className='bg-secondary text-white text-center'>
                        <Card.Text>{note.description}</Card.Text>
                        <ActionButton _id={note._id}></ActionButton>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>

            {/* Show_add_note button*/}
            <OverlayTrigger placement='left' overlay={<Tooltip>Add a new note to remember tasks</Tooltip>}>
            <Button className="btn btn-primary position-absolute top-50 end-0 translate-middle rounded-pill" onClick={setShowAddNote.bind(this, true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            </Button>
            </OverlayTrigger>
            </>
        )
    }

//Check for auth
    if (authLoading)
        return (
            <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
            </div>
        )
    else if (isAuthenticated)
        return (
            <>
            <Navbar></Navbar>
            {body}
            <AddPost></AddPost>
            <Toast show={showToast.show} style={{position: 'fixed', top: '20%', right: '10px'}} className={'bg-'+showToast.type+' text-white'} 
            onClose={setShowToast.bind(this, {
                show: false,
                message: '',
                type: null
            })} delay={3000} autohide animation='true'>
                <strong>{showToast.message}</strong>
            </Toast>
            </>
        ) 
    else{
        
        return (
            <Navigate to = '/login'></Navigate>
        )
    }
}
    
export default Home
