import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartThemeContext, favThemeContext } from '../ThemeProvider';
import { Add, Favorite, FavoriteBorder, Search } from '@mui/icons-material';
import { pricify } from '../utilities';




const Wrapper = styled.div`
    min-height: 90vh;
`
const ItemContainer= styled.div`
    padding: 10px;
    border: 1px solid;
    margin-top: 5px;
    border-radius: 5px;
    position: relative;

`;
const Imgcontainer= styled.div`
    height:200px;
    background-color: white;
    /* @media (min-width: 1000px) {
        height: 300px;
    } */
    display: flex;
    justify-content: center;
`
const ItemImg= styled.img`
 width: 250px;
 height: 200px;
/* @media (max-width: 1000px) {
    height:150px;
}  */
object-fit:cover;

`;
const ItemInfo = styled.div`
    font-weight: bold;
    height:100px;
`

const ProductHeading= styled.h2`
    text-align: center;
    font-weight:bold;
`
const IconsContainer= styled.div`
    background-color: #fff;
    /* opacity:0.6; */
    /* transform: translate(0, -100%); */
    width: 90%;
    /* height:100%; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    padding: 10px;
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: blue;
    font-weight: bold;
    font-size:1.4rem;
    /* border: 1px solid black; */
    /* visibility: "hidden"; */
`


const ProductList = ({products, filterObject, title}) => {

    
    const {favs, setFavs} = useContext(favThemeContext);
    const [filteredProducts, setFilteredProducts]=useState(products);

    
    const handleFilter=(filter)=>{
       // setFilteredProducts(filterObject.Category?products.filter(product=>product.Category===filterObject.Category):products)
        switch(filter.Price){
            case "1": 
            setFilteredProducts(products.filter(product=>Object.entries(filterObject)
            .filter(([key,value])=>key!=='Price')
            .every(([key, value])=>product[key].includes(value)))
            .filter(product=>product.Price<100000));
            break;      
            case "2": 
            setFilteredProducts(products.filter(product=>Object.entries(filterObject)
            .filter(([key,value])=>key!=='Price')
            .every(([key, value])=>product[key].includes(value)))
            .filter(product=>product.Price<=200000&&product.Price>=100000));
            break;      
        
            case "3": 
            setFilteredProducts(products.filter(product=>Object.entries(filterObject)
            .filter(([key,value])=>key!=='Price')
            .every(([key, value])=>product[key].includes(value)))
            .filter(product=>product.Price<=300000&&product.Price>=200000));
            break;
            case "4": 
            setFilteredProducts(products.filter(product=>Object.entries(filterObject)
            .filter(([key,value])=>key!=='Price')
            .every(([key, value])=>product[key].includes(value)))
            .filter(product=>product.Price>=500000));
            break;
            default: 
            setFilteredProducts(products.filter(product=>Object.keys(filterObject)?Object.entries(filterObject)
            .every(([key, value])=> product[key].includes(value)):true))

        
        }
    }
    useEffect(()=>{
     // filterObject &&  setFilteredProducts(filterObject.Category?products.filter(product=>product.Category===filterObject.Category):products)
      filterObject && handleFilter(filterObject)
    }, [filterObject, handleFilter])

    const [visibleIcon, setVisibleIcon]= useState();
    const toggleVisibility=(id)=>{
       id? setVisibleIcon(id):setVisibleIcon();
    }

    const [favId,setFavId]= useState();
    const toggleFav=(id)=>{
       favs?.includes(id) ? setFavs(favs?.filter(fav=>fav!==id)) : setFavId(id);
        setTimeout(()=>{
            setFavId()
        }, 1000)
    }
    // const removeFav=(id)=>{
    //     setFavs(favs.filter(fav=>fav!==id))
    // }
    // const [favs, setFavs]= useState([])
    useEffect(()=>{
        // necessary to include the condition: favId &&, since favId is set to null 1s after the favId is set
        favId && setFavs([...favs, favId]);
         console.log(favs);
    }, [favId, favs])

    const {updateCart}= useContext(CartThemeContext)

  return (
    <div>
        <Wrapper className='container p-4'>
            <ProductHeading>{title}</ProductHeading>
            <Row xs={1} md={2} lg={3}>
                {
                    filteredProducts
                    .map(product=>
                        <Col key={product.id}>
               
                {favId===product.id &&<p>Added to favourites</p>}
                <ItemContainer onClick={()=>toggleVisibility(product.id)}  onMouseOver={()=>toggleVisibility(product.id)} onMouseOut={()=>setVisibleIcon(null)} className='bg-secondary text-white'>
                        <Imgcontainer  style={{backgroundColor: visibleIcon === product.id?"lightgrey":""}}>
                        <ItemImg className='img-fluid' src={product.img}/>
                        </Imgcontainer>
                        <ItemInfo>
                            <p>{product.Name}</p>
                            <p>N{pricify(product.Price)}</p>
                        </ItemInfo>
                        <IconsContainer className='shadow shadow-1 ' style={{visibility: visibleIcon === product.id?"visible":"hidden"}}>
                        {/* <div style={{opacity}} className='bg-white rounded-3 p-3'> */}
                        <Link onClick={()=>toggleFav(product.id)} to={''}>             
                        {favs?.includes(product.id)?<Favorite  className='text-primary'/>:<FavoriteBorder className='text-primary'/>}
                        </Link>
                        <Link to={`/product/${product.id}`}>               
                        <Search className='text-primary'/>
                        </Link>
                        <Link onClick={()=>{
                            
                            updateCart(product.id)}} to={``}>
                            <Add className='text-primary'/>
                        </Link>
                        {/* </div> */}
                        </IconsContainer>
                    </ItemContainer>
                </Col>
                    )
                }
            </Row>
        </Wrapper>
    </div>
  )
}

export default ProductList