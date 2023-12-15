import React, { useContext } from 'react'
import ProductList from '../components/ProductList';
import { ThemeContext, favThemeContext } from '../ThemeProvider';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Favourites = () => {
    const {products, setProducts}= useContext(ThemeContext);
    const {favs, setFavs}= useContext(favThemeContext);
    const favourites=products.filter(product=> favs.includes(product.id))
    console.log(favourites)
  return (
    <>
    <nav>
      <NavBar/>
    </nav>
      { favs.length ? <ProductList products={favourites} title="Your Favourites"/> : 
       <p className='text-center p-5'>
        You have not selected any favourites yet.
       </p>
        }

        {/* <footer>
          <Footer/>
        </footer> */}


    </>
  )
}

export default Favourites;