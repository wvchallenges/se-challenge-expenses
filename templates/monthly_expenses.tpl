<style>
  /*moved to css file*/
  body {
    padding: 2rem 15rem;
  }
  .button {
    background-color: #e7e7e7;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }

  .expenses {
    border: 1px solid black;
    font-size: 16px;
    border-collapse: collapse;
    border-spacing: 0;
    border-color: grey;
    width: 50rem;
    vertical-align: middle;
    text-align: center;
  }
  .expenses, th, td {
    padding-top: 11px;
    padding-bottom: 11px;
    border-right: 1px solid black;
  }

  tr:nth-child(even){background-color: #f2f2f2}

  th {
    background-color: #4CAF50;
    color: white;
  }
</style>


<p><h3>Monthly Expenses:</h3></p>
<table class='expenses'>
  <tr>
    <th>{{headers[0]}}</th>
    <th>{{headers[1]}}</th>
  </tr>
  %for row in rows:
  <tr>
    <td>{{row[0]}}</td>
    <td>{{row[1]}}</td>
  </tr>
  %end
</table>
<a class='button' href="/">Upload Data</a>
