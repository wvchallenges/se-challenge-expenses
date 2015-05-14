require 'test_helper'

class TaxAmountTest < ActiveSupport::TestCase
  test "must have amount" do
    tax_amount = TaxAmount.new 
    assert_not tax_amount.save, "Cannot save tax amount without amount"

    tax_amount = TaxAmount.new amount: 10.0
    assert tax_amount.save
    assert_equal 10.0, tax_amount.amount

    tax_amount = TaxAmount.new amount: -10
    assert_not tax_amount.save, "Cannot save negative amount"
  end
end
