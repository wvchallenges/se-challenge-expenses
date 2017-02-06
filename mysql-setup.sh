mysql -u root  -p < db.sql

mysql -u root  -p < import.sql

mysql -u root  -p < convert.sql

mv -f index.php /var/www/html/