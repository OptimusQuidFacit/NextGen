import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Button, Col, Row } from 'react-bootstrap';
import { Add, Remove } from '@mui/icons-material';
import { CartThemeContext, ThemeContext } from '../ThemeProvider';
import axios from 'axios';
import { pricify } from '../utilities';




const Wrapper= styled.div`
    
`
const ImgContainer= styled.div`
   
`
const Heading=styled.h1`
    font-weight: bold;
    text-align: center;
    padding: 20px 0;
`
const InfoContainer =styled.div`
    /* border: 2px solid blue;
    border-radius: 5px; */


`
const Label= styled.span`
    font-weight: bold;
    font-size: 1.1rem;
    color: blue;

`
const ProductImg= styled.img`
 width: 60vh;
 object-fit:cover;
 @media (max-width: 500px){
    width: 250px;
}
`;
const InfoRow = styled.div`
font-weight: bold;
    
`;
const Qty=styled.input`
    width: 40px;
    margin: 0 2px;
    text-align: center;
`
const SingleProduct = ({id}) => {
    const {products}= useContext(ThemeContext);
    const {cart, setCart, updateCart}= useContext(CartThemeContext);
    const productItem=products.filter(product=>product.id==id)[0];
    
    
     const [product, setProduct]= useState(
        productItem
        );
    useEffect(()=>{
        //  console.log(products);
     },[])

    const [quantity, setQuantity] = useState(1);
    
    const handleQty=(i)=>{
        if(i){
        setQuantity(quantity+1)
        }
    else{
        quantity>1 && setQuantity(quantity-1);
        }
    }
    const handleChange=(e)=>{
       setQuantity(e.target.value&&parseInt(e.target.value))
    }
  return (
    <Wrapper className='container'>
        <Heading>
        {product.Name}
        </Heading>
        <Row xs={1} lg={2} className='align-items-center'>
            <Col>
            <ImgContainer className='mt-3 p-3'>
                <ProductImg src={product.img}/>
            </ImgContainer>            
            </Col>
            <Col>
            <InfoContainer className='mt-3 p-3'>
                <h2 className='fw-bold text-center'>Product Details</h2>
                <InfoRow>
                    
                
                   <Label>Category: <p>{cart.id}</p></Label> {product.Category}
                </InfoRow>
                <InfoRow>
                <Label>Price: </Label> N{pricify(product.Price)}
                </InfoRow>
                <InfoRow>
                <Label>Condition: </Label> {product.Condition}
                </InfoRow>
                <InfoRow>
                <Label>Specifications: </Label>
                </InfoRow>
                <InfoRow>
                    <Remove style={{cursor:"pointer"}} onClick={(e)=>handleQty()}/> <Qty onChange={handleChange} value={quantity}/> <Add style={{cursor:"pointer"}} onClick={(e)=>handleQty('+')}/> 
                    <Button onClick={()=>updateCart(product.id, quantity)} className='mx-3 bg-primary'>Add to CART</Button>
                </InfoRow>
            </InfoContainer>
            
            </Col>
        </Row>
    </Wrapper>
  )
}

export default SingleProduct;