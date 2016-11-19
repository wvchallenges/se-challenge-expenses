import React, { Component } from 'react'
import $ from 'jquery'
import calculateMonthlyExpenses from '../util_client'


export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			monthlyExpenses: [],
			hasFile: false,
			error: false,
			errorMsg: '',
			isFetchingData: false,
			buttonStyle: 'btn-primary',
			buttonMsg: 'Click to upload'
		}

		this.submitFile = this.submitFile.bind(this)
		this.renderTable = this.renderTable.bind(this)
		this.renderMessages = this.renderMessages.bind(this)
		this.displayFileName = this.displayFileName.bind(this)
	}


	renderTable() {
		const { monthlyExpenses, isFetchingData, error } = this.state 

		if(isFetchingData) {
			return ( 
			<div className='spinner'>
				<img src='../assets/hex-loader2.gif' />
			</div>
			)
		}

		if(monthlyExpenses.length < 1) {
			return ( <noscript /> )
		}

		if(!error) {
			return (
				<div className='container'>
					<table className='table'>
					<thead>
					<tr>
						<th>Month and Year</th>
						<th>Total Expenses</th>
					</tr>
					</thead>
					<tbody>
					{Object.keys(monthlyExpenses).map((key, i) => {
					return (
						<tr key={i}>
							<td>{key}</td>
							<td>${monthlyExpenses[key]}</td>
						</tr>
					)
					})}
					</tbody>
					</table>
				</div>
			)
		}
	}

	displayFileName() {
		this.setState({ 
			hasFile: true,
			buttonStyle: 'btn-primary',
			buttonMsg: 'Click to upload',
			error: false
		 })
	}

	renderMessages() {
		const { error, hasFile } = this.state

		if(error) {
			return ( <p className='error'>{this.state.errorMsg}</p>)
		}

		if(hasFile) {
			let fileName = document.getElementById('file').files[0].name
			return ( 
				<p className='fileName'>
				You're uploading: <strong>{fileName}</strong>
				</p>
			)
		}
	}

	submitFile() {
		let file = document.getElementById('file').files[0]
		
		this.setState({ isFetchingData: true })

		const data = new FormData()
		data.append('file', file)

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

		$.ajax(settings).done(response => {
		  let monthlyExpenses = calculateMonthlyExpenses(JSON.parse(response))
		  this.setState({ monthlyExpenses, 
		  	isFetchingData: false, 
		  	hasFile: false ,
		  	buttonStyle: 'btn-success',
		  	buttonMsg: 'File uploaded'
		  })
		})
		.fail(err => {
			this.setState({ 
				error: true, 
				errorMsg: 'Could not upload that file, please try another',
				hasFile: false,
				isFetchingData: false,
				buttonStyle: 'btn btn-danger',
				buttonMsg: 'File not uploaded' 
			})
		})
	}

	render() {
		const { buttonStyle, buttonMsg } = this.state
		return (
		<div>
			<h1 className='title'>Wave Software Engineer Coding Challenge</h1>
			<div className='inputs'>
				<label className="btn btn-default btn-file">
				Choose a file<input 
						type='file' 
						id='file' 
						name='file'
						onChange={this.displayFileName} 
						style={{'display': 'none' }} />
				</label>
				<button 
					onClick={() => this.submitFile()}
					className={`btn ${buttonStyle}`} 
					disabled={!this.state.hasFile}>
					{buttonMsg}
				</button>
			</div>
			{this.renderMessages()}
			{this.renderTable()}
		</div>
		)
	}
}