class Category < ActiveRecord::Base
  validates :name, :presence => true,
                   :length =>{ :minimum => 2}

  belongs_to :parent, :class_name => 'Category', :foreign_key => :category_id
  has_many :children, :class_name => 'Category'
  has_many :expenses, -> { order(date: :desc) }

  attr_accessor :full_name

  after_initialize do
    calculate_full_name 
  end

  def self.find_category_names(name)
    #-- name is in the form "category a - category b - category c"
    return name.split("-").map(&:strip).select{ |s| !s.blank? }
  end

  def self.find_or_create_by_heirarchy(name)
    #-- finds a category that matches the names heirarchy, or creates it
    last_category = nil
    names = find_category_names(name)
    names.each do |n|
      if ( last_category.nil?)
        match_category = Category.find_or_create_by name: n, category_id: nil
        last_category = match_category
        next
      end

      #-- deeper in the tree
      i = last_category.children.index{ |c| c.name == n}

      if ( !i.nil?)
        last_category = last_category.children[i];
        next;
      end

      last_category = last_category.children.create name: n
    end
    return last_category
  end

  def calculate_total_expense()
    total_amount =0.0;
    self.expenses.each do |e|
      total_amount += e.calculate_total_amount()
    end
    return total_amount
  end

  def calculate_total_expense_including_children()
    total_amount = calculate_total_expense()
    self.children.each do |c|
      total_amount += c.calculate_total_expense_including_children()
    end
    return total_amount
  end

  def calculate_full_name()
    self.full_name = get_full_name_array().join " - "
  end

  def get_full_name_array()
    previous_names = Array.new
    if ( !self.parent.nil? )
      previous_names = self.parent.get_full_name_array()
    end
    previous_names << self.name

    return previous_names
  end
end
