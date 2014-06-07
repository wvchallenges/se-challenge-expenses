require 'spec_helper'

describe Employee do
  it 'should properly fill in an address from a string' do
    employee = Employee.new
    employee.set_address("783 Park Ave, New York, NY 10021")
    expect(employee.address).to eq('783 Park Ave')
    expect(employee.city).to eq('New York')
    expect(employee.state).to eq('NY')
    expect(employee.postal_code).to eq('10021')
  end
end
