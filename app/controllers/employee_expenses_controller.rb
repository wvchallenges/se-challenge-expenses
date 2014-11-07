require 'csv'

class EmployeeExpensesController <ActionController::Base
  # GET /data_imports
  # GET /data_imports.json
  def index
    @data_imports = EmployeeExpense.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @data_imports }
    end
  end

  
  def import

    #verification of form field
    if params[:file] && !params[:file].blank?
      @filename = params[:file]
    else
      flash[:error] = 'Error: You must select a file'
      redirect_to :action => 'index'
      return
    end
    
    #verify if CSV file
    if @filename.content_type != Mime::Type.lookup_by_extension('csv').to_s
      flash[:error] = 'Error: Only CSV files can be uploaded'
      redirect_to :action => 'index'
      return
    end
    #creating the import
    currentImport = FileImport.new(:filename => @filename.original_filename)#FileImport.create(:filename => @file)
    currentImport.save!
  
    puts "Current Time After saving fileImport: " + Time.now.inspect
    
    csv_text = File.read(@filename.path)
    csv = CSV.parse(csv_text, :headers => true)
    puts "Current Time After reading csv file: " + Time.now.inspect
    csv.each do |row|
      dataImport = EmployeeExpense.create(
      :file_import_id => currentImport.id,
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
    #group by particular month
    puts "Current Time after storing employee expenses: " + Time.now.inspect
    @currentTotals = currentImport.employee_expenses.all.group_by{|m| m.date.beginning_of_month}
    @dataTotals = EmployeeExpense.all.group_by{|m| m.date.beginning_of_month}
    puts "Current Time after groupbys: " + Time.now.inspect
  end
end
