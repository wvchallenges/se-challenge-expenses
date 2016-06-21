json.array! @report_entries do |entry|
  json.report_id entry.report_id
  json.business_id entry.business_id
  json.category entry.category
  json.employee_name entry.employee_name
  json.employee_address entry.employee_address
  json.expense_description entry.expense_description
  json.date entry.date
  json.amount_before_tax entry.amount_before_tax
  json.tax_name entry.tax_name
  json.tax_amount entry.tax_amount
  json.score entry.score
  json.link_to_report business_business_report_path(business_id: entry.business_id, id: entry.report_id)
end