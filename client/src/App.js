import './assets/App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyCollections from './pages/MyCollections'
import PracticeMode from './pages/PracticeMode';
import { Form } from 'react-router-dom';
import QuizMode from './pages/QuizMode';

import collectionsData from './data/collections'
import CreateCollection from './pages/CreateCollection';

import Signup from './pages/Signup';
import Login from './pages/Login';

import { useContext } from 'react';
import { AuthContext } from './context/auth.context';

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
          <Route path='/collections' element={<MyCollections/>} />
          <Route path='/practice/:_id' element={<PracticeMode/>} />
          <Route path='/quiz/:_id' element={<QuizMode/>} />
        
          <Route path='/collection/create' element={<CreateCollection />} />
          
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
