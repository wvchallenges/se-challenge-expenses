class TaxAmount < ActiveRecord::Base
  require 'money'

  monetize :amount_cents, :numericality => { :greater_than => 0 }

  validates :amount, :presence => true
  validates :amount, :numericality => {greater_than: 0}

  belongs_to :expense
  belongs_to :tax

end
