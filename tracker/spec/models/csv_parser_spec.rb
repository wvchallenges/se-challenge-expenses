require "rails_helper"

describe CsvParser do
  describe "#parse_number" do
    subject(:parser) { described_class.new(nil).parse_number(value) }

    context "value contains just numbers" do
      let(:value) { "12345" }
      it { expect(parser).to eq(12345.0) }
    end

    context "value contains a comma" do
      let(:value) { "12,345" }
      it { expect(parser).to eq(12345.0) }
    end

    context "value contains decimal" do
      let(:value) { "345.05" }
      it { expect(parser).to eq(345.05) }
    end

    context "value contains comma and decimal" do
      let(:value) { "1,345.05" }
      it { expect(parser).to eq(1345.05) }
    end
  end
end
