import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import SubCategories from './pages/SubCategories';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import Shop from './pages/Shop';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import AdminNav from './components/AdminNav';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/home' element={<AdminHome />} />


          <Route path='/navbar' element={<Navbar />} />
          <Route path='/adminnavbar' element={<AdminNav />} />
          <Route path='/carousel' element={<Carousel />} />
          <Route path='/search' element={<Searchbar />} />
          <Route path='/button' element={<Button />} />

          <Route path='/category/:id' element={<SubCategories />} />
          <Route path='/login' element={<Login />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/products/:name' element={<Products />} />
          <Route path='/productview/:id' element={<ProductView />} />
          <Route path='/addproduct' element={<AddProduct />} />



        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
