class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
    	t.string :file
    end
  end
end
