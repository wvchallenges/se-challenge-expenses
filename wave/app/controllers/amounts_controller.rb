class AmountsController < ApplicationController
  before_action :set_amount, only: [:show, :edit, :update, :destroy]
  require "csv"
  # GET /amounts
  # GET /amounts.json
  def index
    @amounts = Amount.all
  end

  # GET /amounts/1
  # GET /amounts/1.json
  def show
    @amount = Amount.find(params[:id])
    @results = []
    @path = @amount.csv.path

    CSV.foreach(@path, headers: true) do |row|
      Amount.create(:d => Date.strptime(row[0], "%m/%d/%Y"),
                    :category => row[1],
                    :employee_name => row[2],
                    :expense_description => row[4],
                    :pre_tax_amount => row[5],
                    :tax_name => row[6],
                    :tax_amount => row[7],
                    :total_tax => row[5].to_f + row[7].to_f,
                    :employee_adress => row[3])
    end
  end

  # GET /amounts/new
  def new
    @amount = Amount.new
  end

  # GET /amounts/1/edit
  def edit
  end

  # POST /amounts
  # POST /amounts.json
  def create
    @amount = Amount.new(amount_params)

    respond_to do |format|
      if @amount.save
        format.html { redirect_to @amount, notice: 'Amount was successfully created.' }
        format.json { render :show, status: :created, location: @amount }
      else
        format.html { render :new }
        format.json { render json: @amount.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /amounts/1
  # PATCH/PUT /amounts/1.json
  def update
    respond_to do |format|
      if @amount.update(amount_params)
        format.html { redirect_to @amount, notice: 'Amount was successfully updated.' }
        format.json { render :show, status: :ok, location: @amount }
      else
        format.html { render :edit }
        format.json { render json: @amount.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /amounts/1
  # DELETE /amounts/1.json
  def destroy
    @amount.destroy
    respond_to do |format|
      format.html { redirect_to amounts_url, notice: 'Amount was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_amount
      @amount = Amount.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def amount_params
      params.require(:amount).permit(:d, :category, :employee_name, :expense_description, :pre_tax_amount, :tax_name, :tax_amount, :total_tax, :csv)
    end
end
