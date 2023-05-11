import './assets/App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyCollections from './pages/MyCollections'
import PracticeMode from './pages/PracticeMode';
import QuizMode from './pages/QuizMode';

import Profile from './pages/Profile';
import Notes from './pages/Notes';
import CreateCollection from './pages/CreateCollection';

import Signup from './pages/Signup';
import Login from './pages/Login';

import { useContext } from 'react';
import { AuthContext } from './context/auth.context';

import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const location = useLocation()
  
  const showNavbar = !location.pathname.startsWith('/quiz/') //&& !location.pathname == '/collection/create' 
  
  const { isLoggedIn, user } = useContext(AuthContext)

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <div className='page-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<ProtectedRoute><MyCollections/></ProtectedRoute>} />
          <Route path='/practice/:_id' element={<ProtectedRoute><PracticeMode/></ProtectedRoute>} />
          <Route path='/quiz/:_id' element={<ProtectedRoute><QuizMode/></ProtectedRoute>} />
          <Route path='/collection/create' element={<ProtectedRoute><CreateCollection /></ProtectedRoute>} />
          
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/notes' element={<ProtectedRoute><Notes /></ProtectedRoute>} />

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      <footer>
        <Link to='/privacy'>Privacy Policy</Link>
        <Link to='/contact'>Contact Me</Link>
      </footer>
    </div>
  );
}

export default App;
