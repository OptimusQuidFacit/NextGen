import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Footer from '../components/Footer'
import { Add, ArrowBack, Delete, Remove } from '@mui/icons-material'
import { CartThemeContext, loadingThemeContext, notificationsThemeContext, ordersThemeContext, userThemeContext } from '../ThemeProvider'
// import SingleProduct from '../components/SingleProduct'
// import { userRequest } from '../apiCalls'
import { Link, useNavigate } from 'react-router-dom'
import { pricify } from '../utilities'
import { userRequest } from '../apiCalls'
import Loader from '../components/Loader'
// import Loader from '../components/Loader'


const Wrapper= styled.div`
    
`
const CartContainer= styled.div`
    
`
const Summary = styled.div`
min-width:330px;
@media (max-width: 1000px) {
    margin-top:30px;
}

`
const ItemContainer= styled.div`
@media (max-width: 700px) {
    margin-bottom:30px;
}
    
`
const ImgContainer = styled.div`
@media (min-width: 500px) {
    height:150px;
}
 @media (min-width: 700px) {
    height:200px;
}
 
display: flex;
align-items: center;
justify-content: center;
`
const Image = styled.img`
    width:200px;
    @media (max-width: 1000px) {
    width:150px;
}
`
const InfoContainer= styled.div`
margin: 10px 0;

`;
const InfoText= styled.p`
/* line-height: 0.9rem; */
`
//For the modal
const Qty=styled.input`
width: 40px;
margin: 0 2px;
text-align: center;
`
const InfoRow = styled.div`
font-weight: bold;

`;

const Cart = () => {
    const {cart, setCart} = useContext(CartThemeContext);
    const {user} = useContext(userThemeContext);
    const { setOrders} = useContext(ordersThemeContext);
    const { setNotification} = useContext(notificationsThemeContext);
    const { isLoading, setIsLoading } = useContext(loadingThemeContext)
    const navigate= useNavigate()
    // useEffect(()=>{
    //    user&& userRequest(user.token).post(`/cart`, {UserId:user._id,
    //         Products: cart, Total: 0
    //     }, )
    // }, [])
    // useEffect(()=>{
    //     userRequest(user.token).put(`/cart/${user._id}`, {UserId:user._id,
    //     Products: cart, Total: 0
    // }, )
    //     .then(res=>console.log(res.data))
    // }, [cart])
    
    const handleDelete= (id) =>
    {
        setCart(cart.filter(item=>item.id!==id));
        setNotification('Item deleted')
        console.log(cart.reduce((sum, item)=>sum+item.Price*item.qty, 0));

    }
    const [editProduct, setEditProduct]= useState()
    const [show, setShow]= useState(false)
    const handleClose=()=>setShow(false);
    const handleShow=(id)=>{
        setEditProduct(cart.find(item=>item.id===id))
        setShow(true);
    }

    
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
    const {updateCart}= useContext(CartThemeContext);
    useEffect(()=>{
        setQuantity(editProduct && editProduct.qty)
    }, [editProduct])

    //remove toast after 5s
    
    const handleCheckOut=()=>{
        const newOrders= cart.map(item=>({...item, status: "Yet to pay"}));
        setIsLoading(true);


        //Add order to the db for the first time

        userRequest(user.token).post(`/api/orders/${user._id}`, 
        {UserId: user._id, Products:newOrders,
            Total:cart.reduce((sum, item)=>sum+item.Price*item.qty, 0)})
            .then(res=>{
            res.data && setOrders(prev=>[...prev, ...newOrders]);

            console.log(res.data.Products);

            //Payment request
            userRequest(user.token).post(`api/orders/checkout/${user._id}`)
            .then(res=>{
                setIsLoading(false);
                window.open(res.data.authorization_url);

                navigate('/verifying');
                })}
                )
                .catch(err=>console.log(err.response))

        

                }
            return (
            <>
            <nav>
                <NavBar/>
            </nav>
                <Wrapper style={{minHeight:"90vh"}} className='m-3 container mx-auto'>
                    <Modal show={show} onHide={handleClose} className='w-100'>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Edit Product
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <SingleProduct id={editId}/> */}
                            <div className='mx-auto mt-3 p-3'>
                                <img style={{width:"100px"}} src={show && editProduct?.img} alt={editProduct?.Name}/>
                            </div> 
                            <InfoRow>
                            {show&&editProduct.Name}
                            </InfoRow>
                            <InfoRow>
                                <span className='mx-3'>Qty</span>
                                <Remove style={{cursor:"pointer"}} onClick={(e)=>handleQty()}/> <Qty onChange={handleChange} value={quantity}/> <Add style={{cursor:"pointer"}} onClick={(e)=>handleQty('+')}/> 
                            </InfoRow>  
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>{

                            updateCart(editProduct.id, quantity)
                            handleClose()
                            }
                            }>
                            Save Changes
                        </Button>
                            
                        </Modal.Footer>

                    </Modal>
                    <div className='d-lg-flex align-items-center'>
                    <Link to={'/products'} style={{textDecoration:'none', color:'inherit'}}>
                    <p className='text-center fw-bold bg-secondary p-2 rounded-3 text-white'>
                    <ArrowBack/> Return to shopping
                    </p>
                    </Link>
                    <h1 className=' mx-auto py-2 text-center text-decoration-underline'>{user?.Name}'s Shopping Cart </h1>
                    </div>
                    <Row>
                        <Col lg={8} className=''>
                            
                        
                            {isLoading ? <Loader/> : <CartContainer className='shadow shadow-1 rounded-4'>

                                <Row xs={1} lg={2}>
                            {
                                
                                cart.length ? cart.map(item=>

                                <Col key={item.id}>
                                    <ItemContainer className='text-center'>
                                        <ImgContainer className='text-center'>
                                        <Image src={item.img}/>
                                        </ImgContainer>
                                        <InfoContainer>
                                            <div style={{height:"100px"}}>
                                            <InfoText>{item.qty} {item.qty>1?'pieces': 'piece'} of {item.Name}</InfoText>
                                            <InfoText>Amount: N{pricify(item.Price *item.qty)}</InfoText>
                                            </div>
                                            <div  className=' px-5 mx-auto d-flex justify-content-between align-items-center' >

                                            <Delete style={{cursor:"pointer"}} onClick={()=>handleDelete(item.id)} className='text-danger'/> 
                                            <span onClick={()=>{
                                                handleShow(item.id)}} className='btn btn-primary py-1'>Edit</span>
                                            </div>
                                        </InfoContainer>
                                    </ItemContainer>
                                 </Col>
                                )
                                : <p className='text-center p-5 my-5'> Your Cart is empty </p>
                            }   
                            
                                    </Row>

                                 </CartContainer>}
                           
                        </Col>


                        <Col lg={4} className=''>
                                    <Summary className='rounded-4 shadow shadow-1 p-4'>
                            
                                <h2 className='text-center fw-bold my-2'>Summary</h2>
                            
                                
                            <hr/>
                                    <div className=" fw-bold d-flex justify-content-between">
                                        <p className='flex-1 pe-5'>Product</p>
                                        <p className=' ms-auto'>Quantity</p>
                                        <p className='ps-5'>Price</p>
                                    </div>
                            {
                                cart.map(item=>
                                    <div className="d-flex justify-content-between">
                                        <p className='flex-1 pe-5'>{item.Name}</p>
                                        <p className=' ms-auto'>{item.qty}</p>
                                        <p className='ps-5'>N{pricify(item.Price*item.qty)}</p>
                                    </div>
                                )
                            }
                                    <div className="fw-bold d-flex justify-content-between">
                                        <p className='flex-1 pe-5'>Total</p>
                                        <p className=' ms-auto'></p>
                                    <p className='ps-5'>N{pricify(cart.reduce((sum, item)=>sum + item.Price*item.qty, 0))}</p>
                                    </div>

                                    <Button onClick={handleCheckOut} className='w-100'>Checkout </Button>

                        </Summary>
                    </Col>
                </Row>
                    
                </Wrapper>
            <footer>

                <Footer/>
            </footer>
           
    </>
  )
}

export default Cart