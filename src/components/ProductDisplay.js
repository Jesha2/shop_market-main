import React from 'react';
import ProductCard from "./ProductCard";
import  "./ProductCard.css";

const ProductDisplay = ({products}) => {
  console.log(products); 


  return (
   
    <div className = "product_display">
      ProductCard
      {
        products.map((product, index) => (
          <ProductCard key={index} product={product}/>
        ))
      }
    {/* <ProductCard product={product}></ProductCard> */}
    </div>
  )
}
export default ProductDisplay;