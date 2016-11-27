

class ApplicationController < ActionController::Base

  def index
    search_term = params[:search].to_s.strip
    resources = Administrate::Search.new(resource_resolver, search_term).run
    resources = order.apply(resources)
    resources = resources.paginate(:page => params[:page])     
    page = Administrate::Page::Collection.new(dashboard, order: order)

    render locals: {
      resources: resources.paginate(:page => params[:page]),
      search_term: search_term,
      page: page,
    }
  end

end