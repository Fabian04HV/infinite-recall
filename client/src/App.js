import './assets/App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyCollections from './pages/MyCollections'
import PracticeMode from './pages/PracticeMode';
import QuizMode from './pages/QuizMode';

import Profile from './pages/Profile';
import CreateCollection from './pages/CreateCollection';
import { SearchPage } from './pages/SearchPage';
import { StatisticsPage } from './pages/StatisticsPage';

import Signup from './pages/Signup';
import Login from './pages/Login';

import { useEffect, useState } from 'react';

import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const location = useLocation()
  
  const showNavbar = !location.pathname.startsWith('/quiz/') //&& !location.pathname == '/collection/create' 

  const [hideSideMenu, setHideSideMenu] = useState(true)

  const toggleNavbar = () => {
    setHideSideMenu(!hideSideMenu)
  }

  useEffect(() => {
    setHideSideMenu(true)
  }, [location.pathname])

  return (
    <div className="App">
      {showNavbar && <Navbar hideSideMenu={hideSideMenu} toggleNavbar={toggleNavbar}/>}
      <div className='page-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<ProtectedRoute><MyCollections/></ProtectedRoute>} />
          <Route path='/practice/:_id' element={<ProtectedRoute><PracticeMode/></ProtectedRoute>} />
          <Route path='/quiz/:_id' element={<ProtectedRoute><QuizMode/></ProtectedRoute>} />
          <Route path='/collection/create' element={<ProtectedRoute><CreateCollection /></ProtectedRoute>} />
          <Route path='/collection/edit/:_id' element={<ProtectedRoute><CreateCollection /></ProtectedRoute>} />
          <Route path='/search/:query' element={<SearchPage />}/>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/statistics/:collectionId' element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>} />
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
