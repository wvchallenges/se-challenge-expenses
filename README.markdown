# Manor Freeman - Wave SE Challenge Submission

## Setup and Running of Application


## Project Emphasis
I chose to put the emphasis of my efforts for this project on implementing "smart" error handling, because I believe this is one of the most important aspects of parsing csv and also leverages one of the more powerful features in django, model validation. In order to implement "smart error handling", I chose to write the program such that it continues parsing and writing to the database even after encountering errors, and returns a list of each error that was encountered so that users can identify exactly which lines failed and why, correct the errors, and re-upload the failed expense/employee records.
