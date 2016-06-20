require 'rails_helper'

describe Services::CsvUploadService do
  let(:csv_file) { Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/files/test.csv'), 'text/csv') }
  let(:erroneous_csv_file) { Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/files/error_test.csv'), 'text/csv')}
  let(:sam_james) { create(:sam_james) }
  let(:report) { create(:report) }

  let(:file_contents) {
    [["4/19/2000", "Movies & Tools", "Kelvin Upton Sr.", "8284 Streich Forges, East Mark, Rhode Island 75412-7283", "background chemist", "120.00", "Sales Tax", "7.00"],
    ["8/16/1998", "Sports", "Roma Labadie", "7085 Rutherford View, North Ritachester, New Jersey 10308", "coherent statistician", "172.00", "Sales Tax", "6.00"]]
  }

  let(:erroneous_file_contents) {
    file_contents << ["7/27/2009","Music & Shoes","Janis Padberg I","3010 Bennett Skyway, North Glennie, South Carolina 58979-0914","approach agriculturist","73.00"]
    file_contents
  }

  let(:report_entries) { [
    {
      date: "4/19/2000",
      category: "Movies & Tools",
      employee_name: "Kelvin Upton Sr.",
      employee_address: "8284 Streich Forges, East Mark, Rhode Island 75412-7283",
      expense_description: "background chemist",
      amount_before_tax: "120.00",
      tax_name: "Sales Tax",
      tax_amount: "7.00"
    },
    {
      date: "8/16/1998",
      category: "Sports",
      employee_name: "Roma Labadie",
      employee_address: "7085 Rutherford View, North Ritachester, New Jersey 10308",
      expense_description: "coherent statistician",
      amount_before_tax: "172.00",
      tax_name: "Sales Tax",
      tax_amount: "6.00"
    }
  ] }

  describe 'integration tests (process)' do
    context 'success' do
      subject { described_class.new(business: sam_james, csv: csv_file) }

      it { expect(subject.process).to be_truthy }
      it { expect{subject.process}.to change{sam_james.reload.reports.count}.by(1) }
      it { expect{subject.process}.to change{sam_james.reload.report_entries.count}.by(2) }
    end

    context 'no business' do
      subject { described_class.new(csv: csv_file) }

      it "adds the error" do
        expect(subject.process).to be_falsey
        expect(subject.errors[:business_id]).to eq(["can't be blank"])
      end

      it { expect{subject.process}.to_not change{sam_james.reload.reports.count} }
      it { expect{subject.process}.to_not change{sam_james.reload.report_entries.count} }
    end

    context 'no csv added' do
      subject { described_class.new(business: sam_james, csv: nil) }

      it "adds the error" do
        expect(subject.process).to be_falsey
        expect(subject.errors[:csv]).to eq(["please upload .csv file"])
      end

      it { expect{subject.process}.to_not change{sam_james.reload.reports.count} }
      it { expect{subject.process}.to_not change{sam_james.reload.report_entries.count} }
    end

    context 'parsing issues' do
      subject { described_class.new(business: sam_james, csv: erroneous_csv_file) }

      it "adds the error" do
        expect(subject.process).to be_falsey
        expect(subject.errors[:csv]).to eq(["There was an issue in parsing your upload. It may be in line: 7/27/2009,Music & Shoes,Janis Padberg I,3010 Bennett Skyway, North Glennie, South Carolina 58979-0914"])
      end

      it { expect{subject.process}.to_not change{sam_james.reload.reports.count} }
      it { expect{subject.process}.to_not change{sam_james.reload.report_entries.count} }
    end
  end

  describe 'protected methods' do
    describe '#read_csv_file' do

      context 'csv not added' do
        subject { described_class.new(business: sam_james) }
        it "adds the error" do
          expect(subject.send("read_csv_file")).to be_falsey
          expect(subject.errors[:csv]).to eq(["please upload .csv file"])
        end
      end

      context 'csv added' do
        subject { described_class.new(business: sam_james, csv: csv_file)}

        it "adds the file contents" do
          expect(subject.send("read_csv_file")).to be_truthy
          expect(subject.file_contents).to eq(file_contents)
        end
      end
    end

    describe '#create_report' do
      context 'creates report' do
        subject { described_class.new(business: sam_james) }

        it { expect(subject.send("create_report")).to be_truthy }
        it { expect{subject.send("create_report")}.to change{sam_james.reload.reports.count}.by(1) }
      end

      context 'can not create report' do
        subject { described_class.new }

        it "adds the error" do
          expect(subject.send("create_report")).to be_falsey
          expect(subject.errors[:business_id]).to eq(["can't be blank"])
        end

        it { expect{subject.send("create_report")}.to_not change{sam_james.reload.reports.count} }
      end
    end

    describe '#create_entries' do
      context 'without errors' do
        subject { described_class.new(file_contents: file_contents, report: report) }

        it { expect(subject.send("create_entries")).to be_truthy }
        it { expect{subject.send("create_entries")}.to change{report.entries.count}.by(2) }
      end

      context 'with errors' do
        subject { described_class.new(file_contents: erroneous_file_contents, report: report)} 

        it "adds the errors" do
          expect(subject.send("create_entries")).to be_falsey
          expect(subject.errors[:csv]).to eq(["There was an issue in parsing your upload. It may be in line: 7/27/2009,Music & Shoes,Janis Padberg I,3010 Bennett Skyway, North Glennie, South Carolina 58979-0914,approach agriculturist,73.00"])
        end

      end
    end

    describe '#csv_to_report_entries' do
      subject { described_class.new(file_contents: file_contents) }
      it { expect(subject.send("csv_to_report_entries")).to eq(report_entries) }
    end
  end
end