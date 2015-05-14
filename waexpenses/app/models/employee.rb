class Employee < ActiveRecord::Base
  validates :name, :presence => true,
                   :length =>{ :minimum => 2}

  has_many :expenses
  accepts_nested_attributes_for :expenses

  def self.find_or_create_from_name(name)
    first_and_last = format_name_string(name)
    return Employee.find_or_create_by! name: first_and_last
  end

  def self.format_name_string(name)
    #-- name is of the form "First Last" or "Last, First"
    #-- put in "first last" order -- check for suffix.
    parts = name.split(",")
    first_and_last = ''
    if (parts.count == 1 )
      first_and_last = name
    elsif (parts.count > 1)
      #-- assume suffix if a space between 2 names
      if (parts[0].strip.include? " ")
        first_and_last = parts[0] + ", " + parts[1]
      else
        first_and_last = parts[1] + " " + parts[0]
      end
    end

    return first_and_last.squish
  end
end
