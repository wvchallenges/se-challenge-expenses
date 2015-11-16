----------------------------------------------------------------------------------------
Wave Programming Challenge ReadMe by Travis Rawn
----------------------------------------------------------------------------------------


----------------------------------------------------------------------------------------
What you are particularly proud of in your implementation, and why.
----------------------------------------------------------------------------------------
I don't know if there is anything particular that I’m proud about. There was nothing too challenging and  
I didn't expand on the challenge. I read the challenge and tried to take the simplest approach to it. I  
do feel like I succeded in that aspect. With that said, I was disappointed that I couldn't find a way to  
read the csv without having to save it to the server first. I also feel like my code is clear and  
concise. 
 
----------------------------------------------------------------------------------------
How to get this setup working.
----------------------------------------------------------------------------------------
Getting this setup is very simple. 

1)Upload the .html and the .php files to your server.
2)Update the mysql info in lines 4-7 in the php file.
3)Create a uploads directory where the .php file is saved.

----------------------------------------------------------------------------------------
What I would of done differently in a real workplace.
----------------------------------------------------------------------------------------
Creating a web application for saving csv to database doesn't really make sense. The new company that was 
just acquired could have thousands of csv if they were saving data that way. It would make alot more  
sense to batch insert all those files into the database. Furthermore, these files have to be linked to an 
account or a person somehow.

If I still had to create a web application, I would of wrote my code slightly different. First of all, I  
would separate my css/javascript/html. Right now, I have them in one file. In addition, I would split my  
php into 2 files. One that handles the file and error checking then another that does all mysql calls. In 
my experience when dealing with files alot larger then this it is easier to read and change if they are 
split. 

