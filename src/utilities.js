export const pricify=(price)=>{
    let stringed= price.toString();
    let grouping= Math.floor((stringed.length-1)/3)*3;
   
    //Math.floor(Math.log10(price)/3)*3;
    
    let lastDigits=stringed.slice(-1*grouping)
    let firstDigits=stringed.slice(0, -1*grouping);
    let structured = grouping>0 ? (firstDigits + "," + pricify(lastDigits)): lastDigits;
    return  structured;
}