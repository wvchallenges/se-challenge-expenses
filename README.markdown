# Submission Details

## General Philosophy and Assumptions

I value pragmatism and simplicity, but since you asked to show off, the app takes a slight round-about approach.

I did make an assumption: *The tool will be used internally, probably only once, definitely by a developer who can read a stack trace. This is a company you acquired after all, and the person who imports the data should know what they're doing. These processes are _never_ nice.  Never ever.*

So. I took the focus off the front-end beyond the obvious, I left the exception handling to the framework and left debug on, and I focused on the actual upload process. 9/10 times this works swell.

## Particulars

- I worked with a lot of data processing this year, so I used Pandas for this solution. I normalize the data into four separate tables by using Pandas unique-finding, indexing and sorting
- Bulk writes! Last year I wrote a system that takes 10Mb upload files, and inserting row-by-row was untenably slow to the point where I had to config Nginx upstream for 5-minute timeouts. Had I used bulk writes like I do here it would be a lot nicer
- No ORM. I have nothing but respect for Django, but this is a tiny problem that deserves a tiny and simple solution
