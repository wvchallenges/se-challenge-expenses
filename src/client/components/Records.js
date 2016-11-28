import React from 'react';

const Records = ({ records }) => (
  records.length > 0 ?
    <div className="center">
      <p>Your monthly expense after tax.</p>
      <table className="table-margin">
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Expense</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.yy_mm}</td>
              <td>{record.sum}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div> :
    <div className="center">
      <p>Calculate your monthly expense by uploading a .csv file with the following columns like the example below.</p>
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>category</th>
            <th>employee name</th>
            <th>employee address</th>
            <th>expense description</th>
            <th>pre-tax amount</th>
            <th>tax name</th>
            <th>tax amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12/1/2013</td>
            <td>Travel</td>
            <td>Don Draper</td>
            <td>783 Park Ave, New York, NY 10021</td>
            <td>Taxi ride</td>
            <td>350</td>
            <td>NY Sales tax</td>
            <td>31.06</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

Records.propTypes = {
  records: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
};

export default Records;

