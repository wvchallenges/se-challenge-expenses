class BusinessIndex < Chewy::Index
  settings analysis: {
    analyzer: {
      content: {
        tokenizer: 'standard',
        filter: ["lowercase", "asciifolding"]
      },

      ngram: {
        type: 'custom',
        tokenizer: 'whitespace',
        filter: ['lowercase', 'asciifolding', 'ngram_filter']
      }
    },

    filter: {
      ngram_filter: {
        type: 'nGram',
        min_gram: 2,
        max_gram: 20,
        token_chars: ['letter', 'digit', 'punctuation', 'symbol']
      }
    }
  }

  define_type Business::Business do
    root _all: { enabled: true, index_analyzer: 'ngram', search_analyzer: 'ngram' }
    field :name,    index: 'analyzed', analyzer: 'content'
    field :address, index: 'analyzed', analyzer: 'content'
    field :business_id, type: 'long', value: -> { id }
  end
end