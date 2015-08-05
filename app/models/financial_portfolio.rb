class FinancialPortfolio < ActiveRecord::Base
	has_many :portfolio_fields, dependent: :destroy

	def self.expense_report(portfolio_id)
		ActiveRecord::Base.connection.execute("SELECT strftime('%Y - %m', portfolio_fields.date) as valYear, sum(pre_tax_amount - tax_amount) as expense FROM portfolio_fields WHERE financial_portfolio_id=" + portfolio_id.to_s + " GROUP BY valYear ORDER BY valYear")
	end
end
