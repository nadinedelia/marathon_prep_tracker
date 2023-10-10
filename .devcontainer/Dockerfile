FROM openjdk:11-jdk-slim
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git

RUN apt-get update && apt-get install -y python3 python3-pip
RUN apt-get update && apt-get install -y gradle
RUN apt-get update && apt-get install -y express

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN sudo apt-get install -y mongodb-mongosh
RUN npm install cors
RUN npm install axios

RUN useradd -m test

RUN pip3 install flask