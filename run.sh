# run mysql in a docker container do this first to give it time to start
docker stop ernan-expenses-mysql
docker rm -f ernan-expenses-mysql
docker run --name ernan-expenses-mysql -e MYSQL_ROOT_PASSWORD=programmer -e MYSQL_DATABASE=expenses -e MYSQL_USER=expenses_user -e MYSQL_PASSWORD=expenses_pass -d mysql:5.6

docker logs ernan-expenses-mysql

# compile and built the app this should make a file target/expenses-1.0.0.jar
mvn package

# build this app stopping just in case
docker stop ernan-expenses
docker rm -f ernan-expenses
docker build -t ernan-expenses .
docker run -p 8096:8096 ernan-expenses --link ernan-expenses-mysql:mysql -d ernan/se-challenge-expenses
