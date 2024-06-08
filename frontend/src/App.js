
import react from 'react';
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
import AddCategory from './pages/AddCategory';
import AddSubcategory from './pages/AddSubcategory';
import EditCategory from './pages/EditCategory';
import EditSubcategory from './pages/EditSubcategory';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderInfo from './pages/OrderInfo';
import ShopOrdersView from './pages/ShopOrdersView';

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
          <Route path='/addcategory' element={< AddCategory />} />
          <Route path='/addsubcategory' element={<AddSubcategory />} />
          <Route path='/editcategory/:id' element={<EditCategory />} />
          <Route path='/editsubcategory/:id' element={<EditSubcategory />} />
          <Route path='/userprofile/:id' element={<UserProfile />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/orderinfo' element={<OrderInfo />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/shoporderview' element={<ShopOrdersView />} />




        </Routes>

      </BrowserRouter>

    </>
  );
}


export default App;
