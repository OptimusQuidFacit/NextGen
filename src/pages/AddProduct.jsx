import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import NavBar from '../components/Navbar'
import { Send } from '@mui/icons-material'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'; 
import { userRequest } from '../apiCalls';
import { userThemeContext } from '../ThemeProvider';
import Footer from '../components/Footer';


const Wrapper= styled.div`
transition: all 2s;
 .error{
    border: 1px solid red;
 }
 /* .error::before{
    content:'Field cannot be empty';
    margin: 0 5px;
    display:block;
 } */
`
const Form = styled.div`
    width: 800px;
 @media(max-width:1000px){
    width: 500px;
 }
 @media(max-width:500px){
    width: 350px;
 }
    
    margin: auto;
`
const DetailSection= styled.div`
    transition: all 2s;
    padding: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
    margin-bottom: 20px;
    width: 100%;
    display: grid;
    grid-template-columns:1fr 1fr;
    gap: 20px;
    font-weight: bold;
    border-radius: 10px;
    @media(max-width:500px){
    grid-template-columns: 1fr;
 }
 @media(min-width:1000px){
    column-gap:100px;
 }
`
const InputContainer= styled.div`
    margin: 10px 5px;
`
const DetailsContainer= styled.div`
    margin-top: 10px;
    display: flex;
    
`
const Input= styled.input`
    width: 100%;
`
const Label= styled.h3`
font-size: 1.2rem;
    
`
const DetailLabel= styled.span`
    flex:1;
    margin: 0 3px;
`

const AddProduct = () => {
    const [emptyfields, setEmptyfields]=useState([])
    const [formisokay, setFormisokay]=useState(false);
    const [formsubmitted, setFormsubmitted]= useState(false);
    const [progress, setProgress]= useState(0);
    const [isuploading, setIsuploading]= useState(false);
    const {user}= useContext(userThemeContext);
    const [newProduct, setNewProduct]=useState({
            UserPhone: user?.Phone,
            Name: "",
            img: "",
            Price: "",
            Category: "",
            Brand: "",
            Condition: "",
            GPU: "None",
            GPUName:"None",
            VRAM:"1",
            Screen:"11",
            Processor: "Intel",
            ProcessorDetails:"",
            BaseSpeed:"",
            Rom:"2",
            Ram:"64"

    });
    

    
    useEffect(()=>{
        Object.entries(newProduct).every(([key, value])=>value!=="")?setFormisokay(true):setFormisokay(false);
    },[newProduct])

    const handleTextField=(e)=>{
        setNewProduct({...newProduct, [e.target.name]:e.target.value})

    }
    const handleSubmit= ()=>{
       // Object.entries(newProduct).forEach(([key, value])=>value==null&&[...emptyfields, [key]:value])
       setFormsubmitted(true);
       Object.entries(newProduct).forEach(([key, value])=>value==''?!emptyfields.includes(key)&&setEmptyfields(prev=>[...prev, key]):setEmptyfields(prev=>prev.filter(prop=>prop!==key)))
       formisokay?userRequest(user.token).post(`api/products/newproduct/${user?._id}`, newProduct).then(res=>console.log('successfully submitted', res.data)):console.log('You must complete all fields', emptyfields.map(field=>`${field} field cannot be empty`))
    }
    const handleUpload=(e)=>{
        setIsuploading(true);
        let file= e.target.files[0];
        const fileName=new Date().getTime()+file?.name;
        const storage=getStorage(app);
        const storageRef= ref(storage, fileName);
        const uploadTask= uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const loadprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + loadprogress + '% done');
    setProgress(loadprogress);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setIsuploading(false)
        setProgress(0);
      console.log('File available at', downloadURL);
      setNewProduct({...newProduct, img:downloadURL});
    //   setUserPhoto(downloadURL);
    });
  }
);
    }

     console.log(newProduct)
    // console.log(formisokay)
    // console.log(emptyfields)
    const gpuNameList=(type)=>{
        switch(type){
            case "NVIDIA":
            return [
                'GeForce RTX 3090',
                'GeForce RTX 3080',
                'GeForce RTX 3070',
                'GeForce RTX 3060 Ti',
                'GeForce RTX 2080 Ti',
                'GeForce RTX 2080 Super',
                'GeForce RTX 2070 Super',
                'GeForce RTX 2060 Super',
                'GeForce GTX 1660 Ti',
                'GeForce GTX 1660 Super',
                'GeForce GTX 1660',
                // Add more Nvidia GPUs as needed
              ];
              break;
            case "AMD":
            return [
                'Radeon RX 6900 XT',
                'Radeon RX 6800 XT',
                'Radeon RX 6700 XT',
                        'Radeon RX 6600 XT',
                        'Radeon RX 5700 XT',
                        'Radeon RX 5700',
                        'Radeon RX 5600 XT',
                        'Radeon RX 5500 XT',
                        'Radeon RX 590',
                        'Radeon RX 580',
                        'Radeon RX 570',
                // Add more Nvidia GPUs as needed
              ];
              break;
              default:
                return [];
        }
    }
  return (
    <>
    <NavBar/>
    <Wrapper className='p-1'>
        <h1 className='text-center text-primary'>
            Add Product
        </h1>
        <Form className='shadow shadow-1 p-5'>
            <InputContainer>
                <Label className='fw-bold'>
                    Product Image
                </Label>
            <Input onChange={handleUpload} className={formsubmitted && newProduct.img===""?'error':''} type='file' name=''/>  
        {isuploading&&<progress className='' value={progress} max={100}>

        </progress>}
        <img className='my-4' style={{width:"250px"}} src={newProduct?.img} alt={newProduct.Name}/>
            </InputContainer>
            <InputContainer>
                <Label className='fw-bold'>
                    Name
                </Label>
            <Input className={formsubmitted&&newProduct.Name===""?'error':''} name='Name' type='text' placeholder='Enter Brand Name' onChange={handleTextField}/>  
            </InputContainer>
            <InputContainer>
                <Label className='fw-bold'>
                   Brand
                </Label>
            <Input className={formsubmitted && newProduct.Brand===""?'error':''} name='Brand' type='text' placeholder='Enter Brand Name' onChange={handleTextField}/>  
            </InputContainer>
            <InputContainer>
                <Label className='fw-bold'>
                   Price
                </Label>
            <Input className={formsubmitted && newProduct.Price===""?'error':''} name='Price' type='text' placeholder='Enter Brand Name'onChange={handleTextField}/>  
            </InputContainer>
            <InputContainer>
                <Label className='fw-bold'>
                   Category
                </Label>
                <select name='Category' className={formsubmitted && newProduct.Category===""?'error':'' + ' rounded-1 bg-secondary text-white'} onChange={handleTextField}>
                    
                    <option disabled selected>
                        
                    </option>
                    <option value={'Traditional Laptops'}>
                        Traditional Laptops
                    </option>
                    <option value={'Gaming Laptops'}>
                        Gaming Laptops
                    </option>
                    <option value={'Chromebooks'}>
                        Chromebooks
                    </option>
                </select>  
            </InputContainer>
            <InputContainer>
                <Label className='fw-bold'>
                   Condition
                </Label>
                <select name='Condition' className={formsubmitted && newProduct.Condition===""?'error':''+' rounded-1 bg-secondary text-white'} onChange={handleTextField}>
                    
                    <option disabled selected>
                        Condition
                    </option>
                    <option value={'Brand New'}>
                        Brand New
                    </option>
                    <option value={'Used'}>
                        Used
                    </option>
                </select>
            </InputContainer>
            <InputContainer className='fw-bold text-danger'>
            {
                formsubmitted&&emptyfields.map(field=>
                    <p>
                        {field} field cannot be empty
                    </p>
                    )
            }
            </InputContainer>
           <InputContainer>
           <Label className='fw-bold'>
            Product Details
            </Label>
            <DetailSection className=''>
                
                <DetailsContainer>
                <DetailLabel>

                Ram:
                </DetailLabel>
                <select onChange={handleTextField} name='RAM' style={{width:"70px"}}>
                   {
                    [2, 4, 8, 12, 16, 24, 32, 64].map(ram=>
                        <option value={ram}>
                            {`${ram}GB`}
                        </option>)
                   }
                </select>
                </DetailsContainer>

                <DetailsContainer>

                <DetailLabel>
                Rom:
                </DetailLabel>
                <select onChange={handleTextField} name='ROM' style={{width:"70px"}}>
                    
                   {
                    ['64', '128', '256', '512', '1024', '2048'].map(rom=>
                        <option value={rom}>
                            {`${rom}GB`}
                        </option>)
                   }
                </select>
                </DetailsContainer>
                <DetailsContainer>

                <DetailLabel>
                Screen
                </DetailLabel>
                <select onChange={handleTextField} name='Screen' style={{width:"70px"}}>
                    
                   {
                    ['11', '13', '14', '15', '17'].map(scr=>
                        <option value={scr}>
                            {`${scr} inch`}
                        </option>)
                   }
                </select>
                </DetailsContainer>
                <DetailsContainer>

                <DetailLabel>
                GPU type
                </DetailLabel>
                <select onChange={handleTextField} name='GPU' style={{width:"80px"}}>
                    
                   {
                    ['None','NVIDIA', 'AMD', 'Apple' ].map(scr=>
                        <option value={scr}>
                            {`${scr}`}
                        </option>)
                   }
                </select>
                </DetailsContainer>
                
                <DetailsContainer>

                <DetailLabel>
                GPU Name
                </DetailLabel>
                <select onChange={handleTextField} name='GPUName' style={{width:"80px"}}>
                    
                   {
                    gpuNameList(newProduct.GPU).map(scr=>
                        <option value={scr}>
                            {`${scr}`}
                        </option>)
                   }
                </select>
                </DetailsContainer>
                
                <DetailsContainer>

                    

                <DetailLabel>
                VRAM
                </DetailLabel>
                <select onChange={handleTextField} name='VRAM' style={{width:"70px"}}>
                    
                   {
                    [1, 2, 4, 8, 12, 16, 24, 32, 64].map(scr=>
                        <option value={scr}>
                            {`${scr}GB`}
                        </option>)
                   }
                </select>
                </DetailsContainer>
                <DetailsContainer>

                <DetailLabel>
                Processor
                </DetailLabel>
                <select onChange={handleTextField} name='Processor' style={{width:"70px"}}>
                    
                   {
                    ['Intel', 'AMD', 'Apple'].map(scr=>
                        <option value={scr}>
                            {`${scr}`}
                        </option>)
                   }
                </select>
                </DetailsContainer>

                <DetailsContainer>

                <DetailLabel>
                Processor Details
                </DetailLabel>
                <Input className={formsubmitted&&newProduct.ProcessorDetails===""?'error':''+"ps-1 ms-1"} name='ProcessorDetails' type='text' placeholder='e.g core i7-10610U' onChange={handleTextField}/>  

                </DetailsContainer>
                <DetailsContainer>

                <DetailLabel>
                Base Speed
                </DetailLabel>
                <Input style={{width:"100px"}} className={formsubmitted&&newProduct.BaseSpeed===""?'error':''+"ps-1 ms-1"} name='BaseSpeed' type='text' placeholder='e.g 2.2GHz' onChange={handleTextField}/>  

                </DetailsContainer>


                <DetailsContainer>

                <DetailLabel>
                Generation
                </DetailLabel>
                <select onChange={handleTextField} name='Generation' style={{width:"70px"}}>
                    
                   {
                    ["4th", "5th", "6th", "7th"," 8th", "9th", "10th", "11th", "12th" ,"13th"].map(scr=>
                        <option value={scr}>
                            {`${scr} gen`}
                        </option>)
                   }
                </select>
                </DetailsContainer>
            </DetailSection>
           </InputContainer>
            <a onClick={handleSubmit} className='text-decoration-none btn btn-primary mx-1 fw-bold w-100'>Submit Item for Approval <Send/></a>
        </Form>
    </Wrapper>
    <Footer/>
    </>
  )
}

export default AddProduct;