import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from './views/Auth';
import Landing from './components/layout/Landing'
import Home from './views/Home';
import Assistant from './views/Assistant'
import AuthContextProvider from './Contexts/AuthContext';
import NoteContextProvider from './Contexts/NoteContext';
import AssistantContextProvider from './Contexts/AssistantContext'

import {useEffect} from 'react'

function App() {
	useEffect(() => document.title = 'Vinh app', [])
    return (
      <>
	  <AuthContextProvider>
		  <AssistantContextProvider>
		  <NoteContextProvider>
      <BrowserRouter>
					<Routes>
						<Route exact path='/' element={<Landing></Landing>}> </Route>
						<Route
							exact
							path='/login'
							element={<Auth  authRoute='login' />}
						/>
						<Route
							exact
							path='/register'
							element={<Auth authRoute='register' />}
						/>
						<Route
							exact
							path='/home'
							element={<Home />}
						/>
						<Route
							exact
							path='/assistant'
							element={<Assistant />}
						/>
					</Routes>
				</BrowserRouter>
				</NoteContextProvider>
				</AssistantContextProvider>
				</AuthContextProvider>
      </>
    )

    }


export default App;
