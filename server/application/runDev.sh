#!/bin/bash

cd ../
mvn clean install

cd ./application

java -agentlib:jdwp=transport=dt_socket,server=y,address=localhost:8028,suspend=n \
    -jar ./target/serverSide.jar > server.log
