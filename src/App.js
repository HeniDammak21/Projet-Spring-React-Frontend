import axios from 'axios';
import { Route, Routes } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewCategory from './components/category/ViewCategory';
import Home from './components/Home';
import Layout from './components/Layout';
import Test from './components/test/Test';
import ViewProduct from './components/product/ViewProduct';
import ViewStock from './components/stock/ViewStock';
import OutOfStock from './components/outofstock/OutOfStock';
import ViewHistory from './components/History/ViewHistory';
import ToBuy from './components/tobuy/ToBuy';
axios.defaults.baseURL = "http://localhost:8080/";
function App() {
  return (
    <div>
<Routes>
  <Route path="/" element={<Layout/>} >
  <Route path="/home" element={<Home/>} />
  <Route path="/test" element={<Test/>} />
  <Route path="/categories" element={<ViewCategory/>} />
  <Route path="/products" element={<ViewProduct/>} />
  <Route path="/tobuy" element={<ToBuy/>} />
  <Route path="/stock" element={<ViewStock/>} />
  <Route path="/outofstock" element={<OutOfStock/>} />
  <Route path="/history" element={<ViewHistory/>} />
  </Route>
</Routes>
    </div>
  );
}

export default App;

