import React from 'react'
import styled from 'styled-components';

const Wrapper= styled.div`
    position: relative;
    min-height: 200px;
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
    left:calc(50% - 50px);
    /* transform: translateX(100px); */
    animation: spinner 2s ease-in infinite forwards;
   
`
const Loader = () => {
  return (
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
  )
}

export default Loader