import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
 

const NavBar = () => {
    
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
  
      // Prepare the request body as a JSON string
      const requestBody = JSON.stringify({ refresh: refreshToken });
  
      const response = await fetch(''+process.env.REACT_APP_API_URL+'/user/logout/', {
        method: 'POST',
        body: requestBody, // Use the JSON string as the request body
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
  
      if (json.code === 400) {
        alert("Error Logging out, Please try again!");
      }
  
      if (json.code === 200) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        alert("User Logged out Successfully!");
        // navigate('/');
        window.location.href = '/';
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  return (
<div>
  <div className="main-nav__wrapper">
    <div style={{flexWrap: 'unset'}} className="main-nav menu-position--inline logo-alignment--center logo-position--center search-enabled--true" data-show-dropdown-on-click="">
      {/* Left navigation */}
      <div style={{width: '0%'}} className="nav nav--left align_left">
        {/* Desktop navigation */}
        <nav className="nav-desktop" data-nav="" data-nav-desktop="" aria-label="Translation missing: en.navigation.header.main_nav">
          {/* Your navigation items */}
        </nav>
      </div>

      {/* Logo */}
      <div style={{textAlign: 'left'}} className="header__logo logo--image">
        <a href="/" title="Turbo Theme Portland">
          <h1 style={{color: 'white'}}>Dupictably Lab</h1>
          {/* <img src="//turbo-theme.myshopify.com/cdn/shop/files/logo_home_portland_410x_d790bc90-5d6b-46f7-b235-a0fc4f9b18f1_410x.png?v=1625581205" className="primary_logo ls-is-cached lazyloaded" alt="Turbo Theme Portland" style={{ objectFit: 'cover', objectPosition: '50.0% 50.0%' }} /> */}
        </a>
      </div>

      {/* Right navigation */}
      <div style={{width: '80%'}} className="nav nav--right align_right">
        {/* Desktop navigation */}
        <nav className="nav-desktop" data-nav="" data-nav-desktop="" aria-label="Translation missing: en.navigation.header.main_nav">
          {/* Your navigation items */}
        </nav>
        
        {/* Logout button */}
        <div>
          
        { localStorage.getItem('refreshToken') ?  (
        <div>
          <button className="logout-button" onClick={logoutUser}>Logout</button>
          {
            localStorage.getItem('username') === "superadmin" ? 
            <Link to='/admindashboard'className='logout-button' style={{color: 'white', background: 'none'}}>{localStorage.getItem('username')}</Link> : null
          }
        
        </div>
        ): null}
        </div>
      </div>

    </div>
  </div>
</div>
  )
}

export default NavBar