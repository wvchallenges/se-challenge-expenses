class PagesController < ApplicationController
  def home
    @reports = MonthlyReportService.new.monthly_reports
  end

  def upload; end
end
