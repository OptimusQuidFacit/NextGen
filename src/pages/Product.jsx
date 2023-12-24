import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

import { useLocation } from 'react-router-dom';
import SingleProduct from '../components/SingleProduct';

const Product = () => {
    const location= useLocation()
    const id=location.pathname.split("/")[2];

   
   
  return (
    <>
    <nav>

    <NavBar/>
    </nav>
    <section style={{minHeight:"90vh"}}>
      <SingleProduct id={id}/> 
    </section>
    <footer>
    <Footer/>
    </footer>
    </>
  )
}

export default Product;