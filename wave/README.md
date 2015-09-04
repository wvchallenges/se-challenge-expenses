# Wave Software Challenge

This is submission by Jay

# Build
1. git clone https://github.com/jmart98/se-challenge.git
1. cd se-challenge
1. bundle install
1. rake db:migrate
1. rails s

You're now ready to go

# Design

The whole project took about a few hours. The design of this is straightforward, it has a generated scaffold of a model called amounts. The amounts model has the following attributes within the table, date, category, employee name, employee address, expense description, pre-tax amount, tax name, tax amount, and total amount (pre-tax amount + tax amount). The root page shows the months along with the total amount.

I decided to go with sqlite which is an embedded database. I decided to go with sqlite just for this project because it is much easier to set up rather than MySql or Psql. I would normally use Psql in a production stage. I have also decided to use the Carrierwave gem for the file uploading and the only extension allowed is csv format. Finally, for creating the data i did it from the controller rather than from the model.

# Enhancements

1. Add a background Q for the uploading.
1. Better UI
