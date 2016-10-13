class HomeController < ApplicationController
  def index
  	redirect_to companies_url
  end
end
