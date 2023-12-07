import React, { useContext, useEffect } from 'react'
import { Toast } from 'react-bootstrap'
import { userThemeContext } from '../ThemeProvider'
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper=styled.div`
  
`
const Welcome = () => {

    const {user}= useContext(userThemeContext);

    const [show, setShow]= useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setShow(false)
        }, 3000);
    })
  return (
    <Wrapper className=''>
      <Toast show={show} className='shadow shadow-1 m-2 mx-auto'>
        <Toast.Body className='fw-bold text-center'>
        Welcome, {user.Name}!
        </Toast.Body>
      </Toast>
    </Wrapper>
  )
}

export default Welcome