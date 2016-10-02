class Expense < ApplicationRecord
  belongs_to :employee
  belongs_to :category
  belongs_to :tax_name
  default_scope -> { order(date: :desc) }
  
  validates :date, presence: true
  validates :description, presence: true, length: { maximum: 255 }
  validates :pre_tax_amount, presence: true
  validates :tax_amount, presence: true
  
  validates :employee_id, presence: true
  validates :category_id, presence: true
  validates :tax_name_id, presence: true
  
  def getExtraInfo(employee_name, employee_address, category_name, tax_name_name)
    employee = Employee.find_by(name: employee_name)
    if employee == nil
      employee = Employee.new(name: employee_name, address: employee_address)
      if not employee.save
        return false
      end
    elsif employee_address != "" && employee.address != employee_address
      if not employee.update_attributes(address: employee_address)
        return false
      end
    end
    self.employee_id = employee.id
    
    category = Category.find_by(name: category_name)
    if category == nil
      category = Category.new(name: category_name)
      if not category.save
        return false
      end
    end
    self.category_id = category.id
    
    tax_name = TaxName.find_by(name: tax_name_name)
    if tax_name == nil
      tax_name = TaxName.new(name: tax_name_name)
      if not tax_name.save
        return false
      end
    end
    self.tax_name_id = tax_name.id
  end
  
  def saveRecord(employee_name, employee_address, category_name, tax_name_name)
    self.getExtraInfo(employee_name, employee_address, category_name, tax_name_name)
    self.save
  end
end
