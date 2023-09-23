import React, { useEffect, useState, useRef } from 'react';
import '../ListingPage/listingpage.css'

const ListingPage = () => {
  const [products, setData] = useState([]);
  const pollingInterval = 5000; 
  const intervalIdRef = useRef(null);
  
  const fetchImageData = async () => {
    console.log("calling")
    const response = await fetch('http://127.0.0.1:8000/image/list/?per_page=10&page_no=1',{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    })
    if (!response.ok){
      console.error("Error Fetching product")
      return;
    }
    const responseData = await response.json()
    if(responseData.code != 200){
      console.error("Error getting products")
      return;
    }
    // Store the product in the state
    setData(responseData.data.dataset);
    // If there are processing images, start or continue polling
    if (responseData.data.dataset.some((item) => item.image_status === 'Processing')) {
      console.log(intervalIdRef.current)
        if (!intervalIdRef.current) {
          console.log("processing")
          const newIntervalId = setInterval(fetchImageData, pollingInterval);
          intervalIdRef.current = newIntervalId;
          console.log(intervalIdRef.current, ';', newIntervalId)
        }
      } else {
        // If no processing images, clear the interval
        console.log("clearing the interval")
        if(intervalIdRef.current){
          console.log("processing done")
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      }
  }
  useEffect(() => {
    
    // Fetch image data initially when the component mounts
    fetchImageData();

    // Clean up the interval when the component unmounts
    // return () => {
    //   if (intervalId) {
    //     clearInterval(intervalId);
    //   }
    // };
    
  }, []);
  return (
    <div>
        <div className="product-page">
      <h1>Product Page</h1>
      <div className="product-list">
        {products.map((product, index) => (

          <div className="product" key={index}>
            {product.image_status === "Processing" ? (
            <img src={product.resize_image_path} alt={product.name} />
            ) : (
              <div>
                <img src={product.output_image_path} alt={product.name} />

              </div>
            )}
            <p>rgb {product.rgb_value}</p>
            <p>Dimensions: {product.emoji_dimension}</p>
            <p>Status: {product.image_status}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default ListingPage