import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Registration/Registration.css'
 
const Registration = () => {
    
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    const user = {
      "first_name": firstName,
      "last_name": lastName,
      "username": username,
      "password": password,
      "email": email
    }

    const response = await fetch(""+process.env.REACT_APP_API_URL+"/user/register/", {
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    const json = await response.json()
    console.log(json)
    if (json.code === 400){
      alert("Error during registration. Please try again!")
    }
    if (json.code === 200){
     alert("User registered successfully!")
     navigate('/')
    }

  };
  return (
    <div className="content">
    <div className="one-whole column collection_nav">
      <h1 className='createheading'>Create Account</h1>
      <div className="feature-divider"></div>
    </div>

    <div className="three-eighths columns medium-down--one-whole offset-by-five is-hidden-offset-mobile-only">
      <br />
      <div id="customer">
        <div id="create-customer">
          <form
            method="post"
            action="/account"
            id="create_customer"
            acceptCharset="UTF-8"
            data-login-with-shop-sign-up="true"
            onSubmit={handleSignupSubmit}
          >
            <input type="hidden" name="form_type" value="create_customer" />
            <input type="hidden" name="utf8" value="✓" />
            <div id="first_name">
              <label htmlFor="first_name" className="login">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                name="customer[first_name]"
                id="first_name"
                size="30"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div id="last_name">
              <label htmlFor="last_name" className="login">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                name="customer[last_name]"
                id="last_name"
                size="30"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div id="username">
              <label htmlFor="email" className="login">
                Username
              </label>
              <input
                type="text"
                value={username}
                name="customer[username]"
                id="username"
                size="30"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div id="email">
              <label htmlFor="email" className="login">
                Email
              </label>
              <input
                type="email"
                value={email}
                name="customer[email]"
                id="email"
                size="30"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div id="password">
              <label htmlFor="password" className="login">
                Password
              </label>
              <input
                type="password"
                value={password}
                name="customer[password]"
                id="password"
                className="password"
                size="30"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="acceptsMarketing">
              <input
                type="checkbox"
                id="customer[accepts_marketing]"
                name="customer[accepts_marketing]"
                checked={acceptsMarketing}
                onChange={(e) => setAcceptsMarketing(e.target.checked)}
              />
              <label htmlFor="customer[accepts_marketing]">Subscribe to our newsletter?</label>
            </div> */}
            <div className="action_bottom">
              <input className="global-button global-button--primary" type="submit" value="Sign Up" />
              <p className="right" style={{ paddingTop: '8px' }}>
                Returning Customer? <Link to="/" id="customer_login_link">Login →</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Registration