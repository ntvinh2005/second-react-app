import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormLabel from 'react-bootstrap/FormLabel'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { NoteContext } from '../../Contexts/NoteContext'
import { useContext, useState } from 'react'


const AddPost = () => {
    const {showAddNote, setShowAddNote, addNote, setShowToast} = useContext(NoteContext)
    
    //state
    const [newNote, setNewNote] = useState({
        title:'',
        description:'', 
        deadline: new Date(),
    })
    const {title, description, deadline} = newNote

    const onChangeNewNoteForm = event => setNewNote({...newNote, [event.target.name]:event.target.value})
    const onChangeDateNoteForm = date => setNewNote({
        title, 
        description,
        deadline: date
    })
    const closeDialog = () =>{
        setNewNote({title:'', description:'', deadline: new Date()})
        setShowAddNote(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addNote(newNote)
        setNewNote({title:'', description:'', deadline: new Date()})
        setShowAddNote(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }


    return (
        <Modal show={showAddNote} animation={true}>
            <Modal.Header className="Modal-start-end">
                <Modal.Title>
                    What's do you want to add?
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
            <Modal.Body className="Modal-body">
                <Form.Group>
                <FormLabel>Title: </FormLabel>
                <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeNewNoteForm}></Form.Control>
                <Form.Text id='title-help' muted>Required</Form.Text>
                </Form.Group>
                <Form.Group>
                <FormLabel>Description: </FormLabel>
                <Form.Control as='textarea' rows={3} placeholder='Description' name='description' value={description} onChange={onChangeNewNoteForm}></Form.Control>
                </Form.Group>
                <div className="form-group">
                <FormLabel>Deadline: </FormLabel>
                <DatePicker
                    selected={ deadline }
                    onChange={ onChangeDateNoteForm }
                    name="deadline"
                    dateFormat="MM/dd/yyyy"
                    value = { deadline }
                />
                </div>
            </Modal.Body>
            <Modal.Footer className="Modal-start-end">
                <Button variant='success' type='submit'>Add</Button>
                <Button variant='danger' onClick={closeDialog}>Cancel</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPost
