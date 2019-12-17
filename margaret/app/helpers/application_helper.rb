module ApplicationHelper
  def row(row_class: 'row', col_class: 'col-xs-12 col-sm-6 col-lg-8')
    content_tag(:div, class: row_class) do
      content_tag(:div, class: col_class) do
        yield if block_given?
      end
    end
  end

  def ftime(time)
    time.try(:strftime, '%B %d, %Y at %H:%M:%S')
  end

  def number_to_amount(number)
    # converts cents to an amount in dollars
    "$%.2f" % (number.to_i/100.0)
  end

  def fdate(date)
    date.try(:strftime, '%m/%d/%Y')
  end
end
