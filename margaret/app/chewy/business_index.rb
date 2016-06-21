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
  end
end