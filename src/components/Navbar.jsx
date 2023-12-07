import React, { useContext } from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Inventory, ManageAccounts, QuestionAnswer, ShoppingCart} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { CartThemeContext, userThemeContext } from '../ThemeProvider';
const NavBar = () => {
  const {cart}= useContext(CartThemeContext);
  const {user}= useContext(userThemeContext);
  return (
    <Navbar style={{cursor:"pointer"}} expand="lg" className="bg-primary">
        <Container className='container-fluid'>
            
        <Link to={'/'}>
      <Navbar.Brand className='text-white fw-bold'>
        NextGen
      </Navbar.Brand>
        </Link>
      <Navbar.Toggle aria-controls="navbar" className='mb-3'/>
      <Navbar.Collapse id="navbar">
        <Nav className="ms-auto bg-white rounded-4 text-dark fw-bold text-center px-3">
            <Nav.Link>
               Pricing
            </Nav.Link >
            <Nav.Link className='border-right'>
            <Link style={{textDecoration:"none", color:"inherit"}} to={'/products'}>
                <Inventory/> Products and Listings
            </Link>
            </Nav.Link>
            <Nav.Link>
               <QuestionAnswer/> FAQs
            </Nav.Link>

          
            <Nav.Link >
            <Link className='' style={{textDecoration:"none", color:"inherit"}} to={user?'/profile':'/signin'}>
               <ManageAccounts/> Account
               </Link>
            </Nav.Link>
        
        </Nav>
      </Navbar.Collapse>
      <Nav className='ms-5'>
        
        < Nav.Link >
        <Link className='text-black d-flex flex-column' to={user?'/products/cart':'/signin'}>
        <Badge>{user?cart.length:''}</Badge>
            <ShoppingCart className='text-white fs-1'/>   
        </Link>
        </Nav.Link>
      </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar;