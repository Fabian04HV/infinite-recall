import './assets/App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyCollections from './pages/MyCollections'
import PracticeMode from './pages/PracticeMode';
import { Form } from 'react-router-dom';
import QuizMode from './pages/QuizMode';

import collectionsData from './data/collections'
import CreateCollection from './pages/CreateCollection';

function App() {
  const location = useLocation()
  
  const showNavbar = !location.pathname.startsWith('/quiz/');
  
  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <div className='page-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<MyCollections collectionsData={collectionsData}/>} />
          <Route path='/practice/:_id' element={<PracticeMode collectionsData={collectionsData}/>} />
          <Route path='/quiz/:_id' element={<QuizMode collectionsData={collectionsData}/>} />
        
          <Route path='/collection/create' element={<CreateCollection />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
