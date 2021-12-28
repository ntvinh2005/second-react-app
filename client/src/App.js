import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from './views/Auth';
import Landing from './components/layout/Landing'
import Home from './views/Home';
import AuthContextProvider from './Contexts/AuthContext';
import NoteContextProvider from './Contexts/NoteContext';

function App() {
    return (
      <>
	  <AuthContextProvider>
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
					</Routes>
				</BrowserRouter>
				</NoteContextProvider>
				</AuthContextProvider>
      </>
    )

    }


export default App;
