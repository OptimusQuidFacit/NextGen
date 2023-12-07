import React, { useContext, useEffect } from 'react'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Whyus from '../components/Whyus';
import Welcome from '../components/Welcome';
import Newsletter from '../components/Newsletter';
import { userThemeContext } from '../ThemeProvider';

const Home = () => {
  const {user}= useContext(userThemeContext);
  return (
    <>
    <nav>

       <NavBar/>
    </nav>
    <article>

    <Announcement style={{zIndex:1000}}/>
    </article>
    {/* <div style={{position:"absolute", top: "50px", left:"50%", transform:"translateX(-50%)"}}>

    {user&& <Welcome/>}
    </div> */}
    <header>

    <Header style={{zIndex:-1}}/>
    </header>
    <section>

    <Whyus/>
    </section>

    <section>
     <ProductList limit={6} /> 
    </section>

    <section>
      <Newsletter/>
    </section>

    <footer>
    <Footer/> 
    </footer>
    </>
  )
}

export default Home