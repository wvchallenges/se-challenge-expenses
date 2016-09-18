require 'rails_helper'

RSpec.describe Expense, type: :model do

  it { is_expected.to belong_to(:category) }
  it { is_expected.to belong_to(:employee) }
end
