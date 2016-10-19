// react
import React from 'react'
import { Link } from 'react-router'

// css
import './navlink.scss'

var NavLink = React.createClass({

  render() {
    return (
      <Link to={this.props.to} activeClassName="active">{this.props.children}</Link>
    )
  }
});

export default NavLink
export { NavLink }
