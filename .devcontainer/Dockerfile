FROM openjdk:11-jdk-slim

RUN apt-get update && apt-get install -y python3 python3-pip
RUN apt-get update && apt-get install -y gradle
RUN apt-get update && apt-get install -y express

RUN useradd -m test

RUN pip3 install flask