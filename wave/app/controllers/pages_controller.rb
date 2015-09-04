class PagesController < ApplicationController
  def index
    @amount = Amount.new
    @expenses = Amount.select("d", "total_tax")
  end
end
