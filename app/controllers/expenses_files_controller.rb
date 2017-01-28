class ExpensesFilesController < ApplicationController
  before_action :set_expenses_file, only: [:show, :edit, :update, :destroy]

  # GET /expenses_files
  # GET /expenses_files.json
  def index
    @expenses_files = ExpensesFile.all
  end

  # GET /expenses_files/1
  # GET /expenses_files/1.json
  def show
    @expenses = @expenses_file.expenses.select("strftime('%m', date) as month, strftime('%Y', date) as year, SUM(tax_amount) + SUM(pre_tax_amount) AS total").
      group('month, year').order('year, month').as_json
  end

  # GET /expenses_files/new
  def new
    @expenses_file = ExpensesFile.new
  end

  # GET /expenses_files/1/edit
  def edit
  end

  # POST /expenses_files
  # POST /expenses_files.json
  def create
    @expenses_file = ExpensesFile.new(expenses_file_params)

    respond_to do |format|
      if @expenses_file.save
        LoadExpensesFromCSV.call(expenses_file: @expenses_file)

        format.html { redirect_to @expenses_file, notice: 'Expenses file was successfully created.' }
        format.json { render :show, status: :created, location: @expenses_file }
      else
        format.html { render :new }
        format.json { render json: @expenses_file.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /expenses_files/1
  # PATCH/PUT /expenses_files/1.json
  def update
    respond_to do |format|
      if @expenses_file.update(expenses_file_params)
        format.html { redirect_to @expenses_file, notice: 'Expenses file was successfully updated.' }
        format.json { render :show, status: :ok, location: @expenses_file }
      else
        format.html { render :edit }
        format.json { render json: @expenses_file.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /expenses_files/1
  # DELETE /expenses_files/1.json
  def destroy
    @expenses_file.destroy
    respond_to do |format|
      format.html { redirect_to expenses_files_url, notice: 'Expenses file was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expenses_file
      @expenses_file = ExpensesFile.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def expenses_file_params
      params.require(:expenses_file).permit(:name, :description, :file)
    end
end
