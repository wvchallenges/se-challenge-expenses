# Wave Take Home Problem

## Goals: 
- web app
- intake csv file, output expense report by month

## Design

### App UI
- form view and controller
- results view and controller (after POST)

### Major Classes
- LineItem
  - has date that can be grouped by year, month (db index)
- Vendor (not required for problem)
  - name and id
- Currency (probably not necesary, but something to think about)
- User could potentially be required (not required for problem)

### Assumptions
- simple validation on client side (not needed b/c of given assumptions)
- validation on the server side (not needed b/c of given assumptions)
- efficient storage of data (db design, etc)
- maintainable
- basic tests to support further updates that may violate basic contract (sounds like functional tests required?)

## How to install:

``` 
  cd <project dir>
  bundle 
  rake db:migrate
```

## How to run:

### Server: 

``` 
  rails s 
# navigate to localhost:3000 in your browser
# csv file is in spec/support/files
```

### Tests:

``` rspec ```



