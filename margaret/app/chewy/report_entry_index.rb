class ReportEntryIndex < Chewy::Index
  settings analysis: {
    analyzer: {
      ngram: {
        type: 'custom',
        tokenizer: 'whitespace',
        filter: ['lowercase', 'asciifolding', 'ngram_filter']
      }
    },

    filter: {
      ngram_filter: {
        type: 'nGram',
        min_gram: 4,
        max_gram: 20,
        token_chars: ['letter', 'digit', 'punctuation', 'symbol']
      }
    }
  }

  define_type Business::ReportEntry do
    # Mostly for purposes of displaying without hitting the db - can just return all info as a struct, yet still accessible through non-indexed searching
    field :id, type: 'long', value: -> { id }
    field :business_id, type: 'long', value: -> { business_id }
    field :business_report_id, type: 'long', value: -> { business_report_id }
    field :category, index: 'analyzed', analyzer: 'ngram'
    field :employee_name, index: 'analyzed', analyzer: 'ngram'
    field :employee_address, index: 'analyzed', analyzer: 'ngram'
    field :expense_description, index: 'analyzed', analyzer: 'ngram'
    field :date, type: 'date', value: -> { date }
    field :amount_before_tax, type: 'long', value: -> { amount_before_tax }
    field :tax_name, index: 'not_analyzed'
    field :tax_amount, type: 'long', value: -> { tax_amount }
    # Date fields for logstash
    field :created_at, type: 'date', include_in_all: false, value: -> { created_at }
  end
end