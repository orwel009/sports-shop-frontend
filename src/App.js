import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedAdminRoute from './pages/Admin/ProtectedAdminRoute';

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
            <Route path='/cart' element={<CartPage/>} />
            <Route path='/checkout' element={<CheckoutPage/>} />
            <Route path='/orders' element={<OrdersPage/>} />

            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={ 
              <ProtectedAdminRoute>
              <AdminDashboard />
              </ProtectedAdminRoute> } />
          </Routes>
    </>
  );
}

export default App;
