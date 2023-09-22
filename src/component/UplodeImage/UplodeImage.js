import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
const UplodeImage = () => {
    const [selectedCode, setSelectedCode] = useState('');
    const emojis = ["😊", "❤️", "☹️", "🤡", "😵", "🤕", "👤", "😍", "🥰", "😗", "😋", "😛", "😝", "😠", "😬", "🐯", "🌚", "🐼", "🐶", "🐵", "🥦", "🎯", "🤾", "🚴"];

    const handleEmojiSelect = (event) => {
      setSelectedCode(event.target.value);
    };
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState(null);

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

    reader.onload = (e) => {
      setImage(e.target.result);
    };
 
    reader.readAsDataURL(file);
  };

  return (
    <div className="three-eighths columns medium-down--one-whole offset-by-five is-hidden-offset-mobile-only animated fadeInUp">
    <div>
    <button onClick={() => setShowPicker(!showPicker)}>
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
    <label htmlFor="xInput">Enter X:</label>
      <input
        type="text"
        id="xInput"
      />

      <label htmlFor="yInput">Enter Y:</label>
      <input
        type="text"
        id="yInput"
      />
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} className='imgUplode' alt="Uploaded" width="200" height="200" />}
    </div>
    <div className="emoji-code-dropdown">
      <label htmlFor="emojiCodeDropdown">Select Emoji Code:</label>
      <select
        id="emojiCodeDropdown"
        onChange={handleEmojiSelect}
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
      {selectedCode && (
        <div>
          <p>Selected Emoji Code:</p>
          <span>{selectedCode}</span>
          <span>&#10004;</span>
        </div>
      )}
    </div>

  </div>

  )
}

export default UplodeImage