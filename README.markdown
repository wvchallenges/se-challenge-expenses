## Project Description
Imagine that Wave has just acquired a new company. Unfortunately, the company has never stored their data in a database, and instead uses a comma separated text file. We need to create a way for the new subsidiary to import their data into a database. Your task is to create a web interface that accepts file uploads, and then stores them in a relational database.

### What your web-based application must do:

1. Your app must accept (via a form) a comma separated file with the following columns: date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount.
1. You can make the following assumptions:
 1. Columns will always be in that order.
 2. There will always be data in each column.
 3. There will always be a header line.

 An example input file named `data_example.csv` is included in this repo.

1. Your app must parse the given file, and store the information in a relational database.
1. After upload, your application should display a table of the total expenses amount per-month represented by the uploaded file.

Your application should be easy to set up, and should run on either Linux or Mac OS X. It should not require any non open-source software.

### Documentation:

## Project CSVisualizer 

#### Overview

* This app lets the user upload/drag CSV files with specified format and parses it and presents the result in readable format.
* It was made with ASP. NET CORE framework - Microsoft's newest fully open-sourced framework on a Mac using Visual Studio Code 
* It uses Model-View-Controller pattern for separation of concerns. It uses PostgreSQL as the relational database. 
* I used ServiceStack open source library for importing CSV files into Objects. 
* I used ORM (Object Relational Mapper) capability of ServiceStack framework for interaction with database tables. It gives me the freedom to 
    swap the database if needed and presents an easily manageable abstraction layer between database and application. 
    Not hard-coding SQL queries is added bonus.
* I used Semantic UI as my front-end UI framework because it allows me to use readable syntax for modifying UI and has 
    some really nice UI elements.
* Though it contains DockerFile but it is not sufficient as it came pre-build with ASP .NET core template I used. 

#### Screenshot of the project
![Index](https://raw.githubusercontent.com/sugatmahanti/se-challenge/master/WaveProject1.png)
![About](https://raw.githubusercontent.com/sugatmahanti/se-challenge/master/WaveProject2.png)


### Installing and Running the Project 

##  Prerequisites
You will need 3 main components on your machine to before you can run this app:
1. .NET Core framework 
2. NodeJS/NPM 
3. PostgreSQL Database

I developed this project on Mac so I am going to list the instruction on setting up the project on it. 

#### Installing .NET Core on Mac

For detailed instructions regarding installing .NET Core framework on your machine(Windows, MacOSX or Linux) 
please refer to https://www.microsoft.com/net/core 

To set it up on your Mac, I am reproducing instructions from above link:
    
In order to use .NET Core, you first need to install the latest version of OpenSSL. 
The easiest way to get this is from Homebrew from http://brew.sh/.
Install Homebrew by running the following command here 
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

After installing brew, do the following:

```
brew update
brew install openssl
ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib/

```
After that The best way to install .NET Core on MacOS is to download the official installer from here 
`https://go.microsoft.com/fwlink/?LinkID=831679`
This installer will install the tools and put them on your PATH so you can run dotnet from the Console. 


#### Installing NPM package manger 

You can refer here http://blog.teamtreehouse.com/install-node-js-npm-mac for installing NPM 

You can install Homebrew package manager for easy installation of packages, then you can type
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)
````

You can install Node by typing this on your Terminal
```
brew install node
```


#### Installing and Setting up PostgreSQL

Install PostgreSQL through Homebrew package manager 

```
brew install Postgres
```

If you don't have brew Services 

```
brew tap homebrew/services
```

Once you have it installed 

```
brew services start postgresql
```

Create User and Database Named Expense or any you would like  
Please update appsettings.JSON file to add the connection string to the above database.
Here is my connectionString for the app.  
```
"DefaultConnection":"UserID=smahanti;Host=localhost;Port=5432;Database=Expense;"
```

Once you have setup all these prerequisites download this repository. 

#### Running the application
After downloading this repository, you should have a directory structure like this: 

```
 /se-challenge
 |__appsettings.json
 SourceFiles -- Other files in project
 |__/Controllers
    |__HomeController.cs
 |__/Views
    |__/Home 
        |__About.cshtml
        |__Index.cshtml
 |__/Models
    |__Expense.cs
    |__ExpenseDataFactory.cs
 |__data_example.csv
 |__MainApp.cs
 |__project.json
 |__Startup.cs
```


Run the command 
```
dotnet restore
dotnet run
```

After it successfully completes the operation, it should host the application on the local server
It usually hosts on http://localhost:5000 

Please type the link in your browser.

You should be good to go :)

You can start dragging and dropping files and hopefully see the result. 


#### My approach towards this project 

I am going to detail the approach I took towards this challenge. 


##### Framework 

As a developer who has spent considerable time developing in C#, it was pretty disheartening to not able make open source 
web apps that can run on Mac or Linux platforms. But when I heard about Microsoft's recent effort in open sourcing their 
new iteration of .NET framework, I was really excited. I went to DevTeach Conference 2016 in Montreal and it gave me a
really good exposure of .NET Core and saw things people were doing with it. I started experimenting with it and got 
a good hold on it. 

I just used Visual Studio Code (Text Editor IDE by Microsoft) on a Mac to develop this app and it was very liberating 
to not use Visual Studio Windows for a .NET project. 

I used ASP.NET MVC Core as the main framework. It follows MVC (Model View Controller) architecture
and it provides nice separation of concerns for my app. I used `Dependency Injection` for injecting ServiceStack library 
for `Object Relational Mapper` capability for my app. I used PostgreSQL database as the relational database. 

###### Model
    It contains 2 classes 
    `Expense.cs` - It contains all the object models and Table models for my app. More on Table model in ORM and PostgreSQL section.
    `ExpenseDataFactory.cs` - It contains methods to create tables for my app and to save the data parsed from CSV file to the PostgreSQL
        database.

###### Controller
    It contains the methods for sending data to Index and About page. 
    It also contains POST  method for taking the uploaded file and using model methods to parse and display it. 


###### View       
    It contains Index.cshtml and About.cshtml for displaying the data from the model. It uses Semantic UI
    for visual elements. 


##### Uploading the CSV Files 

I used DropZone JS library to provide a nice interface for uploading files. I used ServiceStack library for parsing 
CSV library into objects I have specified in my Model. It is pretty good in performance for parsing large CSV files.
I was able to specify max-file-size to 2MB for the CSV files. 

##### ORM and PostgreSQL

As I mentioned before I am using ServiceStack ORMLite for interacting with my PostgreSQL database. The best part about this 
is I dont have to hard-code SQL queries, it presents a nice abstraction between my code and the database. It also
gives me the freedom to swap database. I created my Table Objects with Data Annotations for specifying things like 
foreign key, primary key and auto-incrementing values. 


##### Visual Elements (Semantic UI)

Everyone I know uses bootstrap UI and I like it too but I found the idea of easily readable classes for specifying UI 
styles really appealing and easy to work with. Plus Microsoft gave me a choice of Semantic UI which made things 
easier implementing it. I really liked their style of visual elements as well. 


## Acknowledgements 

* People at Wave who created this challenge. 
* Contributors to .NET Core Framework, ServiceStack, DropZone JS and Semantic UI.



## Author 
Sugat Mahanti





