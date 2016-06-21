class Api::BusinessesController < Api::BaseController

  # Request
  # GET api/businesses/search?query=:query_string

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
end