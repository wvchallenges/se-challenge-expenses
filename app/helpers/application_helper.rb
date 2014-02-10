module ApplicationHelper

  def cents_to_dollars(cents)
    number_to_currency(cents.to_d / 100)
  end

  def number_to_month(month_number)
    I18n.t("date.month_names")[month_number.to_i]
  end

end
