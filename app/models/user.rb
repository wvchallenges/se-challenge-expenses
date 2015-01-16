class User < ActiveRecord::Base
  authenticates_with_sorcery!

  validates :password, length: { minimum: 1 }
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

  validates :email, uniqueness: true

  has_many :expenses
end
