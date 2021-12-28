import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'

const NavBar = () => {
    const {authState: {user: { username }}, logoutUser} = useContext(AuthContext)

    return (
        <Navbar expand='lg' bg='dark' variant='white' className='shadow mb-5'>
            <Navbar.Brand className='font-weight-bolder text-white ms-2'>Vinh's app</Navbar.Brand>
        
            <Navbar.Toggle aria-controls='basic-navbar-nav'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-list mr-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>

            </Navbar.Toggle>
            <Navbar.Collapse id='basic-navbar-nav' >
                <Nav className='me-auto'>
                    <Nav.Link className='font-weight-bolder' to='/home' as={Link}>Home</Nav.Link> 
                </Nav>
                <Nav className='me-2'>
                    <Nav.Link className='font-weight-bolder text-white' disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button variant='secondary' className='font-weight-bolder text-white' onClick={logoutUser}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
						Logout
					</Button>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
