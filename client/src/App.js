import './App.css';
import "weather-icons/css/weather-icons.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from './views/Auth';
import Landing from './components/layout/Landing'
import Home from './views/Home';
import Assistant from './views/Assistant'
import News from './views/News'
import AuthContextProvider from './Contexts/AuthContext';
import NoteContextProvider from './Contexts/NoteContext';
import AssistantContextProvider from './Contexts/AssistantContext'
import NewsContextProvider from './Contexts/NewsContext'

import {useEffect} from 'react'

function App() {
	useEffect(() => document.title = 'Vinh app', [])
    return (
      <>
	  <AuthContextProvider>
		  <AssistantContextProvider>
			<NewsContextProvider>
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
						<Route
							exact
							path='/news'
							element={<News/>}
						/>
					</Routes>
				</BrowserRouter>
				</NoteContextProvider>
				</NewsContextProvider>
				</AssistantContextProvider>
				</AuthContextProvider>
      </>
    )

    }


export default App;
