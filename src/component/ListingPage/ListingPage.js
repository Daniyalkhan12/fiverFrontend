import React, { useEffect, useState, useRef } from 'react';
import '../ListingPage/listingpage.css'
import { Link } from 'react-router-dom';
 

const ListingPage = () => {
    
  const [products, setData] = useState([]);
  const pollingInterval = 5000; 
  const intervalIdRef = useRef(null);
  const username = localStorage.getItem('username');
  const handleShopifyOrder = async (event) =>{
    const buttonID = event.target.id;
    const [emoji_position, rgbValue, urlImage] = buttonID.split("-")
    
    const numbers = rgbValue.match(/\d+/g);
    const position = emoji_position.match(/\d+/g);

    // Convert the extracted strings to integers
    const red = parseInt(numbers[0]);
    const green = parseInt(numbers[1]);
    const blue = parseInt(numbers[2]);
    
    const pos_x = parseInt(position[0]);
    const pos_y = parseInt(position[1]);
    const accessToken = localStorage.getItem('accessToken')
    console.log([red, green, blue, pos_x, pos_y, urlImage].join(" - "))
    var imageDetails = new FormData();
    imageDetails.append("image", urlImage);
    imageDetails.append("pos_x", pos_x);
    imageDetails.append("post_y", pos_y);
    imageDetails.append("red", red);
    imageDetails.append("green", green);
    imageDetails.append("blue", blue);
    const response = await fetch(""+process.env.REACT_APP_API_URL+"/image/order/", {
      method: 'POST',
      body: imageDetails,
      headers:{
        'Authorization': 'Bearer ' + accessToken
      }
    })
    // console.log(response)
    const json = await response.json()
    console.log(json)
    if (json.code === 400){
      
      window.open(json.message, '_blank');
    }
    if (json.code === 200){
      console.log(json.message)
      window.open(json.message, '_blank');
    }
  }

  const fetchImageData = async () => {
    console.log("calling")
    const response = await fetch(''+process.env.REACT_APP_API_URL+'/image/list/?per_page=10&page_no=1',{
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
    console.log(responseData.data.dataset)
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
      
      <h1 style={{marginTop: '1rem'}}>Product Page</h1>
    <div className="action_bottom action_bottom1">
      <Link className="global-button global-button--primary" to="/uploadImage">Upload Image</Link>
    </div>
      <div className="product-list">
        { products.length !== 0 ? 
        (
          products.map((product, index) => (

            <div className="product" key={index}>

              {product.image_status === "Processing" ? (
                <img src="loading_gif2.gif" alt={product.name} />
                ) : (
                
              <div className="imageContainer">
                  <img className="image" src={""+process.env.REACT_APP_API_URL+"/" + product.output_image_path} alt={product.name} />
                  {
                    username !== "superadmin" ? (
                      <div className="middle">
                        <button onClick={handleShopifyOrder} className="text" 
                        id={product.emoji_dimension + "-" + product.rgb_value + "-" + product.output_image_path}
                        >Order</button>
                      </div>
                    ) : (
                      <div className="middle">
                        <button className="text" style={{backgroundColor: 'darkred'}}
                        id={product.emoji_dimension + "-" + product.rgb_value + "-" + product.output_image_path}
                        >Order (not for admin)</button>
                        </div>
                        )
                  }
                </div>
              )}
              <p>rgb {product.rgb_value}</p>
              <p>Dimensions: {product.emoji_dimension}</p>
              <p>Status: {product.image_status}</p>
            </div>
          ))
        ) : (<h3 style={{margin: 'auto', marginTop: '2rem', color: 'darkred'}}>You don't have any generated images</h3>)
      }
        
      </div>
    </div>
    </div>
  )
}

export default ListingPage