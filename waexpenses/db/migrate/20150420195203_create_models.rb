class CreateModels < ActiveRecord::Migration
  def change

    create_table :employees do |t|
      t.string :name
      t.string :address

      t.timestamps
    end

    create_table :categories do |t|
      t.string :name
      t.string :description
      t.references :category, index: true

      t.timestamps
    end

    create_table :expenses do |t|
      t.date :date
      t.string :description
      t.money :amount, currency: { present: false }
      
      t.references :category, index: true
      t.references :employee, index: true

      t.timestamps
    end

    create_table :taxes do |t|
      t.string :name

      t.timestamps
    end

    create_table :tax_amounts do |t|
      t.money :amount, currency: { present: false }
      t.date :date

      t.references :tax, index: true
      t.references :expense, index: true

      t.timestamps
    end

    create_table :expenses_taxes, :id => false do |t|
      t.references :expense, index: true
      t.references :tax, index: true
    end
  end
end
