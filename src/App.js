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
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductView from './pages/Admin/AdminProductView';
import AddProduct from './pages/Admin/AddProduct';
import ManageOrdersPage from './pages/Admin/ManageOrdersPage';

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
            <Route path='/admin/dashboard' element={ <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute> } />
            <Route path='/admin/products' element={ <ProtectedAdminRoute><AdminProducts /></ProtectedAdminRoute> } />
            <Route path='/admin/products/:id' element={ <ProtectedAdminRoute><AdminProductView /></ProtectedAdminRoute> } />
            <Route path='/admin/add-product' element={ <ProtectedAdminRoute><AddProduct /></ProtectedAdminRoute> } />
            <Route path="/admin/orders" element={ <ProtectedAdminRoute><ManageOrdersPage /></ProtectedAdminRoute> } />


          </Routes>
    </>
  );
}

export default App;
