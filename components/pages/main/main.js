// react
import React from 'react'

// libraries

// components
import Header from './../../elements/header/header'

// constants

// css
import './main.scss'

var Main = React.createClass({

  render() {
    return (
      <div id="main">
        {this.props.children}
        <Header />
      </div>
    )
  }
});

export default Main
export { Main }
