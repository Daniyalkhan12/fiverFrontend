import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import './uplodeimage.css'
import { useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [selectedProduct, setSelectedProduct] = useState('');
    const [presets, setPresets] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);

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

    const addEmoji = (emoji) => {
      if (selectedCode.length === 27){
        alert('Limit Reached! Please pick only upto 27 emojis')
        return
      }
      const allOptions = [...selectedCode, emoji.native]
      setSelectedCode(allOptions);
    }
    const handleFontSelection = (event) => {
      setSelectedFont(event.target.value);
    };
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [showPicker, setShowPicker] = useState(false);

    
  const buttonStyle = {
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
    marginLeft: '1rem',
    border: '1px dotted black',
    borderRadius: '10%',
    paddingLeft: '6rem'
  };

  const handleColorChange = (newColor) => {
    toast.info('Generating Image! Please wait a few seconds', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
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
    setLoading(true)
    const accessToken = localStorage.getItem('accessToken')
    var imageDetails = new FormData();
    imageDetails.append("image", urlImage);
    console.log(isPreset, emoji_dimensions)
    if(isPreset){
      imageDetails.append("pos_x", emoji_dimensions.split("-")[0])
      imageDetails.append("pos_y", emoji_dimensions.split("-")[1])
    }else{
      imageDetails.append("pos_x", pos_x);
      imageDetails.append("pos_y", pos_y);
    }
    imageDetails.append("red", color.r);
    imageDetails.append("green", color.g);
    imageDetails.append("blue", color.b);
    imageDetails.append("emoji", selectedCode)
    imageDetails.append("font", selectedFont)
    console.log(selectedCode)
    console.log(...imageDetails)
    const response = await fetch(""+process.env.REACT_APP_API_URL+"/image/upload/", {
      method: 'POST',
      body: imageDetails,
      headers:{
        'Authorization': 'Bearer ' + accessToken
      }
    })
    // console.log(response)
    const json = await response.json()
    if (json)
      setLoading(false)
    if (json.code === 400){
      toast.error('🦄 Wow so easy!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    if (json.code === 200){
      toast.info('Generating Image! Please wait a few seconds', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    //  navigate('/listingPage')
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
    
    <LoadingOverlay
      
          //visibility of Overlay Loading Spinner
          active={loading}
          spinner
          //Text with the Spinner
          text={'Generating...'}
          //Text style of the Spinner Text
          // textStyle={styles.spinnerTextStyle}
    >
    <ToastContainer transition={Slide}/>
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
        <span style={buttonStyle}></span>
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
        required
      />
      <input
        type="number"
        name="g"
        value={color.g}
        onChange={handleInputChange}
        placeholder="Green"
        required
      />
      <input
        type="number"
        name="b"
        value={color.b}
        onChange={handleInputChange}
        placeholder="Blue"
        required
      />
    </div>
    
    <select className='emoji-code-dropdown' value={selectedProduct} onChange={handleProductSelect}
        required>
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
                    required
                    />

              <label htmlFor="yInput">Enter Y:</label>
                    <input
                      type="text"
                      id="yInput"
                      value={pos_y}
                      onChange={(e) => setPosY(e.target.value)}
                      required
                    />
                      </div>)
        }
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} 
        required/>
      {uploadImage && <img src={uploadImage} className='imgUplode' alt="Uploaded" width="200" height="200" />}
    </div>
    <div className="emoji-code-dropdown">
      <label htmlFor="emojiCodeDropdown1">Select Font:</label>
      <select
        id="emojiCodeDropdown1"
        onChange={handleFontSelection}
        value={selectedFont}
        required
      >
        
        <option value="">Select font</option>
        <option value="public/font/NotoColorEmoji.ttf">Noto Color Emoji</option>
        <option value="public/font/AppleColorEmoji.ttf">Apple Color</option>
        <option value="public/font/Samsung_Emoji.ttf">Samsung</option>
      </select>
    </div>
    
    <div className="emoji-code-dropdown">
      <label htmlFor="emojiCodeDropdown">Select Emoji Code:</label>
      {/* <select
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
      </select> */}
      {/* <div id="drawer" class="emoji-drawer"> 
        
        {emojis.map((emoji, index) => (
          <div id={index} class="emoji" onClick={()=>addEmoji(this.innerHTML)}>
            {emoji}
          </div>
        ))}
      </div> */}
      
      <Picker data={data} theme="auto" onEmojiSelect={addEmoji} />

        <div>
          <p>Selected Emoji Code:</p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{flex: '90%', border: '1px solid black', borderRadius: '0.5rem', padding: '0px 2px 0px 5px'}}>{selectedCode.join(' ')}</span>
            <button type='button' className="delete-button" onClick={()=> setSelectedCode(selectedCode.slice(0, -1))}>&lt;</button>
          </div>
        </div>
        
    </div>
    
    <div className="action_bottom generate-image-button">
              <input className="global-button global-button--primary" type="submit" value="Generate Image" />
        </div>
    </form>
    </div>
  </div>
  </LoadingOverlay>
  )
}

export default UplodeImage