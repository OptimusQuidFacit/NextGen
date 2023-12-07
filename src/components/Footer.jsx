import { Email, Facebook, Twitter } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Wrapper= styled.div`
    
`
const FooterText= styled.p`
text-align: center;
font-weight: bold;
    
`
const FooterIcons=styled.div`
display:flex;
justify-content:center;
`

const PageFooter = styled.footer`
    /* position: absolute;
    bottom: 0;
    width: 100%; */

`


const Footer = () => {
  return (
    <PageFooter className=' p-2 bg-secondary text-white'>
        <Wrapper className="Container">
            <FooterText>
            &copy;  2023 NextGen. All rights Reserved.
            </FooterText>
            <FooterIcons>
                <Facebook/>
                <Twitter/>
                <Email/>
            </FooterIcons>
        </Wrapper>
    </PageFooter>
  )
}

export default Footer;