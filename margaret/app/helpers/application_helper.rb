module ApplicationHelper
  def row(row_class: 'row', col_class: 'col-xs-12 col-sm-6 col-lg-8')
    content_tag(:div, class: row_class) do
      content_tag(:div, class: col_class) do
        yield if block_given?
      end
    end
  end
end
