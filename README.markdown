# Wave Software Development Challenge
By Andre PLatov

Check out the documentation folder where you can find:
 - Architecture overview
 - Functionality scope
 - Planning of Round 1 of development
 - Installation instructions (under Deployment Instructions folder). 

There is definitely room for improvement, but one thing I am proud of in this application is the architecture. What I mean by that is both technological stack and how things are organized. It starts with a separation between client-side code and server-side logic, which allows to easily split the two into separate projects if needed (scaling out). Code structure is then either domain-specific or belongs to a utility which make it easy to extend and maintain. 

In terms of building functionality on top of the architecture, I am proud of finding a simple solution to processing and displaying of Report data. Instead of using a date time object, I simply have two properties to indicate the month, that is a Year (integer) and a Month (integer). This helps me avoid dealing with different representations of date time between .Net and Javascript. No need to worry about time zones and making sure that December 1st is December 1st and not November 30th. No complicated logic.

Overall, it was fun :)
