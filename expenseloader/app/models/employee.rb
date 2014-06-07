class Employee < ActiveRecord::Base


  def set_address(string)
    self.address, self.city, state_postal = string.split(", ")
    self.state, self.postal_code = state_postal.split(" ")
  end
end
