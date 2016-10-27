// react
import React from 'react'

// libraries
import axios from 'axios'
import _ from 'underscore'

// css
import './summary.scss'

var Summary = React.createClass({
  getInitialState: function() {
    return {
      expenses: []
    }
  },
  componentDidMount: function() {
    window.googleChartReactPackages = ['corechart', 'gantt'];

    axios.get('/expenses/summary/json')
      .then(function(response) {
        if (response.data.length > 0) {
          this.setState({expenses: response.data});
        }
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      })
  },
  getMonth(month) {
    const MONTHS = ['','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

    return MONTHS[parseInt(month)];
  },
  render() {
    return (
      <div id="summary" className="page container">
        <h1>Expenses Summary</h1>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Pre-tax Amount</th>
              <th>Tax Amount</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
          {_.map(this.state.expenses, function(expense) {
              return (
                <tr key={expense.Year+'-'+this.getMonth(expense.Month)}>
                  <td>{expense.Year}</td>
                  <td>{this.getMonth(expense.Month)}</td>
                  <td>${expense.Amount.toFixed(2)}</td>
                  <td>${expense.Taxes.toFixed(2)}</td>
                  <td>${expense.Total.toFixed(2)}</td>
                </tr>
              )
          }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
});

export default Summary
export { Summary }
