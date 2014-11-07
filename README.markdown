# Wave Software Development Challenge

## Completed by Ginto Cherian
Done using Rails 3.2.13, ruby 1.9.3 and sqllite3

## Setup Instructions
1. In Linux/MacOS terminal navigate to the application 
1. Run "rake db:migrate"
1. Run "rails server" (defaults to localhost:3000, if needed to change port use "rails server -p port_number")
1. Open browser to localhost:3000 (or custom port if specified) 
 
## Running Instructions
1. Click "Choose File" button to select the file to import 
1. Click "Import" button
1. Wait a little while(it took a couple of seconds on my machine, most of time was spend writing into the database)
1. You can see the current monthly expense table and a cumulative monthly expense table
1. Can click the link to import additional files if necessary


## Uniqueness of this Solutions 

This solution just considers a small add on to the problem statement in showing a Cumulative Expense table. The idea is that users can do multiple imports while keeping track of what was imported during each import. To achieve this the application uses two model classes, one to keep track of imports(the parent) and the other to keep track of the data imported(the child).  
