import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { publicRequest } from '../apiCalls';


const Wrapper= styled.div`
    height: 70vh;
    width: 100vw;
    display:flex;
    align-items: center;
    justify-content:center;
`;

const FormTitle= styled.h1`
    margin: auto;
`
const FormInput= styled.input`
    display: block;
    margin-bottom: 20px;
    width: 100%;
    
    
`
const FormContainer= styled.div`
    width:400px;
    padding: 30px;
    border-radius: 10px;
    
`


const Signup = () => {
    const [loginUser, setLoginUser]= useState()
    const [password, setPassword]= useState()
    const [confirmPassword, setConfirmPassword]= useState()
    const [unmatched, setUnmatched]= useState(false)
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setLoginUser({...loginUser, [e.target.name]:e.target.value})
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
        // password?.Password===password?.Confirm && setUser({...user, Password:e.target.value})
    }
    const handleConfirm=(e)=>{
        setConfirmPassword(e.target.value)
        // password?.Password===password?.Confirm && setUser({...user, Password:e.target.value})
    }
    const handleClick=(e)=>{
       !unmatched&&publicRequest.post('api/users/register', loginUser).then(res=>console.log(res.data)) 
         navigate('/emailnotification');
    }
    useEffect(()=>{
        password===confirmPassword?setUnmatched(false):setUnmatched(true)
        !unmatched&&setLoginUser({...loginUser, Password:password})
    }, [confirmPassword, loginUser, password, unmatched])
  return (
    <>
    <NavBar/>
    <Wrapper className="container">
        <FormContainer className='shadow shadow-1'>
            <FormTitle>NextGen</FormTitle>

            <FormInput onChange={handleChange} name='Name'  type="text" placeholder = "Full Name"/>
            <FormInput onChange={handleChange} name='Email' type="text" placeholder = "Email Address"/>
           
            <FormInput onChange={handleChange} name='Phone' type="tel" placeholder = "Enter Phone Number"/>
            <FormInput onChange={handlePassword} name='Password' type="password" placeholder = "Password"/>

            {unmatched && <span className='mt-2 text-danger'>Passwords don't match</span>}

            <FormInput onChange={handleConfirm} name='Confirm' type="password" placeholder = "Confirm Password"/>
            <Button onClick={handleClick} className='mt-3 btn-primary'>Submit</Button>
        <div>
            <p className='text-info'>Already registered? <Link style={{color:"inherit"}} to={'/signin'}>
                <a href='#'>
                    Sign In
                </a> 
                </Link>
            </p>
        </div>
        </FormContainer>
    </Wrapper>
    </>
  )
}

export default Signup