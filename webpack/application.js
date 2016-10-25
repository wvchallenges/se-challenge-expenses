import React from 'react'
import ReactDOM from 'react-dom'

const HomeComponent = (props) => {
  return (
    <div>
      <h1>Hi</h1>
      Hello, World!
    </div>
  )
}

ReactDOM.render(<HomeComponent/>, document.getElementById('application-container'))
