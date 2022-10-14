#!/bin/bash

cd ../
mvn clean install

cd ./application

java -agentlib:jdwp=transport=dt_socket,server=y,address=localhost:8028,suspend=n \
    -Dserver.servlet.context-path=/server-app \
    -Dserver.port=8080 \
    -Dspring.profiles.active=dev \
    -jar ./target/serverSide.jar > server.log