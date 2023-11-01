import React from 'react';
import {Routes,Route} from "react-router-dom"
import Homepage from './pages/Homepage';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';


function App() {
  return (
    <>
   <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/product/:slug" element={<ProductDetails />} />
    <Route path="/search" element={<Search/>}/>
    
    <Route path="/register" element={<Register/>}/>
    <Route path="/cart" element={<CartPage/>}/>
    <Route path="/category/:slug" element={<CategoryProduct/>}/>
    
    <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
       
         
          <Route path="admin/orders" element={<AdminOrders />} />
         
        </Route>

    <Route path="/login" element={<Login/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="*" element={<Pagenotfound/>}/>
   </Routes>
    </>
  );
}

export default App;
