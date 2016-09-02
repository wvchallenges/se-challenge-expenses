<%inherit file="../../templates/_base.mako"/>

<div class="row">
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
            <th>Month</th>
            <th>Total Amount</th>
        </thead>
        <tbody>
            % for expense in expenses:
                <tr>
                    <td class='col-xs-6'>
                        <%self:components.format_month month_sequence="${expense.month}"/>
                    <td class='col-xs-6'>
                        <%self:components.format_currency value="${expense.amount}"/>
                    </td>
                </tr>
            % endfor
        </tbody>
      </table>
    </div>
</div>