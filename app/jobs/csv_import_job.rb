class CSVImportJob < ApplicationJob
  
  def perform( document )
  	importer = CSVImporter.new document.file.current_path
  	importer.parse
  end

end