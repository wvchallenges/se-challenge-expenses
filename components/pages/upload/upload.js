// react
import React from 'react'
import { hashHistory } from 'react-router'

// libraries
import axios from 'axios'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'

// components
import Dropzone from 'react-dropzone'

// css
import './upload.scss'

var Upload = React.createClass({
  drop(files) {
    console.log(files[0])
    var data = new FormData();

    data.append("file_upload", files[0])

    axios.post('http://localhost:8000/expenses/', data)
      .then(function(response) {
        console.log(response);
        if (response.data) {
          swal("Success!", "The expenses have been uploaded.", "success")
          hashHistory.push('/summary')
        } else {
          swal("Failed!", "The expenses could not be uploaded.", "error")
        }
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      })
  },
  render() {
    return (
      <div id="upload" className="page container">
        <Dropzone ref={(dropzone) => {this._dropzone = dropzone}} className="dropzone" activeClassName="dropzone active" onDrop={this.drop} multiple={false} accept={"application/vnd.ms-excel,text/csv,application/csv"}>
          <div>Click or drag to upload file</div>
        </Dropzone>
      </div>
    )
  }
});

/*
Old school form

<form action="/expenses" method="POST">
  <div className="form-group">
    <label htmlFor="expense-upload">Expenses Upload</label>
    <input type="file" id="expense-upload" />
  </div>
  <div className="form-group">
    <button type="submit" onClick={this.submit}>Submit</button>
  </div>
</form>
*/

export default Upload
export { Upload }
