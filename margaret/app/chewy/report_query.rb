class ReportQuery
  class << self
    def search(business_id: nil, query:)
      index_query = [filter_by_business(business_id), search_query(query)].compact.reduce(:merge)
      [].tap { |array|
        index_query.to_a.each do |result|
          search_result = result._data
          array << OpenStruct.new(
            # return all info for purposes of displaying
            id: search_result["_source"]["id"],
            report_id: search_result["_source"]["business_report_id"],
            business_id: search_result["_source"]["business_id"],
            category: search_result["_source"]["category"],
            employee_name: search_result["_source"]["employee_name"],
            employee_address: search_result["_source"]["employee_address"],
            expense_description: search_result["_source"]["expense_description"],
            date: search_result["_source"]["date"],
            amount_before_tax: search_result["_source"]["amount_before_tax"],
            tax_name: search_result["_source"]["tax_name"],
            tax_amount: search_result["_source"]["tax_amount"],
            score: search_result["_score"]
          )
        end
      }.sort_by(&:score)
    end

    protected

      def filter_by_business(specified_business_id)
        return nil if specified_business_id.blank?
        index.filter { business_id == specified_business_id }
      end

      def search_query(query)
        index.query(
          query_string: {
            fields: ["employee_name^3", "category^2", "expense_description^2", "employee_address"],
            default_operator: "and",
            minimum_should_match: "50%",
            query: query
          }
        ).limit(20)
      end

      def index
        ReportEntryIndex::ReportEntry
      end
  end
end