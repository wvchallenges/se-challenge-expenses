# Wave Full-stack Development Challenge
Applicants for the Full-stack developer role at Wave must complete the following challenge, and submit a solution prior to the onsite interview. 

The purpose of this exercise is to create something that we can work on together during the onsite. We do this so that you get a chance to collaborate with Wavers during the interview in a situation where you know something better than us (it's your code, after all!) 

There isn't a hard deadline for this exercise; take as long as you need to complete it. However, in terms of total time spent actively working on the challenge, we ask that you not spend more than a few hours, as we value your time and are happy to leave things open to discussion in the onsite interview.

Please use whatever programming language and framework you feel the most comfortable with.

Feel free to email [dev.careers@waveapps.com](dev.careers@waveapps.com) if you have any questions.

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

There are many ways that this application could be built; we ask that you build it in a way that showcases one of your strengths. If you you enjoy front-end development, do something interesting with the interface. If you like object-oriented design, feel free to dive deeper into the domain model of this problem. We're happy to tweak the requirements slightly if it helps you show off one of your strengths.

### Documentation:

Please modify `README.md` to add:

1. Instructions on how to build/run your application

Before building/running this Swift, please read [Perfect: A Server Side Swift](perfect.org) for installation guide.

For Xcode 9.0+ (macOS), or Swift 4.0+ (Ubuntu 16.04)

```
$ cd csvsql 
$ swift run
```

The server will run at [http://localhost:8181](http://localhost:8181).

If success, you can upload the sample CSV and try "summary" on the web page.
To stop the demo server, simply just click [Stop the demo server](http://localhost:8181/halt), as on the same html page.

⚠️**Alternatively**⚠️, the easiest way to build & run this demo is [docker](docker.com)

```
$ docker run -it -v $PWD/csvsql:/home -w /home -p 8181:8181 rockywei/swift:4.0 /bin/bash -c "swift run"
```

1. A paragraph or two about what you are particularly proud of in your implementation, and why.

Nothing specially, it is a very common demo for a typical Perfect backend, which doesn't include other powerful Perfect features such as AI / Machine Learning / Live Messaging / Big Data Mining:

``` swift
/// a Perfect Web Server prefers a pure json style scheme.
/// By such a design, the web server can apply such an architecture:
/// - model.swift, a pure data model file to serve data model
/// - main.swift, a http server route controller
/// - index.html, a static html page to view the data
```

The solution took about 3 hours:

- Document reading.
- Prototyping.
- Final implementation.
- Testing.
- API documentation, which was taken over 90 minutes.



## Submission Instructions

1. Fork this project on github. You will need to create an account if you don't already have one.
1. Complete the project as described below within your fork.
1. Push all of your changes to your fork on github and submit a pull request. 
1. You should also email [dev.careers@waveapps.com](dev.careers@waveapps.com) and your recruiter to let them know you have submitted a solution. Make sure to include your github username in your email (so we can match applicants with pull requests.)

## Alternate Submission Instructions (if you don't want to publicize completing the challenge)
1. Clone the repository.
1. Complete your project as described below within your local repository.
1. Email a patch file to [dev.careers@waveapps.com](dev.careers@waveapps.com)

## Evaluation
Evaluation of your submission will be based on the following criteria. 

1. Did you follow the instructions for submission? 

- Yes


1. Did you document your build/deploy instructions and your explanation of what you did well?

- Yes.

1. Were models/entities and other components easily identifiable to the reviewer? 

- Yes. All codes have been well documented in the source.

1. What design decisions did you make when designing your models/entities? Why (i.e. were they explained?)

- Yes, Perfect prefers a pure json backend style.

1. Did you separate any concerns in your application? Why or why not?

It is too small a demo so couldn't including other important/scaling features in hours, typically, such as file size control, malicious detection, ORM, google-protocol buffer for huge data trunk traffic, OAuth and JWT token control, legacy single sign-on such as SPNEGO, or distribution storage / indexing, full text searching, etc.

1. Does your solution use appropriate datatypes for the problem as described? 

- Yes, however, SQLite is a simplified implementation of ANSI SQL, so it should be a bit complicated if production.
