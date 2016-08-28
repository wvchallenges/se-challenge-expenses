import React, {Component} from 'react';
import FileUpload from './FileUpload';
import MonthlyExpenseTable from './MonthlyExpenseTable';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthlyExpenses: []
        };

        this._fileUploadComplete = () => this.fileUploadComplete();
    }

    fileUploadComplete() {
        this.updateMonthlyExpenses();
    }

    updateMonthlyExpenses() {
        let xhr = new XMLHttpRequest();           
        xhr.open('get', 'http://localhost:3000/expensesPerMonth', true);     
        xhr.onload = () => {
            this.setState({
                monthlyExpenses: JSON.parse(xhr.response)
            })
        };
        xhr.send();
    }

    render() {
        return <div>
            <FileUpload fileUploadComplete={this._fileUploadComplete} />
            <MonthlyExpenseTable dataArray={this.state.monthlyExpenses} />
        </div>
    }
}