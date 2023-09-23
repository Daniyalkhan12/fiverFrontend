import React from 'react'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
  
      // Prepare the request body as a JSON string
      const requestBody = JSON.stringify({ refresh: refreshToken });
  
      const response = await fetch('http://127.0.0.1:8000/user/logout/', {
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
        alert("User Logged out Successfully!");
        navigate('/');
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  return (
<div>
  <div className="main-nav__wrapper">
    <div className="main-nav menu-position--inline logo-alignment--center logo-position--center search-enabled--true" data-show-dropdown-on-click="">
      {/* Left navigation */}
      <div className="nav nav--left align_left">
        {/* Desktop navigation */}
        <nav className="nav-desktop" data-nav="" data-nav-desktop="" aria-label="Translation missing: en.navigation.header.main_nav">
          {/* Your navigation items */}
        </nav>
      </div>

      {/* Logo */}
      <div className="header__logo logo--image">
        <a href="/" title="Turbo Theme Portland">
          <img src="//turbo-theme.myshopify.com/cdn/shop/files/logo_home_portland_410x_d790bc90-5d6b-46f7-b235-a0fc4f9b18f1_410x.png?v=1625581205" className="primary_logo ls-is-cached lazyloaded" alt="Turbo Theme Portland" style={{ objectFit: 'cover', objectPosition: '50.0% 50.0%' }} />
        </a>
      </div>

      {/* Right navigation */}
      <div className="nav nav--right align_right">
        {/* Desktop navigation */}
        <nav className="nav-desktop" data-nav="" data-nav-desktop="" aria-label="Translation missing: en.navigation.header.main_nav">
          {/* Your navigation items */}
        </nav>
        
        {/* Logout button */}
        <div className="logout-button">
        { localStorage.getItem('refreshToken') ? (  <button onclick="logoutUser()">Logout</button>): null}
        </div>
      </div>

      {/* Search container */}
      <div className="search-container">
        {/* Search form */}
        <div className="search-form-container">
          {/* Your search form */}
        </div>

        {/* Search link */}
        <div className="search-link">
          <a className="icon-search dropdown_link active_link" href="/search" title="Search" data-dropdown-rel="search"></a>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default NavBar