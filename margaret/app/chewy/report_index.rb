class ReportIndex < Chewy::Index
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

  define_type Business::Report do
    root _all: { enabled: true, index_anlayzer: 'ngram', search_analyzer: 'ngram' }
    # TODO - how to organize the searchability of this all?
  end
end