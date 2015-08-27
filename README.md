# Wave Challenge Solution - By Marcelo Lotif Araujo
This is my implementation of the `se-challenge` project for the [Wave Software Development Challenge](https://github.com/wvchallenges/se-challenge).

To run this program, you will need:

1. [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html) 
2. [Apache Tomcat 8] (https://tomcat.apache.org/download-80.cgi)
	
To open and browse the source code you will need (in addition to the two above):

1. [Eclipse Mars](http://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/marsr)
	
Please note that this program runs only on Java 8 since I am using some of its latest features. I can work on a version that compiles older versions, if needed.

# Technology Stack
This implementation uses the following technology stack:

1. Java 8
2. Spring Boot MVC framework
3. apache Maven build manager 
4. JPA for the ORM mapping
5. H2 In Memory Database
6. Bootstrap for the HTML pages
7. And two implementations for the view:
 1. Pure Spring MVC with a little help from jQuery
 2. RESTful services provided by Spring and consumed by AngularJS

I decided to implement two views because I though about taking a stab at AngularJS. Since I am no expert on it, this second implementation can have some mistakes and bad design decisions. 

I am taking this also as a learning opportunity to use new things, to have fun and try something more than the tutorials I have been working on AngularJS. I hope you enjoy reviewing this code as much as I enjoyed working on it.

# Running the application
After installing Java and Tomcat, please download the latest version at https://github.com/lotif/se-challenge/tree/master/releases . Unzip the .war file and drop it in your <tomcat_home>/webapps folder. Start up Tomcat and access the following URLs on your favorite browser (assuming you have it listening at port 8080):

1. [http://localhost:8080/se-challenge/UploadFileAngular](http://localhost:8080/se-challenge/UploadFileAngular) for the AngularJS version
2. [http://localhost:8080/se-challenge/UploadFile](http://localhost:8080/se-challenge/UploadFile) for the Spring MVC + jQuery version
	
The imported data is saved in a memory database (H2), so you can spare installing yet another DBMS on your computer. Additionally, Spring Boot has a beautiful integration with H2 that made things a lot easier to me. The downside is that the data is lost after the server is no longer running, but I believe this is not a problem.

# Reading the source code
Clone `se-challenge` project into your local machine, import it into Eclipse and have fun :)

Below are brief descriptions of the source folders:

1. `src/main/java`: the package for all the java classes
 1. `com.waveapps.sechallenge`: contains the class needed for the configuration of Spring Boot
 2. `com.waveapps.sechallenge.conroller`: contains the controller classes for the upload service
 3. `com.waveapps.sechallenge.dataReader`: contains the interfaces and implementations of the classes needed to read the  data
 4. `com.waveapps.sechallenge.model`: contains the JPA entities
 5. `com.waveapps.sechallenge.repository`: contains the Spring repositories for DB access
2. `src/main/resources`: this folder is actually empty, I did not need it in the end but it is a folder created by default by Maven
3. `src/test/java`: contains the unit tests
4. `src/test/resources`: the resources needed for the unit tests

Please review the application and contact me through here or email (marcelolotif@gmail.com) if you have any questions.

Thanks!
