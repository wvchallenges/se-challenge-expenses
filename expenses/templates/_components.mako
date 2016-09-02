<%!
    from decimal import Decimal
%>

<%def name="flash_msg()">
    <%doc>
    Render flash messages stored in the session.
    </%doc>
    <%
        msgs = request.session.pop_flash()
    %>
    <div id="components__flash-container">
        % for msg in msgs:
            <div class="components__flash-msg alert alert-danger text-center">
                ${msg}
            </div>
        % endfor
    </div>
</%def>

<%def name="format_month(month_sequence)">
    <%doc>
    Render the name of the month given its sequence.
    </%doc>
    <%
        months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
    %>
    ${months[month_sequence-1]}
</%def>

<%def name="format_currency(value=UNDEFINED)" buffered="True">
    <%doc>
    Render the given value in a format suitable for monetary values.
    </%doc>\
    <%
        value = capture(caller.body).strip() if value == UNDEFINED else value
    %>
    ${'${:,.2f}'.format(Decimal(value)) if value else '$0.00'}
</%def>