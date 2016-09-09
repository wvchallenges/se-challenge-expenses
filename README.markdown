# Wave Software Development Challenge
By Andre PLatov

Check out the documentation folder where you can find:
 - Architecture overview
 - Functionality scope
 - Planning of Round 1 of development
 - Installation instructions (under Deployment Instructions folder). 

The biggest thing I am proud of in this application is the architecture. What I mean by that is both technological stack and how things are organized. It starts with a separation between client-side code and server-side logic, which allows to easily split the two into separate projects if needed (scaling out). 

On front end I am using Typescript instead of writing raw Javascript to help with catching errors/typos and provide intelisense on available functionality of objects I am working with. Then there is jQuery and its Deferred objects to simplify operations workflow. 

On the back end I have Controllers/Services/DAL and models. Web API controllers process incoming requests from client and decide which services to use to serve the request. Services contain methods to perform the data processing and implement business logic details. Services then use the Database layer that performs data access operations. In Database layer I am using Dapper (micro ORM) to simplify data access by just passing objects and/or specifying object types when quering database. No time spent mapping columns to object properties.

Client and server communicate using JSON, which makes working with objects easy and saves network traffic.

In terms of building functionality on top of the architecture, I am proud of finding a simple solution to processing and displaying of Report data. Instead of using a date time object, I simply have two properties to indicate the month, that is a Year (integer) and a Month (integer). This helps me avoid dealing with different representations of date time between .Net and Javascript. No need to worry about time zones and making sure that December 1st is December 1st and not November 30th. No complicated logic.

Overall, it was fun :)
