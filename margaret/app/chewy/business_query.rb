class BusinessQuery
  class << self
    def search(query:)
      [].tap { |array|
        search_query(query).to_a.each do |result|
          search_result = result._data
          array << OpenStruct.new(
            id: search_result["_source"]["business_id"],
            name: search_result["_source"]["name"],
            address: search_result["_source"]["address"],
            score: search_result["_score"]
          )
        end
      }.sort_by(&:score)
    end

    protected

      def search_query(query)
        index.query(
          query_string: {
            fields: ["name^2", "address"],
            default_operator: "and",
            minimum_should_match: "50%",
            query: query
          }
        ).limit(10)
      end

      def index
        BusinessIndex::Business
      end
  end
end