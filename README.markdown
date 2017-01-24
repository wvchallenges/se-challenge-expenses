# Applicant information

Name: Thanh H. D. Nguyen

Email: thanh.nguyen@ngwave.ca

Phone: 289 992 9099
 
## Instructions on how to build/run your application

### To build: 

Import the project to Eclipse. Run the build.xml as an Ant Build. A jar file with name sechallengeexpenses.jar will appear in the root project folder. 

### To run: 

Run following command:

java -jar sechallengeexpenses.jar

There is a build in the releases folder

Once the application UI is loaded:

1. Click on "Open file" and choose the csv file. There is a file uploaded in the resources folder. 

2. Click on "Process". The records will be read and insert into a sqlite database called test.db.

## Proud about: 

I learn SQLite implementing this.

## Notes:

1. On the business model, address and category can be made in to classes. I decided to keep them as String as I don't have much time at the moment.

2. This code is definitely not production grade. Fail-safe mechanisms must be added. 
