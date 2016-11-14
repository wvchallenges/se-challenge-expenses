# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class EmployeeExpensesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "employee_expenses_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak
  	ActionCable.server.broadcast 'employee_expenses_channel', message: data['message']
  end
end
