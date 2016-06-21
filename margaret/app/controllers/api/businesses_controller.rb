class Api::BusinessesController < Api::BaseController

  # Request
  # GET api/businesses/search?query=:query

  # Returns
  # [
  #   {
  #     "id": 1,
  #     "name": "Sam James Coffee Brothers",
  #     "address": "297 Harbord St, Toronto, ON M6G 1G7",
  #     "score": 0.13316044,
  #     "link_to_business": "/business/businesses/1"
  #   },
  #   ...
  # ]
  def search
    @businesses = BusinessQuery.search(query: params[:query])
  end

  # Request
  # GET api/businesses/:business_id/search_reports?query=:query

  # Returns
  # [
  #   {
  #     "id": 14,
  #     "report_id": 7,
  #     "business_id": 2,
  #     "category": "Games, Movies & Industrial",
  #     "employee_name": "Lukas Schaden",
  #     "employee_address": "49419 Janessa Passage, Metzfort, Colorado 32244",
  #     "expense_description": "Organized accountant",
  #     "date": "2011/05/07",
  #     "amount_before_tax": "148.00",
  #     "tax_name": "Sales Tax",
  #     "tax_amount": "4.00",
  #     "score": 0.4837518,
  #     "link_to_report": "/business/businesses/2/reports/7"
  #   }
  # ]

  def search_reports
    @report_entries = ReportQuery.search(business_id: params[:id], query: params[:query])
  end
end