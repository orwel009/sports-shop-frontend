import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <>
      <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/products' element={<ProductList/>} />
            <Route path='/products/:id' element={<ProductDetail/>} />
          </Routes>
    </>
  );
}

export default App;
