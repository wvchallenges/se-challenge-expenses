# Wave Software Development Challenge

# Setup
Make sure you have Rails 3.2, Ruby 1.9.3, and SQLite 3 on your machine.

To run locally:

1. Clone the repo

    git clone git@github.com:eagomez54/se-challenge.git

2. Run bundle

    bundle

3. Run Rails server

    rails server

4. Visit localhost (default port is 3000)

    http://localhost:3000


This is meant for local use only (Linux/OSX) and is not meant to be deployed to production. (It uses WEBRick and SQLite 3).

## Reflection

I am particularily proud of the amount of pre-work I did before writing any code. I started out by sketching out my models, including their variables and datatypes. Through this I discovered that I was going to have to deal with spaces and dashes in the header names, so I made sure to research how to handle this when reading the CSV file. I also researched the quickest way to read from a CSV file, and was able to drop an intermediate table containing raw csv data from my schema. I also did a quick wireframe and cucumber stories so I had a good sense of the final goal. I believe doing this before starting to write code identified pitfalls and redundancies, and saved a good deal of time.

I am also happy with some of the debugging that I had to do. I was able to poke through the sample csv file to compare my output against expected results at various intermediate steps. I ran into challenges with the pre-tax amounts with 4 digits, as well as the dates, but I was able to identify them as they came up and fix them accordingly. I spun my wheels getting RSpec to read the CSV file, so in the interests of time I used an Excel file for my test cases. If I had more time or could consult within a team, I would prefer to use RSpec.
