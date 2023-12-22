import React, { useState } from 'react'
import { useEffect } from "react";
import {userRequest } from './apiCalls';
import { initialize } from 'paystack-api/resources/transaction';

 export const ThemeContext= React.createContext();
 export const CartThemeContext= React.createContext();
 export const userThemeContext= React.createContext();
 export const favThemeContext= React.createContext();
 export const ordersThemeContext= React.createContext();




 
 export const ThemeProvider = ({children}) => {
   
    const [products, setProducts]= useState([
        {
            id:1,
            Name: "Asus Vivobook",
            img: "https://3.bp.blogspot.com/-ufxpXjVLGTc/UrQUHAbW1oI/AAAAAAAAC6A/H-F4XqKRgdM/s1600/81jpEBBBxgL._SL1500_.jpg",
            Price: 140000,
            Category: "Traditional Laptops",
            Brand: "Asus",
            Condition: "Brand New"
        },
        {
            id:2,
            Name: "Acer Aspire",
            img: "https://th.bing.com/th/id/OIP.ed-29-ckMum--DpdlJRKHgHaFW?pid=ImgDet&rs=1",
            Price: 160000,
            Category: "Traditional Laptops",
            Brand: "Acer",
            Condition: "Brand New"
        },
        {
            id:3,
            Name: "Asus E203MAH",
            img: "https://2.bp.blogspot.com/-9YL5IKhCWkI/UrQUvBLhgTI/AAAAAAAAC6o/S6-DZq2Y108/s1600/5.jpg",
            Price: 90000,
            Category: "Traditional Laptops",
            Brand: "Asus",
            Condition: "Brand New"
        },
        {
            id:4,
            Name: "GateWay NoteBook",
            img: "https://th.bing.com/th/id/OIP.76_5k6pswhzDpo4MaFOvIwHaHa?pid=ImgDet&rs=1",
            Price: 220000,
            Category: "Gaming Laptops",
            Brand: "GateWay",
            Condition: "Brand New"
        },
        {
            id:5,
            Name: "Hp Envy 9",
            img: "https://th.bing.com/th/id/OIP.0fYO9y2QI2codvr7QbOczwHaHa?pid=ImgDet&rs=1",
            Price: 950000,
            Category: "Traditional Laptops",
            Brand: "Hp",
            Condition: "Used"
        },
        {
            id:6,
            Name: "Asus ROG Strix Scar 16",
            img: "https://images-na.ssl-images-amazon.com/images/I/81DyoNha12L._AC_SL1500_.jpg",
            Price: 750000,
            Category: "Gaming Laptops",
            Brand: "Asus",
            Condition: "Brand New"
        },
        {
            id:7,
            Name: "Asus ROG Strix Scar 17 SE",
            img: "https://wallpaperaccess.com/full/4176969.jpg",
            Price: 800000,
            Category: "Gaming Laptops",
            Brand: "Asus",
            Condition: "Brand New"
        },
        {
            id:8,
            Name: "Asus ROG Flow X16",
            img: "https://media1.popsugar-assets.com/files/thumbor/u4u3LDm9kkiy_8Fy3Hb7C0hf7vc/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2018/06/13/991/n/1922441/692b39e8695d2d2a_netimgXQ50LF/i/ASUS-156-Full-HD-Powerful-Gaming-Laptop.jpg",
            Price: 500000,
            Category: "Gaming Laptops",
            Brand: "Asus",
            Condition: "Brand New"
        },
        {
            id:9,
            Name: "Hp Envy Touchsmart",
            img: "https://th.bing.com/th/id/R.39394654cb9d15261bc9645f04589be8?rik=lPbTphCz%2bGouRQ&riu=http%3a%2f%2fohboyohboyohboy.com%2fwp-content%2fuploads%2f2015%2f04%2fbest-buy-laptop-hp.jpg&ehk=rejjvCRDalpC5zrMjF0565znRQNBkdW2uiU7JzJDoKY%3d&risl=&pid=ImgRaw&r=0",
            Price: 190000,
            Category: "Chromebooks",
            Brand: "Hp",
            Condition: "Used"
        },
        {
            id:10,
            Name: "Dell inspiron 3537",
            img: "https://cdn.buysnip.com/Dell-Inspiron-3537-touch-laptop-buy-india.jpg",
            Price: 170000,
            Category: "Traditional Laptops",
            Brand: "Dell",
            Condition: "Used"
        },
    ])
    const [cart, setCart]= useState([]);
    const [orders, setOrders]= useState([]);
    const [user, setUser]= useState();
    const [favs, setFavs] = useState([]);


    // const updateProducts=(newValue)=>{
    //     setProducts(newValue);
    // }
    // const [quantity, setQuantity] = useState(1)
    const updateCart=(id, quantity)=>{


        let product= products.find(product=> product.id===id )
        let cartItem={...product, qty:quantity?quantity:1}
        setCart([...cart.filter(item=>item.id!==id), cartItem]);
        
    }

    // useEffect(()=>{
    //     user && publicRequest.post(`/cart/${user._id}`, {UserId:user._id,
    //          Products: [], Total: 0
    //      }, )
    //          .then(res=>console.log(res.data));
    //   }, [user])
    useEffect(()=>{
        let storedUser=localStorage.getItem('user')
       storedUser &&setUser(JSON.parse(storedUser));
       let myFavs= localStorage.getItem('favs')
    //    console.log(JSON.parse(myFavs));
       myFavs&&setFavs(JSON.parse(myFavs));
      }, [])

    useEffect(()=>{
        let stringedFavs= JSON.stringify(favs)
        //favs.length condition ensures the local storage is not set with empty array initialized when the component mounts
        favs?.length && localStorage.setItem("favs", stringedFavs);
    },[favs])

    
    useEffect(()=>{

        // initialize the cart state everytime the user state changes
        user && userRequest(user.token).get(`api/cart/${user._id}`)
             .then(res=>res.data&&setCart(res.data.Products))
             .catch(err=>console.log(err));
        let stringedUser=JSON.stringify(user);
        stringedUser&& localStorage.setItem('user', stringedUser)
      }, [user])

      useEffect(()=>{
        // initialize the order state everytime the user state changes
        user && userRequest(user.token).get(`api/orders/${user._id}`)
             .then(res=>res.data&&setOrders(res.data.Products))
             .catch(err=>console.log(err));
        let stringedUser=JSON.stringify(user);
        stringedUser&& localStorage.setItem('user', stringedUser)
      }, [user]);

      //Update database everytime the cart changes
    useEffect(()=>{
        user && userRequest(user.token).put(`api/cart/${user._id}`, {
             Products: cart, Total: cart.reduce((sum, item)=>sum + item.Price*item.qty, 0)
         }, )
             .then()
             .catch(err=>console.log(err));
      }, [cart]);

      //Update database everytime the "orders" state changes
    useEffect(()=>{
        user && userRequest(user.token).put(`api/orders/${user._id}`, {
             Products: orders, Total: cart.reduce((sum, item)=>sum + item.Price*item.qty, 0)
         }, )
             .then()
             .catch(err=>console.log(err));
      }, [orders]);
    

   return (
   
     <ThemeContext.Provider value={{products, setProducts}}>
        <CartThemeContext.Provider value={{cart, setCart, updateCart}}>
            <userThemeContext.Provider value={{user, setUser}}>
                <favThemeContext.Provider value={{favs, setFavs}}>
                    <ordersThemeContext.Provider value={{orders, setOrders}}>
                        {children}
                    </ordersThemeContext.Provider>
                </favThemeContext.Provider>
            </userThemeContext.Provider>
        </CartThemeContext.Provider>
     </ThemeContext.Provider>
   )
 }
 