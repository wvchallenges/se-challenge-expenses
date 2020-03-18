class UploadFile < ActiveRecord::Base

  def self.save(file)
   CSV.foreach(file.path, headers: true) do |row|
    Employees.create! row.to_hash
   end
  end
end
