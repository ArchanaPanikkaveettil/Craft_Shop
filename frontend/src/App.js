import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import SubCategories from './pages/SubCategories';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Home />} />


          <Route path='/navbar' element={<Navbar />} />
          <Route path='/carousel' element={<Carousel />} />
          <Route path='/search' element={<Searchbar />} />
          <Route path='/button' element={<Button />} />

          <Route path='/category/:id' element={<SubCategories />} />
          <Route path='/login' element={<Login />} />


        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
