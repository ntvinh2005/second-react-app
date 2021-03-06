import './App.css';
import "weather-icons/css/weather-icons.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from './views/Auth';
import UpdateForm from './components/auth/UpdateForm';
import Landing from './components/layout/Landing'
import Home from './views/Home';
import Assistant from './views/Assistant'
import News from './views/News'
import Dictionary from './views/Dictionary'
import AuthContextProvider from './Contexts/AuthContext';
import NoteContextProvider from './Contexts/NoteContext';
import AssistantContextProvider from './Contexts/AssistantContext'
import NewsContextProvider from './Contexts/NewsContext'
import DictionaryContextProvider from './Contexts/DictionaryContext';

import {useEffect} from 'react'

function App() {
	useEffect(() => document.title = 'Vinh app', [])
    return (
      <>
	  <AuthContextProvider>
		  	<AssistantContextProvider>
			<NewsContextProvider>
			<DictionaryContextProvider>
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
						<Route
							exact
							path='/dictionary'
							element={<Dictionary/>}
						/>
						<Route
							exact
							path='/updatePassword'
							element={<UpdateForm/>}
						/>
					</Routes>
				</BrowserRouter>
				</NoteContextProvider>
				</DictionaryContextProvider>
				</NewsContextProvider>
				</AssistantContextProvider>
				</AuthContextProvider>
      </>
    )

    }


export default App;
