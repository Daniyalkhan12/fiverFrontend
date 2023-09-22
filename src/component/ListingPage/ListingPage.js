import React from 'react'
import '../ListingPage/listingpage.css'
const ListingPage = ({products }) => {
  return (
    <div>
        <div className="product-page">
      <h1>Product Page</h1>
      <div className="product-list">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.name}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default ListingPage