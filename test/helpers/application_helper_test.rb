class ApplicationHelperTest < ActionView::TestCase

  def test_cents_to_dollars
    assert_equal '$10.00', cents_to_dollars(1000)
  end

  def test_number_to_month
    assert_equal 'January', number_to_month('01')
    assert_equal 'December', number_to_month('12')
  end

end
