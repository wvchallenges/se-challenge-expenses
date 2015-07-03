import React, { PropTypes } from 'react';

const DataTable = ({ data }) => {
  const propKeys = Object.keys(data[0]).filter(key => key !== 'id');
  const headers = propKeys.map(key => (
    <th key={key}>
      { key }
    </th>
  ));
  const cell = (row, i) => propKeys.map((key, j) => (
    <td key={i + 'cell' + j}>
      { row[key] }
    </td>
  ))
  return (
    <table className="p2 mb2 bg-darken-4 white rounded">
      <thead>
        <tr>
          { headers }
        </tr>
      </thead>
      <tbody>
        {
          data.map((row, i) => (
            <tr key={'row' + i}>
              { cell(row, i) }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
};

export default DataTable;
