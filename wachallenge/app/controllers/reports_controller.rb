class ReportsController < ApplicationController

  protect_from_forgery except: :show

  def index
  	@reports = Report.all
  end

  def new
  end

  def show
    @report = Report.find(params[:id])
    # @employees = @report.employees.order(:date)
    @q = @report.employees.search(params[:q])
    @employees = @q.result
    # If you want to display per month tables, could have done a group by sql query 
    # but for the sake of rendering both all expenses and monthly, will not.
    @per_month = @employees.group_by{|tax| tax.date.beginning_of_month}

    respond_to do |format|
      format.html
      format.js
    end

    
  end

  def import
  	report = Report.create!(name: params[:report_name])
  	report.employees.upload_from_csv(params[:file])

    redirect_to report_path(report, format: 'js')
  end
end

