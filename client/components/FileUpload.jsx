import React, {Component} from 'react';

export default class FileUpload extends Component {
    /**
     * Handle the form submission
     * 
     * @param {Event} e
     */
    handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:3000/upload', true);
        xhr.onload = function () {
            if (this.status === 200) {
                console.log('success');
            } else {
                console.log('failure');
            }
        };
        xhr.send(formData);
    }

    render() {
        return <div>
            <form action="http://localhost:3000/upload" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                <input type="file" name="csvfiles" accept=".csv" /> 
                <input type="submit" value="Upload" />
            </form>
        </div>;
    }
}