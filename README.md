# Wave Software Development Challenge

## Goals: 
- web app
- rails
- intake csv file, output expense report by month

## Design

### App UI
- form view and controller
- results view and controller (after POST)

### Major Classes
- LineItem
  - has date that can be grouped by year, month (db index)
- Vendor
  - name and id
- Currency (probably not necesary, but something to think about)
- User could potentially be required

### Ensure
- simple validation on client side (not needed b/c of given assumptions)
- validation on the server side (not needed b/c of given assumptions)
- efficient storage of data (db design, etc)
- maintainable
- basic tests to support further updates that may violate basic contract (sounds like functional tests required?)

### Limitations
- Size of file submitted

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
```

### Tests:

``` rspec ```



