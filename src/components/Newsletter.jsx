import { Send } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';

const Wrapper= styled.div`
    
`;
const FormContainer= styled.div`
    display: flex;
    justify-content:center;
    margin-top: 10px;
    margin:0 5px;

`
const FormInput= styled.input`
    margin: 0 10px;
    width: 60%;
    height: 40px;
    @media(max-width: 400px){
      width: 90%;
    }
`
const Title = styled.h3`
   margin : auto;
   text-align: center;
   color: white;
   margin-bottom: 10px;
`

const Newsletter = () => {
  return (
    <section className='bg-primary py-5 mt-5'>
    <Wrapper className='Container'>
        <Title>Subscribe to our NewsLetter</Title>
        <FormContainer>
            <FormInput type='text' placeholder='Enter your Email Address'/>
            <Send className='text-secondary' style={{cursor:"pointer", fontSize:"2.5rem"}}/>
        </FormContainer>
    </Wrapper>
    </section>
  )
}

export default Newsletter;