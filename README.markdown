# Wave Software Development Challenge
Attached is the Wave Accounting Softward Development Challenge Rails application and a test CSV which may be used for the application.


## Installation
Simply clone the repo onto local machine. Must have postgresql installed as it is the relational database used in this application. Run `bundle install` to add all required gems followed by `rake db:create db:migrate` to create the database and the corresponding migrations.

## Usage
The purpose of the application is to accept CSV files with employees' tax history. A CSV file can be uploaded with a given report name to assist with organization of CSVs. Upon completion of the upload, you will be rendered to a path with two tables and a graph. Search and sortability features have been implemented to the all employees table, while the second table displays a month by month breakdown of expenses and a corresponding graph using Morrisjs.

## Implmentation awesomeness
I am fairly proud of the progress done on this challenge for a number of things. I previously have very good understanding of working with CSV files and manipulation with their data, but I attempted to push my limit with this challenge and my comfort zone to increase my learnings - after all, if I am not the best fit for Wave, at least I learnt something new going through the process about myself (being interviewed) and my skills (implementing new things). With this challenge, I implemented AJAX for file upload and AJAX with search and sortability. 


Coming from an Angularjs tendency to do anything that is heavy on Javascript, it was quite the challenge to try to flavor AJAX in everything. Thinking in a 'non-Angular' to do my searching (which is lightening fast and easy with Angularjs) allowed me to dig deeper into working with ujs and jquery ajax which I don't have very much appreciation for. In addition, the AJAX file upload gave me a chance to learn more about forgery protection and new gems to use to help with formatting. Also, I did not know until now that I can pass arguments into my `redirect_to` function to trigger different formatting between controllers; cool eh? Overall, all through-out the way, given my heavy Angularjs recent work, I had to learn and remind myself more of the 'jquery and Rails' way of doing which I appreciate.

