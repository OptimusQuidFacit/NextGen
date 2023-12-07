import { AccessibilityNew, DeviceHub, Engineering, Payment, Person, Sell, SupportAgent, ThumbUp } from '@mui/icons-material'
import React from 'react'
import { Carousel, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

const Wrapper= styled.div`
.carousel-control-prev,
.carousel-control-next {
  margin-left: -10%; /* Adjust the value as needed */
  margin-right: -10%; /* Adjust the value as needed */
}
    
`
const Heading= styled.h2`
    text-align: center;
    font-weight: bold;
    color: white;
`
const BodyContainer= styled.div`
    
`
const Card = styled.div`
   text-align : center;
   border: 1px solid black;
   border-radius: 10px;
   padding: 5px;
   height: 250px;
   background-color: white;
   display: flex;
   align-items: center;
  

   
   margin-top: 20px;
    @media (min-width: 768px){
        height: 270px;
    } 
`
const CardContainer= styled.div`
`
const First= styled.div`

`
const Second= styled.div`
    
`
const CardTitle= styled.h3`
    
`
const CardIcon= styled.div`
`
const CardBody=styled.div`
    
`
const Whyus = () => {
  return (
    <div className="bg-primary p-5">
        
   <Wrapper className= 'container bg-primary'>
    <Heading>
        Why Should You Shop With Us
    </Heading>
    <BodyContainer>
        <p className='text-white text-center'>
        At <span className='fw-bold'> NextGen </span>, we're committed to providing you with the best platform for buying and selling laptops. Here's why you should choose us for all your laptop needs
        </p>
    <Carousel interval={10000}>
        <Carousel.Item>

        <First>
        <Row className=''>
            <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                    <AccessibilityNew/>
                </CardIcon>
                <CardTitle>
                Trust and Reliability
                </CardTitle>
                <CardBody>
                We've built a solid reputation for reliability and security. Our transparent transactions and user reviews ensure a trustworthy environment for all.
                </CardBody>
            </CardContainer> 
            </Card>
            </Col >
            <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                    <DeviceHub/>
                </CardIcon>
                <CardTitle>
                Wide Selection
                </CardTitle>
                <CardBody>
                Whether you're in the market for a budget-friendly laptop, a high-performance gaming machine, or the latest ultrabook, we've got you covered.
                </CardBody>
            </CardContainer> 
            </Card>
            </Col>
            <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                <Sell/>
                </CardIcon>
                <CardTitle>
                Competitive Pricing
                </CardTitle>
                <CardBody>
                Our platform empowers you to find the best deals, whether you're a buyer looking for value or a seller seeking fair market prices
                </CardBody>
            </CardContainer> 
            </Card>
            </Col>
            <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                <Payment/>

                </CardIcon>
                <CardTitle>
                Secure Transactions
                </CardTitle>
                <CardBody>
                Your financial and personal information is a top priority for us. We use state-of-the-art security measures to protect your data and ensure secure transactions
                </CardBody>
            </CardContainer> 
            </Card>
            </Col >

            
            
        </Row>

        </First>
        </Carousel.Item>
    
        <Carousel.Item>

        <Second>
        <Row>

        <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                    <ThumbUp/>
                </CardIcon>
                <CardTitle>
                Quality Assurance
                </CardTitle>
                <CardBody>
                When you buy a laptop through NextGen, you can rest assured that it has been thoroughly inspected and vetted for quality
                </CardBody>
            </CardContainer> 
            </Card>
            </Col>

            <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                    <Engineering/>

                </CardIcon>
                <CardTitle>
                Expert Insights
                </CardTitle>
                <CardBody>
         We also provide valuable information on laptop trends, buying guides, and tech tips to help you make informed decisions.
                </CardBody>
            </CardContainer> 
            </Card>
            </Col>
            <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                    <Person/>

                </CardIcon>
                <CardTitle>
                User-Friendly Experience
                </CardTitle>
                <CardBody>
               Easy navigation, robust search filters, and a seamless checkout process are just a few of the features that set us apart.
                </CardBody>
            </CardContainer> 
            </Card>
            </Col>
            <Col xs={12} sm={6} lg={3}>
           <Card>
           <CardContainer>
                <CardIcon>
                    <SupportAgent/>

                </CardIcon>
                <CardTitle>
                Customer Support
                </CardTitle>
                <CardBody>
                 Whether you have questions about a listing, need assistance with your account, or require help with a purchase, we're just a message away.
                </CardBody>
            </CardContainer> 
            </Card>
            </Col>
        </Row>

        </Second>
        </Carousel.Item>
       
    </Carousel>
    </BodyContainer>
    
   </Wrapper>
    </div>
  )
}

export default Whyus