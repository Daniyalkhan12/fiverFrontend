import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import './uplodeimage.css'
import { useEffect } from 'react';
 
const UplodeImage = () => {
    
  const navigate = useNavigate();
  
  const [pos_x, setPosX] = useState('');
  const [pos_y, setPosY] = useState('');
  const [emoji_dimensions, setEmojiDimensions] = useState('');
  const [isPreset, setIsPreset] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
    const [selectedCode, setSelectedCode] = useState([]);
    const [selectedFont, setSelectedFont] = useState('')
    const emojis = ["😊", "❤️", "☹️", "🤡", "😵", "🤕", "👤", "😍", "🥰", "😗", "😋", "😛", "😝", "😠", "😬", "🐯", "🌚", "🐼", "🐶", "🐵", "🥦", "🎯", "🤾", "🚴"];

    const [selectedProduct, setSelectedProduct] = useState('');
    const [presets, setPresets] = useState([])
    const [products, setProducts] = useState([])

    const handleProductSelect = async (event) =>{
      setSelectedProduct(event.target.value)
      
      const product_id = {
        "product_id": event.target.value.split("-")[0]
      }
      console.log(product_id)
      const response = await fetch(''+process.env.REACT_APP_API_URL+'/lookup/preset_list/',{
        method: 'POST',
        body: JSON.stringify(product_id),
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok){
        console.error("Error Fetching presets")
        return;
      }
      const responseData = await response.json()
      if(responseData.code != 200){
        console.error("Error getting presets")
        return;
      }
      // Store the product in the state
      setPresets(responseData.data);
      if (responseData.data.length > 0)
        setIsPreset(true)
      else
        setIsPreset(false)
      }

    const handleEmojiSelect = (event) => {
      const allOptions = [...selectedCode, event.target.selectedOptions[0].value]
      setSelectedCode(allOptions);
    };
    const handleFontSelection = (event) => {
      setSelectedFont(event.target.value);
    };
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor.rgb);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setColor((prevColor) => ({
      ...prevColor,
      [name]: parseInt(value, 10),
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setUrlImage(file)
    reader.onload = (e) => {
      setUploadImage(e.target.result);
    };
 
    reader.readAsDataURL(file);
  };
  
  const handleUploadButton = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken')
    var imageDetails = new FormData();
    imageDetails.append("image", urlImage);
    console.log(isPreset, emoji_dimensions)
    if(isPreset){
      imageDetails.append("pos_x", emoji_dimensions.split("-")[0])
      imageDetails.append("pos_y", emoji_dimensions.split("-")[1])
    }else{
      imageDetails.append("pos_x", pos_x);
      imageDetails.append("post_y", pos_y);
    }
    imageDetails.append("red", color.r);
    imageDetails.append("green", color.g);
    imageDetails.append("blue", color.b);
    imageDetails.append("emoji", selectedCode)
    imageDetails.append("font", selectedFont)
    const response = await fetch(""+process.env.REACT_APP_API_URL+"/image/upload/", {
      method: 'POST',
      body: imageDetails,
      headers:{
        'Authorization': 'Bearer ' + accessToken
      }
    })
    // console.log(response)
    const json = await response.json()
    // console.log(json)
    if (json.code === 400){
      alert("Error during generating. Please try again!")
    }
    if (json.code === 200){
     alert("Generating Image, Please wait a few seconds!")
     navigate('/listingPage')
    }

  };
  const fetchShopifyProductData = async () => {
    const response = await fetch(''+process.env.REACT_APP_API_URL+'/lookup/product_fetch',{
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    }
  })
  if (!response.ok){
    console.error("Error Fetching products")
    return;
  }
  const responseData = await response.json()
  if(responseData.code != 200){
    console.error("Error getting products")
    return;
  }
  // Store the product in the state
  setProducts(responseData.data);
  }
  useEffect(() => {
    fetchShopifyProductData()

  }, []);
  return (
    <div className="three-eighths columns medium-down--one-whole offset-by-five is-hidden-offset-mobile-only animated fadeInUp">
    <div>
      
      <form
            method="post"
            action="/account"
            id="create_customer"
            acceptCharset="UTF-8"
            data-login-with-shop-sign-up="true"
            onSubmit={handleUploadButton}
          >
    <div>
    
    <button type='button' onClick={() => setShowPicker(!showPicker)}>
        Select Color
      </button>
      {showPicker && (
        <div style={{ position: 'absolute', zIndex: 999 }}>
          <SketchPicker
            color={color}
            onChange={handleColorChange}
          />
        </div>
      )}
      <input
        type="number"
        name="r"
        value={color.r}
        onChange={handleInputChange}
        placeholder="Red"
      />
      <input
        type="number"
        name="g"
        value={color.g}
        onChange={handleInputChange}
        placeholder="Green"
      />
      <input
        type="number"
        name="b"
        value={color.b}
        onChange={handleInputChange}
        placeholder="Blue"
      />
    </div>
    
    <select className='emoji-code-dropdown' value={selectedProduct} onChange={handleProductSelect}>
                <option value="">Select Product</option>
                
                {products.map((product) => (
                  <option key={product.id} value={`${product.id}-${product.title}`}>
                    {product.title}
                  </option>
                ))}
            </select>
      {
        presets.length !== 0 ? (
      
        <select className='emoji-code-dropdown' value={emoji_dimensions} onChange={(e) => setEmojiDimensions(e.target.value)}>
                  <option value="">Select Dimensions</option>
                    
                    {presets.map((preset) => (
                      <option key={preset.id} value={preset.pos_x + "-" + preset.pos_y}>
                        {"X: " + preset.pos_x + " - Y:" + preset.pos_y}
                      </option>
                    ))}
                </select>) : (
              <div>

                <label htmlFor="xInput">Enter X:</label>
                  <input
                    type="text"
                    id="xInput"
                    value={pos_x}
                    onChange={(e) => setPosX(e.target.value)}
                    />

              <label htmlFor="yInput">Enter Y:</label>
                    <input
                      type="text"
                      id="yInput"
                      value={pos_y}
                      onChange={(e) => setPosY(e.target.value)}
                    />
                      </div>)
        }
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadImage && <img src={uploadImage} className='imgUplode' alt="Uploaded" width="200" height="200" />}
    </div>
    <div className="emoji-code-dropdown">
      <label htmlFor="emojiCodeDropdown1">Select Font:</label>
      <select
        id="emojiCodeDropdown1"
        onChange={handleFontSelection}
        value={selectedFont}
      >
        
        <option value="">Select font</option>
        <option value="public/font/NotoColorEmoji.ttf">Noto Color Emoji</option>
        <option value="public/font/AppleColorEmoji.ttf">Apple Color</option>
        <option value="public/font/Samsung_Emoji.ttf">Samsung</option>
      </select>
    </div>
    
    <div className="emoji-code-dropdown">
      <label htmlFor="emojiCodeDropdown">Select Emoji Code:</label>
      <select
        id="emojiCodeDropdown"
        onChange={handleEmojiSelect}
        multiple
        value={selectedCode}
      >
        
        <option value="">Select an emoji code</option>
        {emojis.map((emoji, index) => (
          <option key={index} value={emoji}>
            {emoji}
          </option>
        ))}
        {/* Add more emoji codes here */}
      </select>
      {selectedCode.length !== 0 && (
        <div>
          <p>Selected Emoji Code:</p>
          <span>{selectedCode.join('✓, ')}</span>
        </div>
      )}
    </div>
    
    <div className="action_bottom">
              <input className="global-button global-button--primary" type="submit" value="Generate Image" />
        </div>
    </form>
    </div>
  </div>

  )
}

export default UplodeImage