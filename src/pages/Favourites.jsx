import React, { useContext } from 'react'
import ProductList from '../components/ProductList';
import { ThemeContext, favThemeContext } from '../ThemeProvider';

const Favourites = () => {
    const {products, setProducts}= useContext(ThemeContext);
    const {favs, setFavs}= useContext(favThemeContext);
    const favourites=products.filter(product=> favs.includes(product.id))
    console.log(favourites)
  return (
    <>
        <h1 className="text-center fw-bold text-primary">Your Favourites</h1>
        <ProductList products={favourites}/>
    </>
  )
}

export default Favourites;