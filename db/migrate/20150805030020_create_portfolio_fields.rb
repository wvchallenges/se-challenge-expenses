class CreatePortfolioFields < ActiveRecord::Migration
  def change
    create_table :portfolio_fields do |t|
    	t.date :date
    	t.string :category
    	t.string :employee_name
    	t.string :employee_address
    	t.string :expense_description
    	t.float :pre_tax_amount
    	t.string :tax_name
    	t.float :tax_amount

    	t.belongs_to :financial_portfolio, index: true

      	t.timestamps null: false
    end
  end
end
