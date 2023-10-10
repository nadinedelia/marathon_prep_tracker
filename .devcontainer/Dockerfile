# Using Node.js base image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install OpenJDK 8
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:openjdk-r/ppa && \
    apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get clean;

# Install git, Python, pip, Gradle
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git python3 python3-pip gradle && apt-get clean

# Npm packages installation
RUN npm install -g cors axios express create-react-app

# Install Flask using pip (optional if you need Python/Flask)
RUN pip3 install flask

RUN apk update
RUN apk add --no-cache docker-engine
RUN apk add --no-cache docker-cli
RUN apk add --no-cache docker-compose

# Clean up
RUN rm -rf /var/lib/apt/lists/*

