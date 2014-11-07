require 'csv'

class DataImportsController <ActionController::Base
  # GET /data_imports
  # GET /data_imports.json
  def index
    @data_imports = DataImport.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @data_imports }
    end
  end

  
  def import
    myfile = params[:file]
    csv_text = File.read(myfile.path)
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      dataImport = DataImport.create(
      :date => Date.strptime(row[0], "%m/%d/%Y"),
      :category => row[1],
      :employee_name => row[2], 
      :employee_address => row[3],  
      :expense_description => row[4],
      # In cases of comma only the most significant number getting accepted
      :pre_tax_amount => row[5].gsub(/,/, ''), 
      :tax_name => row[6], 
      # In cases of comma only the most significant number getting accepted
      :tax_amount => row[7].gsub(/,/, '')
      )
      dataImport.save!
    end
    @dataTotals = DataImport.all.group_by{|m| m.date.beginning_of_month}
  end
end
