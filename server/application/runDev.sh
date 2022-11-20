#!/bin/bash

cd ../
mvn clean install

cd ./application

java -agentlib:jdwp=transport=dt_socket,server=y,address=localhost:8028,suspend=n \
    -Dspring.datasource.url=jdbc:h2:tcp://localhost/~/Programs/h2/data/serverDb \
    -Dspring.datasource.username=admin \
    -Dspring.datasource.password=securityPassword \
    -jar ./target/serverSide.jar > server.log
