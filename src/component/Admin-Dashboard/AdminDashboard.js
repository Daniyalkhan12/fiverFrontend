
import { Link } from 'react-router-dom';
import './admindashboard.css'
import Table from 'react-bootstrap/Table';
import './admindashboard.css'
import React, { useState } from 'react';
const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (

    <div className="app-container">
      
      <nav className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link to="/">Image Uplode</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/profile">Image Listing</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/settings">Present</Link>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
      <div className="content">
      <div
        className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      >
        ☰
      </div>
        <h3>Product Present</h3>
        <div className='product-ent'>
            <select className='product-dropdown'>
                <option value="">Select Product</option>
            </select>
            <input
              type="text"
              size="30"
              autocorrect="off"
              autocapitalize="off"
              tabIndex="1"
              placeholder='PreSet X'
              className='prex'
            />
            <input
              type="text"
              size="30"
              autocorrect="off"
              autocapitalize="off"
              tabIndex="1"
              placeholder='PreSet Y'
              className='prey'
            />
            <button className='global-button global-button--primary btn-add'>Add</button>
        </div>
        <div>
        <Table striped bordered hover className='table-data'>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard