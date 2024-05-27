import { Edit, Logout } from '@mui/icons-material';
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { userThemeContext } from '../ThemeProvider';
import NavBar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { userRequest } from '../apiCalls';



const Wrapper=styled.div`
    min-width:340px;
`
const ImgContainer= styled.div`
   
`
const BodyContainer= styled.div`
    /* min-width:340px; */
    width: 100%;
    display: flex;
    @media (max-width: 1000px) {
    flex-direction: column;
    margin: 0;
}
`
const Heading= styled.div`
    background:lightgrey;
`
const HeadingText= styled.p`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  @media (max-width:600px) {
    font-size: 1.15rem;
  }
`
const Image = styled.img`
    width: 200px;
    height: 200px;
    border: 1px solid #060B04;

`

const ProfileContainer= styled.div`
    min-width:340px;
    background-color: #fff;
`;

const Bio = styled.div`
/* border-right: 3px solid; */
flex:1;
`
const Sell = styled.div`
padding-top:30px;
flex:1;
/* background: white; */
background: rgb(35,61,18);
background: linear-gradient(90deg, rgba(35,61,18,1) 26%, rgba(6,11,4,1) 80%);
@media (max-width: 1000px) {
   padding: 10px;
}
`

const Profile = () => {
    const navigate= useNavigate();
    const {user, setUser}=useContext(userThemeContext);
    const [file, setFile]=useState(null);
    // const [userPhoto, setUserPhoto]= useState(null)
    const [editingPhoto, setEditingPhoto]= useState(false)
    
      // .then(res=>console.log(res.data));
    // useEffect(()=>{
    //     !user && navigate('/signin');
    // }, []);
    const toggleEdit=(e)=>{
        setEditingPhoto(true);
    }
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const handleLogout=()=>{
      setUser(null)
      localStorage.setItem('user', null);
      navigate('/signin');

    }
    const handleSave=(e)=>{
        e.preventDefault();
        const fileName=new Date().getTime()+file.name;
        const storage=getStorage(app);
        const storageRef= ref(storage, fileName);
        const uploadTask= uploadBytesResumable(storageRef, file);
        setEditingPhoto(false);

        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default: console.log('file upload')
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    //   setUserPhoto(downloadURL);
      setUser(prev=>({...prev, UserImg:downloadURL}))
      downloadURL&& userRequest(user.token).put(`api/users/update/${user._id}`, {UserImg:downloadURL})
    });
  }
);
    }
  return (
    <>
        <NavBar/>
        <Wrapper className="container p-4  d-flex justify-content-center align-items-center">
            <ProfileContainer className='rounded-3 shadow shadow-1 w-100'>

            <Heading className='bg-secondary d-flex px-3 align-items-center justify-content-between'>
                <HeadingText className=''> Hello, {user?.Name}</HeadingText>
                <Button className='m-3 bg-primary' onClick={handleLogout}><Logout/> Logout</Button>
            </Heading>
            <ImgContainer className='mx-auto text-center p-5'>
            <Image className='rounded-circle' src={user?user?.UserImg:"https://th.bing.com/th?id=OIP.l3rAckL5Qizjj2rbCdEHFgHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"} alt="Your profile photo" />
               {!editingPhoto&& <div>

                <Button onClick={toggleEdit} className='m-2 bg-secondary mx-auto text-center'> Edit Photo</Button>
                </div>}
                {
                editingPhoto &&    
                <div className='text-center'>
                    <div className='text-center'>
                      <input className='mx-auto' onChange={handleFile} type="file" name="Photo"  />        
                    </div>
                    <Button className='mt-3' onClick={handleSave}>Save Photo</Button>
                </div>
                }
            </ImgContainer>

            <BodyContainer className='shadow shadow-1 p-3 border border-1 '>
                <Bio className=''>
                    
                <p className=' shadow shadow-1  bg-secondary  text-white p-1 me-3 d-flex'><span className=' fw-bold flex-grow-1'>Id: </span> <span  className='mx-auto'>{user?._id}</span> </p>
                <p className=' bg-secondary  text-white p-1 me-3 d-flex' ><span className='fw-bold flex-grow-1 '>UserName: </span> <span className='mx-auto'>{user?.Name}</span> < Edit className="ms-2"/></p>
                <p className=' bg-secondary  text-white p-1 me-3 d-flex'><span className='fw-bold d-none d-md-block flex-grow-1 '>Email: </span> <span className='mx-auto'>{user?.Email}</span> < Edit className="ms-2"/></p>
                <p className=' bg-secondary  text-white p-1 me-3 d-flex'><span className='fw-bold d-none d-md-block flex-grow-1 '>Mobile No: </span> <span className='mx-auto'>{user?.Phone}</span> < Edit className="ms-2"/></p>
                </Bio>
                <Sell className='text-center shadow shadow-1 rounded-3 bg-primary'>
                    <h3 className='fw-bold text-white'>Do you have products to sell?</h3>
                    <Link className='' to={'/addproduct'}>
                    <Button className='fw-bold border-none bg-warning mt-3'> Sell Now </Button>
                    </Link>
                    <div className='d-md-flex mt-md-5 mt-3'>
                      <Link className='flex-grow-1' style={{textDecoration:'none'}} to={'/favourites'}>
                      <p style={{cursor:'pointer'}} className='p-2 bg-secondary fw-bold text-white mx-3'>Your favourites</p>
                      </Link>
                      <Link className='flex-grow-1' style={{textDecoration:'none'}} to={'/orders'}>

                      <p style={{cursor:'pointer'}} className=' fw-bold p-2 bg-light  mx-3'>Your Orders</p>
                      </Link>
                    </div>
                </Sell>
            </BodyContainer>
            </ProfileContainer>
        </Wrapper>
        
    </>
  )
}

export default Profile;