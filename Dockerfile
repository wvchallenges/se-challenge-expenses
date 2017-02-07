FROM tutum/lamp:latest

RUN rm -rf /app
RUN git clone https://github.com/ernan/se-challenge-expenses.git /app

ADD db.sql      /app/db.sql
ADD import.sql  /app/import.sql
ADD convert.sql /app/convert.sql
ADD index.php /var/www/html/index.php
ADD index.php /var/www/html/index.html
	
CMD ["service apache2 start"]
CMD ["service mysql start"]

CMD ["mysql -u expence_user -p expence_pass < /app/db.sql"]
CMD ["mysql -u expence_user -p expence_pass < /app/import.sql"]
CMD ["mysql -u expence_user -p expence_pass < /app/convert.sql"]

# Add volumes for MySQL 
VOLUME  ["/etc/mysql", "/var/lib/mysql" ]

EXPOSE 80 3306
CMD ["/run.sh"]


