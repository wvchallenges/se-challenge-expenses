import React, { Component } from 'react'

class CSVImportForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null
    }
  }


  render() {
    return <div>
      <input type="file" onChange={this.onFileChanged} />
      <input type="submit" value="Send File" onClick={this.submitForm} />
    </div>
  }

  onFileChanged = (e) => {
    this.setState({file: e.target.files[0]})
  }

  submitForm = (e) => {
    // TODO: Send to server
  }
}

export default CSVImportForm;
