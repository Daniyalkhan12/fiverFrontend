import React from 'react'

const NavBar = () => {
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