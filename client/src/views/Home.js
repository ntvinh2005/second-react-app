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
    const {noteState: {notes, noteLoading}, getNotes, updateNote, setShowAddNote, showToast, setShowToast}= useContext(NoteContext)
    useEffect(() => getNotes(),[])
    let body=null
    let username=null

    const onsubmit = async (note) => {
        note.done == true ? note.done = false : note.done = true
        await updateNote(note)
        console.log(note.done)
	}


    if (user!==null) username=user.username
    if (noteLoading){
        body=(<div className='d-flex justify-content-center mt-2'>
			<Spinner animation='border' variant='info' />
		</div>)
    }
    else  if (notes.length===0){
        body=(
            <>
            <br/>
            <Card className='mt-5 text-center'>
                <Card.Header as='h1'>Hi {username}</Card.Header>
                <Card.Title>Welcome to {username}'s app</Card.Title>
                <Card.Text>If you haven't have any note, try to add one now!</Card.Text>            
            </Card>
            <Button className="btn position-absolute start-50 top-50 translate-middle text-center mt-3 rounded-circle fw-bolder btn-lg" onClick={setShowAddNote.bind(this, true)}>
            +
            </Button>
            </>
        )
    }
    else {
        console.log(notes)
        body=(
            <>
            <br/>
            <div className= "row mx-auto mt-5 NoteCollections-container">
            {notes.map(note=>(
                <div key={note._id} className= "col me-4">
                    <OverlayTrigger placement='top' overlay={<Tooltip>Have you finished it? Yes = Click me/ No = Good luck!</Tooltip>}>
                    <div
                    className={"Card"+(note.done ? ' flip' : '')}
                    onClick={onsubmit.bind(this, note)}>
                        <div className="front">
                        <div className='Card-header p-2'>
                            {note.title}
                        </div>
                        <div>
                        <p className='Card-body'>{note.description}</p>
                        <p className='Card-body'>{note.deadline == undefined ? null : String(note.deadline.split("T")[0])}</p>
                        </div>
                        <ActionButton _id={note._id}></ActionButton>
                        </div>
                        <div className="back">
                        <div className='Card-header p-2'>
                            {note.title}
                        </div>
                        <p>DONE</p>
                        <ActionButton _id={note._id}></ActionButton>
                        </div>
                    </div>
                    </OverlayTrigger>
                    <br/>
                </div>
                
            ))}
            </div>

            {/* Show_add_note button*/}
            <OverlayTrigger placement='left' overlay={<Tooltip>Add a new note to remember tasks</Tooltip>}>
            <Button className="btn-floating rounded-circle fw-bolder btn-lg" onClick={setShowAddNote.bind(this, true)}>
            +
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
            <div className="body">
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
            </div>
        ) 
    else{
        
        return (
            <Navigate to = '/login'></Navigate>
        )
    }
}
    
export default Home
