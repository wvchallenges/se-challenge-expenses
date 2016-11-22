# Wave Software Development Challenge
Applicants for the [Software developer](https://wave.bamboohr.co.uk/jobs/view.php?id=1) role at Wave must complete the following challenge, and submit a solution prior to the onsite interview. 

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
1. A paragraph or two about what you are particularly proud of in your implementation, and why.

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
1. Did you document your build/deploy instructions and your explanation of what you did well?
1. Were models/entities and other components easily identifiable to the reviewer? 
1. What design decisions did you make when designing your models/entities? Why (i.e. were they explained?)
1. Did you separate any concerns in your application? Why or why not?
1. Does your solution use appropriate datatypes for the problem as described? 

## Installation Instructions
1. Vagrant (~1.8.4) is required for ease of development. Virtualbox is used as the VM provider.
1. Execute `vagrant up` to deploy the development environment. This will take a bit of time depending on your machine.
1. Once the environment has deployed you can load `https://localhost:8443` in your browser. ***Note*** If there is already another Vagrant machine already running, your ports may have conflicts. Execute `vagrant port` to see the assigned ports to the new machine and access accordingly.
1. The development environment uses snakeoil SSL certificates. You will need to add the exception to continue through the security issue.
1. This has been tested on Chrome and Firefox.
1. The Vagrant scripts describe the build environment. 

### Implementation Details
- The project is based on Symfony / PHP. I used exiting code as scaffolding for speed of development. 
- The Expense model was not expanded on due to the nature of the information. I could have created an Employee model and Tax model however the data in the Expense model would still have been recorded as denormalized for performance and record keeping.
- I really like asynchronous programming and tried to utilise those concepts. The last todo item would have been AJAX File Uploads which I never got around to. 
- I used RabbitMQ and Redis though I could probably have done everything in Redis. However architecturaly, It really is overkill for the project requirements.
- The RabbitMQ Consumer is started on `vagrant up` and will process file uploads of which details are published to the queue. 
- I was thinking about WebSockets though I would prefer a pure JS solution in that case. 
- I could also have added more messaging / notification messages. I also did not write any tests though I should have.
- Spent way more than a few hours, but as my passion is programming in general, I enjoyed it. However, I really don't believe demonstrating something you're particularly proud of can be dome in such a short amount of time.
    
