# Wave Software Development Challenge

Hi! I'm Nilesh. This project done in Ruby on Rails took me a total of about 2.5 hours. 

A couple of notes:

1. For task #4 where we had to show the expenses per month based on the uploaded file - I added an extra column in the Expenses table for the total tax amount, which gets updated as you upload a new csv file. This (slightly) reduces the time it takes to calculate the total expenses per month.
1. Instead of naming the tables something like "new data", I thought it would make more sense to name it "expenses".
1. In the same way, the notes asked to update monthly expenses per uploaded file, but I thought it would be more useful to show the total expenses per month. 
1. I'd like to think the code is neat and follows rails conventions!

## Setup

This is a classic Ruby on Rails project setup. 

Prereqs:
1. A github account setup with ssh keys on your computer.
1. Latest versions of ruby and rails if you don't have it. (recommend using rvm)
1. Setup mysql (recommend using homebrew)

Setup:
1. clone repo `git@github.com:nilu/se-challenge.git`
1. cd to repo in the terminal of your choice
1. run `bundle install` (type it in terminal)
1. run `rake db:create`
1. run `rake db:migrate`
1. run `rails s` 
1. Go to web browser of your choice. navigate to localhost:3000 (or wherever your rails server points to)