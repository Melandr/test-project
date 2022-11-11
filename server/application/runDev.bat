REM запуск компиляции из каталога "\application" командой .\runDev.bat

@echo off

cd /d ..\
mvn clean install

java -jar .\application\target\serverSide.jar
REM java -agentlib:jdwp=transport=dt_socket,server=y,address=localhost:8028,suspend=n -jar .\target\serverSide.jar 