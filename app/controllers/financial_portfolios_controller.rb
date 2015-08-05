class FinancialPortfoliosController < ApplicationController

  before_action :parse_portfolio_fields, only: :create

  # GET /financial_portfolios/new
  def new
    @financial_portfolio = FinancialPortfolio.new
  end

  # POST /financial_portfolios
  def create

    begin
      portfolio = FinancialPortfolio.create!

      @parsed_portfolio_fields.each do |p|
        field = PortfolioField.create!(p)
        portfolio.portfolio_fields << field
      end

      redirect_to expense_report_financial_portfolio_path(portfolio.id)

    rescue
      respond_to do |format|
        format.html { render :new, notice: 'Error Creating your Financial portfolio.' }
      end
    end
  end


  def expense_report
    @report = FinancialPortfolio.expense_report(params[:id])
  end

  private

  def parse_portfolio_fields
    csv_content = params['portfolio'].read
    @parsed_portfolio_fields = PortfolioReader.parse(csv_content)
  end

end
