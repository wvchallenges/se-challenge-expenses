require 'rails_helper'

describe BusinessQuery do
  let(:sam_james) { create(:sam_james) }
  let(:ezras_pound) { create(:ezras_pound) }

  before do
    sam_james; ezras_pound
    BusinessIndex.purge!
    BusinessIndex.import
  end

  describe 'search by name' do
    it "will return sam james" do
      results = described_class.search(query: "sam james")
      expect(results.length).to eq(1)
      first_result = results.first
      expect(first_result.id).to eq(sam_james.id)
      expect(first_result.name).to eq(sam_james.name)
      expect(first_result.address).to eq(sam_james.address)
    end

    it "will return ezras pound" do
      results = described_class.search(query: "ezra")
      expect(results.length).to eq(1)
      first_result = results.first
      expect(first_result.id).to eq(ezras_pound.id)
      expect(first_result.name).to eq(ezras_pound.name)
      expect(first_result.address).to eq(ezras_pound.address)
    end
  end

  describe 'searching by address' do
    it "will return sam james" do
      results = described_class.search(query: "harbord")
      expect(results.length).to eq(1)
      first_result = results.first
      expect(first_result.id).to eq(sam_james.id)
      expect(first_result.name).to eq(sam_james.name)
      expect(first_result.address).to eq(sam_james.address)
    end

    it "will return ezras pound" do
      results = described_class.search(query: "dupont")
      expect(results.length).to eq(1)
      first_result = results.first
      expect(first_result.id).to eq(ezras_pound.id)
      expect(first_result.name).to eq(ezras_pound.name)
      expect(first_result.address).to eq(ezras_pound.address)
    end
  end

  describe 'no results' do
    it { expect(described_class.search(query: "NONSENSE QUERY").length).to eq(0) }
  end
end