class ExpensesController < ApplicationController
  def new
  end

  def create
    importer = ExpensesImporter.new(file_content: params['expenses_file'].read)
    uploaded_expenses = importer.import

    if uploaded_expenses.present?
      redirect_to action: :index
    else
      flash[:error] = "We encountered a problem while trying to import the data you provided. If the problem persists, please contact some@one.com"
      redirect_to action: :new
    end
  end
end
