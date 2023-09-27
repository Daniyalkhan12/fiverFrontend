import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/login.css'
import '../Registration/Registration'
 
const Login = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const login = {
      "username": email, 
      "password": password
    }
    console.log(process.env)
    console.log(''+process.env+'/user/login/')
    const response = await fetch(''+process.env.REACT_APP_API_URL+'/user/login/', {
      method: 'POST',
      body: JSON.stringify(login),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    const json = await response.json()
    console.log(json)
    if (json.code == 400){
      alert("Username or Password wrong, Please try again!")
    }
    if (json.code == 200){
      const access = json.data.access;
      localStorage.setItem('accessToken', access);
      const refresh = json.data.refresh;
      localStorage.setItem('refreshToken', refresh);
      const username = json.data.username;
      localStorage.setItem('username', username);


     alert("User Logged in Successfully!")
    //  navigate('/listingPage')
    window.location.href = "/listingPage"
    }

  };

  const handlePasswordResetClick = () => {
    setIsPasswordResetVisible(true);
  };

  const handleCancelPasswordReset = () => {
    setIsPasswordResetVisible(false);
  };

  return (
    <div>
        <div className="content">
      <div className="one-whole column collection_nav">
        <h1 className='Loginheading'>Login</h1>
        <div className="feature-divider"></div>
      </div>

      {isPasswordResetVisible ? (
        <div
          className="three-eighths columns medium-down--one-whole offset-by-five is-hidden-offset-mobile-only animated fadeInUp"
          id="recover-password"
        >
          <h4>Reset Password</h4>
          <form method="post" action="/account/recover" acceptCharset="UTF-8">
            <input type="hidden" name="form_type" value="recover_customer_password" />
            <input type="hidden" name="utf8" value="✓" />
            <div id="recover_email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                size="30"
                name="email"
                id="recover-email"
                autocorrect="off"
                autocapitalize="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p>
              <em className="note">We will send you an email to reset your password.</em>
            </p>
            <div className="action_bottom">
              <input
                className="global-button global-button--primary"
                type="submit"
                value="Submit"
              />
              <span className="note">
                or <a href="#" onClick={handleCancelPasswordReset}>Cancel</a>
              </span>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="three-eighths columns medium-down--one-whole offset-by-five is-hidden-offset-mobile-only animated fadeInUp"
          id="login_form"
        >
          <form
            method="post"
            action="/account/login"
            id="customer_login"
            acceptCharset="UTF-8"
            data-login-with-shop-sign-in="true"
            onSubmit={handleLoginSubmit}
          >
            <input type="hidden" name="form_type" value="customer_login" />
            <input type="hidden" name="utf8" value="✓" />
            <label htmlFor="customer_email" className="login">
              Username
            </label>
            <input
              id="customer_email"
              type="text"
              value={email}
              name="customer[email]"
              size="30"
              autocorrect="off"
              autocapitalize="off"
              tabIndex="1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="right">
              <em>
                <a href="#" onClick={handlePasswordResetClick}>
                  Forgot your password?
                </a>
              </em>
            </small>
            <label htmlFor="customer_password" className="login">
              Password
            </label>
            <input
              className="large password"
              id="customer_password"
              type="password"
              value={password}
              name="customer[password]"
              size="16"
              tabIndex="2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="global-button global-button--primary"
              type="submit"
              value="Login"
              tabIndex="3"
            />
            <p className="right" style={{ paddingTop: '10px' }}>
              New Customer? <Link to="/registration" id="customer_register_link">
                Sign up →
              </Link>
            </p>
            <input type="hidden" name="return_url" value="/account" />
          </form>
          <div className="large--right"></div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Login