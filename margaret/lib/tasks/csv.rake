namespace :margaret do
  namespace :csv do
    desc 'Generates a test csv file'
    task generate_fake: :environment do
      puts "#{Business::Report.entry_schema.join(",")}\n"
      rand(10..30).times do
        puts "#{rand(1..12)}/#{rand(1..28)}/#{rand(1990..2016)},\"#{Faker::Commerce.department}\",#{Faker::Name.name},\"#{Faker::Address.street_address}, #{Faker::Address.city}, #{Faker::Address.state} #{Faker::Address.zip_code}\",#{Faker::Company.buzzword} #{Faker::Company.profession},#{rand(1..200)}.00,Sales Tax,#{rand(1..10)}.00\n"
      end
    end
  end
end