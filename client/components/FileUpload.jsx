import React, {Component} from 'react';

export default class FileUpload extends Component {
    

    constructor(props) {
        super(props);
        this._handleSubmit = (e) => this.handleSubmit(e);
    }
    /**
     * Handle the form submission
     * 
     * @param {Event} e
     */
    handleSubmit(e) {
        e.preventDefault();
        let xhr = new XMLHttpRequest();           
        xhr.open('post', 'http://localhost:3000/upload', true);     
        xhr.onload = () => {
            this.props.fileUploadComplete();
            this.refs.fileInput.value = null;
        };

        let formData = new FormData(e.target);
        xhr.send(formData);
    }

    render() {
        return <div>
            <form method="POST" onSubmit={this._handleSubmit} encType="multipart/form-data">
                <input type="file" ref="fileInput" name="csvfiles" accept=".csv" /> 
                <input type="submit" value="Upload" />
            </form>
        </div>;
    }
}