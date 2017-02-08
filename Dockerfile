FROM java:8
VOLUME /tmp
ADD target/expenses-1.0.0.jar expenses-1.0.0.jar
RUN bash -c 'touch /expenses-1.0.0.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/expenses-1.0.0.jar"]
