import React from 'react'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper= styled.div`

    padding: 10px 10px;
    @media (min-width: 1000px) {

        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 1000px){
    /* background: url('/images/laptop1.jpg');
    background-size:contain;
    background-repeat:no-repeat; */

}
    /* .start-shopping{
        animation: btn-animation 3s 3s;
        }
        @keyframes btn-animation {
            50%{
            transform: rotateY(180deg);
        }
            100%{
                transform: rotateY(0);
            
        }
            } */
`
const HeaderText= styled.div`
@media (max-width: 1000px){
    text-align: center;
    /* background-color:rgba(170, 170, 170, 0.5);
    padding: 15px;
    margin:10px;
    border-radius: 10px; */
    }
    
    flex:1;
    margin-bottom:20px;
    animation: heading 3s;
    position: relative;
    left: 0;

    @keyframes heading {
        0%{
            left: -200vw;
        }
        /* 50%{
            left: 0;
        }
        75%{
            transform: rotateY(180deg);
            left: 0;
        } */
    
        100%{
           left: 0;
        }
    }
`
const HeaderTitle= styled.h1`
    
`

const HeaderImg= styled.div`
text-align: center;
    flex:1;
    position: relative;
    right: -150vw;
    /* @media (max-width: 1000px){
    display:none;
    } */

    animation: headerImage 3s ease-in-out 1s forwards;
    @keyframes headerImage {
        100%{
            right: 0;
        }
    }
`
const CoverImg= styled.img`
    width:70%;
    margin: auto;
`
const Header = () => {
  return (
    <>
    <Wrapper className="container">
        <HeaderText >
        <HeaderTitle className="fw-bold text-primary">
            Welcome to NextGen
        </HeaderTitle>
        <p className="mt-3">
        Welcome to our one-stop destination for all your laptop needs, whether you're in search of a trusty companion for work, study, or leisure. At NextGen, we bring you a world of possibilities where you can buy, sell, and explore the finest selection of used and brand-new laptops.
        </p>
            <Link to={'/products'}> 
        <a href='#' className='text-decoration-none start-shopping btn btn-primary'>
            Start Shopping
        </a>
            </Link>
        </HeaderText>
        <HeaderImg>
           <CoverImg src='/images/laptop1.jpg' alt="" className=" img-fluid" />
        </HeaderImg>
        
    </Wrapper>
    </>
  )
}

export default Header