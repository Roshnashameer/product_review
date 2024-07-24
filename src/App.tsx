import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Auth from './pages/Auth';

import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
      
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/login' element={<Auth></Auth>}></Route>
        <Route path='/register' element={<Auth register></Auth>}></Route>
       
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
