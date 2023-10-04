import React from 'react'
import Navbar from '../src/common/components/NavBar/Navbar';
import Products from './common/components/Products/Products'
import { Routes, Route } from 'react-router-dom';

import './App.css';
import SignInForm from './SignIn';
import SignUpForm from './SignUp';
import ProductDetails from './common/components/ProductDetails/ProductDetails';
import { AuthProvider } from './Contexts/authContext';
import ModifyProduct from './common/components/ModifyProduct/ModifyProduct';
import AddProduct from './common/components/AddProduct/AddProduct';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
          {/* Nested route for individual product details */}
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path="/products/modify/:productId" element={<ModifyProduct />} />
          <Route path="/products/addProduct" element={<AddProduct />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
