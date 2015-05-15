class Category < ActiveRecord::Base
  validates :name, :presence => true,
                   :length =>{ :minimum => 2}

  belongs_to :parent, :class_name => 'Category', :foreign_key => :category_id
  has_many :children, :class_name => 'Category'

  attr_accessor :full_name

  after_initialize do
    calculate_full_name Array.new
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

  def calculate_full_name(previous_names)
    if (previous_names.nil? )
      previous_names = arr
    end
    
    previous_names.unshift self.name
    if ( !self.parent.nil?)
      self.parent.calculate_full_name previous_names
    end
    self.full_name = previous_names.join " - "

  end
end
