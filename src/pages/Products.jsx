import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import ProductList from '../components/ProductList'
import NavBar from '../components/Navbar'
import { Filter1} from '@mui/icons-material'
import Footer from '../components/Footer'
import { ThemeContext } from '../ThemeProvider'



const Wrapper= styled.div`  
`
const FilterContainer= styled.div`
  margin-top:10px;
  display: flex;
  justify-content: space-between;

`
const FilterElement= styled.div`
  padding: 5px;
  font-weight: bold;
`
const Products = () => {
 
  const [filter, setFilter] = useState({
  
  })
  const {products, setProducts}= useContext(ThemeContext);
  const handleFilter=(e)=>{
   if (e.target.value==="All"){
      const filteredKeys= Object.keys(filter).filter((key)=>key!==e.target.name)
      const filteredObject = Object.assign({}, ...filteredKeys.map(key => ({ [key]: filter[key] })));
      
    setFilter(filteredObject);
    return;
}
setFilter({...filter,  [e.target.name]:e.target.value});
console.log(filter);
  }
  return (
    <>
    <NavBar/>
    <Wrapper className='container'>
    <FilterContainer>
      {/* <Filter1 className='p-5'/> */}
      <FilterElement>
      <Filter1/>
        <span className='p-3'>
         Filter
        </span>
        <select className='mt-2 me-2' name="Category" onChange={ handleFilter}>
           <option disabled selected>Category</option>
           <option value="All">All</option>
           <option value="Traditional Laptops">Traditional laptops</option>
           <option value="Gaming Laptops">Gaming Laptops</option>
           <option value="Chomebooks">ChromeBooks</option>

        </select>
        <select name="Brand" className='me-2 mt-2' onChange={handleFilter}>
           <option disabled selected>Brand</option>
           <option value="All">All</option>
           <option value="Asus">Asus</option>
           <option value="Acer">Acer</option>
           <option value="GateWay">GateWay</option>
           <option value="Hp">Hp</option>

        </select>
        <select name="Condition" className='me-2 mt-2' onChange={handleFilter}>
           <option disabled selected>Condition</option>
           <option value="All">All</option>
           <option value="Brand New">Brand New</option>
           <option value="Used">Used</option>

        </select>
      </FilterElement>
      <FilterElement>
        
        <span className='p-3'>
          Price:
        </span>
        <select className='mt-2' name="Price" onChange={handleFilter}>
           <option> </option>
           <option value="All">All</option>
           <option value="1">Less than N100,000</option>
           <option value="2">N100, 000 - N200,000</option>
           <option value="3">N200, 000 - 300, 000</option>
           <option value="4"> Above N500, 000</option>

        </select>
      </FilterElement>
    </FilterContainer>
    {/* <p>{filter.Category} {filtered.map(filter=><p key={filter.id}>{filter.Name}</p> )}</p> */}
        <ProductList products={products} filterObject={filter} />
    </Wrapper>
    <footer>

    <Footer/>
    </footer>
    </>
    
  )
}

export default Products