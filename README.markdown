## Code implementation

1. Backend

Use nodejs as backend server to serve page rendering, upload and data processing, handled database connection in connection pool. 
Because of nodejs' non-io-blocking feature it can return table data really fast and present it on client side. 
Also the code handled large file streaming read, make sure no memory leak will happen. 

2. FrontEnd

On client side, I used google chart to make the data more straight-forward.

## How to setup

1. Start mysql server, run schema.sql 

2. Install node packages, under /server folder, run npm install

3. Start node server, node app

4. Type http://localhost:8888 in browser

## Something proud of

Actually this is just a simple implementation of user interface, data processing, nothing really fancy...

## Future work

1. Add admin authentication and authorization check to make sure only admin can touch upload data process.

2. Check uploaded filename to make sure we do not process same file twice or more

3. Build up data model for data curd operations.

4. Depend on who will view the data, we can memory cache data for quick access (seems like nothing related to file upload :))

5. Move front end page to storage like aws s3, so server only act as a service

6. Use modern frontend technologies to dev and build if project becoming complex

7. Test cases (actually should be most important thing)
 
...
