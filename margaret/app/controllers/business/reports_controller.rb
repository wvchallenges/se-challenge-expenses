class Business::ReportsController < ApplicationController
  before_action :lookup_business
  before_action :lookup_report

  def show
  end

  def render_report
    respond_to do |format|
      format.csv { send_data @report.to_csv, type: 'text/csv', filename: @report.filename}
      format.xls { send_data @report.to_csv(options: { col_sep: "\t" }), type: 'text/xls', filename: @report.filename }
    end
  end

  protected

    def lookup_business
      @business = Business::Business.find_by(id: params[:business_id])
    end

    def lookup_report
      @report = @business.reports.find_by(id: params[:id])
    end
end