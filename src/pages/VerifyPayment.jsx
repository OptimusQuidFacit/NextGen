import React, { useContext, useEffect, useState } from 'react'
import { userRequest } from '../apiCalls';
import { CartThemeContext, ordersThemeContext, userThemeContext } from '../ThemeProvider';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

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
        <Loader/>
        }   
        <Button style={{marginTop:'100px'}} onClick={()=>isVerifying?handleVerify():handleNavigate()}>{isVerifying?"Confirm that you have paid":"View your orders "}</Button>     
        {errorText && <p className='text-warning fw-bold'>{errorText}</p>}
        </div>
    </>
  )
}

export default VerifyPayment;