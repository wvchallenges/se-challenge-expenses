import React, { Component } from 'react'


export default class App extends Component {
	constructor(props) {
		super(props)

		this.submitFile = this.submitFile.bind(this)
	}

	submitFile() {
		console.log('works')
	}

	render() {
		return (
		<div>
			<h1>It works!</h1>
			<input type='file' />
			<button onClick={() => this.submitFile()}>
			Click to upload file
			</button>
		</div>
		)
	}
}