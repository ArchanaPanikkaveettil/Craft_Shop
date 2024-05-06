import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Searchbar from './components/Searchbar';
import Button from './components/Button';

function App() {
  return (
    <>
    <BrowserRouter>
    
    <Routes>

    <Route path='/' element={<Home/>} />
    <Route path='/navbar' element={<Navbar/>} />
    <Route path='/carousel' element={<Carousel/>} />
    <Route path='/search' element={<Searchbar/>} />
    <Route path='/button' element={<Button/>} />


    </Routes>

    </BrowserRouter>
    
    </>
  );
}

export default App;
