import React from 'react'
import ReactDOM from 'react-dom'

import CSVImportForm from 'src/csv-import-form'

const HomeComponent = (props) => {
  return (
    <div>
      <h1>Form Import</h1>
      <CSVImportForm />
    </div>
  )
}

ReactDOM.render(<HomeComponent/>, document.getElementById('application-container'))
