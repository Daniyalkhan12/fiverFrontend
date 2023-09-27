
import { Link, useNavigate } from 'react-router-dom';
import './admindashboard.css'
import Table from 'react-bootstrap/Table';
import './admindashboard.css'
import React, { useEffect, useState } from 'react';
const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [presetX, setPresetX] = useState(null)
    const [presetY, setPresetY] = useState(null)
    const [products, setProducts] = useState([])
    const [presets, setPresets] = useState([])
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const handleProductSelect = (event) =>{
      setSelectedProduct(event.target.value)
    }

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    const handleDelete = async (index, id) => {
      // Create a copy of the presets array
      const updatedPresets = [...presets];
      // Remove the preset at the specified index
      updatedPresets.splice(index, 1);
      // Update the state with the new array
      setPresets(updatedPresets);

      const accessToken = localStorage.getItem('accessToken')
      const presetData = {
        "id": id
      }
      console.log(presetData)
      const response = await fetch(""+process.env.REACT_APP_API_URL+"/lookup/preset_delete/", {
        method: 'POST',
        body: JSON.stringify(presetData),
        headers:{
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      })
      // console.log(response)
      const json = await response.json()
      // console.log(json)
      if (json.code === 400){
        alert("Error deleting preset. Please try again!")
      }
      if (json.code === 200){
       alert("Preset Deleted")
      }
    };
  
    const handlePresetAddButton = async (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem('accessToken')
      console.log(accessToken)
      const presetData = {
        "product_id": selectedProduct.split("-")[0],
        "product_name": selectedProduct.split("-")[1],
        "pos_x": Number(presetX),
        "pos_y": Number(presetY)
      }
      console.log(presetData)
      const response = await fetch(""+process.env.REACT_APP_API_URL+"/lookup/preset_add/", {
        method: 'POST',
        body: JSON.stringify(presetData),
        headers:{
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      })
      // console.log(response)
      const json = await response.json()
      // console.log(json)
      if (json.code === 400){
        alert("Error adding presets. Please try again!")
      }
      if (json.code === 200){
       alert("Preset Added")
       
      const updatedPresets = [...presets, presetData]
        setPresets(updatedPresets);
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
    const fetchPresetData = async () => {
      const response = await fetch(''+process.env.REACT_APP_API_URL+'/lookup/preset_list_all',{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
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
    }
    useEffect(() => {
      fetchShopifyProductData()
      fetchPresetData();

    }, []);
  return (

    <div className="app-container">
      
      <nav className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <div
        className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      >
        <h4 className='close'>Close</h4>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link to="/uploadImage">Image Uplode</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/listingPage">Image Listing</Link>
        </li>
        <li className="sidebar-item active">
          <Link to="#">Preset</Link>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
      <div className="content1">
      <div
        className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      >
        ☰
      </div>
        <h3>Product Preset</h3>
        <form
            method="post"
            action="/account"
            acceptCharset="UTF-8"
            data-login-with-shop-sign-up="true"
            onSubmit={handlePresetAddButton}
          >
        <div className='product-ent'>
          
            <select className='product-dropdown' value={selectedProduct} onChange={handleProductSelect}>
                <option value="">Select Product</option>
                
                {products.map((product) => (
                  <option key={product.id} value={`${product.id}-${product.title}`}>
                    {product.title}
                  </option>
                ))}
            </select>
            <input
              type="text"
              size="30"
              autocorrect="off"
              autocapitalize="off"
              tabIndex="1"
              placeholder='Preset X'
              value={presetX}
              className='prex'
              onChange={(event) => setPresetX(event.target.value)}
            />
            <input
              type="text"
              size="30"
              autocorrect="off"
              autocapitalize="off"
              tabIndex="1"
              value={presetY}
              placeholder='Preset Y'
              className='prey'
              onChange={(event) => setPresetY(event.target.value)}
            />
            <input className="global-button global-button--primary submit-button" type="submit" value="Add"/>
        </div>
            </form>
        <div className='table-div'>
        <Table striped bordered hover className='table-data'>
        <thead>
        <tr>
          <th>#</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Preset X</th>
          <th>Preset Y</th>
        </tr>
      </thead>
      <tbody>
        {presets.map((preset, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{preset.product_id}</td>
            <td>{preset.product_name}</td>
            <td>{preset.pos_x}</td>
            <td>{preset.pos_y}</td>
            <td>
              <button className="table-button" onClick={() => handleDelete(index, preset.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard