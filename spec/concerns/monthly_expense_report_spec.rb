shared_examples_for 'monthly_expense_report' do

  describe '#monthly_expense_report' do

    context 'with provided test data' do 
      let(:report) { subject.monthly_expense_report }

      let(:example_month_count) { report[:months].size }
      let(:example_first_month_total) { report[:months][0][:total_expenses] }      
      let(:example_first_month_title) { report[:months][0][:month] }
      let(:example_highest_month_total) { report[:highest_month_total] }
    
      let(:expected_month_count) { 6 }
      let(:expected_first_month_total) { 430.0 }
      let(:expected_first_month_title) { 'Sep / 2013' }
      let(:expected_highest_month_total) { 3012.68 }

      its(:monthly_expense_report) { should_not be nil }
      it('has a total of 430.0 for the first month') do
        example_first_month_total.should eq expected_first_month_total  
      end
      it('has September 2013 as the first month') do
        example_first_month_title.should eq expected_first_month_title   
      end
      it('has a highest month total of 3012.68') do
        example_highest_month_total.should eq expected_highest_month_total
      end
      it('contains 6 months') { example_month_count.should eq expected_month_count }
    end

  end

end
