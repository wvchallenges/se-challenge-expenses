import React, {Component} from 'react';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class MonthlyExpenseTable extends Component {

    render() {
        return <div>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Total Expenses</th>
                    </tr>
                    </thead>
                <tbody>
                { 
                    this.props.dataArray ?
                        this.props.dataArray
                            .sort((a, b) => {
                                return a.month - b.month;
                            })
                            .map(row => {
                                return <tr key={row.month}>
                                    <td>{monthNames[new Date(row.month).getMonth()]} {new Date(row.month).getFullYear()}</td>
                                    <td>{row.totalExpenses.toFixed(2)}</td>
                                </tr>;
                            }) :
                        null
                }
                </tbody>
            </table>
        </div>;
    }
}