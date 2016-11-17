import React, { Component } from 'react'
import $ from 'jquery'


export default class App extends Component {
	constructor(props) {
		super(props)
		this.submitFile = this.submitFile.bind(this)
	}

	submitFile() {
		const data = new FormData()
		data.append('file', document.getElementById('file').files[0])

		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "/api/uploadFile",
		  "method": "POST",
		  "headers": {
		    "cache-control": "no-cache"
		  },
		  "processData": false,
		  "contentType": false,
		  "mimeType": "multipart/form-data",
		  "data": data
		}

		$.ajax(settings).done(function (response) {
		  console.log(response);
		})
	}

	render() {
		return (
		<div>
			<h1>Wave Software Engineer Coding Challenge</h1>
			<input type='file' id='file' name='file'/>
			<button onClick={() => this.submitFile()}>
			Click to upload file
			</button>
		</div>
		)
	}
}