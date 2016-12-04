<style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
</style>

<h1>Uploaded Results</h1>

<table>
% sorted_years = sorted(year_to_month_expenses.keys())
% for sorted_year in sorted_years:
  % sorted_months = sorted(year_to_month_expenses[sorted_year].keys())
  % for sorted_month in sorted_months:
      <tr>
        <td>{{ sorted_year }}/{{ sorted_month }}</td>
        <td>{{ year_to_month_expenses[sorted_year][sorted_month] }}</td>
      </tr>
  % end
% end
</table>