require "rails_helper"

RSpec.describe ExpensesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/expenses").to route_to("expenses#index")
    end

  end
end
