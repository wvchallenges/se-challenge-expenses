class WaveChallenge < Sinatra::Base

  get '/' do
    erb :index
  end

  post '/expenses' do
    json = JSON.parse(request.body.read)
    puts json
    200
  end

end