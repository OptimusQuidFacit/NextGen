import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { userRequest } from '../apiCalls';
import { CartThemeContext, ordersThemeContext, userThemeContext } from '../ThemeProvider';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Wrapper= styled.div`
    position: relative;
    .spinner1{
        
        animation-delay: 0.1s;
        
    }
    .spinner2{
        
        animation-delay: 0.2s;
    }
    .spinner3{
        
        animation-delay: 0.3s;
    }
    .spinner4{
        
        animation-delay: 0.4s;
    }
    @keyframes spinner {
        0%{
          transform: rotate(0deg);  
        }
        100%{
          transform: rotate(360deg); 
        }
        /* 100%{
          transform: rotate(0deg); 
        } */
        
    }

`;
const Spinner= styled.div`
    border-radius: 50%;
    background-color: skyblue;
    
    transform-origin: 50px 50px;
    width: 10px;
    height: 10px;
    position: Absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: spinner 2s ease-in infinite forwards;
   
`
const VerifyPayment = () => {
    const [isVerifying, setIsVerifying]= useState(true)
    const {user} = useContext(userThemeContext);
    const [errorText, setErrorText]= useState(null)
    const {orders, setOrders}=useContext(ordersThemeContext);
    const {setCart}= useContext(CartThemeContext);
    const navigate= useNavigate();

    useEffect(()=>{
        
    },[])

    const handleVerify=()=>{
        userRequest(user.token).post(`/api/orders/checkout/verify/${user._id}`).then(
            res=>{
                if(res.data==="success"){
                    setIsVerifying(false);
                    setOrders(orders.map(item=>({...item, status:"paid"})));
                    setErrorText(null)
                    setCart([]);
                    
                }
                else{
                    setErrorText('Payment not received');
                }
                
            }
        )
    }

    const handleNavigate=()=>{
        navigate('/orders');
    }
  return (
    <>
        <div className='text-center p-5'>
            <h1 className='fw-bold text-primary'>{isVerifying?"Verifying Payment" : "Payment Verified"}</h1>
        {isVerifying&& 
        <Wrapper className='d-flex m-5'>
            <Spinner className='mx-auto spinner1'>

            </Spinner>
            <Spinner className='mx-auto spinner2'>

            </Spinner>
            <Spinner className='mx-auto spinner3'>

            </Spinner>
            <Spinner className='mx-auto spinner4'>

            </Spinner>
        </Wrapper>
        }   
        <Button style={{marginTop:'100px'}} onClick={()=>isVerifying?handleVerify():handleNavigate()}>{isVerifying?"Confirm Payment":"View your orders "}</Button>     
        {errorText && <p className='text-warning fw-bold'>{errorText}</p>}
        </div>
    </>
  )
}

export default VerifyPayment;