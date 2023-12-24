import React, { useContext } from 'react'
import NavBar from '../components/Navbar'
import { ordersThemeContext } from '../ThemeProvider'
import styled from 'styled-components'
import { pricify } from '../utilities'
import Footer from '../components/Footer'


const Wrapper = styled.div`
    padding: 10px;
`
const OrdersContainer= styled.div`
    
`
const HeadingContainer = styled.div`
    display: flex;  
`
const HeaderItem= styled.div`
    color: white;
    flex:1;
    border-right: 1px solid white;
    text-align: center;
    margin: 5px 0;
    &:last-of-type{
        border-right: none;
    }    
`
const RowItem= styled.div`
    flex:1;
    text-align: center;
    margin: 5px 0;
    &:last-of-type{
        border-right: none;
    }    
`

const Orders = () => {
    const {orders}= useContext(ordersThemeContext);
  return (
    <>
    <NavBar/>
    <Wrapper style={{minHeight:"90vh"}} className="">

    <OrdersContainer>
        <HeadingContainer className="bg-secondary" >
            <HeaderItem>
                Item
            </HeaderItem>
            <HeaderItem>
                Quantity
            </HeaderItem>
            <HeaderItem>
                Status
            </HeaderItem>
            <HeaderItem>
                Price
            </HeaderItem>
        </HeadingContainer>
        {
            orders.map(item=>
                <div className='bg-lightBrown' key={item.id}>

                <HeadingContainer className='border-bottom border-bottom-1 border-black'>
                    <RowItem>{item.Name}</RowItem>
                    <RowItem>{item.qty}</RowItem>
                    <RowItem>{item.status}</RowItem>
                    <RowItem>{item.qty>1? <p>N{pricify(item.qty*item.Price)} <br/> ({item.Price} x {item.qty})</p>:item.Price}</RowItem>
                    
                </HeadingContainer>
                </div>
                )
        }
    </OrdersContainer>
    </Wrapper>
    <Footer/>
    </>
  )
}

export default Orders