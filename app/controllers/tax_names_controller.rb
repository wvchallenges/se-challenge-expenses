class TaxNamesController < ApplicationController
  def index
    @tax_names = TaxName.all
  end
  
  def new
    @tax_name = TaxName.new
  end
  
  def create
    @tax_name = TaxName.new(tax_name_params)
    if @tax_name.save
      flash[:success] = "Tax Name created."
      redirect_to @tax_name
    else
      render "new"
    end
  end
  
  def show
    @tax_name = TaxName.find(params[:id])
    @expenses = @tax_name.expenses
  end
  
  def edit
    @tax_name = TaxName.find(params[:id])
  end
  
  def update
    @tax_name = TaxName.find(params[:id])
    if @tax_name.update_attributes(tax_name_params)
      flash[:success] = "Tax Name info updated."
      redirect_to @tax_name
    else
      render "edit"
    end
  end
  
  def destroy
    TaxName.find(params[:id]).destroy
    flash[:success] = "Tax Name deleted."
    redirect_to tax_names_url
  end
  
  private

    def tax_name_params
      params.require(:tax_name).permit(:name)
    end
end