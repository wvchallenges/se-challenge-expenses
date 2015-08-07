require './expense'

class WaveChallenge < Sinatra::Base

  get '/' do
    erb :index
  end

  post '/expenses' do
    json = JSON.parse(request.body.read)
    json.each do |record|
      Expense.create(record)
    end
    200
  end

end