import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckEmail = () => {
  return (
    <>
       <div className='p-5 text-center'>
        <p className='fw-bold'>A verification link has been sent to the provided email please check it out</p>
        <Link to={'/'}>
        <Button className='mt-5'>Go back to home page</Button>
        </Link>
       </div>
    </>
  )
}

export default CheckEmail;