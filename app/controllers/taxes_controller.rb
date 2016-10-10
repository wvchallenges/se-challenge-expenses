class TaxesController < ApplicationController
  def index
    @taxes = Tax.all
  end
end
