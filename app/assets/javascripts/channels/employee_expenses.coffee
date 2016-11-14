App.employee_expenses = App.cable.subscriptions.create "EmployeeExpensesChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
    console.log 'Connected to EmployeeExpensesChannel'

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $('#employee_expenses_table').append(data.employee_expense)
  speak: (message) ->
    @perform 'speak', message: message 