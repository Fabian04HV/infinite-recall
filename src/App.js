import './assets/App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import MyCollections from './pages/MyCollections'
import Collection from './pages/Collection';
import { Form } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='page-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<MyCollections />} />
          <Route path='/collection/:_id' element={<Collection />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
