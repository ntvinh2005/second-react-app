import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { NoteContext } from '../../Contexts/NoteContext'
import { useContext, useState } from 'react'


const AddPost = () => {
    const {showAddNote, setShowAddNote, addNote, setShowToast} = useContext(NoteContext)
    //state
    const [newNote, setNewNote] = useState({
        title:'',
        description:''
    })
    const {title, description} = newNote

    const onChangeNewNoteForm = event => setNewNote({...newNote, [event.target.name]:event.target.value})
    const closeDialog = () =>{
        setNewNote({title:'', description:''})
        setShowAddNote(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addNote(newNote)
        setNewNote({title:'', description:''})
        setShowAddNote(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }


    return (
        <Modal show={showAddNote} animation={true}>
            <Modal.Header>
                <Modal.Title>
                    What's do you want to add?
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
            <Modal.Body>
                <Form.Group>
                <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeNewNoteForm}></Form.Control>
                <Form.Text id='title-help' muted>Required</Form.Text>
                </Form.Group>
                <Form.Group>
                <Form.Control as='textarea' rows={3} placeholder='Description' name='description' value={description} onChange={onChangeNewNoteForm}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' type='submit'>Add</Button>
                <Button variant='danger' onClick={closeDialog}>Cancel</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPost
