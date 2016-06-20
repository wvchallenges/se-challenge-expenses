class Business::BusinessesController < ApplicationController

  before_action :lookup_business, except: [:index, :create]

  def index
    @businesses = Business::Business.all.order("#{sort_field} #{sort_order}")
    @business = Business::Business.new
  end

  def create
    @business = Business::Business.new(business_params)
    if @business.save
      redirect_to business_business_path(@business)
    else
      @businesses = Business::Business.all.order("#{sort_field} #{sort_order}")
      render action: :index
    end
  end

  def show
    if @business.blank?
      # flash error and return to index
      flash[:danger] = "Can not find business"
      redirect_to business_businesses_path and return
    end

    @upload_service = Services::CsvUploadService.new(business: @business)
  end

  def upload
    binding.pry
    @upload_service = Services::CsvUploadService.new({business: @business}.merge(upload_csv_params))

    if @upload_service.process
      redirect_to business_business_path(@business)
    else
      render action: :show
    end
  end

  protected

    def lookup_business
      @business = Business::Business.includes(:reports, :report_entries).find_by(id: params[:id])
    end

    def sort_field
      %w(name created_at updated_at).include?(params[:sort_field]) ? params[:sort_field] : 'updated_at'
    end

    def sort_order
      %w(asc desc).include?(params[:sort_order]) ? params[:sort_order] : 'asc'
    end

    def business_params
      params.require(:business).permit(:name, :address)
    end

    def upload_csv_params
      params.require(:upload_service).permit(:csv)
    end
end