class BusinessIndex < Chewy::Index
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

  define_type Business::Business do
    field :name,    index: 'analyzed', analyzer: 'ngram'
    field :address, index: 'analyzed', analyzer: 'ngram'
    field :business_id, type: 'long', value: -> { id }
    # for logstash
    field :reports_count, type: 'long', value: -> { reports.count }
    field :report_entries_count, type: 'long', value: -> { report_entries.count }
    field :created_at, type: 'date', include_in_all: false, value: -> { created_at }
  end
end