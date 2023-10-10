# Using node base image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install OpenJDK 11
RUN apt-get update && apt-get install -y openjdk-11-jdk && apt-get clean

# Install git, Python, pip, Gradle
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git python3 python3-pip gradle && apt-get clean

# MongoDB setup
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update \
    && apt-get install -y mongodb-mongosh \
    && apt-get clean

RUN npm install -g cors axios
RUN npm install express
RUN pip3 install flask

RUN rm -rf /var/lib/apt/lists/*
