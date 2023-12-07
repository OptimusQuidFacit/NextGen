import { AutoAwesome } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Wrapper= styled.div`
    text-align: center;
    font-weight: bold;
    padding: 5px;
    background-color:lightgrey;
`
const Announcetext= styled.p`
    
`

const Announcement = () => {
  return (
    <Wrapper>
        <Announcetext>
            <AutoAwesome/> We are giving out free bonuses today
            <AutoAwesome/> 
        </Announcetext>
    </Wrapper>
  )
}

export default Announcement