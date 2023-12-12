
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { ThemeProvider } from "./ThemeProvider";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import Favourites from "./pages/Favourites";




function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        
      <Route exact path="/" element={<Home/>}/>
      <Route  path="/products" element={<Products/>}/>
      <Route  path="/product/:id" element={<Product/>}/>
      <Route  path="/products/cart" element={<Cart/>}/>
      <Route  path="/profile" element={<Profile/>}/>
      <Route  path="/signin" element={<Signin/>}/>
      <Route  path="/signup" element={<Signup/>}/>
      <Route  path="/addproduct" element={<AddProduct/>}/>
      <Route  path="/favourites" element={<Favourites/>}/>

      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
