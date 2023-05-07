import './assets/App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyCollections from './pages/MyCollections'
import Collection from './pages/Collection';
import { Form } from 'react-router-dom';
import Practice from './pages/Practice';

import collectionsData from './data/collections'

function App() {
  const location = useLocation()
  
  const showNavbar = !location.pathname.startsWith('/practice/');
  
  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <div className='page-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<MyCollections collectionsData={collectionsData}/>} />
          <Route path='/collection/:_id' element={<Collection collectionsData={collectionsData}/>} />
          <Route path='/practice/:_id' element={<Practice collectionsData={collectionsData}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
