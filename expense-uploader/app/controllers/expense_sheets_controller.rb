class ExpenseSheetsController < ApplicationController

  def new
    @sheet = ExpenseSheet.new
  end

  def create
    uploadParams = createParams()

    fileData = getFileFromCreateParams(uploadParams)

    fileDataLines = FileUploadHelper.readUploadAsLines(fileData)

    csvFileModel = Utility::CsvFile.new(fileDataLines)

    puts csvFileModel.headerRow.class

    sheetFactory = Utility::CsvExpenseSheetFactory.new

    @sheet = sheetFactory.createSheetFromCsv(Time.now, csvFileModel)

    @sheet.save

    redirect_to @sheet
  end

  def show
    @sheet = ExpenseSheet.find(params[:id])

    summary = ExpensesSummary.new(@sheet)

    @monthSummaries = summary.monthExpenses
  end

  private
    def createParams
      params.require(:sheet).permit(:csv_path)
    end

    def getFileFromCreateParams(createParams)
      createParams[:csv_path]
    end
end
