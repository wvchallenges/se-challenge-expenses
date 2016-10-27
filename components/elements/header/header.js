// react
import React from 'react'

// libraries

// components
import NavLink from './../navlink/navlink'
// constants

// css
import './header.scss'

var Header = React.createClass({

  render() {
    return (
      <div id="header">
        <div className="container">
          <div className="hidden-xs">
            <NavLink to="/upload">Upload Expenses</NavLink>
            <NavLink to="/summary">Expenses Summary</NavLink>
            <NavLink to="/full">Expenses Data</NavLink>
          </div>
          <div className="visible-xs">
            <div className="menu-button">
              <input type="checkbox" name="menu_control" id="menu_control" />
              <div className="arrow arrow-up"></div>
              <div className="arrow arrow-down"></div>
              <label htmlFor="menu_control"></label>
              <div className="menu">
                <ul>
                <li><NavLink to="/upload">Upload Expenses</NavLink></li>
                <li><NavLink to="/summary">Expenses Summary</NavLink></li>
                <li><NavLink to="/full">Expenses Data</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Header
export { Header }
