// react
import React from 'react'

// libraries
import axios from 'axios'
import _ from 'underscore'

// css
import './full.scss'

var Full = React.createClass({
  getInitialState: function() {
    return {
      expenses: []
    }
  },
  componentDidMount: function() {
    axios.get('/expenses/json')
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
      <div id="full" className="page container">
        <h1>Expenses Full List</h1>

        <table className="table table-striped table-hover table-condensed">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee Name</th>
              <th>Employee Address</th>
              <th>Category</th>
              <th>Description</th>
              <th>Pre-tax Amount</th>
              <th>Tax Amount</th>
              <th>Tax</th>
            </tr>
          </thead>

          <tbody>
          {_.map(this.state.expenses, function(expense) {
              return (
                <tr key={expense.ID}>
                  <td>{expense.date.substring(0,10)}</td>
                  <td>{expense["employee name"]}</td>
                  <td>{expense["employee address"]}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>${expense.tax_amount.toFixed(2)}</td>
                  <td>{expense.tax}</td>
                </tr>
              )
          }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
});

export default Full
export { Full }
