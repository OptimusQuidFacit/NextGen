import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { publicRequest, userRequest} from '../apiCalls';
import { useContext } from 'react';
import { userThemeContext } from '../ThemeProvider';


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
    margin-top: 20px;
    width: 100%;
    
    
`
const FormContainer= styled.div`
    width:400px;
    padding: 30px;
    border-radius: 10px;   
`




const Signin = () => {
    const {user, setUser}= useContext(userThemeContext);
    const [loginUser, setLoginUser]= useState()
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate= useNavigate()
    const handleChange=(e)=>{
        setLoginUser({...loginUser, [e.target.name]:e.target.value})
    }

const handleClick=(e)=>{
    publicRequest.post('api/users/login', loginUser).then(res=>{
        setErrorMsg(null)
     setUser(res.data)
     let stringedUser=JSON.stringify(res.data);
     localStorage.setItem('user', stringedUser);
        userRequest(res.data.token).post(`api/cart/${res.data._id}`, {UserId:res.data._id,
            Products: [], Total: 0
        }, ).then(res=>console.log(res.data))
     
        navigate('/');
        
    })
    .catch(err=>{
         if(err.response){
            setErrorMsg(err.response.data);
         }
    });
}



  return (
    <>
    <nav>

    <NavBar/>
    </nav>
    <Wrapper className="container">
        <FormContainer className='shadow shadow-1'>
            <FormTitle>NextGen</FormTitle>
            <FormInput onChange={handleChange} name='Email' type="text" placeholder = "Email Address"/>
            <FormInput onChange={handleChange} name='Password' type="password" placeholder = "Password"/>
            <Button onClick={handleClick} className='mt-3 btn-primary w-100'>Log In</Button>
        <div>
            <p className='text-info'>Not registered? <Link  to={'/signup'}>
            
                    Sign Up
             
                </Link>
            </p>
            {errorMsg&&<p className='text-danger fw-bold'>{errorMsg}</p>}
        </div>
        </FormContainer>
    </Wrapper>
    </>
  )
}

export default Signin