docker stop $(docker ps -q --filter ancestor=ernan/expenses )
docker rmi -f ernan/expenses

docker build -t ernan/expenses .

# create the database
docker run -d -p 80:80 -p 3306:3306 ernan/expenses

start "" http://192.168.99.100